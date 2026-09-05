import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const base = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  sample: z.boolean().default(false),
  canonical: z.string().url().optional(),
});
const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: base.extend({
    featured: z.boolean().default(false),
    series: z.string().optional(),
    cover: z.string().optional(),
  }),
});
const builds = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/builds" }),
  schema: base.extend({
    status: z.enum(["Exploring", "Building", "Shipped", "Archived"]),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    technologies: z.array(z.string()).default([]),
  }),
});
const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: base,
});
export const collections = { writing, builds, notes };
