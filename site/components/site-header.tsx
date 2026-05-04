import Link from "next/link";
import { Network } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchTrigger } from "@/components/search-trigger";

const NAV = [
  { href: "/graph", label: "Graph" },
  { href: "/narratives", label: "Narratives" },
  { href: "/nodes", label: "Nodes" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-base font-semibold tracking-tight"
        >
          <Network className="h-4 w-4 text-primary" />
          <span>Resilient Data Futures</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-sans text-muted-foreground md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchTrigger />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
