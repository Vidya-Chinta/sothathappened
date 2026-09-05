import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { published } from "../../utils/content";
export async function getStaticPaths() {
  const entries = [
    ...(await published("writing")),
    ...(await published("builds")),
    ...(await published("notes")),
  ];
  return [
    {
      params: { id: "home" },
      props: {
        title: "Engineering, AI, systems & questionable decisions.",
        tags: "AN INDEPENDENT TECHNICAL PUBLICATION",
      },
    },
    ...entries.map((e) => ({
      params: { id: `${e.collection}-${e.id}` },
      props: { title: e.data.title, tags: e.data.tags.join(" · ") },
    })),
  ];
}
export const GET: APIRoute = async ({ props }) => {
  const font = await readFile(
    new URL(
      "node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff",
      `file://${process.cwd()}/`,
    ),
  );
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "64px",
          background: "#f5f3ed",
          color: "#24251f",
          fontFamily: "Instrument Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                fontSize: 25,
                display: "flex",
                borderBottom: "1px solid #c9c9bd",
                paddingBottom: 25,
              },
              children: "SO THAT HAPPENED.",
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: props.title.length > 65 ? 60 : 76,
                lineHeight: 1.06,
                letterSpacing: -3,
                marginTop: 45,
                flexGrow: 1,
              },
              children: props.title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 19,
                color: "#b8401d",
                display: "flex",
                justifyContent: "space-between",
              },
              children: [
                { type: "span", props: { children: props.tags } },
                { type: "span", props: { children: "sothathappened.lol" } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Instrument Sans", data: font, weight: 600, style: "normal" },
      ],
    },
  );
  return new Response(new Uint8Array(new Resvg(svg).render().asPng()), {
    headers: { "Content-Type": "image/png" },
  });
};
