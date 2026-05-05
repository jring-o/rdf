import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { loadGraph, getAllNodeIds } from "@/lib/graph";
import { buildBundle } from "@/lib/bundle";
import { GraphViewClient } from "@/components/graph-view-loader";
import { GraphLegend } from "@/components/graph-legend";
import { NodeBadge } from "@/components/node-badge";
import { LinkButton } from "@/components/link-button";
import { Separator } from "@/components/ui/separator";

export const dynamicParams = false;

export async function generateStaticParams() {
  const ids = await getAllNodeIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Bundle · ${id}`,
    description: `Depth-1 bundle around ${id}.`,
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [graph, bundle] = await Promise.all([loadGraph(), buildBundle(id)]);
  if (!bundle) notFound();
  const node = graph.nodes.get(id)!;

  const sortedNodes = bundle.nodes
    .filter((n) => !n.isAnchor)
    .sort((a, b) => a.id.localeCompare(b.id));

  const enrichedBundleNodes = bundle.nodes.map((n) => {
    const full = graph.nodes.get(n.id);
    return {
      ...n,
      status: full?.status,
      sections: full?.sections,
    };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="space-y-4 max-w-3xl">
        <LinkButton
          href={`/node/${node.id}`}
          variant="ghost"
          size="sm"
          className="font-sans text-xs -ml-2 self-start"
        >
          <ArrowLeft className="mr-1 h-3.5 w-3.5" />
          Back to {node.id}
        </LinkButton>
        <div className="flex items-center gap-2">
          <NodeBadge type={node.type} />
          <span className="font-mono text-xs text-muted-foreground">{node.id}</span>
        </div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Bundle around <span className="text-primary">{node.title}</span>
        </h1>
        <p className="text-muted-foreground">
          Depth-1 expansion: the anchor plus every node it directly points to
          or is pointed at. This is the bundle composed around this node when
          generating a narrative. {bundle.nodes.length} nodes,{" "}
          {bundle.edges.length} edges.
        </p>
      </header>

      <Separator className="my-8" />

      <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)_220px]">
        <aside className="lg:sticky lg:top-20 self-start">
          <GraphLegend />
        </aside>
        <div>
          <GraphViewClient
            nodes={enrichedBundleNodes}
            edges={bundle.edges}
            layout="concentric"
            anchorId={node.id}
            height={620}
          />
          <p className="mt-3 text-xs text-muted-foreground font-sans">
            Tip: scroll to zoom · drag to pan · click a node to open it.
          </p>
        </div>
        <aside className="self-start">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            In this bundle
          </p>
          <ul className="space-y-1 text-sm">
            <li className="rounded bg-primary/10 px-2 py-1">
              <Link
                href={`/node/${node.id}`}
                className="flex items-baseline gap-2 font-mono text-xs text-primary"
              >
                <span>{node.id}</span>
                <span className="truncate font-sans text-foreground">
                  {node.title}
                </span>
              </Link>
            </li>
            {sortedNodes.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/node/${n.id}`}
                  className="flex items-baseline gap-2 rounded px-2 py-1 hover:bg-accent/50"
                >
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                    {n.id}
                  </span>
                  <span className="truncate text-xs">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
