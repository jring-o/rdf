# Review skills

Three Claude Code skills that help maintainers and contributors check a draft node before it lands. They run locally in your terminal, read-only — they print reasoning and recommendations, never modify files or post comments.

| Skill | What it does |
|---|---|
| `node-dedup` | Walks the proposed node's structural neighborhood and judges whether it duplicates anything already in the graph. |
| `node-edge-resolution` | Verifies or corrects stated edge references — both prose mentions in the body and structured edges in the YAML. |
| `node-edge-creation` | Walks the graph and surfaces argumentatively-close nodes the proposed node should connect to but doesn't. |

All three depend on `tools/walk.mjs` (the semantic-walk retrieval utility) which is already in the repo.

## Install

These skills are committed to the repo here as the source of truth. To use them, copy into Claude Code's skills directory:

**Project-scoped (recommended)** — skills only active when you have this repo open:

```bash
mkdir -p .claude/skills
cp -r skills/* .claude/skills/
```

**User-scoped** — skills available in every Claude Code session:

```bash
mkdir -p ~/.claude/skills
cp -r skills/* ~/.claude/skills/
```

Restart your Claude Code session (or just open the project) and the skills become invokable as `/node-dedup`, `/node-edge-resolution`, and `/node-edge-creation`.

## Usage

Each skill takes either a path to a draft node file or an existing node ID:

```
/node-dedup graph/claims/C-0054.md
/node-edge-resolution C-0017
/node-edge-creation graph/evidence/E-0113.md
```

The skill descriptions also auto-trigger on natural-language phrasing — "is this a duplicate?", "what edges am I missing?", "verify the edges on this draft", etc.

## Updating

If you change a skill in `.claude/skills/<name>/`, copy it back here so the change ships with the repo:

```bash
cp -r .claude/skills/<name>/* skills/<name>/
```

Then commit. (The `.claude/` directory itself is gitignored to keep local state private.)
