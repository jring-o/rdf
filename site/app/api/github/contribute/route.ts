import crypto from "node:crypto";
import { NextResponse } from "next/server";

import {
  clearTokenCookie,
  EnvMissingError,
  readGithubEnv,
  readTokenCookie,
} from "@/lib/github-oauth";
import {
  AuthExpiredError,
  createBranch,
  createFork,
  getBranchSha,
  getViewer,
  GithubApiError,
  hasFork,
  putFile,
  waitForFork,
} from "@/lib/github-api";
import { loadGraphRuntime } from "@/lib/graph-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AUDIENCES = ["academic", "executive", "blog", "position"] as const;
const LENGTHS = ["short", "medium", "long"] as const;
const VOICES = ["formal", "conversational", "plain"] as const;

const MAX_CONTENT_BYTES = 50_000;

interface ContributeBody {
  anchorId?: string;
  audience?: string;
  length?: string;
  voice?: string;
  depth?: number;
  model?: string;
  content?: string;
}

interface ValidationError {
  status: number;
  body: { error: string; detail?: string };
}

interface ValidatedInput {
  anchorId: string;
  audience: (typeof AUDIENCES)[number];
  length: (typeof LENGTHS)[number];
  voice: (typeof VOICES)[number];
  depth: 1 | 2;
  model: string;
  content: string;
}

function validate(body: ContributeBody): ValidatedInput | ValidationError {
  if (!body.anchorId || !/^[A-Z]-\d+[a-z]?$/.test(body.anchorId)) {
    return { status: 400, body: { error: "invalid_anchor" } };
  }
  if (!body.audience || !AUDIENCES.includes(body.audience as (typeof AUDIENCES)[number])) {
    return { status: 400, body: { error: "invalid_audience" } };
  }
  if (!body.length || !LENGTHS.includes(body.length as (typeof LENGTHS)[number])) {
    return { status: 400, body: { error: "invalid_length" } };
  }
  if (!body.voice || !VOICES.includes(body.voice as (typeof VOICES)[number])) {
    return { status: 400, body: { error: "invalid_voice" } };
  }
  const depth = body.depth === 2 ? 2 : 1;
  if (typeof body.content !== "string" || body.content.length === 0) {
    return { status: 400, body: { error: "missing_content" } };
  }
  if (Buffer.byteLength(body.content, "utf-8") > MAX_CONTENT_BYTES) {
    return { status: 413, body: { error: "content_too_large" } };
  }
  if (typeof body.model !== "string" || body.model.length === 0) {
    return { status: 400, body: { error: "missing_model" } };
  }
  if (body.model.length > 200 || /[\r\n]/.test(body.model)) {
    return { status: 400, body: { error: "invalid_model" } };
  }

  const graph = loadGraphRuntime();
  if (!graph.nodes.has(body.anchorId)) {
    return { status: 404, body: { error: "anchor_not_in_graph" } };
  }

  return {
    anchorId: body.anchorId,
    audience: body.audience as (typeof AUDIENCES)[number],
    length: body.length as (typeof LENGTHS)[number],
    voice: body.voice as (typeof VOICES)[number],
    depth: depth as 1 | 2,
    model: body.model,
    content: body.content,
  };
}

function buildFileBody(
  v: ValidatedInput,
  contributor: { login: string; htmlUrl: string },
): string {
  const lines: string[] = [];
  lines.push("---");
  lines.push(`anchor: ${v.anchorId}`);
  lines.push(`audience: ${v.audience}`);
  lines.push(`length: ${v.length}`);
  lines.push(`voice: ${v.voice}`);
  lines.push(`depth: ${v.depth}`);
  lines.push(`generatedAt: ${new Date().toISOString()}`);
  lines.push(`generatedBy: web`);
  lines.push(`model: ${v.model}`);
  lines.push(`contributor: ${contributor.login}`);
  lines.push(`contributorUrl: ${contributor.htmlUrl}`);
  lines.push("---");
  lines.push("");
  lines.push(v.content.trimEnd());
  lines.push("");
  return lines.join("\n");
}

export async function POST(request: Request) {
  let env;
  try {
    env = readGithubEnv();
  } catch (err) {
    if (err instanceof EnvMissingError) {
      return new Response(err.message, { status: 500 });
    }
    throw err;
  }

  const token = await readTokenCookie();
  if (!token) {
    return NextResponse.json({ error: "auth_expired" }, { status: 401 });
  }

  let parsed: ContributeBody;
  try {
    parsed = (await request.json()) as ContributeBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const v = validate(parsed);
  if ("status" in v) {
    return NextResponse.json(v.body, { status: v.status });
  }

  try {
    const viewer = await getViewer(token);

    const forkExists = await hasFork(token, viewer.login, env.repoName);
    if (!forkExists) {
      await createFork(token, env.repoOwner, env.repoName);
      await waitForFork(token, viewer.login, env.repoName);
    }

    const baseSha = await getBranchSha(
      token,
      viewer.login,
      env.repoName,
      env.baseBranch,
    );

    const shortId = crypto.randomBytes(4).toString("hex");
    const branch = `narrative/${v.anchorId}-${shortId}`;
    await createBranch(token, viewer.login, env.repoName, branch, baseSha);

    const filePath = `narratives/${v.anchorId}-${shortId}.md`;
    const fileBody = buildFileBody(v, {
      login: viewer.login,
      htmlUrl: viewer.html_url,
    });
    await putFile(
      token,
      viewer.login,
      env.repoName,
      filePath,
      branch,
      `add narrative for ${v.anchorId} (${v.audience}/${v.voice})`,
      fileBody,
    );

    const compareUrl = buildCompareUrl({
      upstreamOwner: env.repoOwner,
      upstreamName: env.repoName,
      base: env.baseBranch,
      headLogin: viewer.login,
      headBranch: branch,
      title: `narrative · ${v.anchorId} · ${v.audience}/${v.voice}`,
      body: buildPrBody(v, viewer.login),
    });

    return NextResponse.json({ compareUrl, shortId, filePath, branch });
  } catch (err) {
    if (err instanceof AuthExpiredError) {
      await clearTokenCookie();
      return NextResponse.json({ error: "auth_expired" }, { status: 401 });
    }
    if (err instanceof GithubApiError) {
      return NextResponse.json(
        { error: "github_api_error", detail: err.message, status: err.status },
        { status: 502 },
      );
    }
    throw err;
  }
}

function buildCompareUrl(p: {
  upstreamOwner: string;
  upstreamName: string;
  base: string;
  headLogin: string;
  headBranch: string;
  title: string;
  body: string;
}): string {
  const params = new URLSearchParams({
    quick_pull: "1",
    title: p.title,
    body: p.body,
  });
  return (
    `https://github.com/${p.upstreamOwner}/${p.upstreamName}` +
    `/compare/${encodeURIComponent(p.base)}` +
    `...${encodeURIComponent(p.headLogin)}:${encodeURIComponent(p.headBranch)}` +
    `?${params.toString()}`
  );
}

function buildPrBody(v: ValidatedInput, login: string): string {
  return [
    `Adds a community-composed narrative anchored at \`${v.anchorId}\`.`,
    "",
    "Generated via the on-site composer at `/narratives/generate`.",
    "",
    `- anchor: \`${v.anchorId}\``,
    `- audience: ${v.audience}`,
    `- length: ${v.length}`,
    `- voice: ${v.voice}`,
    `- depth: ${v.depth}`,
    `- model: \`${v.model}\``,
    `- contributor: @${login}`,
    "",
    "Provenance is recorded in the file's YAML frontmatter.",
  ].join("\n");
}
