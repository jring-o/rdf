#!/usr/bin/env python3
"""Regenerate the node-count table in README.md from the contents of graph/.

The site reads graph/ at build time and computes counts dynamically. The README
can't do that, so this script materializes the same numbers between markers:

    <!-- node-counts:start -->
    ...generated table...
    <!-- node-counts:end -->

Usage:
    python tools/update_readme.py            # check only; exit 1 if stale
    python tools/update_readme.py --write    # rewrite README.md in place
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GRAPH_DIR = ROOT / "graph"
README = ROOT / "README.md"

START = "<!-- node-counts:start -->"
END = "<!-- node-counts:end -->"

TYPES = [
    ("Questions (Q)", "questions"),
    ("Claims (C)", "claims"),
    ("Evidence (E)", "evidence"),
    ("Methods (M)", "methods"),
    ("Sources (S)", "sources"),
]


def count(subdir: str) -> int:
    return sum(1 for p in (GRAPH_DIR / subdir).glob("*.md") if p.name != ".gitkeep")


def render() -> str:
    rows = [(label, count(d)) for label, d in TYPES]
    total = sum(n for _, n in rows)
    lines = ["| Type | Count |", "|---|---|"]
    lines += [f"| {label} | {n} |" for label, n in rows]
    lines.append(f"| **Total nodes** | **{total}** |")
    return "\n".join(lines)


def splice(text: str, generated: str) -> str:
    if START not in text or END not in text:
        sys.exit(f"error: {README} is missing {START} / {END} markers")
    pre, _, rest = text.partition(START)
    _, _, post = rest.partition(END)
    return f"{pre}{START}\n{generated}\n{END}{post}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="rewrite README.md in place")
    args = ap.parse_args()

    current = README.read_text(encoding="utf-8")
    updated = splice(current, render())

    if current == updated:
        print("README.md node counts are in sync.")
        return 0

    if args.write:
        README.write_text(updated, encoding="utf-8")
        print("README.md updated.")
        return 0

    print("README.md node counts are STALE. Run: python tools/update_readme.py --write")
    return 1


if __name__ == "__main__":
    sys.exit(main())
