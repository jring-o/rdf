import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="space-y-2 max-w-md">
          <p className="font-heading text-base font-semibold text-foreground">
            Resilient Data Futures
          </p>
          <p>
            A discourse graph rendering of the SciOS{" "}
            <em>Resilient Data Futures</em> whitepaper. Every claim, evidence
            item, question, method, and source is its own addressable node.
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            What is a discourse graph?
          </Link>
          <Link
            href="/nodes"
            className="hover:text-foreground transition-colors"
          >
            Browse all nodes
          </Link>
          <Link
            href="/graph"
            className="hover:text-foreground transition-colors"
          >
            Graph topology
          </Link>
          <p className="mt-2 text-xs">
            Content: CC BY 4.0 · Code: MIT · SciOS Working Group
          </p>
        </div>
      </div>
    </footer>
  );
}
