# Contributing

The argument lives in the graph. Every Claim, Evidence item, Question, Method, and Source is a separately addressable node. Discussion happens at node granularity. Changes happen via pull request.

## Modes of contribution

There is one issue template (**Discussion**) and one PR pattern. The schema does the semantic work — a counterclaim is just a Claim with `opposes:`, counter-evidence is just an Evidence with `opposes:`, and so on. Every node uses the same schema regardless of intent.

### 1. Discuss a node

The lowest-friction entry: visit the node's page on the rendered site and click **"Discuss this node."** That opens a pre-filled issue against the right node. You can also open the **Discussion** issue template directly on GitHub for graph-wide concerns.

Discussion stays attached via the `node:<ID>` label and is discoverable forever.

### 2. Edit an existing node

Open a PR that modifies the node file. Include in the PR description:
- Which edge(s) you're changing, if any.
- Whether the edit changes the meaning of the assertion (in which case the existing node may deserve a counterclaim instead — see below).

Substantive rewrites usually deserve a separate node, not an in-place edit. Edits are for: wording, added evidence references, fixing broken edges, prose clarity.

### 3. Add a counterclaim

A counterclaim is a Claim node with `opposes: [C-XXXX]` set. It is **never** an in-place rewrite.

- Create `graph/claims/C-NNNN.md` with the next available ID.
- Add `opposes: [C-XXXX]` to the new node's edges.
- Provide your own Evidence and Source nodes if needed.

Open a Discussion issue first if you want input before drafting; otherwise open the PR directly.

### 4. Add counter-evidence

An Evidence node that cuts against a Claim. Same pattern: create `graph/evidence/E-NNNN.md`, add `opposes: [C-XXXX]`, link to a Source via `derivedFrom`.

### 5. Pose a new question

A Question node opens a line the existing graph doesn't address. New Claims and Evidence can then be linked to it. Search existing Questions first to avoid duplication.

## Authoring a node

Read `SCHEMA.md` first. Required:
- YAML frontmatter with `id`, `type`, `title`, `status: draft`, `created`, and applicable `edges`.
- A 50–250 word standalone prose body. The node must be readable and contributable in isolation.
- Inline citations to other nodes (`S-0042`) rather than numeric references.

Pick the next available ID by listing the relevant directory and incrementing past the highest existing number.

The PR template prompts for affected nodes, edges touched, and related discussion.

## Pull request expectations

- One change per PR where possible. Adding three new Evidence nodes that all support C-0017 is one PR; adding a counterclaim and unrelated edge fixes is two.
- The PR description should restate what's changing in one paragraph. CI will check edge consistency.
- All PRs require approval from a CODEOWNER (`@jring-o` for the foundational pass).
- No squash-and-merge for substantive content — node-by-node provenance matters.

## Code of conduct

This is a working scientific argument. Disagreement is the mechanism, not the failure mode. Counterclaims with grounded evidence are welcome. Drive-by negativity without engagement at the node level is not.
