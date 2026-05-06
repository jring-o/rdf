---
name: node-edge-resolution
description: Verify or correct stated edge references in a Resilient Data Futures discourse graph node — both prose mentions in the body ("the Tier 3 economics argument", "the cost-of-loss framing") and structured edges in the YAML frontmatter (addresses / supports / opposes / derivedFrom / informs / usesMethod). Use this skill whenever the user wants to check, verify, audit, validate, resolve, or correct the edges or cross-references on a graph node, or when they ask whether the targets and edge types they wrote are right. Trigger on phrases like "verify the edges on this node", "are these edges right?", "resolve the references in this draft", "did I list the right Claim?", "check my YAML edges", "is this edge pointing at the correct node?", "what does 'the Tier 3 economics claim' resolve to?", "make sure my supports/opposes are correct", "audit the edge list on C-0017", or any explicit invocation of `/edge-resolution` or `/node-edge-resolution`. Trigger even when the user only refers to a draft node path (e.g., `graph/claims/C-0042.md`) or an existing node ID (e.g., `C-0005`, `E-0042`) and asks something like "check this" or "do the references resolve?" — those are the canonical entry points for this skill. This skill READS the graph and prints findings to the terminal; it does NOT modify files, write PR comments, or make commits. For decomposing a paper section into new nodes, use graph-extract instead — this skill operates on a single existing or draft node.
---

# node-edge-resolution

Confirm or correct stated references on a single graph node — both prose mentions in the body and structured edges in the YAML. They are the same operation: given a stated reference (in any form), look up the correct target node and edge type.

The graph at `graph/{questions,claims,evidence,methods,sources}/` follows `SCHEMA.md` (read it once if uncertain about edge semantics). The retrieval utility `tools/walk.mjs` produces a JSON slice of the relevant neighborhood; this skill reads that slice plus the anchor node's own contents and judges each reference.

## Why this skill exists

Drafts of graph nodes routinely contain two classes of reference error that look unrelated but are the same problem:

1. **Prose name-drops without YAML backing.** The body says "this opposes the Tier 3 economics framing" but the YAML's `opposes:` list is empty or points elsewhere. The reference is real — there is a node it's pointing at — but the structured edge wasn't written down.
2. **YAML edges that don't match the prose.** The YAML lists `supports: [C-0017]` but the body actually argues *against* C-0017, or supports a different claim that was misnumbered, or invokes a method that should be `usesMethod` rather than `supports`.

Both are reference-resolution problems. Given a stated reference (descriptive phrase or an ID), find what node it actually points at and what edge type the relationship actually is. This skill runs both passes and prints a single combined report so a maintainer can act.

The skill is read-only on purpose. False positives waste maintainer time, and writing fixes belongs to the human author who knows their intent. Default to "confirmed" when there's no real evidence of a problem.

## Input

One argument: either a path to a draft node file (e.g., `graph/claims/C-0042.md`, an unmerged path under a feature branch, or any `.md` file shaped like a graph node) OR an existing node ID (e.g., `C-0005`, `E-0042`, `M-0001`).

If the user passes only a phrase like "check this node" without an argument, ask which node before proceeding — guessing wastes a run.

## Workflow

### Step 1 — Load the graph slice

Run the walker to retrieve the anchor node plus its semantic neighborhood, with bodies included so reference resolution can be judged from prose:

For an **existing node ID**:
```
node tools/walk.mjs <ID> --strategy semantic --bodies
```

For a **draft file path** (the file may or may not have a final ID yet):
```
node tools/walk.mjs --proposed <path> --strategy semantic --bodies
```

The output JSON has shape `{ anchor, nodes: [{id, type, title, status, body, isAnchor}], edges: [{from, to, edge}], meta }`. When `--proposed` is used, the result also includes a `proposed` object with the draft node's id, type, title, body, and outgoing edges.

If the walker returns no nodes (proposed file has no resolvable edge targets, or the ID doesn't exist), report that to the user and stop. There is nothing to verify.

### Step 2 — Read the anchor node

Identify the anchor node. From the walker output, this is whichever node has `isAnchor: true`, or — for proposed mode — the `proposed` object.

Hold two things in working memory:
- **The anchor's body** — every paragraph of prose, exactly as written.
- **The anchor's declared edges** — every entry under `addresses`, `supports`, `opposes`, `derivedFrom`, `informs`, `usesMethod` in the YAML.

The walker already parses these; you don't need to re-parse the YAML. (If the proposed file's edges aren't in the walker output for some reason, fall back to reading the file directly.)

### Step 3 — Pass A: prose mentions

Scan the body paragraph by paragraph for **descriptive references to other concepts that likely correspond to existing nodes.** Examples of what counts:

- Named methods: "the Four-Term Liability Formula", "the Tier 3 economics framing", "the cost-of-loss taxonomy"
- Named claims by paraphrase: "the central architectural claim", "the §5.3 cost estimate", "Stern et al.'s peer-reviewed median"
- Named evidence by paraphrase: "the Vines retrieval study", "the 19% number", "the Duke FCA case"
- Direct ID mentions in prose: "C-0017", "M-0001" (these are also candidates — the prose could mention an ID that isn't in the YAML edge list)

What does **not** count: generic appeals ("most studies", "the literature"), self-references, citations of external papers that have no corresponding node, and simple narrative connectors. Be specific — the goal is references that point at *another node in this graph*.

For each candidate prose reference:

1. **Resolve the target.** Read the bodies of the neighborhood nodes; find the one whose title/body matches the descriptive phrase. If the phrase is genuinely ambiguous between two candidates, surface both. If nothing in the neighborhood matches, surface as "unresolved" — do not fabricate a target.
2. **Infer the edge type from the language.** "opposes / counters / argues against" → `opposes`. "supports / shows / demonstrates / corroborates" → `supports`. "addresses / responds to / answers" → `addresses`. "uses / applies / invokes / per the …" → `usesMethod` (when the target is a Method) or `informs` (rarely needed from this side). "draws on / cited from" → `derivedFrom` (when the target is a Source and the anchor is Evidence). Use SCHEMA.md edge semantics if unsure.
3. **Check the YAML.** Does the anchor's declared edges already include `<target> ` under `<inferred edge type>`?
4. **Verdict:**
   - `confirmed` — prose reference matches a YAML edge already.
   - `missing-from-yaml` — prose names a target the YAML does not list under the right edge type.
   - `unresolved` — phrase is clearly a reference but no neighborhood node matches it. (May indicate a missing node or a phrase that needs rewording.)

### Step 4 — Pass B: YAML edges

For each edge declared in the anchor's YAML (`from = anchor, to = target, edge = type`):

1. **Look up the target node** in the walker output. Read its title and body.
2. **Judge whether the edge type and target are correct given what the anchor's body actually says.** Specifically:
   - Does the anchor's prose actually engage with this target at all? Search the body for any phrase that could be referring to this target. If nothing in the body connects, the edge is likely a phantom (or the prose is missing the discussion that justifies the edge).
   - Does the edge type match the relationship the prose describes? If the body says "we counter X's framing" but the YAML lists `supports: [X]`, the edge type is wrong.
   - Does the target match? If the body discusses Claim Y but the YAML lists `supports: [X]` where Y is also in the neighborhood and is a much closer match, the target is likely wrong.
3. **Verdict per edge:**
   - `confirmed` — edge type and target match what the prose says.
   - `wrong-target` — a different node in the neighborhood is a clearly better fit.
   - `wrong-edge-type` — target is right, but the edge type contradicts the prose (e.g., `supports` should be `opposes`; `supports` should be `usesMethod`).
   - `phantom` — the target isn't engaged by the anchor's prose at all.

Default to `confirmed` when the edge is plausibly consistent with the prose. Maintainers wrote these edges for a reason; only flag when the body's content actively argues for a different verdict.

### Step 5 — Print combined report

Print a single report to the terminal. Use this exact structure so the user can scan it quickly:

```
node-edge-resolution — <anchor ID or draft path>

PROSE MENTIONS
--------------
1. "<exact phrase from body>"
   → <target ID> (<inferred edge type>)
   verdict: <confirmed | missing-from-yaml | unresolved>
   reasoning: <one sentence; quote the relevant snippet from the target node body>

2. ...

YAML EDGES
----------
1. <edge type>: <target ID>
   verdict: <confirmed | wrong-target | wrong-edge-type | phantom>
   reasoning: <one sentence; quote the relevant snippet from the anchor or target body>

2. ...

Summary: <N> prose mentions checked, <M> YAML edges checked,
         <K> non-confirmed verdicts.
```

Rules for the report:

- **Quote real text.** Every prose-mention row must quote the exact phrase from the anchor's body (not paraphrased). Every reasoning sentence must quote a load-bearing snippet from the target node's body — that is what makes the verdict auditable.
- **One sentence of reasoning per row.** If you can't justify the verdict in one sentence with a quoted snippet, the verdict isn't strong enough — downgrade to `confirmed` or omit the row.
- **List confirmed rows too.** A maintainer needs to see what was checked, not just what was flagged. (If the report would be very long, group confirmed entries compactly but still list them.)
- **No PR comments. No file edits. No commits.** Print to terminal only.

## Examples

### Example 1 — Prose mention missing from YAML

Anchor body contains: *"This counters the Tier 3 economics framing of §5.4."*
Neighborhood has `M-0007 — Tier 3 cost-of-loss framework`.
Anchor YAML has no edge to `M-0007`.

Report row:
```
1. "This counters the Tier 3 economics framing of §5.4."
   → M-0007 (opposes)
   verdict: missing-from-yaml
   reasoning: M-0007 body — "Tier 3 framework valuing cost of unverifiable
   research output" — matches the phrase, and "counters" implies opposes.
```

### Example 2 — YAML edge with wrong type

Anchor YAML has `supports: [C-0017]`.
Anchor body says: *"§5 documents how the architectural claim breaks down once costs exceed reconstitution thresholds."*
C-0017 body asserts the architectural claim the anchor is breaking down.

Report row:
```
1. supports: C-0017
   verdict: wrong-edge-type
   reasoning: anchor body — "the architectural claim breaks down once costs exceed
   reconstitution thresholds" — argues against C-0017 rather than for it; should be opposes.
```

### Example 3 — Confirmed edge

Anchor YAML has `usesMethod: [M-0003]`.
Anchor body says: *"Applying the Four-Term Liability Formula (M-0003) to a Carnegie R1…"*

Report row:
```
1. usesMethod: M-0003
   verdict: confirmed
   reasoning: anchor body explicitly invokes M-0003 by ID and name — "Applying the
   Four-Term Liability Formula (M-0003)".
```

## Constraints

- **Be specific.** Quote the prose phrase. Quote the target snippet. Generic verdicts without quoted evidence are not useful.
- **Default to confirmed.** Maintainers wrote these edges deliberately. Only flag when the body's content actively contradicts the edge or names an unlisted target.
- **Read-only.** This skill does not write files, open PRs, or commit. The report is the entire deliverable.
- **One node at a time.** This skill operates on a single anchor. For multi-node audits, the user should call the skill once per node.
- **When the walker returns nothing, stop.** A draft with no resolvable edge targets and no neighborhood is nothing to verify against; tell the user and exit.
