#!/usr/bin/env node
// tools/walk.mjs — graph neighborhood walker for review-time skills.
//
// Loads every node in graph/ and computes the neighborhood around an anchor
// using the same algorithm as site/lib/bundle.ts. Used by the dedup, edge
// resolution, and edge creation skills to retrieve the structurally relevant
// slice of the graph for an LLM to reason over.
//
// Usage:
//   node tools/walk.mjs <anchor> [--strategy semantic|hops] [--depth N] [--qOverlap N] [--bodies] [--proposed <path>]
//
//   <anchor>          Existing node ID (e.g. C-0017), OR — when --proposed is
//                     given — comma-separated edge targets to walk from.
//   --strategy        semantic (default) | hops
//   --depth           hops strategy depth (default 1)
//   --qOverlap        semantic Question-walk threshold (default 2)
//   --bodies          include each node's prose body in the output
//   --proposed PATH   walk from edges declared in PATH (a draft node file).
//                     Walks the union of neighborhoods around each edge target.
//
// Output: JSON to stdout: { anchor, nodes: [...], edges: [...] }.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Minimal frontmatter parser tuned to the SCHEMA.md shape. Avoids a runtime
// dependency on gray-matter so the script runs from the repo root.
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const yaml = match[1];
  const content = match[2] ?? "";
  const data = {};
  let currentKey = null;
  let currentObj = null;
  const lines = yaml.split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim()) continue;
    const topMatch = /^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (topMatch && !line.startsWith("  ")) {
      const [, key, rawVal] = topMatch;
      currentKey = key;
      const val = rawVal.trim();
      if (val === "" || val === "{}") {
        if (val === "{}") {
          data[key] = {};
          currentObj = null;
        } else {
          data[key] = {};
          currentObj = data[key];
        }
      } else if (/^\[.*\]$/.test(val)) {
        data[key] = parseInlineArray(val);
        currentObj = null;
      } else {
        data[key] = parseScalar(val);
        currentObj = null;
      }
    } else if (line.startsWith("  ") && currentObj) {
      const sub = /^\s+([a-zA-Z_][\w-]*)\s*:\s*(.*)$/.exec(line);
      if (!sub) continue;
      const [, subKey, subVal] = sub;
      const val = subVal.trim();
      if (/^\[.*\]$/.test(val)) currentObj[subKey] = parseInlineArray(val);
      else if (val === "" || val === "[]") currentObj[subKey] = [];
      else currentObj[subKey] = parseScalar(val);
    }
  }
  return { data, content };
}

function parseScalar(s) {
  if (/^".*"$|^'.*'$/.test(s)) return s.slice(1, -1);
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (/^-?\d+$/.test(s)) return Number(s);
  return s;
}

function parseInlineArray(s) {
  const inner = s.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(",").map((x) => parseScalar(x.trim()));
}

function matter(raw) {
  return parseFrontmatter(raw);
}
const REPO_ROOT = path.resolve(__dirname, "..");
const GRAPH_ROOT = path.join(REPO_ROOT, "graph");

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

// ---------------------------------------------------------------------------
// Graph load

async function readNode(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data ?? {};
  if (!fm.id || !fm.type) return null;

  const outgoing = [];
  const edges = fm.edges ?? {};
  for (const edge of EDGE_TYPES) {
    const targets = edges[edge];
    if (!Array.isArray(targets)) continue;
    for (const target of targets) {
      if (typeof target === "string" && target) outgoing.push({ edge, to: target });
    }
  }

  return {
    id: String(fm.id),
    type: fm.type,
    title: fm.title ? String(fm.title) : String(fm.id),
    status: fm.status ? String(fm.status) : undefined,
    body: parsed.content.trim(),
    outgoing,
  };
}

async function loadGraph() {
  const nodes = new Map();
  for (const [type, dir] of Object.entries(TYPE_DIRS)) {
    const full = path.join(GRAPH_ROOT, dir);
    let entries;
    try {
      entries = await fs.readdir(full);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.endsWith(".md")) continue;
      const node = await readNode(path.join(full, entry));
      if (node) nodes.set(node.id, node);
    }
  }
  // Inbound edges: derive from outgoing.
  for (const node of nodes.values()) node.incoming = [];
  for (const node of nodes.values()) {
    for (const e of node.outgoing) {
      const target = nodes.get(e.to);
      if (target) target.incoming.push({ edge: e.edge, from: node.id });
    }
  }
  return nodes;
}

// ---------------------------------------------------------------------------
// Walks (mirror site/lib/bundle.ts)

function edgesByType(node) {
  const out = { addresses: [], supports: [], opposes: [], derivedFrom: [], informs: [], usesMethod: [] };
  for (const e of node.outgoing) out[e.edge].push(e.to);
  return out;
}

function inboundByType(node) {
  const out = { addresses: [], supports: [], opposes: [], derivedFrom: [], informs: [], usesMethod: [] };
  for (const e of node.incoming) out[e.edge].push(e.from);
  return out;
}

function claimNeighborhood(graph, seedCid) {
  const bundle = new Set([seedCid]);
  const visited = new Set();
  let frontier = [seedCid];
  while (frontier.length) {
    const next = [];
    for (const cid of frontier) {
      if (visited.has(cid)) continue;
      visited.add(cid);
      const n = graph.get(cid);
      if (!n || n.type !== "claim") continue;
      const out = edgesByType(n);
      const inc = inboundByType(n);
      for (const m of out.usesMethod) if (graph.has(m)) bundle.add(m);
      for (const q of out.addresses) if (graph.has(q)) bundle.add(q);
      for (const ev of inc.supports) {
        const evNode = graph.get(ev);
        if (!evNode) continue;
        bundle.add(ev);
        for (const s of edgesByType(evNode).derivedFrom) if (graph.has(s)) bundle.add(s);
      }
      for (const ev of inc.opposes) {
        const evNode = graph.get(ev);
        if (!evNode) continue;
        bundle.add(ev);
        for (const s of edgesByType(evNode).derivedFrom) if (graph.has(s)) bundle.add(s);
      }
      for (const opp of out.opposes) {
        if (!graph.has(opp)) continue;
        bundle.add(opp);
        if (!visited.has(opp)) next.push(opp);
      }
    }
    frontier = next;
  }
  return bundle;
}

function questionWalk(graph, seedQid, qOverlap) {
  const inScopeQs = new Set([seedQid]);
  const claimSet = new Set();
  const seedNode = graph.get(seedQid);
  if (seedNode) {
    for (const e of seedNode.incoming) {
      if (e.edge === "addresses" && graph.has(e.from)) claimSet.add(e.from);
    }
  }
  for (;;) {
    const counts = new Map();
    for (const cid of claimSet) {
      const c = graph.get(cid);
      if (!c) continue;
      for (const q of edgesByType(c).addresses) {
        if (!inScopeQs.has(q) && graph.has(q)) counts.set(q, (counts.get(q) ?? 0) + 1);
      }
    }
    const newQs = [];
    for (const [q, n] of counts) if (n >= qOverlap) newQs.push(q);
    if (!newQs.length) break;
    for (const q of newQs) {
      inScopeQs.add(q);
      const qNode = graph.get(q);
      if (!qNode) continue;
      for (const e of qNode.incoming) {
        if (e.edge === "addresses" && graph.has(e.from)) claimSet.add(e.from);
      }
    }
  }
  const bundle = new Set();
  for (const id of inScopeQs) bundle.add(id);
  for (const id of claimSet) bundle.add(id);
  for (const cid of claimSet) for (const id of claimNeighborhood(graph, cid)) bundle.add(id);
  return bundle;
}

function expandSemantic(graph, seedId, qOverlap) {
  const n = graph.get(seedId);
  if (!n) return new Set();
  switch (n.type) {
    case "question":
      return questionWalk(graph, seedId, qOverlap);
    case "claim":
      return claimNeighborhood(graph, seedId);
    case "evidence": {
      const bundle = new Set([seedId]);
      const out = edgesByType(n);
      for (const s of out.derivedFrom) if (graph.has(s)) bundle.add(s);
      for (const cid of [...out.supports, ...out.opposes]) {
        if (graph.has(cid)) for (const id of claimNeighborhood(graph, cid)) bundle.add(id);
      }
      return bundle;
    }
    case "method": {
      const bundle = new Set([seedId]);
      const out = edgesByType(n);
      const inc = inboundByType(n);
      for (const cid of out.informs) if (graph.has(cid)) bundle.add(cid);
      for (const cid of inc.usesMethod) if (graph.has(cid)) bundle.add(cid);
      return bundle;
    }
    case "source": {
      const bundle = new Set([seedId]);
      const inc = inboundByType(n);
      for (const ev of inc.derivedFrom) {
        const evNode = graph.get(ev);
        if (!evNode) continue;
        bundle.add(ev);
        const evOut = edgesByType(evNode);
        for (const cid of [...evOut.supports, ...evOut.opposes]) if (graph.has(cid)) bundle.add(cid);
      }
      return bundle;
    }
  }
  return new Set([seedId]);
}

function expandHops(graph, seedId, maxDepth) {
  const depth = new Map([[seedId, 0]]);
  const queue = [{ id: seedId, d: 0 }];
  while (queue.length) {
    const { id, d } = queue.shift();
    if (d >= maxDepth) continue;
    const node = graph.get(id);
    if (!node) continue;
    const neighbors = new Set();
    for (const e of node.outgoing) neighbors.add(e.to);
    for (const e of node.incoming) neighbors.add(e.from);
    for (const nid of neighbors) {
      if (depth.has(nid) || !graph.has(nid)) continue;
      depth.set(nid, d + 1);
      if (d + 1 < maxDepth) queue.push({ id: nid, d: d + 1 });
    }
  }
  return new Set(depth.keys());
}

// ---------------------------------------------------------------------------
// Output assembly

function closeBundle(graph, anchorId, ids, includeBodies) {
  const nodes = [];
  for (const id of ids) {
    const n = graph.get(id);
    if (!n) continue;
    nodes.push({
      id: n.id,
      type: n.type,
      title: n.title,
      status: n.status,
      isAnchor: id === anchorId,
      ...(includeBodies ? { body: n.body } : {}),
    });
  }
  const edges = [];
  const seen = new Set();
  for (const id of ids) {
    const n = graph.get(id);
    if (!n) continue;
    for (const out of n.outgoing) {
      if (!ids.has(out.to)) continue;
      const key = `${id}|${out.edge}|${out.to}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: id, to: out.to, edge: out.edge });
    }
  }
  return { anchor: anchorId, nodes, edges };
}

// ---------------------------------------------------------------------------
// Proposed-node mode: parse the draft file's edges and walk the union.

async function readProposed(filePath) {
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = matter(raw);
  const fm = parsed.data ?? {};
  const out = [];
  const edges = fm.edges ?? {};
  for (const edge of EDGE_TYPES) {
    const targets = edges[edge];
    if (!Array.isArray(targets)) continue;
    for (const target of targets) {
      if (typeof target === "string" && target) out.push({ edge, to: target });
    }
  }
  return {
    id: fm.id ? String(fm.id) : null,
    type: fm.type ? String(fm.type) : null,
    title: fm.title ? String(fm.title) : null,
    body: parsed.content.trim(),
    outgoing: out,
  };
}

// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { positional: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--strategy") args.strategy = argv[++i];
    else if (a === "--depth") args.depth = Number(argv[++i]);
    else if (a === "--qOverlap") args.qOverlap = Number(argv[++i]);
    else if (a === "--bodies") args.bodies = true;
    else if (a === "--proposed") args.proposed = argv[++i];
    else args.positional.push(a);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const strategy = args.strategy ?? "semantic";
  const depth = args.depth ?? 1;
  const qOverlap = args.qOverlap ?? 2;

  const graph = await loadGraph();

  let anchorId = args.positional[0] ?? null;
  let proposed = null;
  if (args.proposed) {
    proposed = await readProposed(args.proposed);
    anchorId = anchorId ?? proposed.id ?? "PROPOSED";
  }

  if (!anchorId) {
    console.error("usage: node tools/walk.mjs <anchor> [--strategy semantic|hops] [--depth N] [--qOverlap N] [--bodies] [--proposed PATH]");
    process.exit(1);
  }

  // Build the union of neighborhoods.
  const ids = new Set();
  if (proposed) {
    for (const e of proposed.outgoing) {
      const sub =
        strategy === "semantic"
          ? expandSemantic(graph, e.to, qOverlap)
          : expandHops(graph, e.to, depth);
      for (const id of sub) ids.add(id);
    }
    if (!ids.size) {
      console.error("[walk] proposed node has no resolvable edge targets; nothing to walk");
    }
  } else {
    const sub =
      strategy === "semantic"
        ? expandSemantic(graph, anchorId, qOverlap)
        : expandHops(graph, anchorId, depth);
    for (const id of sub) ids.add(id);
  }

  const result = closeBundle(graph, anchorId, ids, !!args.bodies);
  if (proposed) {
    result.proposed = {
      id: proposed.id,
      type: proposed.type,
      title: proposed.title,
      body: proposed.body,
      outgoing: proposed.outgoing,
    };
  }
  result.meta = {
    strategy,
    ...(strategy === "hops" ? { depth } : { qOverlap }),
    nodeCount: result.nodes.length,
    edgeCount: result.edges.length,
  };
  process.stdout.write(JSON.stringify(result, null, 2) + "\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
