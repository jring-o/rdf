import { loadGraph } from "@/lib/graph";
import { NODE_TYPE_LABEL } from "@/lib/types";
import { GenerateClient } from "./generate-client";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Generate a narrative",
  description:
    "Compose a new narrative from the discourse graph on demand: pick an anchor, audience, length, and voice.",
};

export default async function GeneratePage() {
  const graph = await loadGraph();
  const options = Array.from(graph.nodes.values())
    .map((n) => ({
      id: n.id,
      title: n.title,
      type: n.type,
      typeLabel: NODE_TYPE_LABEL[n.type],
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="space-y-4 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Narratives · generator
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Compose a new narrative
        </h1>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Pick an anchor, set the form, audience, and voice, and the model
            composes a narrative from the depth-N neighborhood around that
            node. The graph is the source of truth — the model is told to cite
            by node ID and not to invent facts.
          </p>
          <p className="text-xs">
            Routes through OpenRouter with a free-tier fallback chain:
            Mistral Large → Gemini 2.5 Flash → Gemini 2.5 Flash-Lite. If the
            primary is rate-limited, the next one picks up.
          </p>
        </div>
      </header>

      <Separator className="my-10" />

      <GenerateClient nodes={options} />
    </div>
  );
}
