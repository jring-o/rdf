---
name: node-edge-creation
description: Find edges that a proposed or existing discourse-graph node should declare but doesn't — argumentatively-close neighbors it never references in YAML or prose. Use whenever the user asks "what edges am I missing", "what should this node connect to", "find missed connections", "suggest edges for this draft", "graph this against existing claims", "are there nodes I should be linking to", or otherwise wants generative edge suggestions for a draft or merged Q/C/E/M/S node. Trigger on a path to a draft node file, an existing node ID (C-0017, E-0042, etc.), or any phrasing about pulling a node into the existing discourse graph. This is the canonical entry point for generative edge discovery on the Resilient Data Futures graph — prefer it over manual neighborhood walking. Generative only: do NOT use this skill to verify edges the node already declares (that is `node-edge-resolution`'s job), to create or edit node files, to commit, or to comment on PRs.
allowed-tools: Bash(node tools/walk.mjs *) Read Glob Grep
---

# node-edge-creation

Walk the discourse graph from a node's stated edges and surface argumentatively-close nodes the node *should* connect to but doesn't reference anywhere — neither in `edges:` YAML nor in the prose body.

This is generative discovery, not verification. The sister skill `node-edge-resolution` checks whether the node's stated edges are coherent. This skill looks for edges the node is missing entirely.

## Background — read this every session

You are operating on the Resilient Data Futures repo: a whitepaper backed by a discourse graph at `graph/{questions,claims,evidence,methods,sources}/<ID>.md`. ~348 nodes, schema at `SCHEMA.md` (Q/C/E/S extended with M for Method).

**Read `SCHEMA.md` once at the start of every run.** It is short. The edge semantics matter — you cannot suggest a coherent edge type without them. Specifically you need to remember which directions are valid:

- `addresses`: Claim → Question
- `supports`: Evidence → Claim, or Claim → Claim
- `opposes`: Claim → Claim, or Evidence → Claim
- `derivedFrom`: Evidence → Source
- `informs`: Method → Claim
- `usesMethod`: Claim → Method (inverse of `informs`)

Suggesting `addresses` from an Evidence node, or `supports` from a Source, is incoherent — don't.

## Resolve the input

The skill takes one positional argument:

- **Path to a draft node file** (`graph/claims/C-0099.md`, `/tmp/draft.md`, etc.) — pass to walk via `--proposed PATH`.
- **Existing node ID** (`C-0017`, `Q-0008`, `M-0001`) — pass to walk as the anchor positional.

If the input is ambiguous (e.g., a bare token), prefer the ID interpretation when it matches the `[QCEMS]-\d{4}` pattern, otherwise treat as a path. Confirm with the user only if both interpretations resolve.

## Workflow

### Phase 1 — Walk the neighborhood

Run the bundled retrieval utility. It returns the union of structurally relevant slices around every edge target the node already declares.

For a draft file:
```
node tools/walk.mjs --proposed <path> --strategy semantic --bodies
```

For an existing ID:
```
node tools/walk.mjs <ID> --strategy semantic --bodies
```

Parse the JSON. Output shape:
```
{
  anchor,
  nodes: [{id, type, title, status, body?, isAnchor}],
  edges: [{from, to, edge}],
  meta: {strategy, qOverlap|depth, nodeCount, edgeCount},
  proposed?: {id, type, title, body, outgoing}    // only when --proposed was used
}
```

The `nodes` list is the candidate pool. The `edges` list is the existing connective tissue inside that slice — useful context for understanding *why* each candidate was pulled in by the walk.

If the slice is empty (no resolvable edge targets), say so and stop. The skill cannot suggest edges from a node that points nowhere; the user needs to add at least one anchor edge first or invoke this skill on a different node.

### Phase 2 — Read the proposed node

The "proposed node" is either `result.proposed` (draft file mode) or the node in `result.nodes` with `isAnchor: true` (existing-ID mode). Read its body and its declared `outgoing` edges.

Build two sets you will use to filter candidates:

1. **Already-edged set**: every node ID that appears as a target of any outgoing edge from the proposed node, plus every node ID that appears as a source of any incoming edge to the proposed node within the slice. (Both directions count — if a Method already `informs` this Claim, the Claim doesn't need to add `usesMethod`; the edge exists.)

2. **Prose-mentioned set**: every node ID that appears in the proposed node's body as a literal `Q-NNNN`, `C-NNNN`, `E-NNNN`, `M-NNNN`, or `S-NNNN` token, plus any node whose title is quoted or near-quoted in the body. (If the body says "the Four-Tier Taxonomy", and M-0001 is titled "The Four-Tier Architectural Taxonomy", that's a prose mention — the author has consciously gestured at the node and chose not to edge it.) Be liberal here: a paraphrase of the title that unambiguously refers to the same instrument counts. The point of this filter is to avoid suggesting edges the author has already considered and explicitly omitted in prose.

Anything that survives both filters is a candidate.

### Phase 3 — Judge each candidate

For each candidate, ask: *should an edge actually exist here, and which one?*

This is the hard part of the skill. You have the proposed node's body, the candidate's body, and the slice's existing edges. Reason about argumentative closeness, not surface keyword overlap. The patterns to look for:

**Sibling Claim under the same Question.** The candidate is a Claim that addresses a Question the proposed Claim also addresses. Sibling claims are either complementary (`supports` candidate) or in tension (`opposes` candidate). Read both bodies and decide which. Be honest about disagreement: if the candidate makes the opposite point, suggest `opposes`, not `supports`.

**Method match.** The candidate is a Method whose body matches the analytical instrument the proposed Claim is actually using. Tell-tale: the proposed Claim's body argues a reduction or classification, and the candidate Method names exactly that reduction or classification. Suggest `usesMethod`. (Inversely, when the proposed node *is* a Method and a candidate Claim's argument structurally invokes it, suggest `informs`.)

**Shared Source.** The candidate is an Evidence node deriving from a Source the proposed Evidence also derives from, OR the candidate is a Source the proposed Evidence cites in body but doesn't list in `derivedFrom`. The first is a topical relation worth flagging via the related Claim; the second is a genuine missing `derivedFrom`.

**Counterclaim relevance.** The candidate is a Claim whose body explicitly contradicts the proposed Claim's assertion. `opposes`, both directions worth considering depending on which node is being graphed.

**Synthesis target.** The proposed Claim is a thesis-level synthesis and the candidate is a sub-claim that demonstrably contributes to it. `supports` (sub-claim → synthesis), suggested on whichever side is the proposed node.

**Method-Claim pairing.** Proposed is a Claim, candidate is a Method, and the Claim's body uses vocabulary the Method's body defines. `usesMethod`.

If none of these patterns fit cleanly, drop the candidate. Be conservative — the user explicitly does not want padding. Three solid suggestions beats fifteen marginal ones, and weak suggestions train the user to ignore your output.

### Phase 4 — Rank and emit

Rank the surviving suggestions by confidence:

1. **High**: a specific structural pattern fits (e.g., shared Question + opposing thesis), and the candidate body contains a quotable sentence directly inverting or directly extending the proposed body.
2. **Medium**: the pattern fits but the candidate body is broader/narrower than the proposed body, so the edge is plausible but not load-bearing.
3. **Low**: the pattern is suggestive but resting on overlap of one or two phrases. **Don't emit Low.** Drop it.

Emit Phase-4 output to the terminal in this exact format:

```
## Edge suggestions for <proposed ID or "draft <filename>">

Walked from: <comma-separated edge targets the walk traversed>
Slice size: <N nodes>
Already-edged: <count>      Prose-mentioned: <count>      Candidates after filter: <count>

### Suggestions (<count>, ranked)

1. <target ID> — suggested `<edge type>` (<direction: outgoing | incoming>) — <confidence: high | medium>
   Reason: <one sentence>
   Snippet from <target ID>: "<quote, ≤25 words>"

2. ...
```

The "direction" tells the user whether the edge would be added to *this* node's frontmatter (outgoing) or to the candidate's frontmatter (incoming) — the asymmetry matters because some edges are conventionally written on one side. Per SCHEMA.md, `usesMethod` lives on the Claim and `informs` lives on the Method; the same logical relation has two YAML expressions and the user wants to know which file to edit.

If there are no surviving candidates, say so plainly:

```
## Edge suggestions for <proposed ID or "draft <filename>">

Walked from: <targets>
Slice size: <N>
Already-edged: <count>      Prose-mentioned: <count>      Candidates after filter: 0

No missed edges found. The proposed node's stated edges and prose mentions cover the argumentatively-relevant neighborhood.
```

Empty output is a real result, not a failure. The graph is finite and well-edged nodes exist.

## Conventions

**Be conservative.** Suggest only edges that are genuinely warranted. The user reads every suggestion; wasted suggestions cost their attention.

**Always quote.** Each suggestion includes a short snippet (≤25 words, contiguous, from the candidate body) that justifies the edge. The user audits suggestions by reading the snippet — without it, the suggestion is unverifiable.

**Don't reinvent the walk.** The walk utility implements the canonical neighborhood algorithm shared with `site/lib/bundle.ts`. Use its output verbatim. Don't grep the graph yourself for additional candidates outside the slice; if a relation isn't reachable through the existing edges, it isn't argumentatively close enough to suggest.

**Prose mentions are intentional omissions.** If the body of the proposed node names a node by ID or near-quotes its title, the author saw it and chose not to edge it. Respect that. The edge-resolution skill handles the case where they should have edged it; this skill is for things they didn't see at all.

**Suggest the right edge type.** Re-check direction against SCHEMA.md before emitting. A Claim does not `informs` a Method; a Method does. An Evidence node does not `addresses` a Question; the Claim it supports does. Wrong-direction suggestions waste the user's attention.

**Stay terse.** The output is a ranked list, not an essay. One sentence of reasoning per suggestion. The snippet does the rest of the work.

## What this skill does NOT do

- Modify any file. No writing new nodes, no editing frontmatter, no patching prose.
- Commit. The user commits separately.
- Comment on PRs. Output goes to the terminal, full stop.
- Verify edges already declared. The proposed node's existing edges are inputs to the walk, not subjects of inspection. (See `node-edge-resolution` for verification.)
- Decompose paper sections. (See `graph-extract` for that.)
- Suggest edges from beyond the walk's reach. The walk's slice defines argumentative closeness; nodes outside it are out of scope.

## On staying lean

The user wants three to five solid suggestions per run, not a sweep. The ranking and the "drop Low" rule exist to keep the output trustworthy. If you find yourself wanting to emit ten suggestions, you are probably about to dilute the signal — re-read the candidates and cut the ones whose snippet doesn't directly justify the edge.
