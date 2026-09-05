import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
const root = new URL("../dist/", import.meta.url);
const files = [];
async function walk(dir) {
  for (const f of await readdir(new URL(dir, root), { withFileTypes: true })) {
    const p = dir + f.name;
    if (f.isDirectory()) await walk(p + "/");
    else files.push(p);
  }
}
await walk("");
for (const route of [
  "index.html",
  "writing/index.html",
  "builds/index.html",
  "notes/index.html",
  "about/index.html",
  "search/index.html",
  "404.html",
  "rss.xml",
  "sitemap-index.xml",
])
  assert(files.includes(route), `Missing ${route}`);
for (const file of files.filter((f) => /\.(html|xml)$/.test(f))) {
  const html = await readFile(new URL(file, root), "utf8");
  assert(!html.includes("DRAFT_SENTINEL"), "Draft leaked");
  if (file.endsWith(".html")) {
    assert(html.includes('rel="canonical"'), `Missing canonical: ${file}`);
    assert(html.includes("og:image"), `Missing OG: ${file}`);
    for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      if (url.startsWith("//")) continue;
      const local = decodeURIComponent(url.slice(1));
      assert(
        files.includes(local) ||
          files.includes(local + "index.html") ||
          files.includes(local + "/index.html"),
        `Broken link ${url} in ${file}`,
      );
    }
  }
}
const article = await readFile(
  new URL("writing/the-model-is-only-half-the-system/index.html", root),
  "utf8",
);
assert(article.includes("astro-code"), "Missing Shiki");
assert(article.includes("application/ld+json"), "Missing article JSON-LD");
assert(article.includes("heading-anchor"), "Missing anchors");
for (const file of files.filter((f) => f.endsWith(".png"))) {
  const data = await readFile(new URL(file, root));
  assert(data.subarray(1, 4).toString() === "PNG", `Invalid PNG ${file}`);
}
assert(
  files.some((f) => f.startsWith("pagefind/")),
  "Missing search index",
);
console.log(
  `Verified ${files.length} generated files: routes, links, metadata, drafts, highlighting, feeds and PNG assets.`,
);
