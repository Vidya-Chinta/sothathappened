import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
export default defineConfig({
  site: "https://sothathappened.lol",
  output: "static",
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.endsWith("/search/") }),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: false,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolink,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to this section",
          },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },
});
