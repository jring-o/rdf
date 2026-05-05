import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

import { loadGraphRuntime } from "@/lib/graph-runtime";
import { buildBundleFromGraph, buildSemanticBundle } from "@/lib/bundle";
import type { GraphNode } from "@/lib/types";
import { EDGE_LABEL, EDGE_INVERSE_LABEL, NODE_TYPE_LABEL } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const AUDIENCES = ["academic", "executive", "blog", "position"] as const;
const LENGTHS = ["short", "medium", "long"] as const;
const VOICES = ["formal", "conversational", "plain"] as const;
const STRATEGIES = ["hops", "semantic"] as const;

type Audience = (typeof AUDIENCES)[number];
type Length = (typeof LENGTHS)[number];
type Voice = (typeof VOICES)[number];
type Strategy = (typeof STRATEGIES)[number];

interface GenerateRequest {
  anchorId: string;
  strategy: Strategy;
  depth: 1 | 2;
  /** Q-overlap threshold for the semantic walk: 1 (wide) | 2 (balanced) | 3 (tight). */
  qOverlap: 1 | 2 | 3;
  audience: Audience;
  length: Length;
  voice: Voice;
}

const AUDIENCE_BRIEF: Record<Audience, string> = {
  academic:
    "an academic paper section: dense argument, formal register, willing to use technical vocabulary, citations as inline node IDs.",
  executive:
    "an executive brief: top-line first, plain English, what-it-means-for-the-org framing, short paragraphs.",
  blog:
    "a blog post: lively but accurate, scene-setting opener, paragraph rhythm that propels reading, no bureaucratic phrasing.",
  position:
    "a position statement: declarative, principled, names the stake clearly, ends with what the audience should commit to.",
};

const LENGTH_BUDGET: Record<Length, string> = {
  short: "approximately 250-400 words",
  medium: "approximately 600-900 words",
  long: "approximately 1200-1800 words",
};

const VOICE_BRIEF: Record<Voice, string> = {
  formal: "formal, careful, third-person; no contractions.",
  conversational:
    "conversational and direct, second-person where it helps; contractions ok; no slang.",
  plain:
    "plain-language, jargon-free; explain technical terms in passing; concrete over abstract.",
};

function nodeMarkdownBlock(node: GraphNode): string {
  const meta: string[] = [];
  if (node.status) meta.push(`status: ${node.status}`);
  if (node.source_section) meta.push(`source: ${node.source_section}`);
  if (node.created) meta.push(`created: ${node.created}`);

  const out = node.outgoing.map(
    (e) => `  - ${EDGE_LABEL[e.edge]} → ${e.to}`,
  );
  const inc = node.incoming.map(
    (e) => `  - ${EDGE_INVERSE_LABEL[e.edge]} ← ${e.from}`,
  );

  return [
    `### ${node.id} · ${NODE_TYPE_LABEL[node.type]} · ${node.title}`,
    meta.length ? `_${meta.join(" · ")}_` : "",
    "",
    node.body || "_(no body)_",
    "",
    out.length ? "Outbound:" : "",
    ...out,
    inc.length ? "Inbound:" : "",
    ...inc,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPromptBundle(
  graph: ReturnType<typeof loadGraphRuntime>,
  anchorId: string,
  strategy: Strategy,
  depth: 1 | 2,
  qOverlap: 1 | 2 | 3,
): string | null {
  const bundle =
    strategy === "semantic"
      ? buildSemanticBundle(graph, anchorId, qOverlap)
      : buildBundleFromGraph(graph, anchorId, depth);
  if (!bundle) return null;

  const ordered = [...bundle.nodes].sort((a, b) => {
    if (a.isAnchor !== b.isAnchor) return a.isAnchor ? -1 : 1;
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.id.localeCompare(b.id);
  });

  const composition =
    strategy === "semantic"
      ? `Bundle = type-aware semantic walk from anchor (q-overlap = ${qOverlap}). ${bundle.nodes.length} nodes, ${bundle.edges.length} edges.`
      : `Bundle = depth-${depth} neighborhood. ${bundle.nodes.length} nodes, ${bundle.edges.length} edges.`;

  const parts: string[] = [];
  parts.push(`# Anchor: ${anchorId}`);
  parts.push("");
  parts.push(composition);
  parts.push("");
  for (const bn of ordered) {
    const full = graph.nodes.get(bn.id);
    if (!full) continue;
    const tag = bn.isAnchor
      ? " [ANCHOR]"
      : strategy === "semantic"
      ? ""
      : ` [depth ${bn.depth}]`;
    parts.push(`## ${full.id}${tag}`);
    parts.push("");
    parts.push(nodeMarkdownBlock(full));
    parts.push("");
  }
  return parts.join("\n");
}

const SYSTEM_PROMPT = `You compose narratives from a discourse graph of research nodes (Questions, Claims, Evidence, Methods, Sources). The graph is the source of truth.

Rules:
- Cite nodes inline by their ID in square brackets, e.g. [C-0001], [E-0014], [M-0003]. Do NOT invent IDs.
- Do NOT introduce facts, numbers, names, or claims that are not present in the bundle. If something seems missing, name the gap explicitly rather than filling it.
- Treat the anchor node as the spine of the narrative; supporting nodes weave in around it.
- Use the edge relationships (supports, opposes, addresses, derivedFrom, informs, usesMethod) as structural hints — supporting evidence supports, opposing evidence pushes back, methods clarify how a claim was reached.
- Do not list the bundle. Compose prose. Use IDs as citations within sentences, not as bullet points.
- Do not summarize the bundle's structure ("the bundle contains..."). Write the narrative directly.
- Output GitHub-flavored Markdown. Use headings, paragraphs, the occasional list — but the dominant register is prose.`;

function userPrompt(
  bundle: string,
  audience: Audience,
  length: Length,
  voice: Voice,
): string {
  return [
    `Compose a narrative from the bundle below.`,
    "",
    `Audience/form: ${AUDIENCE_BRIEF[audience]}`,
    `Length: ${LENGTH_BUDGET[length]}.`,
    `Voice: ${VOICE_BRIEF[voice]}`,
    "",
    `--- BUNDLE ---`,
    bundle,
    `--- END BUNDLE ---`,
    "",
    `Now write the narrative.`,
  ].join("\n");
}

function isAudience(v: unknown): v is Audience {
  return typeof v === "string" && (AUDIENCES as readonly string[]).includes(v);
}
function isLength(v: unknown): v is Length {
  return typeof v === "string" && (LENGTHS as readonly string[]).includes(v);
}
function isVoice(v: unknown): v is Voice {
  return typeof v === "string" && (VOICES as readonly string[]).includes(v);
}
function isStrategy(v: unknown): v is Strategy {
  return typeof v === "string" && (STRATEGIES as readonly string[]).includes(v);
}

export async function POST(req: Request) {
  let body: Partial<GenerateRequest>;
  try {
    body = await req.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  const anchorId = body.anchorId;
  const strategy: Strategy = isStrategy(body.strategy) ? body.strategy : "hops";
  const depth = body.depth === 2 ? 2 : 1;
  const qOverlap: 1 | 2 | 3 =
    body.qOverlap === 1 || body.qOverlap === 3 ? body.qOverlap : 2;
  const audience = isAudience(body.audience) ? body.audience : "academic";
  const length = isLength(body.length) ? body.length : "medium";
  const voice = isVoice(body.voice) ? body.voice : "formal";

  if (typeof anchorId !== "string" || !/^[A-Z]-\d+[a-z]?$/.test(anchorId)) {
    return new Response("invalid anchorId", { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response("OPENROUTER_API_KEY not set", { status: 500 });
  }

  const graph = loadGraphRuntime();
  const bundleText = buildPromptBundle(graph, anchorId, strategy, depth, qOverlap);
  if (!bundleText) {
    return new Response(`anchor not found: ${anchorId}`, { status: 404 });
  }

  const openrouter = createOpenRouter({ apiKey });
  const model = openrouter("mistralai/mistral-large", {
    extraBody: {
      models: [
        "mistralai/mistral-large",
        "google/gemini-2.5-flash",
        "google/gemini-2.5-flash-lite",
      ],
    },
  });

  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    prompt: userPrompt(bundleText, audience, length, voice),
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
