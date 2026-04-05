import { getArticles } from "@/lib/contentful";
import { prisma } from "@/lib/prisma";
import NewsClient from "@/components/NewsClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  // Fetch from Contentful
  const contentfulArticles = await getArticles();
  
  // Fetch from Local DB
  const localArticles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 6
  });

  // Transform local articles to match Contentful structure for the UI
  const transformedLocal = localArticles.map(art => ({
    sys: { id: art.id, createdAt: art.createdAt },
    fields: {
      title: art.title,
      details: art.excerpt || art.content.slice(0, 150),
      date: art.publishedAt || art.createdAt,
      slug: art.slug,
      category: art.category,
      featuredImage: art.imageUrl ? { fields: { file: { url: art.imageUrl } } } : null
    }
  }));

  // Combine and sort by date
  const allArticles = [...transformedLocal, ...contentfulArticles].sort((a, b) => {
    const dateA = new Date(a.fields.date || a.sys.createdAt).getTime();
    const dateB = new Date(b.fields.date || b.sys.createdAt).getTime();
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
