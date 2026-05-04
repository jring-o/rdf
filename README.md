# Resilient Data Futures — Discourse Graph

A living, content-addressed, contributable form of the SciOS *Resilient Data Futures* whitepaper.

The paper argues that research data loss is an architectural problem: single-copy concentration produces inevitable loss; protocol-level distribution produces structural redundancy. The paper is published here as a **discourse graph** — every claim, evidence item, question, method, and source is its own addressable file. The argument is the form.

## What's here

```
paper/                   The canonical whitepaper (whitepaper-v3.md)
graph/
  questions/             Q-NNNN.md  — questions the work addresses
  claims/                C-NNNN.md  — assertions
  evidence/              E-NNNN.md  — empirical observations
  methods/               M-NNNN.md  — analytical instruments (taxonomies, formulas, frameworks)
  sources/               S-NNNN.md  — references and primary sources
SCHEMA.md                Node and edge specification
CONTRIBUTING.md          How to propose changes, counterclaims, and counter-evidence
site/                    (Future) Next.js renderer of the graph
```

## How to engage with this

- **Discuss a node:** open an Issue with label `node:<ID>` (e.g., `node:C-0017`).
- **Propose an edit:** PR against the node file.
- **Counterclaim:** add a new Claim node with an `opposes:` edge to the original.
- **Counter-evidence:** add a new Evidence node with `opposes:` to the relevant Claim, `derivedFrom:` a Source.
- **New question:** add a new Question node and any Claims that `addresses:` it.

All PRs are reviewed and merged by the working group lead. Branch protection on `main` requires PR + CODEOWNERS approval.

## License

- Content (paper, graph nodes, prose): **CC BY 4.0** — see `LICENSE`
- Code (renderer, tooling): **MIT** — see `LICENSE-CODE`

Attribution: SciOS Resilient Data Futures Working Group, plus per-node contributors via Git history.

## Provenance

The whitepaper-v3.md draft (May 2026) is the seed. Every node carries `source_section:` pointing back to the section of the paper it was decomposed from. The graph is canonical going forward; the paper becomes one rendered view over the graph.

## Status

First complete pass of the paper is in (2026-05-03). Graph contents:

<!-- node-counts:start -->
| Type | Count |
|---|---|
| Questions (Q) | 43 |
| Claims (C) | 53 |
| Evidence (E) | 112 |
| Methods (M) | 6 |
| Sources (S) | 134 |
| **Total nodes** | **348** |
<!-- node-counts:end -->

Every Claim addresses at least one Question. Every Evidence node supports at least one Claim and derives from at least one Source. The Methods (Four-Tier Taxonomy, Three Architectural Principles, Four-Term Liability Formula, 1:10:100 Cost Heuristic, Failure-Mode Taxonomy, AI-Data Property ↔ Tier-3 Architecture Mapping) are referenced by the Claims that invoke them. All edge references in the graph resolve to existing nodes.

The first pass mirrors the paper's argument structure section by section. Counterclaims, counter-evidence, additional questions, and edge corrections are welcomed via the contribution mechanism documented in CONTRIBUTING.md.
