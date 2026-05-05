#!/usr/bin/env node
// tools/lint-graph.mjs — schema linter for the discourse graph.
//
// Walks every graph/<type>/*.md node, validates it against SCHEMA.md, and
// reports errors and warnings. Exits 0 on a clean graph, 1 if any errors
// are found. Warnings never block.
//
// Validation rules (see SCHEMA.md):
//   - Required frontmatter: id, type, title.
//   - id matches /^(Q|C|E|M|S)-\d{4}[a-z]?$/.
//   - id prefix matches the directory the file lives in.
//   - title is a non-empty string.
//   - body word count: 50-250 for Q/C/E, 50-400 for M, 30-300 for S (warning).
//   - every edge target ID resolves to an existing node file (error).
//   - type-specific required edges (error):
//       * Claim:    >= 1 addresses.
//       * Evidence: (>= 1 supports OR >= 1 opposes) AND >= 1 derivedFrom.
//       * Method/Question/Source: none required.
//   - reciprocal usesMethod <-> informs integrity (error).
//
// Usage:
//   node tools/lint-graph.mjs
//
// Output: <file>: ERROR|WARN: <message> lines, then a summary block.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const GRAPH_ROOT = path.join(REPO_ROOT, "graph");

// ---------------------------------------------------------------------------
// Schema constants

const TYPE_DIRS = {
  question: "questions",
  claim: "claims",
  evidence: "evidence",
  method: "methods",
  source: "sources",
};

// Reverse map: directory -> type.
const DIR_TYPES = Object.fromEntries(
  Object.entries(TYPE_DIRS).map(([t, d]) => [d, t])
);

// Reverse map: directory -> expected ID prefix.
const DIR_PREFIX = {
  questions: "Q",
  claims: "C",
  evidence: "E",
  methods: "M",
  sources: "S",
};

const PREFIX_TYPE = { Q: "question", C: "claim", E: "evidence", M: "method", S: "source" };

const EDGE_TYPES = ["addresses", "supports", "opposes", "derivedFrom", "informs", "usesMethod"];

const ID_PATTERN = /^(Q|C|E|M|S)-\d{4}[a-z]?$/;

// Word-count bands. Q/C/E target 50-250 per SCHEMA.md. Methods get a higher
// cap (400) because multi-part instruments — taxonomies with N tiers, formulas
// with N terms — inherently need space for N definitions. Sources are 30-300
// (citation backstops with optional "Key findings used" notes).
const WORD_BANDS = {
  question: [50, 250],
  claim: [50, 250],
  evidence: [50, 250],
  method: [50, 400],
  source: [30, 300],
};

// ---------------------------------------------------------------------------
// Frontmatter parser (copied/adapted from tools/walk.mjs).

function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: null, content: raw };
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

// ---------------------------------------------------------------------------
// Body word count: strip the markdown body to a rough word total. Heading
// markers, link/image syntax, code fences, and inline code are stripped so
// "words" approximates what a reader sees.

function countWords(body) {
  let s = body;
  // Drop fenced code blocks entirely (they aren't prose).
  s = s.replace(/```[\s\S]*?```/g, " ");
  // Drop inline code.
  s = s.replace(/`[^`]*`/g, " ");
  // Strip image syntax ![alt](url).
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  // Strip link syntax [text](url) -> text.
  s = s.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  // Strip leading heading markers and list/quote markers.
  s = s.replace(/^[ \t]*([#>*\-+]|\d+\.)[ \t]+/gm, "");
  // Strip emphasis markers (*, _, **, __).
  s = s.replace(/[*_]+/g, " ");
  // Collapse whitespace.
  s = s.replace(/\s+/g, " ").trim();
  if (!s) return 0;
  return s.split(" ").filter(Boolean).length;
}

// ---------------------------------------------------------------------------
// Load all nodes.

async function loadGraph() {
  const nodes = new Map(); // id -> node record
  const issues = []; // { file, level, msg } for parse-time problems

  for (const [type, dir] of Object.entries(TYPE_DIRS)) {
    const full = path.join(GRAPH_ROOT, dir);
    let entries;
    try {
      entries = await fs.readdir(full);
    } catch {
      issues.push({ file: path.relative(REPO_ROOT, full), level: "ERROR", msg: `directory missing` });
      continue;
    }
    for (const entry of entries) {
      if (!entry.endsWith(".md")) continue;
      const filePath = path.join(full, entry);
      const rel = path.relative(REPO_ROOT, filePath).replace(/\\/g, "/");
      const raw = await fs.readFile(filePath, "utf-8");
      const parsed = parseFrontmatter(raw);
      if (parsed.data === null) {
        issues.push({ file: rel, level: "ERROR", msg: `no YAML frontmatter` });
        continue;
      }
      const fm = parsed.data;
      const node = {
        file: rel,
        dir,
        dirType: type,
        filename: entry,
        fm,
        body: parsed.content,
        edges: normalizeEdges(fm.edges),
      };
      if (typeof fm.id === "string" && fm.id) {
        if (nodes.has(fm.id)) {
          issues.push({
            file: rel,
            level: "ERROR",
            msg: `duplicate id ${fm.id}; also defined in ${nodes.get(fm.id).file}`,
          });
        } else {
          nodes.set(fm.id, node);
        }
      }
      // Even if the id is absent or non-string, keep it accessible by file
      // for per-file errors. We track those via the issues list separately.
      node._loaded = true;
    }
  }
  return { nodes, issues };
}

function normalizeEdges(edges) {
  const out = {};
  for (const k of EDGE_TYPES) out[k] = [];
  if (!edges || typeof edges !== "object") return out;
  for (const k of EDGE_TYPES) {
    const v = edges[k];
    if (Array.isArray(v)) {
      for (const t of v) if (typeof t === "string" && t) out[k].push(t);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Validation.

function validate(nodes) {
  const errors = [];
  const warnings = [];

  const idSet = new Set(nodes.keys());

  for (const node of nodes.values()) {
    const { file, fm, dir, dirType, filename } = node;

    // --- required fields ---
    if (!fm.id || typeof fm.id !== "string") {
      errors.push({ file, msg: `missing or non-string frontmatter field: id` });
    }
    if (!fm.type || typeof fm.type !== "string") {
      errors.push({ file, msg: `missing or non-string frontmatter field: type` });
    }
    if (fm.title === undefined || fm.title === null || String(fm.title).trim() === "") {
      errors.push({ file, msg: `missing or empty frontmatter field: title` });
    } else if (typeof fm.title !== "string") {
      errors.push({ file, msg: `title must be a string` });
    }

    // --- id format ---
    if (typeof fm.id === "string") {
      if (!ID_PATTERN.test(fm.id)) {
        errors.push({ file, msg: `id "${fm.id}" does not match /^(Q|C|E|M|S)-\\d{4}[a-z]?$/` });
      } else {
        const prefix = fm.id[0];
        const expectedPrefix = DIR_PREFIX[dir];
        if (prefix !== expectedPrefix) {
          errors.push({
            file,
            msg: `id prefix "${prefix}" does not match directory ${dir}/ (expected "${expectedPrefix}-")`,
          });
        }
        // Filename should match id.md.
        const expectedFile = `${fm.id}.md`;
        if (filename !== expectedFile) {
          errors.push({
            file,
            msg: `filename "${filename}" does not match id "${fm.id}" (expected ${expectedFile})`,
          });
        }
        // Cross-check fm.type vs prefix.
        if (typeof fm.type === "string") {
          const expectedType = PREFIX_TYPE[prefix];
          if (expectedType && fm.type !== expectedType) {
            errors.push({
              file,
              msg: `type "${fm.type}" does not match id prefix "${prefix}-" (expected type "${expectedType}")`,
            });
          }
        }
      }
    }

    // --- type vs directory ---
    if (typeof fm.type === "string" && fm.type !== dirType) {
      errors.push({
        file,
        msg: `type "${fm.type}" does not match directory ${dir}/ (expected "${dirType}")`,
      });
    }

    // --- body word count ---
    const band = WORD_BANDS[dirType] ?? WORD_BANDS[fm.type];
    if (band) {
      const wc = countWords(node.body);
      const [lo, hi] = band;
      if (wc < lo || wc > hi) {
        warnings.push({
          file,
          msg: `body word count ${wc} outside band ${lo}-${hi} for ${dirType}`,
        });
      }
    }

    // --- edges: parseable + targets resolve ---
    for (const edge of EDGE_TYPES) {
      const targets = node.edges[edge];
      for (const target of targets) {
        if (!ID_PATTERN.test(target)) {
          errors.push({ file, msg: `edge ${edge} target "${target}" is not a valid node id` });
          continue;
        }
        if (!idSet.has(target)) {
          errors.push({ file, msg: `edge ${edge} target "${target}" does not resolve to an existing node` });
        }
      }
    }

    // --- type-specific required edges ---
    if (dirType === "claim") {
      if (node.edges.addresses.length < 1) {
        errors.push({ file, msg: `claim must have >= 1 "addresses" edge` });
      }
    }
    if (dirType === "evidence") {
      const hasStance = node.edges.supports.length >= 1 || node.edges.opposes.length >= 1;
      if (!hasStance) {
        errors.push({ file, msg: `evidence must have >= 1 "supports" OR >= 1 "opposes" edge` });
      }
      if (node.edges.derivedFrom.length < 1) {
        errors.push({ file, msg: `evidence must have >= 1 "derivedFrom" edge` });
      }
    }
  }

  // --- reciprocal usesMethod <-> informs ---
  // Build edge sets for fast membership.
  // For every (claim X, method Y) where X.usesMethod includes Y, Y.informs must include X.
  // For every (method M, claim C) where M.informs includes C, C.usesMethod must include M.
  for (const node of nodes.values()) {
    const id = node.fm.id;
    if (typeof id !== "string") continue;
    if (node.dirType === "claim") {
      for (const m of node.edges.usesMethod) {
        const methodNode = nodes.get(m);
        if (!methodNode) continue; // missing-target error already reported
        if (methodNode.dirType !== "method") {
          errors.push({
            file: node.file,
            msg: `usesMethod target "${m}" is not a method node (type "${methodNode.dirType}")`,
          });
          continue;
        }
        if (!methodNode.edges.informs.includes(id)) {
          errors.push({
            file: node.file,
            msg: `reciprocal mismatch: ${id}.usesMethod includes ${m}, but ${m}.informs does not include ${id}`,
          });
        }
      }
    }
    if (node.dirType === "method") {
      for (const c of node.edges.informs) {
        const claimNode = nodes.get(c);
        if (!claimNode) continue;
        if (claimNode.dirType !== "claim") {
          errors.push({
            file: node.file,
            msg: `informs target "${c}" is not a claim node (type "${claimNode.dirType}")`,
          });
          continue;
        }
        if (!claimNode.edges.usesMethod.includes(id)) {
          errors.push({
            file: node.file,
            msg: `reciprocal mismatch: ${id}.informs includes ${c}, but ${c}.usesMethod does not include ${id}`,
          });
        }
      }
    }
  }

  return { errors, warnings };
}

// ---------------------------------------------------------------------------
// Counts (for the summary).

function countByType(nodes) {
  const counts = { question: 0, claim: 0, evidence: 0, method: 0, source: 0 };
  for (const node of nodes.values()) {
    if (counts[node.dirType] !== undefined) counts[node.dirType] += 1;
  }
  return counts;
}

// ---------------------------------------------------------------------------
// Main.

async function main() {
  const { nodes, issues } = await loadGraph();
  const { errors, warnings } = validate(nodes);

  // Merge in load-time issues.
  for (const i of issues) {
    if (i.level === "ERROR") errors.push({ file: i.file, msg: i.msg });
    else warnings.push({ file: i.file, msg: i.msg });
  }

  // Sort for determinism.
  const byFile = (a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.msg < b.msg ? -1 : 1);
  errors.sort(byFile);
  warnings.sort(byFile);

  for (const e of errors) console.log(`${e.file}: ERROR: ${e.msg}`);
  for (const w of warnings) console.log(`${w.file}: WARN: ${w.msg}`);

  const counts = countByType(nodes);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  console.log("");
  console.log("=== lint-graph summary ===");
  console.log(
    `nodes: ${total} (questions=${counts.question}, claims=${counts.claim}, evidence=${counts.evidence}, methods=${counts.method}, sources=${counts.source})`
  );
  console.log(`errors:   ${errors.length}`);
  console.log(`warnings: ${warnings.length}`);

  // Optionally write a summary to $GITHUB_STEP_SUMMARY for CI.
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (summaryPath) {
    const lines = [];
    lines.push(`# Discourse graph lint`);
    lines.push("");
    lines.push(`**Nodes:** ${total}`);
    lines.push("");
    lines.push(`| Type | Count |`);
    lines.push(`|---|---|`);
    lines.push(`| questions | ${counts.question} |`);
    lines.push(`| claims | ${counts.claim} |`);
    lines.push(`| evidence | ${counts.evidence} |`);
    lines.push(`| methods | ${counts.method} |`);
    lines.push(`| sources | ${counts.source} |`);
    lines.push("");
    lines.push(`**Errors:** ${errors.length}`);
    lines.push(`**Warnings:** ${warnings.length}`);
    if (errors.length) {
      lines.push("");
      lines.push(`## Errors`);
      lines.push("");
      for (const e of errors.slice(0, 200)) lines.push(`- \`${e.file}\`: ${e.msg}`);
      if (errors.length > 200) lines.push(`- ...and ${errors.length - 200} more`);
    }
    if (warnings.length) {
      lines.push("");
      lines.push(`## Warnings`);
      lines.push("");
      for (const w of warnings.slice(0, 200)) lines.push(`- \`${w.file}\`: ${w.msg}`);
      if (warnings.length > 200) lines.push(`- ...and ${warnings.length - 200} more`);
    }
    try {
      await fs.appendFile(summaryPath, lines.join("\n") + "\n");
    } catch (e) {
      console.error(`(could not write step summary: ${e.message})`);
    }
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
