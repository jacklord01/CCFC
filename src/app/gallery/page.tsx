"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GalleryUploadModal from "@/components/GalleryUploadModal";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, [activeCategory]);

  const fetchGallery = async () => {
    let url = "/api/gallery";
    if (activeCategory !== "ALL") {
      url += `?category=${activeCategory}`;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setItems([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "ALL", label: "All Photos" },
    { id: "MATCHES", label: "Matches" },
    { id: "TEAMS", label: "Teams" },
    { id: "YOUTH", label: "Youth" },
    { id: "EVENTS", label: "Events" },
  ];

  return (
    <main>
       {/* Dark Hero matching Figma */}
       <section style={{ backgroundColor: "var(--footer-bg)", color: "white", textAlign: "center", padding: "6rem 1rem", backgroundImage: "linear-gradient(rgba(11, 15, 25, 0.8), rgba(11, 15, 25, 0.9)), url('/football_stadium_1775346359306.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "white" }}>Photo Gallery</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.1rem", marginBottom: "2rem" }}>Browse our collection of match photos, team events, and community moments</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: "#25D366", color: "white", padding: "12px 24px", borderRadius: "50px", border: "none", fontWeight: "700", fontSize: "1rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(37, 211, 102, 0.3)" }}>
            Share Your Photos
          </button>
       </section>

       <section className="section-white">
         <div className="container">
            
            {/* Filter Navigation Tabs */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap" }}>
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   style={{
                     backgroundColor: activeCategory === cat.id ? "var(--footer-bg)" : "white",
                     color: activeCategory === cat.id ? "white" : "var(--text-main)",
                     padding: "0.5rem 1.5rem",
                     borderRadius: "4px",
                     border: activeCategory === cat.id ? "none" : "1px solid var(--border-color)",
                     fontWeight: "600",
                     cursor: "pointer",
                     transition: "all 0.2s ease"
                   }}
                 >
                   {cat.label}
                 </button>
               ))}
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem" }}>Loading gallery...</div>
            ) : items.length > 0 ? (
               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ width: "100%", height: "250px", position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                       <Image 
                         src={item.url} 
                         alt={item.caption || "Gallery Photo"} 
                         fill 
                         style={{ objectFit: "cover" }}
                       />
                       {item.caption && (
                         <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white", fontSize: "12px" }}>
                           {item.caption}
                         </div>
                       )}
                    </div>
                  ))}
               </div>
            ) : (
               <div style={{ textAlign: "center", padding: "4rem", color: "#6b7280" }}>
                  No photos found in this category. Be the first to upload one!
               </div>
            )}

         </div>
       </section>

       <GalleryUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
