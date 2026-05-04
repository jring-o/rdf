import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LinkButton } from "@/components/link-button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "What is a discourse graph?",
  description:
    "How to read this site. The graph is canonical; every claim, evidence item, question, method, and source is addressable. The paper is one rendered view over it.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          About
        </p>
        <h1 className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight">
          What is a discourse graph, and why is the paper rendered as one?
        </h1>
      </div>

      <div className="prose-node mt-10 space-y-5 text-base leading-7">
        <p>
          A <strong>discourse graph</strong> is an alternative form of
          scientific communication. Instead of a single linear document, the
          argument is composed of typed nodes — Questions, Claims,
          Evidence, Methods, Sources — connected by typed edges:{" "}
          <em>addresses</em>, <em>supports</em>, <em>opposes</em>,{" "}
          <em>derived from</em>, <em>uses method</em>. Every node is
          self-contained, addressable, and individually contributable.
        </p>
        <p>
          The form was developed by{" "}
          <a
            href="https://discoursegraphs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Joel Chan, Matthew Akamatsu, and collaborators
          </a>
          , and refined inside Roam Research, Protocol Labs, and adjacent
          research communities. The Q/C/E/S core schema is small enough to
          remember; this project adds <strong>Method (M)</strong> as a fifth
          type for analytical instruments — taxonomies, formulas, frameworks
          — that Claims invoke but that are not Claims themselves.
        </p>

        <h2 className="font-heading">What discourse graphs change</h2>
        <p>
          The Resilient Data Futures whitepaper was written paper-first and
          then decomposed into a graph. That origin is unusual — discourse
          graphs are normally built incrementally, by contributors adding
          Questions, Claims, Evidence, and counter-evidence over time. We
          decomposed an existing paper to bootstrap the graph with real
          content, and to demonstrate what becomes possible once it exists.
        </p>
        <p>
          <strong>Contribution becomes node-shaped.</strong>{" "}
          The argument is contributable at the right grain. A counterclaim is a new node
          attached to the original, not a competing paper published
          somewhere else. A new piece of evidence is a new node, not a
          fight over a paragraph. A new question opens a line the existing
          graph doesn&apos;t address.
        </p>
        <p>
          <strong>Publishing becomes discrete.</strong> Instead of
          monolithic, time-bound releases on multi-year cycles, you publish
          when you have something to add — a single Claim, a single
          Evidence, a methodology fork. The unit of contribution shrinks to
          the unit of new understanding.
        </p>
        <p>
          <strong>Review changes shape.</strong> Reviewing a paragraph in a
          paper means arguing about wording. Reviewing a node means
          engaging directly with a Claim, an Evidence, a Source, or a
          Method — and the response, whether agreement, counterclaim, or
          methodology fork, lives as another node attached at the right
          edge.
        </p>
        <p>
          <strong>Credit becomes granular.</strong>{" "}
          Each node has its own ID and its own PID — citable independently. A Method, a Source,
          an Evidence, a Claim can be cited (and tracked) on its own merit.
          The contributor who proposed C-0017 gets credit when C-0017 is
          invoked, even when the paper that introduced it isn&apos;t.
          Funders, hiring committees, and citation indexes can resolve
          attribution to the unit of contribution rather than rolling it
          up into &ldquo;lead author of paper X.&rdquo;
        </p>
        <p>
          <strong>Narratives become snapshots.</strong> From the graph,
          narratives can be composed for any audience — academic paper,
          executive brief, blog post — without rewriting the underlying
          claims. They also evolve: the narrative composed today is one
          telling; the same narrative composed after the graph accumulates
          more evidence and counter-evidence is a different telling.
          Narratives stop being static artifacts. They become comfortable
          as snapshots of an evolving understanding.
        </p>
        <p>
          The original whitepaper, this site, and each composed narrative
          all derive from the same node files in <code>graph/</code>.
        </p>

        <h2 className="font-heading">How to read it</h2>
        <ul>
          <li>
            <strong>By topology</strong>:{" "}
            <Link href="/graph">/graph</Link> shows the whole argument at a
            glance. Nodes are colored by type; edges are colored by relation.
            Click any node to inspect its bundle — everything one hop away.
          </li>
          <li>
            <strong>As narratives</strong>:{" "}
            <Link href="/narratives">/narratives</Link> renders the original
            whitepaper that seeded the graph, section by section, with each
            citation linked to its Source node. A toggle at the top swaps to
            other narratives composed directly from the graph for different
            audiences and framings.
          </li>
          <li>
            <strong>By node</strong>: every node sits at{" "}
            <code>/node/&lt;ID&gt;</code>. Each page shows the prose body,
            outbound edges, inbound backlinks, and a deep link to open a
            GitHub issue about that one node.
          </li>
        </ul>

        <h2 className="font-heading">How to contribute</h2>
        <p>
          Discussion happens at node granularity. Open an issue with the{" "}
          <code>node:&lt;ID&gt;</code>{" "}
          label, or open a pull request that
          adds a counterclaim, counter-evidence, or a new question. The full
          contribution model lives in{" "}
          <a
            href="https://github.com/jring-o/resilient-data-futures/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTRIBUTING.md
          </a>
          .
        </p>

        <h2 className="font-heading">Further reading</h2>
        <ul>
          <li>
            <a
              href="https://discoursegraphs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              discoursegraphs.com
            </a>{" "}
            — the canonical Q/C/E framework and its provenance.
          </li>
          <li>
            <a
              href="https://research.protocol.ai/blog/2023/discourse-graphs-and-the-future-of-science/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discourse graphs and the future of science
            </a>{" "}
            — Protocol Labs' framing of the form's research-infrastructure
            implications.
          </li>
          <li>
            <a
              href="https://github.com/DiscourseGraphs/schemas"
              target="_blank"
              rel="noopener noreferrer"
            >
              DiscourseGraphs/schemas
            </a>{" "}
            — the underlying schema repository this work extends.
          </li>
        </ul>
      </div>

      <Separator className="my-12" />
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/graph">
          Open the topology
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </LinkButton>
        <LinkButton href="/narratives" variant="outline">
          Read the narratives
        </LinkButton>
      </div>
    </article>
  );
}
