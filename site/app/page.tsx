import Link from "next/link";
import { ArrowRight, Network, BookText, MessageSquareText, FileText, Workflow } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/link-button";
import { Separator } from "@/components/ui/separator";
import { loadGraph } from "@/lib/graph";
import { type NodeType } from "@/lib/types";
import { NodeBadge } from "@/components/node-badge";

const TYPE_BLURB: Record<NodeType, string> = {
  question: "Open lines the work addresses. Each Question gathers Claims that respond to it.",
  claim: "Assertions. Each Claim addresses a Question, may be supported or opposed by Evidence and other Claims.",
  evidence: "Specific empirical observations grounded in a Source. Each item supports or opposes a Claim.",
  method: "Analytical instruments — taxonomies, formulas, frameworks — that Claims invoke.",
  source: "References: papers, datasets, archived records. Provenance backstop for Evidence.",
};

const TYPE_ICON: Record<NodeType, React.ComponentType<{ className?: string }>> = {
  question: MessageSquareText,
  claim: FileText,
  evidence: Workflow,
  method: BookText,
  source: Network,
};

const TYPE_ANCHOR: Record<NodeType, string> = {
  question: "questions",
  claim: "claims",
  evidence: "evidence",
  method: "methods",
  source: "sources",
};

export default async function HomePage() {
  const graph = await loadGraph();
  const counts = (Object.entries(graph.byType) as [NodeType, unknown[]][]).map(
    ([type, list]) => ({ type, count: list.length }),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-3xl space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          A discourse graph
        </p>
        <h1 className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          Resilient Data Futures
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          The SciOS <em>Resilient Data Futures</em> whitepaper argues that
          research data loss is architectural; that the accumulated loss is
          an institutional liability; and that the solution to data loss
          hedges the liability while producing the data substrate AI-ready
          institutions are looking for. We publish that argument as a{" "}
          <strong className="text-foreground">discourse graph</strong> —
          every claim, evidence item, question, method, and source is its
          own addressable node. The graph is canonical. The paper is one
          rendered view over it.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <LinkButton href="/about" size="lg">
            What is a discourse graph?
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </LinkButton>
          <LinkButton href="/graph" variant="outline" size="lg">
            Explore the graph
          </LinkButton>
          <LinkButton href="/narratives" variant="ghost" size="lg">
            Read narratives
          </LinkButton>
        </div>
      </div>

      <Separator className="my-16" />

      <section className="space-y-8">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Five node types
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            The graph in numbers
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {counts.map(({ type, count }) => {
            const Icon = TYPE_ICON[type];
            return (
              <Link
                key={type}
                href={`/nodes#${TYPE_ANCHOR[type]}`}
                className="group"
              >
                <Card className="h-full transition-colors group-hover:border-primary/40">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <NodeBadge type={type} size="sm" />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-2 font-heading text-3xl font-semibold tabular-nums">
                      {count}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {TYPE_BLURB[type]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <Separator className="my-16" />

      <section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Three ways in
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Pick your projection
          </h2>
        </div>
        <div className="lg:col-span-2 grid gap-4">
          <ProjectionLink
            href="/graph"
            title="Topology"
            body="The whole graph at a glance. Nodes coloured by type, edges by relation. Filter, cluster, traverse."
          />
          <ProjectionLink
            href="/narratives"
            title="Narratives"
            body="The original whitepaper that seeded the graph, plus narratives composed from the graph's nodes for different audiences and framings."
          />
          <ProjectionLink
            href="/nodes"
            title="Per-node browse"
            body="Every node addressable on its own. Backlinks computed at build time so the graph is bidirectionally traversable."
          />
        </div>
      </section>
    </div>
  );
}

function ProjectionLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}
