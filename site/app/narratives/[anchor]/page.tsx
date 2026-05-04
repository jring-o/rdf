import { notFound } from "next/navigation";
import Link from "next/link";

import { loadPaper, listNarrativeBundles } from "@/lib/paper";
import { loadGraph } from "@/lib/graph";
import { MarkdownProse } from "@/components/markdown-prose";
import { PaperViewToggle } from "@/components/paper-view-toggle";
import { NodeBadge } from "@/components/node-badge";
import { Separator } from "@/components/ui/separator";

export const dynamicParams = false;

export async function generateStaticParams() {
  const bundles = await listNarrativeBundles();
  return bundles.map((b) => ({ anchor: b.anchorId }));
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

export default async function NarrativePage({
  params,
}: {
  params: Promise<{ anchor: string }>;
}) {
  const { anchor } = await params;
  const [bundles, graph, paper] = await Promise.all([
    listNarrativeBundles(),
    loadGraph(),
    loadPaper(),
  ]);
  const bundle = bundles.find((b) => b.anchorId === anchor);
  if (!bundle) notFound();
  const anchorNode = graph.nodes.get(bundle.anchorId);

  const narrativeAnchors = bundles.map((b) => {
    const node = graph.nodes.get(b.anchorId);
    return { anchorId: b.anchorId, title: node?.title ?? b.anchorId };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="space-y-4 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Composed narrative · anchored at {bundle.anchorId}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {anchorNode?.title ?? bundle.anchorId}
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
              <span className="font-mono">{bundle.anchorId}</span>
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
              href={`/graph/${bundle.anchorId}`}
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              Inspect the bundle visually.
            </Link>
          </p>
        </div>

        <PaperViewToggle
          active={{ kind: "narrative", anchorId: bundle.anchorId }}
          narrativeAnchors={narrativeAnchors}
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

      <article
        className="mx-auto max-w-3xl min-w-0"
        data-pagefind-body
      >
        <MarkdownProse source={bundle.raw} />
      </article>
    </div>
  );
}
