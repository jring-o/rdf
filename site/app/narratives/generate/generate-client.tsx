"use client";

import * as React from "react";
import { Sparkles, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarkdownProse } from "@/components/markdown-prose";
import { cn } from "@/lib/utils";

interface NodeOption {
  id: string;
  title: string;
  type: string;
  typeLabel: string;
}

type Audience = "academic" | "executive" | "blog" | "position";
type Length = "short" | "medium" | "long";
type Voice = "formal" | "conversational" | "plain";

const AUDIENCES: ReadonlyArray<{ value: Audience; label: string; hint: string }> = [
  { value: "academic", label: "Academic", hint: "Paper section, dense argument" },
  { value: "executive", label: "Executive", hint: "Top-line, what-it-means" },
  { value: "blog", label: "Blog", hint: "Lively, scene-setting" },
  { value: "position", label: "Position", hint: "Declarative, principled" },
];

const LENGTHS: ReadonlyArray<{ value: Length; label: string; hint: string }> = [
  { value: "short", label: "Short", hint: "~250–400 words" },
  { value: "medium", label: "Medium", hint: "~600–900 words" },
  { value: "long", label: "Long", hint: "~1.2k–1.8k words" },
];

const VOICES: ReadonlyArray<{ value: Voice; label: string; hint: string }> = [
  { value: "formal", label: "Formal", hint: "Third-person, careful" },
  { value: "conversational", label: "Conversational", hint: "Direct, contractions ok" },
  { value: "plain", label: "Plain", hint: "Jargon-free, concrete" },
];

export function GenerateClient({ nodes }: { nodes: NodeOption[] }) {
  const [anchorId, setAnchorId] = React.useState("");
  const [depth, setDepth] = React.useState<1 | 2>(1);
  const [audience, setAudience] = React.useState<Audience>("academic");
  const [length, setLength] = React.useState<Length>("medium");
  const [voice, setVoice] = React.useState<Voice>("formal");
  const [output, setOutput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const matched = nodes.find((n) => n.id === anchorId.trim());
  const canSubmit = !!matched && !streaming;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!matched) {
      setError("Pick a valid anchor (use the typeahead).");
      return;
    }
    setError(null);
    setOutput("");
    setStreaming(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          anchorId: matched.id,
          depth,
          audience,
          length,
          voice,
        }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        setError(msg || `Error ${res.status}`);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + chunk);
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setError((err as Error).message);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function handleStop() {
    abortRef.current?.abort();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
      <form onSubmit={handleSubmit} className="space-y-6 lg:sticky lg:top-20 self-start">
        <div className="space-y-2">
          <label
            htmlFor="anchor"
            className="block font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Anchor
          </label>
          <input
            id="anchor"
            list="anchor-options"
            value={anchorId}
            onChange={(e) => setAnchorId(e.target.value)}
            placeholder="Q-0003"
            className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            autoComplete="off"
            spellCheck={false}
          />
          <datalist id="anchor-options">
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.typeLabel} — {n.title}
              </option>
            ))}
          </datalist>
          {matched ? (
            <p className="text-xs text-muted-foreground">
              <span className="font-mono text-primary">{matched.typeLabel}</span>
              {" · "}
              {matched.title}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Type an ID like <code className="font-mono">C-0001</code> or
              start typing to search.
            </p>
          )}
        </div>

        <ChipGroup
          label="Depth"
          value={depth}
          onChange={setDepth}
          options={[
            { value: 1, label: "1 hop", hint: "Anchor + neighbors" },
            { value: 2, label: "2 hops", hint: "Wider neighborhood" },
          ]}
        />

        <ChipGroup
          label="Audience"
          value={audience}
          onChange={setAudience}
          options={AUDIENCES}
        />

        <ChipGroup
          label="Length"
          value={length}
          onChange={setLength}
          options={LENGTHS}
        />

        <ChipGroup
          label="Voice"
          value={voice}
          onChange={setVoice}
          options={VOICES}
        />

        <div className="flex items-center gap-2 pt-2">
          {streaming ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleStop}
              className="gap-2"
            >
              <Square className="h-3.5 w-3.5" />
              Stop
            </Button>
          ) : (
            <Button type="submit" disabled={!canSubmit} className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Generate
            </Button>
          )}
        </div>

        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
      </form>

      <article className="min-w-0">
        {!output && !streaming && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <Sparkles className="mx-auto mb-3 h-5 w-5 text-muted-foreground" />
            <p className="font-sans text-sm text-muted-foreground">
              Pick an anchor and press Generate. The narrative will stream in
              here.
            </p>
          </div>
        )}
        {(output || streaming) && (
          <div>
            {streaming && (
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-primary">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary align-middle" />
                {" "}streaming…
              </p>
            )}
            <MarkdownProse source={output} />
          </div>
        )}
      </article>
    </div>
  );
}

interface ChipOption<T extends string | number> {
  value: T;
  label: string;
  hint?: string;
}

function ChipGroup<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: ReadonlyArray<ChipOption<T>>;
}) {
  return (
    <div className="space-y-2">
      <p className="block font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-left text-xs transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent",
              )}
              title={opt.hint}
            >
              <span className="block font-medium">{opt.label}</span>
              {opt.hint && (
                <span
                  className={cn(
                    "block text-[10px]",
                    active ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {opt.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
