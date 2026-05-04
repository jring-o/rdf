import { promises as fs } from "node:fs";
import path from "node:path";

const PAPER_PATH = path.resolve(process.cwd(), "..", "paper", "whitepaper-v3.md");
// Narrative bundles live alongside the regen.py tool that composes them.
const NARRATIVE_DIR = path.resolve(process.cwd(), "..", "tools", "regen-outputs");

export interface PaperSection {
  /** "§1.2" style label */
  label: string;
  /** Slugified anchor for href fragments */
  slug: string;
  title: string;
  /** Markdown content of just this section (heading included) */
  content: string;
  /** Heading depth (h2 vs h3 etc.) */
  level: number;
}

export interface Paper {
  raw: string;
  sections: PaperSection[];
}

export interface NarrativeBundle {
  anchorId: string;
  filePath: string;
  raw: string;
}

let paperCache: Paper | null = null;
let narrativeCache: NarrativeBundle[] | null = null;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Split the whitepaper into sections by top-level headings. Recognises both
 * "## §1.2 Title" / "## §1 — Title" and bare "## Title" forms.
 */
export async function loadPaper(): Promise<Paper> {
  if (paperCache) return paperCache;
  let raw: string;
  try {
    raw = await fs.readFile(PAPER_PATH, "utf-8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      paperCache = { raw: "", sections: [] };
      return paperCache;
    }
    throw err;
  }

  const lines = raw.split(/\r?\n/);
  const sections: PaperSection[] = [];
  let current: { label: string; slug: string; title: string; level: number; lines: string[] } | null = null;

  const headingRe = /^(#{2,4})\s+(.*)$/;
  const sectionLabelRe = /^(§[\d.]+(?:\s*[—–-]\s*[\d.]+)?)\s*[—–-]?\s*(.*)$/;

  for (const line of lines) {
    const m = headingRe.exec(line);
    if (m) {
      if (current) {
        sections.push({
          label: current.label,
          slug: current.slug,
          title: current.title,
          level: current.level,
          content: current.lines.join("\n").trim(),
        });
      }
      const level = m[1].length;
      const body = m[2].trim();
      const sm = sectionLabelRe.exec(body);
      let label: string;
      let title: string;
      if (sm) {
        label = sm[1].trim();
        title = sm[2].trim() || body;
      } else {
        label = body;
        title = body;
      }
      const slug = slugify(label || title);
      current = { label, slug, title, level, lines: [line] };
    } else {
      if (current) current.lines.push(line);
    }
  }
  if (current) {
    sections.push({
      label: current.label,
      slug: current.slug,
      title: current.title,
      level: current.level,
      content: current.lines.join("\n").trim(),
    });
  }

  paperCache = { raw, sections };
  return paperCache;
}

/**
 * List all regen output bundles. Each file is a fully-composed narrative
 * anchored on a seed node ID encoded in its filename (`bundle-Q-0003.md`).
 */
export async function listNarrativeBundles(): Promise<NarrativeBundle[]> {
  if (narrativeCache) return narrativeCache;
  let entries: string[];
  try {
    entries = await fs.readdir(NARRATIVE_DIR);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      narrativeCache = [];
      return narrativeCache;
    }
    throw err;
  }
  const out: NarrativeBundle[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const m = /^bundle-([A-Z]-\d+[a-z]?)\.md$/.exec(entry);
    if (!m) continue;
    const filePath = path.join(NARRATIVE_DIR, entry);
    const raw = await fs.readFile(filePath, "utf-8");
    out.push({ anchorId: m[1], filePath, raw });
  }
  out.sort((a, b) => a.anchorId.localeCompare(b.anchorId));
  narrativeCache = out;
  return narrativeCache;
}
