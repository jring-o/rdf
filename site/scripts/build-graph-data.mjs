// Walks ../graph/*.md, ../paper/whitepaper-v3.md, and ../tools/regen-outputs/
// to produce site/lib/graph-data.generated.json — the runtime data source for
// the /api/generate route. The route can't reach files outside site/ at
// Vercel function runtime, so we bake everything into a JSON bundle at build.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_ROOT, "..");
const GRAPH_ROOT = path.join(REPO_ROOT, "graph");
const PAPER_PATH = path.join(REPO_ROOT, "paper", "whitepaper-v3.md");
const NARRATIVE_DIR = path.join(REPO_ROOT, "tools", "regen-outputs");
const OUT_PATH = path.join(SITE_ROOT, "lib", "graph-data.generated.json");

const NODE_TYPES = ["question", "claim", "evidence", "method", "source"];
const TYPE_DIRS = {
  question: "questions",
  claim: "claims",
  evidence: "evidence",
  method: "methods",
  source: "sources",
};
const EDGE_TYPES = [
  "addresses",
  "supports",
  "opposes",
  "derivedFrom",
  "informs",
  "usesMethod",
];

function toStringMaybe(v) {
  if (v == null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

async function readNodeFile(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data ?? {};
  if (!fm.id || !fm.type) {
    console.warn(`[graph-data] missing id/type in ${filePath}`);
    return null;
  }
  const sourceSectionStr = toStringMaybe(fm.source_section) ?? "";
  const sections = sourceSectionStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const outgoing = [];
  const edges = fm.edges ?? {};
  for (const edge of EDGE_TYPES) {
    const targets = edges[edge];
    if (!Array.isArray(targets)) continue;
    for (const target of targets) {
      if (typeof target !== "string" || !target) continue;
      outgoing.push({ edge, to: target });
    }
  }

  return {
    id: String(fm.id),
    type: fm.type,
    title: toStringMaybe(fm.title) ?? String(fm.id),
    status: toStringMaybe(fm.status),
    source_section: sourceSectionStr || undefined,
    sections,
    created: toStringMaybe(fm.created),
    body: parsed.content.trim(),
    outgoing,
  };
}

async function readNodeDir(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
  const out = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const node = await readNodeFile(path.join(dir, entry));
    if (node) out.push(node);
  }
  return out;
}

async function readPaper() {
  try {
    const raw = await fs.readFile(PAPER_PATH, "utf-8");
    return raw;
  } catch (err) {
    if (err.code === "ENOENT") return "";
    throw err;
  }
}

async function readNarratives() {
  let entries;
  try {
    entries = await fs.readdir(NARRATIVE_DIR);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
  const out = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const m = /^bundle-([A-Z]-\d+[a-z]?)\.md$/.exec(entry);
    if (!m) continue;
    const raw = await fs.readFile(path.join(NARRATIVE_DIR, entry), "utf-8");
    out.push({ anchorId: m[1], raw });
  }
  out.sort((a, b) => a.anchorId.localeCompare(b.anchorId));
  return out;
}

async function main() {
  const allNodes = [];
  for (const type of NODE_TYPES) {
    const nodes = await readNodeDir(path.join(GRAPH_ROOT, TYPE_DIRS[type]));
    allNodes.push(...nodes);
  }
  allNodes.sort((a, b) => a.id.localeCompare(b.id));

  const paper = await readPaper();
  const narratives = await readNarratives();

  const data = {
    nodes: allNodes,
    paper,
    narratives,
    generatedAt: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(data));
  console.log(
    `[graph-data] wrote ${allNodes.length} nodes, paper ${paper.length} chars, ${narratives.length} narratives → ${path.relative(SITE_ROOT, OUT_PATH)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
