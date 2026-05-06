# Resilient Data Futures — Discourse Graph

A living, content-addressed, contributable form of the SciOS *Resilient Data Futures* whitepaper.

The paper argues that research data loss is an architectural problem: single-copy concentration produces inevitable loss; protocol-level distribution produces structural redundancy. The paper is published here as a **discourse graph** — every claim, evidence item, question, method, and source is its own addressable file.

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
site/                    Next.js renderer — deployed at rdf.scios.tech
skills/                  Claude Code review skills (dedup, edge resolution, edge creation)
tools/                   Graph utilities (linter, neighborhood walker, label-sync)
```

## How to engage with this

Live site: **[rdf.scios.tech](https://rdf.scios.tech)**. Three ways to engage, in order of friction:

### 1. Discuss a node

Visit any node's page on the site (e.g. `/node/C-0017`) and click the discussion button. Each node has exactly **one** discussion thread on GitHub — the button reads *"Start discussion"* if no thread exists yet, or *"Join discussion (N)"* with the comment count if one does. Conversations stay attached to that single node and are discoverable forever via the `node:<ID>` label.

### 2. Contribute a new node from the browser

The **[/contribute](https://rdf.scios.tech/contribute)** page is a form-based draft tool — pick a node type, fill in the title, body, and edges, sign in with GitHub, and submit. The page opens a pre-filled "Compare & pull request" page on your fork; you click "Create pull request" to open it for review.

Use this for any new node — Question, Claim, Evidence, Method, or Source. The schema does the semantic work: a counterclaim is just a Claim with `opposes:` set. Every contribution uses the same schema.

### 3. Contribute via Git

If you'd rather draft in your own editor:

- **Propose an edit:** PR against the node file.
- **New node:** add `graph/<type>/<next-ID>.md` with valid frontmatter and edges per `SCHEMA.md`.
- **Counterclaim or counter-evidence:** same as a new node, with `opposes:` set on the new Claim or Evidence.

See `CONTRIBUTING.md` for the full model and `SCHEMA.md` for the node spec.

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
| Sources (S) | 135 |
| **Total nodes** | **349** |
<!-- node-counts:end -->

Every Claim addresses at least one Question. Every Evidence node supports at least one Claim and derives from at least one Source. The Methods (Four-Tier Taxonomy, Three Architectural Principles, Four-Term Liability Formula, 1:10:100 Cost Heuristic, Failure-Mode Taxonomy, AI-Data Property ↔ Tier-3 Architecture Mapping) are referenced by the Claims that invoke them. All edge references in the graph resolve to existing nodes.

The first pass mirrors the paper's argument structure section by section. Counterclaims, counter-evidence, additional questions, and edge corrections are welcomed via the contribution mechanism documented in CONTRIBUTING.md.
