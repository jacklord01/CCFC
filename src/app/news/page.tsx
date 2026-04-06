import { getArticles } from "@/lib/contentful";
import { prisma } from "@/lib/prisma";
import NewsClient from "@/components/NewsClient";

export const dynamic = "force-dynamic";

function toTimestamp(value: any, fallback: any) {
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    try {
      const d = new Date(value);
      return isNaN(d.getTime()) ? new Date(fallback || 0).getTime() : d.getTime();
    } catch (e) {
      return new Date(fallback || 0).getTime();
    }
  }
  return new Date(fallback || 0).getTime();
}

export default async function NewsPage() {
  // Fetch from Contentful
  let contentfulArticles: any[] = [];
  try {
    contentfulArticles = await getArticles();
  } catch (err) {
    console.error("Contentful fetch failed for News Page", err);
  }
  
  let localArticles: any[] = [];
  try {
    // Fetch from Local DB
    localArticles = await prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 6
    });
  } catch (err) {
    console.error("Database connection failed for News Page", err);
  }

  // Transform local articles to match Contentful structure for the UI
  const transformedLocal = (localArticles || []).map(art => ({
    sys: { id: art.id, createdAt: art.createdAt || new Date() },
    fields: {
      title: art.title || "Untitled Report",
      details: art.excerpt || (art.content ? art.content.slice(0, 150) : "No details available."),
      date: art.publishedAt || art.createdAt || new Date(),
      slug: art.slug || `article-${art.id}`,
      category: art.category || "Update",
      featuredImage: art.imageUrl ? { fields: { file: { url: art.imageUrl } } } : null
    }
  }));

  // Combine and sort by date safely
  const allArticles = [...transformedLocal, ...(contentfulArticles || [])].sort((a, b) => {
    const dateA = toTimestamp(a?.fields?.date, a?.sys?.createdAt);
    const dateB = toTimestamp(b?.fields?.date, b?.sys?.createdAt);
    return dateB - dateA;
  });
  
  return (
    <main style={{ backgroundColor: "#FFFFFF", maxWidth: "1920px", margin: "0 auto" }}>
       {/* 1. Dark Hero Section */}
       <section style={{ 
         backgroundColor: "#0B111D", 
         color: "white", 
         padding: "80px 180px", 
         backgroundImage: "radial-gradient(circle at top right, rgba(0,135,81,0.2) 0%, transparent 60%)",
         textAlign: "center"
       }}>
          <h1 style={{ 
            fontSize: "60px", 
            fontWeight: 800, 
            marginBottom: "20px", 
            textTransform: "uppercase",
            letterSpacing: "-0.02em"
          }}>
            Latest Club News
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "20px", maxWidth: "800px", margin: "0 auto" }}>
            Stay up to date with match reports, club news, and community updates from Celtic Park.
          </p>
       </section>

       <NewsClient initialArticles={JSON.parse(JSON.stringify(allArticles))} />
    </main>
  );
}
