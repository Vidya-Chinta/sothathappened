# So That Happened

An independent technical publication. Astro 5, TypeScript, MDX, Tailwind 4, Shiki, Pagefind, RSS, and sitemap. Static HTML; no database, auth, CMS, or client framework.

## Local development

Use Node 22.19+ (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

`npm run check` validates Astro and TypeScript. `npm run build` runs checks, generates all routes and social images, then indexes the output with Pagefind. `npm run preview` serves the finished build. Search requires a production build; it gracefully reports its absence in development. `npm run format` formats source.

## Publishing content

Add Markdown or MDX under `src/content/writing`, `src/content/builds`, or `src/content/notes`. The filename determines the URL. Schemas are in `src/content.config.ts`.

```yaml
---
title: Your article title
description: A useful, specific summary.
publishedAt: 2026-09-05
draft: true
featured: false
tags: [Engineering]
---
```

Writing also supports `updatedAt`, `series`, `cover`, and an absolute `canonical`. Builds require `status` (Exploring, Building, Shipped, Archived), and accept `technologies`, `github`, and `demo`. Notes use the smaller shared schema. Reading time is calculated. The newest featured writing is selected for the homepage.

Drafts and future-dated entries are excluded from generated detail pages, indexes, RSS, sitemap, social cards, and search. `draft-check.md` is a deliberate exclusion fixture.

The three starter essays and two notes are illustrative, not claims about Vidya’s real projects. They are isolated in content files with `sample: true` as internal editorial metadata. This flag does not display a reader-facing notice. The build notebook describes this implementation.

MDX supports local Astro components (see `Aside.astro`), GFM tables, footnotes, highlighted code, and heading anchors. Keep images local, with useful alternative text. Use portable Markdown wherever possible.

## Design and accessibility

Shared light/dark tokens are in `src/styles/global.css`; prose and code styles have separate files. Fonts are self-hosted through Fontsource. A head script applies the stored or system theme before painting; browser storage failure is tolerated. Navigation remains visible on mobile. Reduced motion, visible focus, semantic elements, a skip link, and horizontally scrollable code/tables are included.

Article-specific 1200×630 PNG social cards are rendered deterministically at build time with Satori and Resvg. They use local fonts and require no remote generation service. The canonical origin is `https://sothathappened.lol` in Astro configuration and RSS.

`Comments.astro` is the replaceable future discussion boundary. There is no comment form or fake submission. Personal GitHub, LinkedIn, and email links are intentionally absent until verified addresses are provided. No tracking is installed.

## Vercel deployment

1. Push this directory as a GitHub repository.
2. Import that repository in Vercel with the Astro preset and Node 22.
3. Use `npm run build` and the `dist` output directory (also set in `vercel.json`).
4. Add `sothathappened.lol` in Vercel’s domain settings and apply the DNS records it provides.

No environment variables are needed. No Vercel adapter is required for static output. Vercel serves the generated `404.html` for unknown routes. This workspace does not create a GitHub remote, connect a Vercel account, or change domain DNS automatically.

## Verification

`npm run build` checks types and generates the search index. `node scripts/verify.mjs` checks generated routes, internal links and assets, draft exclusion, metadata, feeds, syntax highlighting, and social image signatures. Responsive/browser QA covers 375, 768, 1024, and 1440px, theme persistence, keyboard navigation, and real search results against the production preview.
