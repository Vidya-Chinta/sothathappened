/** Stable slugs can back /topics/[slug]/ when topic pages are introduced. */
export interface Topic {
  slug: string;
  title: string;
  description: string;
  href?: string;
}
export const topics: Topic[] = [
  {
    slug: "ai-agents",
    title: "AI & Agents",
    description: "Making machines do things.",
  },
  {
    slug: "distributed-systems",
    title: "Distributed Systems",
    description: "Everything is fine until the network gets involved.",
  },
  {
    slug: "backend",
    title: "Backend",
    description: "The part nobody sees until it breaks.",
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    description: "Where simple ideas go to become expensive.",
  },
  {
    slug: "cloud",
    title: "Cloud",
    description: "Someone else’s computer, now with billing alerts.",
  },
  {
    slug: "startups",
    title: "Startups",
    description: "Making decisions before we have enough information.",
  },
  {
    slug: "leadership",
    title: "Leadership",
    description: "Apparently, code isn't the hard part.",
  },
];
