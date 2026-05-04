import { ExternalLink, MessageSquare } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { GraphNode } from "@/lib/types";
import { cn } from "@/lib/utils";

const REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO ?? "jring-o/resilient-data-futures";

const TEMPLATE_BY_TYPE: Record<GraphNode["type"], string> = {
  question: "new-question.md",
  claim: "node-comment.md",
  evidence: "node-comment.md",
  method: "node-comment.md",
  source: "node-comment.md",
};

export function GithubIssueButton({ node }: { node: GraphNode }) {
  const template = TEMPLATE_BY_TYPE[node.type] ?? "node-comment.md";
  const labels = encodeURIComponent(`node:${node.id}`);
  const title = encodeURIComponent(`[${node.id}] ${node.title}`);
  const body = encodeURIComponent(
    `Discussion of node \`${node.id}\` — ${node.title}\n\n` +
      `<!-- describe the change you'd like to propose, or the question you have -->\n`,
  );
  const href = `https://github.com/${REPO}/issues/new?template=${template}&labels=${labels}&title=${title}&body=${body}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-sans text-xs")}
    >
      <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
      Discuss this node
      <ExternalLink className="ml-1.5 h-3 w-3 text-muted-foreground" />
    </a>
  );
}
