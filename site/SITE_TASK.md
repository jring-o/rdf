# Site Task — Brief for the development agent

Build the **public-facing Next.js renderer** for the Resilient Data Futures discourse graph. This is the workstream the kickoff brief queued for after decomposition is complete.

The site has two responsibilities, and the architecture follows from holding both jointly:

1. **Render the graph** — every node browsable, every edge traversable, the topology visible.
2. **Render a paper view** — a narrative reading order over the same nodes, demonstrating that "the paper is a rendered view over the graph."

The graph is canonical; the paper view is one projection over it.

---

## Read first, in this order

**You should run this session after the regen experiment has completed at least one iteration.** The regen output (`tools/regen-outputs/`) is critical input — it tells you what a "rendered paper view" actually looks like and what node bundles produce it.

1. `CLAUDE.md` at the KB root if visible.
2. The repo's surface:
   - `../README.md`
   - `../SCHEMA.md` — node and edge specification
   - `../CONTRIBUTING.md`
   - `../tools/REGEN_TASK.md` — the regen brief (context for what was tested)
   - `../tools/regen-outputs/` — the regen experiment results (exists by the time you start)
3. The paper:
   - `../paper/whitepaper-v3.md` — full read for narrative structure reference
4. A representative slice of the graph:
   - All 8 Questions in `../graph/questions/`
   - All 5 Methods in `../graph/methods/`
   - 5–10 Claims spanning sections (e.g., `C-0001`, `C-0008`, `C-0017`, `C-0027`, `C-0040`)
   - 5–10 Evidence with multi-section `source_section:` (e.g., `E-0001`, `E-0014`, `E-0036`, `E-0041`)
   - 3–5 Sources (e.g., `S-0001`, `S-0050`, `S-0067`)
5. Discourse-graph background (web fetches, ~10 minutes):
   - https://discoursegraphs.com/
   - https://research.protocol.ai/blog/2023/discourse-graphs-and-the-future-of-science/
   - https://github.com/DiscourseGraphs/schemas
6. **Vercel/Next.js guidance — invoke these skills at session start:**
   - `vercel:nextjs` — App Router patterns, Server Components, rendering strategies
   - `vercel:bootstrap` — repo-linking, env provisioning, db/dev startup (relevant if you use Vercel's marketplace storage)
   - `vercel:shadcn` — component library; saves a substantial amount of UI work
   - `vercel:next-forge` — only if you decide to scaffold from the Turborepo template (probably overkill for this)
   - `vercel:deployments-cicd` — preview/production deployment patterns
   - `vercel:deploy` — once the site is built
7. Reference renderers worth a look (not blueprints, but precedent):
   - **Roam Research** discourse graph implementations (the Joel Chan PDF in §5 of REGEN_TASK.md references these)
   - **Bluesky AT Protocol viewers** for content-addressed publishing UX
   - **Quarto / Distill** for academic narrative styling
   - **Observable / Bret Victor explorables** for interactive node inspection

---

## What's already decided

These are settled. Don't re-litigate.

- **Framework:** Next.js (latest version — confirm at session start via `vercel:nextjs` and `vercel:next-upgrade`).
- **Hosting:** Vercel.
- **Source of truth:** the markdown files under `../graph/`. The site reads them at build time. No database for the graph itself.
- **Graph is canonical, paper is a view.** The site must surface this — the homepage should *not* default to "this is the paper" framing. The graph is the artifact; the paper view is one projection.
- **Repo home:** `C:/Users/jonfs/Documents/Projects/resilient-data-futures/`. Local at session start, not yet pushed. Site deployment to Vercel preview is the user's call, production deployment is *definitely* the user's call.
- **Schema:** see `../SCHEMA.md`. Q/C/E/S/M with edges `addresses`, `supports`, `opposes`, `derivedFrom`, `informs`, `usesMethod`. Multi-section `source_section:` is comma-separated.
- **Citation convention:** inline `(S-NNNN)` graph IDs, not `[42]` numeric refs. No bibliography section in any rendered view — every Source is its own page in the site, reachable directly.

---

## The minimum viable site

Three views and the navigation between them.

### View 1 — Per-node page

Every node in the graph (~264 of them) gets a page at `/node/<ID>` (or `/c/c-0042`, `/e/e-0014`, etc. — confirm URL scheme with user).

Page shows:
- Title, type, ID, status, source_section
- The full body prose (rendered Markdown)
- **Edges out:** every node this one points to (organized by edge type — `supports`, `addresses`, `derivedFrom`, etc.), as clickable links
- **Edges in (backlinks):** every node that points to *this* one. Computed at build time. This is critical — the graph's value is in the bidirectional traversal, and inbound edges aren't in the YAML.
- For Source nodes: prominent display of citation, DOI (if available), original whitepaper reference number for legacy lookup
- For Claim/Evidence nodes: an "Inspect bundle" link → see View 3

### View 2 — Paper view

A reading-order presentation of the discourse graph as the original whitepaper-style narrative.

Two flavors, decide based on regen results:

- **(a) Static narrative from regen output.** Use `tools/regen-outputs/section-N-attempt-final.md` as source. Render with inline `(S-NNNN)` citations as live links to per-node pages. This is the "paper as projection" demonstration in its purest form.
- **(b) Hybrid: original paper text + node anchors.** Render `paper/whitepaper-v3.md` with sections cross-linked to the underlying node IDs in a sidebar. Less pure but lower risk if regen output isn't faithful enough yet.

For MVP, do (b). Move to (a) when regen output passes the bar.

### View 3 — Graph topology / "Inspect bundle"

A force-directed graph view (Cytoscape.js or React Flow — `vercel:shadcn` doesn't supply this; you'll need to add it yourself).

Two modes:

- **Whole-graph topology.** All 264 nodes, edges color-coded by type. Filterable by node type, by source_section, by edge type. Probably needs clustering or fish-eye to be navigable.
- **Bundle view (anchored at a node).** Given an anchor node, show its expanded bundle (the same expansion the regen tool does — depth-1 along supporting edges). This is the visual analog of regen's selection step.

The bundle view is the higher-value of the two for first cut. Whole-graph topology is gorgeous-but-secondary.

---

## Technical specifics

- **Next.js App Router**, Server Components by default, MDX or remark/rehype for markdown rendering, gray-matter (or yaml + remark-frontmatter) for frontmatter parsing.
- **Build-time graph parsing.** Read all markdown files under `../graph/` at build, parse frontmatter, compute inverse edges, generate `getStaticPaths` / route handlers. The graph fits comfortably in memory.
- **Components:** start with `vercel:shadcn` for layout, navigation, cards, badges. The graph viz is the only major component shadcn doesn't supply.
- **Graph viz library:** **Cytoscape.js** is the safer choice (mature, performant at this node count, good docs). React Flow is also fine. Avoid d3-force directly; the wrapping you'd write is more work than picking either of those libraries.
- **Styling:** tailwind via shadcn. Academic feel, generous whitespace, monospace for IDs, serif body for prose. Don't reinvent academic typography — borrow from Quarto / Tufte CSS conventions.
- **Search:** Pagefind or Lunr static-index search at build time. No server-side search infra needed.
- **Performance:** static export is feasible (no runtime DB), but Next.js incremental static regen is fine if you want it.

### Suggested file layout

```
site/
  app/
    page.tsx                          home — graph overview + entry points
    paper/
      page.tsx                        paper view (full)
      [section]/page.tsx              §N view
    node/
      [id]/page.tsx                   per-node detail
    graph/
      page.tsx                        whole-graph topology
      [id]/page.tsx                   anchored bundle view
    layout.tsx
    globals.css
  components/
    NodeCard.tsx
    EdgeList.tsx
    Backlinks.tsx
    GraphView.tsx                     Cytoscape wrapper
    BundleInspector.tsx
    CitationLink.tsx                  renders (S-NNNN) → /node/S-0042
  lib/
    graph.ts                          parse markdown, compute inverse edges
    bundle.ts                         expansion logic mirroring tools/regen.py
    types.ts
  package.json
  next.config.mjs
  tsconfig.json
  tailwind.config.ts
```

---

## Open decisions — confirm with user via `AskUserQuestion` before substantial coding

1. **URL scheme.** `/node/C-0042` (uniform, ID-led) vs. `/c/c-0042` (type-prefixed) vs. `/claims/c-0042` (full type). Recommend uniform `/node/<ID>` for simplicity.
2. **Paper view source.** (a) regen output, (b) original whitepaper with node anchors, (c) both with a toggle. For MVP recommend (b); upgrade to (c) when regen is faithful enough.
3. **Default homepage.** Graph topology view, paper-style overview, or a "what is a discourse graph?" explainer? Recommend the explainer — most visitors won't have read the kickoff brief or the discourse-graphs background and will bounce if dropped into a graph viz cold.
4. **Search.** Build it in MVP or defer? Recommend Pagefind in MVP — cheap, static, the graph is exactly the kind of content static search shines on.
5. **Theming.** Light/dark toggle? Academic/serif vs. modern/sans? Recommend: academic serif (Source Serif Pro or similar), light-default with system-preference dark.
6. **Deploy target.** Vercel preview only (private URL the user can share with the working group), Vercel production with a custom domain, or both staged? Recommend: Vercel preview deployments first, production after working-group review.
7. **Comments / contribution UI inside the site.** The contribution model in `CONTRIBUTING.md` runs through GitHub issues + PRs. Should the site embed an "Open issue about this node" button (deep-links to GitHub) or stay read-only? Recommend: deep-link buttons. Cheap, keeps GitHub as the actual contribution surface, lowers friction for issue creation.

---

## What success looks like for the MVP

- `pnpm dev` (or `npm run dev`) runs the site locally without errors.
- Every node has a working per-node page with title, body, outbound edges, inbound backlinks.
- The paper view renders the original whitepaper with section-level cross-links to node IDs.
- The bundle inspector renders an interactive force-directed view of any node's depth-1 expansion.
- Pagefind search returns results across node bodies.
- Site deploys cleanly to a Vercel preview URL (deployment is gated on user approval; *building* it ready-to-deploy is the success criterion).

If MVP works, the path to full version is:
1. Replace the static paper view with the regen output once regen is faithful enough.
2. Add the whole-graph topology view (filterable, clusterable).
3. Add per-section "rendered subset" views — pick a Question, see all the Claims that address it as a navigable subgraph.
4. Add an "alternate views" mechanism — same graph, different rendering targets (academic paper, executive brief, blog post). This is the long arc that makes the discourse-graph thesis visible.

---

## Hard rules (from CLAUDE.md, repeated for portability)

- **Never deploy to production without explicit approval.** Vercel preview deployments are read-only artifacts; production deployment with a custom domain affects the public address space and requires the user's "ship it."
- **Don't push the repo or run `gh repo create`.** The repo is local. Site can build and run locally without the repo being public.
- **Don't post to GitHub or any other public surface.** No issues, no PRs, no comments. The site is read-only public; the contribution mechanism (issues/PRs) is for human contributors.
- **Don't burn build minutes silently.** Vercel builds cost time/money. Single deliberate runs, save artifacts to disk, iterate locally first. If a deploy is going to take more than a few minutes or cost real money, confirm with the user.
- **Don't modify the graph nodes themselves.** The site reads the graph; it doesn't edit it. If the build process reveals problems with node frontmatter (parse errors, broken edges), report them and let the user decide whether to fix the nodes or fix the parser.

---

## What to ask the user at session start

Before scaffolding the Next.js project:

1. Confirm the open decisions above (URL scheme, paper view source, homepage, search, theming, deploy target, contribution UI).
2. Confirm Next.js version (latest, presumed; check via `vercel:next-upgrade`).
3. Confirm package manager (pnpm / npm / yarn / bun).
4. Confirm whether to scaffold from `next-forge` (probably no — overkill) or plain `create-next-app`.
5. Ask whether the regen experiment produced output the user wants surfaced as the paper view, or whether to default to the original-whitepaper-with-anchors approach for now.

Then build.
