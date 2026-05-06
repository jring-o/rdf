---
name: node-dedup
description: Judges whether a proposed or existing discourse-graph node in the Resilient Data Futures repo duplicates a node already in graph/. Reads the candidate, walks its semantic neighborhood via tools/walk.mjs, compares it against each structurally-relevant existing node, and prints per-node verdicts (duplicate / overlapping-but-distinct / counterclaim-worth / unrelated) plus a final recommendation. Use this skill whenever the user asks anything that smells like a deduplication question on a graph node — explicit invocations like /dedup or /node-dedup, but also natural phrasing like "is this a duplicate?", "does this node already exist?", "is C-0054 similar to anything?", "check for dedup", "is my new claim already in the graph?", "did we already cover this in the graph?", "is this redundant with another node?", or any time the user passes a graph/<type>/<ID>.md path or a bare node ID with no other context. Prefer this skill over manual grep — it uses the project's structural walker rather than keyword matching, and it reasons against the SCHEMA's atomicity rules per node type. This skill is read-only: it produces information for the human to act on. It does NOT post PR comments, modify files, or commit anything.
---

# node-dedup

Help the user decide whether a proposed graph node duplicates a node already in `graph/`. You read the candidate, walk its semantic neighborhood, judge each neighbor, and print a verdict block to stdout. The human decides what to do next.

## What this skill is for

The Resilient Data Futures repo maintains a discourse graph of ~348 Q/C/E/M/S nodes under `graph/<type>/<ID>.md`. Contributors regularly propose new nodes. The graph's value depends on each node being atomic and non-redundant: per `SCHEMA.md`, *one claim per Claim node*, one empirical observation per Evidence node, one citable artifact per Source node. Restating an existing assertion in different words is a duplicate, not an extension.

This skill exists so a maintainer or contributor can ask "is this already in the graph?" and get a structured answer grounded in the actual graph, not a keyword grep.

## Hard constraints

This skill is **read-only and advisory**. The output is information for a human. Do not, in this skill:

- Post PR comments, open issues, or call any GitHub/GH tool
- Modify, create, or delete any file in the repo
- Commit, stage, or stash anything
- Change node frontmatter or edges anywhere

If the user asks for action based on the verdict ("OK, mark it duplicate" / "delete the draft"), tell them what the next step would look like and stop. Let them invoke a different skill or do it themselves.

## Inputs

The skill takes one of two inputs:

- **Existing node ID**: `C-0017`, `E-0042`, `M-0003`, `Q-0001`, `S-0019`. Use this when the user names a node already on disk and wants to know if anything else in the graph overlaps with it.
- **Draft node file path**: a path to a node file that may or may not be merged yet, e.g. `graph/claims/C-0054.md` or an absolute path under the repo. Use this when the user is preparing a contribution and wants to dedup-check before opening or merging a PR.

If the user gives a bare ID without a type prefix, fail clearly. If they give a path that doesn't exist, fail clearly. Do not guess.

## Workflow

### Step 1 — Read the schema and the candidate

Before judging anything, read `SCHEMA.md` at the repo root. The atomicity definitions per node type are the load-bearing standard for the verdicts. Don't paraphrase from memory.

Then read the candidate node:

- **Existing ID** → read `graph/<type>/<ID>.md` directly. The type prefix maps `C → claims`, `E → evidence`, `M → methods`, `Q → questions`, `S → sources`.
- **Draft path** → read the path the user gave. Confirm the frontmatter has at minimum a `type:` field. If the file is an in-progress draft missing a body, dedup against the title + frontmatter alone and say so in the output.

### Step 2 — Walk the neighborhood

Run the project's structural walker via Bash. The walker computes the semantically-relevant slice of the graph using the same algorithm the site uses to bundle nodes for review.

For an existing ID:

```
node tools/walk.mjs <ID> --strategy semantic --bodies
```

For a draft path:

```
node tools/walk.mjs --proposed <path> --strategy semantic --bodies
```

Both forms emit JSON to stdout shaped like:

```
{
  "anchor": "<ID-or-edge-target>",
  "nodes": [{ "id", "type", "title", "status", "body", "isAnchor" }],
  "edges": [{ "from", "to", "edge" }],
  "meta": { ... }
}
```

If the walker errors, print the error and stop. Do not fall back to grep — the walker is the source of truth for "structurally relevant".

The walk typically returns 10–50 nodes. That's the dedup candidate set. It is fine, even expected, that most of those nodes will be unrelated to the dedup question — the walker casts a wide net by design.

### Step 3 — Judge each non-anchor node against the anchor

For each node in `nodes` where `isAnchor` is false, decide which of these four verdicts fits:

- **duplicate** — the node makes the same assertion / records the same empirical observation / asks the same question / formalizes the same instrument as the candidate. Same content, possibly different wording. The atomicity rule from `SCHEMA.md` is the test: would a reader merging the two end up restating one thing twice?
- **overlapping-but-distinct** — there is real semantic overlap but the two nodes assert genuinely different things. Common case: a broad claim and a narrower claim that happens to share key vocabulary. Worth flagging because edges may be missing, but not a duplicate.
- **counterclaim-worth** — the existing node makes a contrary or competing assertion. The candidate is not a duplicate; it is a candidate `opposes:` partner. This is a positive signal: the graph has structure to absorb the new node.
- **unrelated** — appears in the walk because of a transitive structural connection, but on the merits is not relevant to the dedup question.

#### Type-specific atomicity (from `SCHEMA.md`)

Apply the right standard for the candidate's type:

- **Claim**: "one claim per Claim node." Two claims that assert the same proposition in different words are duplicates, even if one is more polished. A claim that refines, narrows, or strengthens another is *overlapping-but-distinct* — different proposition.
- **Evidence**: "Evidence is specific." Two Evidence nodes drawing from the same Source for the same empirical point are duplicates. Two Evidence nodes from the same Source reporting different numbers are distinct (and might both be sub-points of one multi-point Evidence node — flag that).
- **Method**: "Method nodes are reusable instruments." Two Method nodes formalizing the same taxonomy / formula / framework are duplicates regardless of name. A Method that uses or extends another Method is *overlapping-but-distinct*.
- **Question**: Questions are rare and broad. Two Questions that frame the same line of inquiry are duplicates even if the wording differs. A subsidiary question is *overlapping-but-distinct*.
- **Source**: "Sources are atomic. One Source = one citable artifact." Two Source nodes pointing at the same paper/dataset/archive are duplicates. Different volumes of the same multi-volume work are usually one Source unless cited distinctly. Be aggressive about flagging Source duplicates — the graph treats Sources as a global namespace.

### Step 4 — Print the verdict block

Print to stdout. No file writes, no PR comments. Format:

```
## Dedup verdict for <ANCHOR-ID>

Walked N nodes via semantic strategy. Candidate type: <type>.

### Duplicate
- <ID> — <verdict-reasoning>
  Existing: "<short quoted phrase from existing node>"
  Candidate: "<short quoted phrase from candidate>"

### Overlapping but distinct
- <ID> — <one-sentence reasoning>
  Existing: "<phrase>"
  Candidate: "<phrase>"

### Counterclaim-worth
- <ID> — <one-sentence reasoning>
  Existing: "<phrase>"
  Candidate: "<phrase>"

### Recommendation
<one of: use existing / oppose as counterclaim / extend with new evidence / proceed as net-new>

<one-paragraph justification tied to the verdicts above>
```

**Quoting matters.** Every per-node row must quote a real phrase from the existing node and a real phrase from the candidate. The user has to be able to scan the verdict and verify the comparison without re-reading both nodes. "C-0040 looks similar" without quotes is unacceptable output for this skill — the whole point is to surface the specific overlap.

**Skip the Unrelated section by default.** It clutters the output. Include it only if the user explicitly asks for verbose mode (e.g., "show unrelated", "verbose", "full"). When verbose, group unrelated rows together with one-line reasoning and no quotes.

**Empty sections are fine.** If nothing in the walk is a duplicate, print "### Duplicate\n(none)" and move on. The presence of a header with nothing under it is informative — it tells the user the skill checked.

### Step 5 — Recommend

The recommendation is a single line picked from this fixed set, plus a paragraph of justification:

- **use existing** — at least one duplicate found. Recommend the candidate be discarded and the existing node be used directly. Name the specific node ID(s).
- **oppose as counterclaim** — at least one counterclaim-worth match and no duplicates. Recommend the candidate be reframed as a counterclaim, with `opposes:` pointing at the existing node.
- **extend with new evidence** — overlap exists but the candidate is genuinely a refinement, narrowing, or new datum. Recommend it proceed as a new node with explicit edges (`supports:`, `usesMethod:`, etc.) connecting it into the overlapping cluster, rather than as an isolated node.
- **proceed as net-new** — no significant overlap. Recommend it proceed.

Tie the recommendation to specific node IDs from the walk. "Proceed as net-new" with no justification is not actionable.

## Why these constraints matter

The skill is a *judgment aid*, not an automation. The graph's atomicity is a contributor norm enforced by review, not by code. A duplicate that slips in as a separate node fragments the discourse — the `supports:` and `opposes:` edges that should converge on one assertion get split across two nodes, and downstream readers see two half-bundled debates instead of one whole one.

The walker is the input because it filters by structural relevance, not surface keywords. A claim about "verification" and a claim about "auditability" might never co-occur in a grep but sit in the same neighborhood through shared `addresses:` and `usesMethod:` edges.

The quoting requirement is the calibration mechanism. Forcing the verdict to quote both nodes makes it cheap for the user to overrule the skill when it overcalls a duplicate, and cheap to confirm when it gets it right. Verdicts without quotes are unfalsifiable on quick read and slowly erode trust in the skill.

## Example invocation traces

**Input**: `/dedup C-0017`
**What runs**: `node tools/walk.mjs C-0017 --strategy semantic --bodies`
**What you do**: read `SCHEMA.md`, read `graph/claims/C-0017.md`, parse the walker JSON, judge each non-anchor node, print the verdict block.

**Input**: "is graph/claims/C-0054.md a duplicate?"
**What runs**: `node tools/walk.mjs --proposed graph/claims/C-0054.md --strategy semantic --bodies`
**What you do**: same as above, but anchor is the draft path's content rather than an on-disk merged ID.

**Input**: "check for dedup on this draft I just wrote at graph/evidence/E-0099.md, verbose"
**What runs**: `node tools/walk.mjs --proposed graph/evidence/E-0099.md --strategy semantic --bodies`
**What you do**: same as above, plus include the Unrelated section.

## Anti-patterns

- **Don't grep for similar wording instead of running the walker.** The walker is cheap and structural. Grep finds keyword matches that are often irrelevant and misses semantically adjacent nodes that don't share keywords.
- **Don't accept a verdict without a quote from each node.** If you can't find a phrase in either node that demonstrates the overlap, your verdict is probably wrong — downgrade it.
- **Don't merge verdicts across types.** A Claim duplicating an Evidence node is meaningless: they're different node types with different atomicity rules. Compare like to like.
- **Don't recommend an action the skill can take.** The recommendation is what *the human* should consider doing. The skill itself stops after printing.
- **Don't truncate the walk output.** If the walker returns 47 nodes, judge all 46 non-anchor ones (the verbose section absorbs the unrelated ones in default mode by simply being skipped).
