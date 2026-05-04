#!/usr/bin/env python3
"""Bundle discourse graph nodes into a single Markdown file ready for narrative
composition by an LLM.

The bundler is model-agnostic: it does not call any provider API. It writes a
self-contained file (prompt + nodes) that can be pasted into any LLM. The
narrative the LLM produces is the deliverable; the bundle is the intermediate
artifact.

The walk is driven by argumentative purpose, not by raw graph topology:

  Question seed Q-X — "what answers Q-X?"
      Pulls Claims that address Q-X and their Evidence/Method/Sources/
      counter-Claims. Iteratively pulls in *related Questions*: a Question
      Q-Y is considered related to the seed when at least N Claims already
      in the bundle address Q-Y. Their addressing Claims pull in too, which
      may bump other candidate Questions over the threshold. Converges when
      no candidate meets the threshold. N is set by --q-overlap (default 2).

  Claim seed C-Y — the user is asserting "C-Y is true."
      Pulls the nodes that prove or disprove it: supporting Evidence,
      opposing Evidence, the Method C-Y uses, the Question(s) it addresses
      (as boundary, not used to expand to sibling Claims), and counter-
      Claims (Claims that `opposes` C-Y). Each counter-Claim is recursively
      expanded along the same lattice — its Evidence, its counter-counter-
      Claims — bounded by the convergence of the opposes-graph.

  Evidence / Method / Source seeds resolve to a Claim or Question:
      E seed → its supports/opposes Claim is treated as a Claim seed.
      M seed → Method + Claims using it (boundary, no further).
      S seed → Source + Evidence using it + their Claims (boundary).

  --section N convenience: every node tagged §N becomes a seed of its own
      type. Equivalent to listing all those node IDs.

Usage:
    python tools/regen.py Q-0001                       # Q seed
    python tools/regen.py C-0017                       # C seed
    python tools/regen.py C-0017 C-0019                # multiple C seeds
    python tools/regen.py Q-0001 --q-overlap 1         # greedy related-Q
    python tools/regen.py Q-0001 --q-overlap 3         # tighter
    python tools/regen.py --section 3                  # all §3 nodes
    python tools/regen.py C-0017 --no-expand           # just the seed

Output: tools/regen-outputs/<auto-name>.md, override with --out PATH.
"""
from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
GRAPH_DIR = ROOT / "graph"
OUT_DIR = ROOT / "tools" / "regen-outputs"

TYPE_ORDER = {"question": 0, "method": 1, "claim": 2, "evidence": 3, "source": 4}

PROMPT_TEMPLATE = """\
You are composing narrative prose from a discourse graph. The nodes below
are the bundled context for the following seeds:

{seed_list}

Framing rules:
- A Question seed means: compose a narrative answering it. The addressing
  Claims are the candidate answers. Use their Evidence to substantiate.
  Surface counter-Claims as contrast where present.
- A Claim seed means: compose a narrative establishing it as the position
  being argued. Support it with the supporting Evidence; surface opposing
  Evidence and counter-Claims as the counter-arguments to address.
- An Evidence, Method, or Source seed means: compose around it as the
  focal artifact, drawing in the Claim it supports and that Claim's
  context.
- Multiple seeds: weave them into a unified narrative that respects each
  seed's framing.

Citations: cite Sources inline by graph ID — e.g. "(S-0042)" — NOT by
numeric reference like "[42]" and NOT by author-year. Do NOT generate a
References / Bibliography section. The Source nodes ARE the bibliography;
in the rendered graph view a reader follows the inline ID to the Source.

Voice: dispassionate, architectural, citation-dense.

Produce the result as Markdown with whatever heading depth fits the seeds.
Do not invent claims or evidence not present in the bundle. If a transition
would require something not in the bundle, leave a `[GAP: <what's missing>]`
marker.
"""


# ---------------------------------------------------------------------------
# Graph loading

def parse_node(path: Path) -> dict | None:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None
    try:
        fm = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError:
        return None
    return {"path": path, "fm": fm, "body": parts[2].strip()}


def load_all() -> dict[str, dict]:
    nodes: dict[str, dict] = {}
    for path in GRAPH_DIR.rglob("*.md"):
        node = parse_node(path)
        if node and "id" in node["fm"]:
            nodes[node["fm"]["id"]] = node
    return nodes


def matches_section(node: dict, section: str) -> bool:
    src = str(node["fm"].get("source_section") or "")
    return re.search(rf"§{re.escape(section)}\b", src) is not None


def edges_of(node: dict) -> dict[str, list[str]]:
    raw = node["fm"].get("edges") or {}
    return {k: list(v or []) for k, v in raw.items()}


def build_inbound_index(all_nodes: dict[str, dict]) -> dict[tuple[str, str], list[str]]:
    """Index inbound edges: (target_id, edge_type) → [source_ids]."""
    inbound: dict[tuple[str, str], list[str]] = defaultdict(list)
    for nid, n in all_nodes.items():
        for etype, targets in edges_of(n).items():
            for tid in targets:
                inbound[(tid, etype)].append(nid)
    return inbound


# ---------------------------------------------------------------------------
# Expansion: Claim neighborhood
#
# Walks the argumentation lattice from a Claim outward: supporting Evidence
# (incoming `supports`), opposing Evidence (incoming `opposes`), the Method
# the Claim uses, the Question(s) it addresses (boundary), and counter-Claims
# (outgoing `opposes`). Counter-Claims are themselves expanded the same way,
# so the walk follows opposes-chains until they converge.
#
# Sibling Claims (other Claims addressing the same Question) are NOT pulled
# in — that's a Question-seed walk's job.

def claim_neighborhood(seed_cid: str, all_nodes: dict, inbound: dict) -> set[str]:
    bundle: set[str] = {seed_cid}
    visited: set[str] = set()
    frontier = [seed_cid]
    while frontier:
        nxt: list[str] = []
        for cid in frontier:
            if cid in visited:
                continue
            visited.add(cid)
            n = all_nodes.get(cid)
            if not n or n["fm"].get("type") != "claim":
                continue
            e = edges_of(n)
            # Method (boundary)
            for m in e.get("usesMethod", []):
                if m in all_nodes:
                    bundle.add(m)
            # Addressed Question (boundary — informational; does NOT pull
            # sibling Claims under that Question)
            for q in e.get("addresses", []):
                if q in all_nodes:
                    bundle.add(q)
            # Supporting Evidence (incoming) + their Sources
            for ev in inbound.get((cid, "supports"), []):
                if ev in all_nodes:
                    bundle.add(ev)
                    for s in edges_of(all_nodes[ev]).get("derivedFrom", []):
                        if s in all_nodes:
                            bundle.add(s)
            # Opposing Evidence (incoming) + their Sources
            for ev in inbound.get((cid, "opposes"), []):
                if ev in all_nodes:
                    bundle.add(ev)
                    for s in edges_of(all_nodes[ev]).get("derivedFrom", []):
                        if s in all_nodes:
                            bundle.add(s)
            # Counter-Claims (outgoing opposes) — recursively expanded
            for opp in e.get("opposes", []):
                if opp in all_nodes:
                    bundle.add(opp)
                    if opp not in visited:
                        nxt.append(opp)
        frontier = nxt
    return bundle


# ---------------------------------------------------------------------------
# Expansion: Question walk
#
# Starts from a Question seed. Pulls all Claims that address it. Then
# iteratively pulls in *related Questions* — Questions reached via Claims
# already in the bundle that meet the --q-overlap threshold (minimum number
# of in-bundle Claims that must address the candidate Question for it to be
# included). Each newly added Q's addressing Claims feed back into the
# threshold check. Converges when no candidate meets the threshold.
#
# After the Q-set converges, every Claim in the bundle gets the full
# claim_neighborhood treatment.

def question_walk(seed_qid: str, all_nodes: dict, inbound: dict,
                  q_overlap: int) -> set[str]:
    in_scope_qs: set[str] = {seed_qid}
    claim_set: set[str] = set()

    # Seed: all Claims that address Q
    for cid in inbound.get((seed_qid, "addresses"), []):
        if cid in all_nodes:
            claim_set.add(cid)

    # Iteratively pull related Qs
    while True:
        # Count, for each candidate Q (not already in scope), how many
        # in-bundle Claims address it.
        candidate_counts: dict[str, int] = defaultdict(int)
        for cid in claim_set:
            c = all_nodes.get(cid)
            if not c:
                continue
            for q in edges_of(c).get("addresses", []):
                if q not in in_scope_qs and q in all_nodes:
                    candidate_counts[q] += 1
        new_qs = {q for q, n in candidate_counts.items() if n >= q_overlap}
        if not new_qs:
            break
        in_scope_qs |= new_qs
        for q in new_qs:
            for cid in inbound.get((q, "addresses"), []):
                if cid in all_nodes:
                    claim_set.add(cid)

    bundle: set[str] = set(in_scope_qs) | set(claim_set)
    for cid in claim_set:
        bundle |= claim_neighborhood(cid, all_nodes, inbound)
    return bundle


# ---------------------------------------------------------------------------
# Expansion: dispatch by seed type

def expand_seed(seed_id: str, all_nodes: dict, inbound: dict,
                q_overlap: int) -> set[str]:
    n = all_nodes.get(seed_id)
    if not n:
        return set()
    t = n["fm"].get("type")
    if t == "question":
        return question_walk(seed_id, all_nodes, inbound, q_overlap)
    if t == "claim":
        return claim_neighborhood(seed_id, all_nodes, inbound)
    if t == "evidence":
        bundle: set[str] = {seed_id}
        e = edges_of(n)
        for s in e.get("derivedFrom", []):
            if s in all_nodes:
                bundle.add(s)
        for cid in e.get("supports", []) + e.get("opposes", []):
            if cid in all_nodes:
                bundle |= claim_neighborhood(cid, all_nodes, inbound)
        return bundle
    if t == "method":
        bundle = {seed_id}
        e = edges_of(n)
        for cid in e.get("informs", []):
            if cid in all_nodes:
                bundle.add(cid)
        for cid in inbound.get((seed_id, "usesMethod"), []):
            if cid in all_nodes:
                bundle.add(cid)
        return bundle
    if t == "source":
        bundle = {seed_id}
        for ev in inbound.get((seed_id, "derivedFrom"), []):
            if ev in all_nodes:
                bundle.add(ev)
                for cid in edges_of(all_nodes[ev]).get("supports", []) + \
                          edges_of(all_nodes[ev]).get("opposes", []):
                    if cid in all_nodes:
                        bundle.add(cid)
        return bundle
    return {seed_id}


def expand_bundle(seed_ids: set[str], all_nodes: dict, q_overlap: int,
                  no_expand: bool) -> set[str]:
    if no_expand:
        return set(seed_ids)
    inbound = build_inbound_index(all_nodes)
    bundle: set[str] = set(seed_ids)
    for sid in seed_ids:
        bundle |= expand_seed(sid, all_nodes, inbound, q_overlap)
    return bundle


# ---------------------------------------------------------------------------
# Rendering

def render_node(n: dict) -> str:
    fm = n["fm"]
    nid = fm["id"]
    ntype = fm.get("type", "?")
    title = fm.get("title", "")
    src = fm.get("source_section", "")
    e = edges_of(n)
    edge_lines = []
    for k in ("addresses", "supports", "opposes", "derivedFrom", "informs", "usesMethod"):
        v = e.get(k) or []
        if v:
            edge_lines.append(f"  {k}: [{', '.join(v)}]")
    edges_block = "\n".join(edge_lines) if edge_lines else "  (none)"
    return (
        f"### {nid} — {ntype} — {title}\n"
        f"source_section: {src or '(none)'}\n"
        f"edges:\n{edges_block}\n\n"
        f"{n['body']}\n"
    )


def sort_key(nid: str, all_nodes: dict) -> tuple:
    n = all_nodes[nid]
    return (TYPE_ORDER.get(n["fm"].get("type", ""), 99), nid)


def auto_filename(section: str | None, node_seeds: list[str]) -> str:
    if section and not node_seeds:
        return f"section-{section}-bundle.md"
    seeds = sorted(node_seeds)
    prefix = f"section-{section}+" if section else "bundle-"
    if not seeds:
        return f"section-{section}-bundle.md"
    if len(seeds) <= 3:
        return f"{prefix}{'_'.join(seeds)}.md"
    return f"{prefix}{seeds[0]}+{len(seeds) - 1}more.md"


def seed_descriptor(sid: str, all_nodes: dict) -> str:
    n = all_nodes.get(sid)
    if not n:
        return f"- {sid} — (unknown)"
    t = n["fm"].get("type", "?")
    title = n["fm"].get("title", "")
    return f"- {sid} ({t}): {title}"


def build_bundle_markdown(seed_ids: set[str], all_nodes: dict,
                          bundle_ids: set[str], label: str,
                          q_overlap: int, no_expand: bool) -> str:
    seed_sorted = sorted(seed_ids, key=lambda i: sort_key(i, all_nodes))
    expanded_sorted = sorted(bundle_ids - seed_ids, key=lambda i: sort_key(i, all_nodes))
    all_sorted = sorted(bundle_ids, key=lambda i: sort_key(i, all_nodes))

    seed_list_block = "\n".join(seed_descriptor(s, all_nodes) for s in seed_sorted)

    if no_expand:
        traversal_note = "no expansion (seeds only)"
    else:
        traversal_note = f"semantic walk; --q-overlap = {q_overlap}"

    parts: list[str] = []
    parts.append(f"# Bundle: {label}\n\n")
    parts.append(f"_Generated {date.today().isoformat()} from `graph/` by `tools/regen.py`._\n\n")
    parts.append(
        f"**Composition:** {len(bundle_ids)} nodes — "
        f"{len(seed_ids)} seed + {len(bundle_ids) - len(seed_ids)} expanded "
        f"({traversal_note}).\n\n"
    )
    parts.append("## Prompt\n\n")
    parts.append(PROMPT_TEMPLATE.format(seed_list=seed_list_block))
    parts.append("\n## Seed nodes\n\n")
    parts.append(", ".join(seed_sorted) + "\n\n")
    parts.append("## Expanded nodes\n\n")
    parts.append((", ".join(expanded_sorted) if expanded_sorted else "(none)") + "\n\n")
    parts.append("---\n\n## Nodes\n")
    for nid in all_sorted:
        parts.append("\n" + render_node(all_nodes[nid]))
        parts.append("\n---\n")
    return "".join(parts)


# ---------------------------------------------------------------------------
# CLI

def resolve_seeds(args, all_nodes: dict) -> tuple[set[str], str]:
    seed_ids: set[str] = set()
    labels: list[str] = []

    if args.section:
        section_ids = {nid for nid, n in all_nodes.items() if matches_section(n, args.section)}
        if not section_ids:
            raise SystemExit(f"No nodes found with source_section containing §{args.section}")
        seed_ids |= section_ids
        labels.append(f"§{args.section}")

    if args.nodes:
        missing = [n for n in args.nodes if n not in all_nodes]
        if missing:
            raise SystemExit(f"Unknown node IDs: {', '.join(missing)}")
        seed_ids |= set(args.nodes)
        labels.append(", ".join(sorted(args.nodes)))

    if not seed_ids:
        raise SystemExit("Provide one or more seed node IDs, and/or --section N.")

    return seed_ids, " + ".join(labels)


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Bundle discourse graph nodes for narrative composition.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    ap.add_argument("nodes", nargs="*", help="Seed node IDs (e.g. C-0017 Q-0001)")
    ap.add_argument("--section", help="Seed by source_section (e.g. --section 3)")
    ap.add_argument("--q-overlap", type=int, default=2, dest="q_overlap",
                    help="Minimum in-bundle Claims required to pull a related Question "
                         "into a Q-seed walk (default: 2; set to 1 for greedy)")
    ap.add_argument("--no-expand", action="store_true",
                    help="Skip all expansion — bundle just the seed nodes")
    ap.add_argument("--out", type=Path,
                    help="Output path (default: tools/regen-outputs/<auto-name>.md)")
    args = ap.parse_args()

    all_nodes = load_all()
    seed_ids, label = resolve_seeds(args, all_nodes)
    bundle_ids = expand_bundle(seed_ids, all_nodes, args.q_overlap, args.no_expand)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = args.out or (OUT_DIR / auto_filename(args.section, args.nodes or []))
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        build_bundle_markdown(seed_ids, all_nodes, bundle_ids, label,
                              args.q_overlap, args.no_expand),
        encoding="utf-8",
    )

    try:
        rel = out_path.relative_to(ROOT)
    except ValueError:
        rel = out_path
    print(f"Wrote {rel}  ({len(bundle_ids)} nodes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
