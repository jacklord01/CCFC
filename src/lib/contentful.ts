import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID || "";
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || "";
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN || "";

const hasCredentials = space && accessToken;

export const client = hasCredentials ? createClient({
  space,
  accessToken,
}) : null;

export const previewClient = (space && previewToken) ? createClient({
  space,
  accessToken: previewToken,
  host: "preview.contentful.com",
}) : null;

export async function getArticleBySlug(slug: string) {
  if (!client) return null;
  try {
    const entries = await client.getEntries({
      content_type: "news",
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
  if (!client) return [];
  try {
    const entries = await client.getEntries({
      content_type: "news",
      order: ["-sys.createdAt"],
      include: 2,
    });

    return entries.items;
  } catch (err) {
    console.warn("Contentful fetch failed for getArticles", err);
    return [];
  }
}
