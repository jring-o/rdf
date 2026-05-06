#!/usr/bin/env node
// tools/sync-node-labels.mjs — one-shot. Walks graph/, ensures a `node:<ID>`
// label exists on the configured GitHub repo for every node. Idempotent: skips
// labels that already exist.
//
// Why: GitHub's `labels=` URL parameter on /issues/new only applies labels
// that already exist on the repo. Without this script, the "Discuss this node"
// button creates issues with empty labels and the build-time fetch falls back
// to title-prefix matching. With this script run once, labels apply cleanly
// and you get GitHub-side filtering ("issues with label:node:C-0017").
//
// Usage:
//   GITHUB_TOKEN=ghp_... node tools/sync-node-labels.mjs
//   GITHUB_TOKEN=ghp_... GITHUB_REPO=owner/name node tools/sync-node-labels.mjs --dry-run
//
// Token needs: Issues: write (or repo: write for classic PATs) on the target repo.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const GRAPH_ROOT = path.join(REPO_ROOT, "graph");

const REPO = process.env.GITHUB_REPO ?? "jring-o/rdf";
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN ?? "";
const DRY_RUN = process.argv.includes("--dry-run");
const LABEL_COLOR = "8b5cf6";
const LABEL_DESC = "Discussion of one specific graph node";

if (!TOKEN && !DRY_RUN) {
  console.error("error: set GITHUB_TOKEN or GH_TOKEN (or pass --dry-run to preview).");
  process.exit(1);
}

const TYPE_DIRS = ["questions", "claims", "evidence", "methods", "sources"];

async function listNodeIds() {
  const ids = [];
  for (const dir of TYPE_DIRS) {
    let entries;
    try {
      entries = await fs.readdir(path.join(GRAPH_ROOT, dir));
    } catch {
      continue;
    }
    for (const entry of entries) {
      const m = /^([QCEMS]-\d{4}[a-z]?)\.md$/.exec(entry);
      if (m) ids.push(m[1]);
    }
  }
  return ids.sort();
}

async function listExistingLabels() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rdf-sync-node-labels",
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const out = new Set();
  let page = 1;
  while (true) {
    const url = `https://api.github.com/repos/${REPO}/labels?per_page=100&page=${page}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`labels fetch ${res.status}: ${await res.text()}`);
    }
    const batch = await res.json();
    for (const l of batch) if (l?.name) out.add(l.name);
    if (batch.length < 100) break;
    page += 1;
    if (page > 50) break;
  }
  return out;
}

async function createLabel(name) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "rdf-sync-node-labels",
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`https://api.github.com/repos/${REPO}/labels`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color: LABEL_COLOR, description: LABEL_DESC }),
  });
  if (!res.ok && res.status !== 422) {
    // 422 = already exists (race / second run). Anything else is a real error.
    throw new Error(`create ${name}: ${res.status} ${await res.text()}`);
  }
}

async function main() {
  const ids = await listNodeIds();
  console.log(`[sync-labels] ${ids.length} nodes in graph`);

  if (DRY_RUN && !TOKEN) {
    console.log(`[sync-labels] DRY RUN, no token; would create node:${ids[0]} … node:${ids[ids.length - 1]}`);
    return;
  }

  const existing = await listExistingLabels();
  const missing = ids.filter((id) => !existing.has(`node:${id}`));
  console.log(`[sync-labels] ${existing.size} labels exist on ${REPO}; ${missing.length} need creating`);

  if (DRY_RUN) {
    for (const id of missing.slice(0, 10)) console.log(`  would create: node:${id}`);
    if (missing.length > 10) console.log(`  ... and ${missing.length - 10} more`);
    return;
  }

  let done = 0;
  for (const id of missing) {
    try {
      await createLabel(`node:${id}`);
      done += 1;
      if (done % 25 === 0) console.log(`  created ${done}/${missing.length}`);
    } catch (err) {
      console.error(`  failed node:${id}: ${err.message}`);
    }
  }
  console.log(`[sync-labels] done. created ${done}/${missing.length} labels.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
