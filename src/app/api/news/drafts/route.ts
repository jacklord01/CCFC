import { NextResponse } from "next/server";
import * as contentful from "contentful";

export async function GET() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    return NextResponse.json({ error: "Missing Contentful credentials" }, { status: 500 });
  }

  try {
    const client = contentful.createClient({
      space: spaceId,
      accessToken: accessToken,
      host: "preview.contentful.com", // Fetch drafts
    });

    const entries = await client.getEntries({
      content_type: "news", // Target the news content type
      order: ["-sys.updatedAt"],
    });

    const formattedDrafts = entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      status: item.sys.publishedAt ? "PUBLISHED" : "DRAFT",
      excerpt: item.fields.excerpt || (item.fields.content ? item.fields.content.substring(0, 150) + "..." : ""),
      updatedAt: item.sys.updatedAt,
      slug: item.fields.slug || item.sys.id
    }));

    return NextResponse.json(formattedDrafts);
  } catch (err: any) {
    console.error("Contentful Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
