// Entry program for the make.fun news-image-20261122 bounty.
// Copies the pre-built front-page image (entry.png, 1024x1024, under 1 MiB)
// from this repository to the output directory.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
// Fail fast on an empty or oversized image instead of copying a bad entry.
const size = statSync(src).size;
if (size === 0 || size > 1048576) {
  throw new Error(`entry.png is ${size} bytes (must be 1..1048576)`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "output");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log("wrote entry.png");
