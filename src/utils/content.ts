import { getCollection, type CollectionEntry } from "astro:content";
export type Entry =
  | CollectionEntry<"writing">
  | CollectionEntry<"builds">
  | CollectionEntry<"notes">;
export async function published(collection: "writing" | "builds" | "notes") {
  return (await getCollection(collection))
    .filter((e) => !e.data.draft && e.data.publishedAt <= new Date())
    .sort((a, b) => +b.data.publishedAt - +a.data.publishedAt);
}
export const href = (entry: Entry) => `/${entry.collection}/${entry.id}/`;
