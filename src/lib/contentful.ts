import { createClient } from "contentful";

const required = [
  "CONTENTFUL_SPACE_ID",
  "CONTENTFUL_ACCESS_TOKEN"
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required Contentful environment variable: ${key}`);
  }
}

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN || accessToken;

export const client = createClient({
  space,
  accessToken,
});

export const previewClient = createClient({
  space,
  accessToken: previewToken,
  host: "preview.contentful.com",
});

export async function getArticleBySlug(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: "newsPost",
      "fields.slug": slug,
      include: 2,
    });

    if (entries.items.length > 0) {
      return entries.items[0];
    }
  } catch (err) {
    console.warn("Contentful fetch failed for getArticleBySlug", err);
  }
  return null;
}

export async function getArticles() {
  try {
    const entries = await client.getEntries({
      content_type: "newsPost",
      order: ["-fields.publishedDate"],
      include: 2,
    });

    return entries.items;
  } catch (err) {
    console.warn("Contentful fetch failed for getArticles", err);
    return [];
  }
}
