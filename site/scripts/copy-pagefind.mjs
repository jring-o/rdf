// Mirror the pagefind index from out/pagefind into public/pagefind so that
// `pnpm dev` can also serve search after a build has been run at least once.
import { cp, mkdir, rm, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const src = path.resolve("out", "pagefind");
const dest = path.resolve("public", "pagefind");

try {
  await access(src, constants.R_OK);
} catch {
  console.warn(`[pagefind] no index at ${src}; skipping mirror to public/`);
  process.exit(0);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });
console.log(`[pagefind] mirrored ${src} → ${dest}`);
