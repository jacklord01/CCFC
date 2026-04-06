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

function mapContentfulEntry(item: any) {
  return {
    id: item.sys.id,
    title: item.fields.title || "",
    slug: item.fields.slug || item.sys.id,
    excerpt: item.fields.excerpt || "",
    body: item.fields.body || null,
    category: item.fields.category || "Club News",
    publishedDate: item.fields.publishedDate || item.sys.createdAt,
    author: item.fields.author || "CCFC",
    seoTitle: item.fields.seoTitle || item.fields.title || "",
    seoDescription: item.fields.seoDescription || item.fields.excerpt || "",
    featuredImage: item.fields.featuredImage?.fields?.file?.url
      ? `https:${item.fields.featuredImage.fields.file.url}`
      : null,
  };
}

export async function getArticleBySlug(slug: string) {
  try {
    const entries = await client.getEntries({
      content_type: "newsPost",
      "fields.slug": slug,
      include: 2,
    });

    if (entries.items.length > 0) {
      return mapContentfulEntry(entries.items[0]);
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

    return entries.items.map(mapContentfulEntry);
  } catch (err) {
    console.warn("Contentful fetch failed for getArticles", err);
    return [];
  }
}
