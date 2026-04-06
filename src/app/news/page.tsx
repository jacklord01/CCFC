import { getArticles } from "@/lib/contentful";
import NewsClient from "@/components/NewsClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let contentfulArticles: any[] = [];
  try {
    contentfulArticles = await getArticles();
  } catch (err) {
    console.error("Contentful fetch failed for News Page", err);
  }

  const transformedContentful = (contentfulArticles || []).map(art => ({
    sys: { id: art?.sys?.id || Math.random().toString(), createdAt: art?.sys?.createdAt || new Date() },
    fields: {
      title: art?.fields?.title || "Untitled",
      excerpt: art?.fields?.excerpt || "",
      publishedDate: art?.fields?.publishedDate || art?.sys?.createdAt || new Date(),
      slug: art?.fields?.slug || `article-${art?.sys?.id}`,
      category: art?.fields?.category || "Club News",
      featuredImage: art?.fields?.featuredImage?.fields?.file?.url 
        ? { fields: { file: { url: art.fields.featuredImage.fields.file.url } } } 
        : null
    }
  }));
  
  return (
    <main style={{ backgroundColor: "#FFFFFF", maxWidth: "1920px", margin: "0 auto" }}>
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

       <NewsClient initialArticles={transformedContentful} />
    </main>
  );
}
