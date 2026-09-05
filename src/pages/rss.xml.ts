import rss from "@astrojs/rss";
import { published, href } from "../utils/content";
export async function GET() {
  const entries = [
    ...(await published("writing")),
    ...(await published("notes")),
  ].sort((a, b) => +b.data.publishedAt - +a.data.publishedAt);
  return rss({
    title: "So That Happened",
    description: "Engineering, AI, systems & questionable decisions.",
    site: "https://sothathappened.lol",
    items: entries.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.publishedAt,
      link: href(e),
      categories: e.data.tags,
    })),
    customData: "<language>en</language>",
  });
}
