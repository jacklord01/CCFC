"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsClientProps {
  initialArticles: any[];
}

export default function NewsClient({ initialArticles }: NewsClientProps) {
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArticles.length >= 6); 

  // In a real app, this would fetch from an API route
  // For now, we'll implement the "See More" button to load from a helper API if needed
  // But since the user wants "Bullet Proof", let's assume we fetch from /api/news
  const handleSeeMore = async () => {
    setLoading(true);
    try {
      // Assuming we have or will have an api/news route
      const res = await fetch(`/api/news?page=${page + 1}&limit=6`);
      const data = await res.json();
      
      if (data.articles) {
        setArticles(prev => [...prev, ...data.articles]);
        setHasMore(data.hasMore);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Failed to fetch more news", error);
    }
    setLoading(false);
  };

  const mainArticles = articles.slice(0, 6);
  const sidebarArticles = articles.slice(6, 12);

  return (
    <section style={{ padding: "80px 180px", display: "flex", gap: "48px" }}>
      
      {/* Main Grid (Left) */}
      <div style={{ flex: "1 1 1200px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "32px", marginBottom: "60px" }}>
           {mainArticles.map((article: any) => {
             const { title, excerpt, publishedDate, featuredImage, slug, category } = article.fields;
             const imageUrl = featuredImage?.fields?.file?.url || "/football_stadium_1775346359306.png";
             
             return (
               <Link key={article.sys.id} href={`/news/${slug}`} style={{ textDecoration: "none" }}>
                 <div className="card card-flush" style={{ height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.2s ease" }}>
                    <div style={{ height: "240px", position: "relative", overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
                       <Image 
                         src={imageUrl.startsWith("//") ? `https:${imageUrl}` : imageUrl} 
                         alt={title}
                         fill
                         style={{ objectFit: "cover" }}
                       />
                       <span style={{ 
                         position: "absolute", top: "15px", left: "15px", 
                         backgroundColor: "#008236", color: "white", 
                         padding: "6px 14px", fontSize: "12px", fontWeight: "800", 
                         borderRadius: "6px", textTransform: "uppercase" 
                       }}>
                         {category || "Update"}
                       </span>
                    </div>
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                       <div style={{ color: "#6B7280", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                         <span>📅</span> {new Date(publishedDate || article.sys.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                       </div>
                       <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0B111D", margin: 0, lineHeight: "1.3" }}>{title}</h3>
                       <p style={{ color: "#6B7280", fontSize: "15px", margin: 0, lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                         {excerpt}
                       </p>
                       <div style={{ marginTop: "auto", color: "#008236", fontWeight: "700", fontSize: "16px", display: "flex", alignItems: "center", gap: "4px" }}>
                         Read More <span style={{ fontSize: "18px" }}>→</span>
                       </div>
                    </div>
                 </div>
               </Link>
             );
           })}
        </div>

        {/* Load More button */}
        {hasMore && (
           <div style={{ textAlign: "center" }}>
              <button 
                onClick={handleSeeMore}
                disabled={loading}
                style={{ 
                   padding: "14px 40px", backgroundColor: "#008236", color: "white", 
                   border: "none", borderRadius: "8px", fontWeight: "800", fontSize: "16px", 
                   cursor: "pointer", boxShadow: "0 10px 20px rgba(0,130,54,0.15)"
                }}>
                 {loading ? "Loading..." : "See More News"}
              </button>
           </div>
        )}
      </div>

      {/* Sidebar (Right) */}
      <aside style={{ width: "320px", flexShrink: 0, borderLeft: "1px solid #EAEAEA", paddingLeft: "48px" }}>
         <h3 style={{ fontSize: "16px", fontWeight: 900, color: "#111827", textTransform: "uppercase", marginBottom: "32px", letterSpacing: "0.05em" }}>
           Other Articles
         </h3>
         <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {sidebarArticles.map((article: any, idx) => (
              <Link key={article.sys.id} href={`/news/${article.fields.slug}`} style={{ textDecoration: "none", display: "flex", gap: "16px" }}>
                 <span style={{ fontSize: "20px", fontWeight: 900, color: "#D1D5DB" }}>{idx + 1}.</span>
                 <div>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#374151", margin: "0 0 4px 0", lineHeight: "1.4" }}>{article.fields.title}</h4>
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>{new Date(article.fields.publishedDate || article.sys.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                 </div>
              </Link>
            ))}
            {sidebarArticles.length === 0 && (
              <p style={{ color: "#9CA3AF", fontSize: "14px", fontStyle: "italic" }}>More articles coming soon...</p>
            )}
         </div>

         {/* Newsletter/Social CTA in Sidebar */}
         <div style={{ marginTop: "60px", backgroundColor: "#F9FAFB", padding: "24px", borderRadius: "12px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 800, marginBottom: "12px", color: "#111827" }}>STAY NOTIFIED</h4>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: "1.5", marginBottom: "16px" }}>Follow our WhatsApp channel for instant match results.</p>
            <Link href="/contact" style={{ fontSize: "14px", fontWeight: "700", color: "#008236", textDecoration: "none" }}>Join Now →</Link>
         </div>
      </aside>

    </section>
  );
}
