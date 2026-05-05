import { notFound } from "next/navigation";
import Link from "next/link";

import {
  loadPaper,
  listNarratives,
  pickPrimary,
  type Narrative,
} from "@/lib/paper";
import { loadGraph } from "@/lib/graph";
import { MarkdownProse } from "@/components/markdown-prose";
import {
  PaperViewToggle,
  type PaperToggleNarrative,
} from "@/components/paper-view-toggle";
import { BundleSummary, type BundleSummaryData } from "@/components/bundle-summary";
import { NodeBadge } from "@/components/node-badge";
import { Separator } from "@/components/ui/separator";
import type { NodeType } from "@/lib/types";

export const dynamicParams = false;

export async function generateStaticParams() {
  const narratives = await listNarratives();
  const anchors = new Set(narratives.map((n) => n.anchorId));
  return Array.from(anchors).map((anchor) => ({ anchor }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ anchor: string }>;
}) {
  const { anchor } = await params;
  return {
    title: `Composed narrative · ${anchor}`,
    description: `A narrative composed from the discourse graph, anchored at ${anchor}.`,
  };
}

function sidecarToSummaryData(
  sidecar: NonNullable<Narrative["sidecar"]>,
): BundleSummaryData {
  const bundle = sidecar.bundle ?? "1-hop";
  const breadth = sidecar.breadth;
  const strategyLabel =
    bundle === "semantic"
      ? `semantic walk${breadth ? ` · ${breadth}` : ""}`
      : `${bundle === "2-hop" ? 2 : 1}-hop walk`;
  return {
    anchor: sidecar.anchor,
    nodes: sidecar.nodes.map((n) => ({
      id: n.id,
      type: n.type as NodeType,
      title: n.title,
      isAnchor: n.isAnchor,
    })),
    edges: sidecar.edges,
    strategyLabel,
  };
}

function buildToggleNarratives(
  all: Narrative[],
  graphTitleFor: (anchorId: string) => string,
): PaperToggleNarrative[] {
  const byAnchor = new Map<string, Narrative[]>();
  for (const n of all) {
    const list = byAnchor.get(n.anchorId) ?? [];
    list.push(n);
    byAnchor.set(n.anchorId, list);
  }
  return all.map((n) => {
    const anchorList = byAnchor.get(n.anchorId) ?? [];
    const primary = pickPrimary(anchorList);
    const isPrimary = primary?.shortId === n.shortId;
    const formBits = [n.frontmatter.audience, n.frontmatter.voice].filter(
      (s): s is string => Boolean(s),
    );
    return {
      slug: n.slug,
      anchorId: n.anchorId,
      href: isPrimary
        ? `/narratives/${n.anchorId}`
        : `/narratives/${n.anchorId}/${n.shortId}`,
      title: graphTitleFor(n.anchorId),
      sublabel: formBits.length ? formBits.join(" · ") : "Composed · anchored",
    };
  });
}

export default async function NarrativePage({
  params,
}: {
  params: Promise<{ anchor: string }>;
}) {
  const { anchor } = await params;
  const [narratives, graph, paper] = await Promise.all([
    listNarratives(),
    loadGraph(),
    loadPaper(),
  ]);
  const forAnchor = narratives.filter((n) => n.anchorId === anchor);
  const primary = pickPrimary(forAnchor);
  if (!primary) notFound();
  const variants = forAnchor.filter((n) => n.shortId !== primary.shortId);
  const anchorNode = graph.nodes.get(primary.anchorId);

  const toggleNarratives = buildToggleNarratives(narratives, (id) => {
    const node = graph.nodes.get(id);
    return node?.title ?? id;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="space-y-4 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Composed narrative · anchored at {primary.anchorId}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {anchorNode?.title ?? primary.anchorId}
        </h1>

        <div className="space-y-3 text-muted-foreground">
          <p>
            Discourse graphs aren&apos;t designed to be read linearly. Once a
            graph exists — whether decomposed from a paper, accumulated
            through contributions, or both — narratives can be composed from
            its nodes for any audience: an academic paper, an executive
            brief, a blog post, a position statement.
          </p>
          <p>
            This page is one such narrative. The depth-1 neighborhood around{" "}
            {anchorNode ? (
              <Link
                href={`/node/${anchorNode.id}`}
                className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                <span className="inline-flex items-center gap-1.5">
                  <NodeBadge type={anchorNode.type} size="sm" />
                  {anchorNode.id}
                </span>
              </Link>
            ) : (
              <span className="font-mono">{primary.anchorId}</span>
            )}{" "}
            — the anchor node plus everything one hop away — was bundled and
            handed to a language model with framing rules: cite Sources by
            graph ID, don&apos;t invent facts, leave gaps marked. The graph
            is the source of truth; this is one telling. Inline IDs link
            back to their canonical nodes.
          </p>
          <p className="text-xs">
            Want to see the bundle this narrative drew from?{" "}
            <Link
              href={`/graph/${primary.anchorId}`}
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              Inspect the bundle visually.
            </Link>
          </p>
          {variants.length > 0 && (
            <p className="text-xs">
              {variants.length} other variant{variants.length === 1 ? "" : "s"}{" "}
              for this anchor:{" "}
              {variants.map((v, i) => (
                <span key={v.shortId}>
                  <Link
                    href={`/narratives/${v.anchorId}/${v.shortId}`}
                    className="font-mono text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                  >
                    {v.shortId}
                  </Link>
                  {i < variants.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}
        </div>

        <PaperViewToggle
          active={{ kind: "narrative", slug: primary.slug }}
          narratives={toggleNarratives}
        />
        {!paper.raw ? null : (
          <p className="text-xs text-muted-foreground">
            Looking for the source paper this graph was decomposed from?{" "}
            <Link href="/narratives" className="text-primary underline">
              Read the original whitepaper.
            </Link>
          </p>
        )}
      </header>

      <Separator className="my-10" />

      {primary.sidecar && (
        <div className="mx-auto max-w-3xl mb-10">
          <BundleSummary
            data={sidecarToSummaryData(primary.sidecar)}
            defaultOpen={false}
          />
        </div>
      )}

      <article
        className="mx-auto max-w-3xl min-w-0"
        data-pagefind-body
      >
        <MarkdownProse source={primary.body} />
      </article>
    </div>
  );
}
