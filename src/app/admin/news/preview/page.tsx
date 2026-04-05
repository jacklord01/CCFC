"use client";

import { useState, useEffect } from "react";

export default function AdminNewsPreviewPage() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasKeys, setHasKeys] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news/drafts");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setDrafts(data);
    } catch (err) {
      console.error("Error fetching drafts:", err);
      setDrafts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Contentful News Previews</h1>
          <p style={{ color: "#6b7280" }}>Review and approve News & Match Reports before they go public on the website.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
           <button onClick={fetchDrafts} style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "10px 20px", borderRadius: "6px", border: "1px solid #d1d5db", fontWeight: "600", cursor: "pointer" }}>
             Refresh Drafts
           </button>
           <a href="https://app.contentful.com/" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#2432d1", color: "white", padding: "10px 20px", borderRadius: "6px", textDecoration: "none", fontWeight: "600", fontSize: "14px", display: "flex", alignItems: "center" }}>
             Open Contentful App
           </a>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>Fetching drafts from Contentful...</div>
      ) : drafts.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
           {drafts.map((draft) => (
             <div key={draft.id} style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                   <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0B111D" }}>{draft.title || "[No Title]"}</h2>
                   <span style={{ 
                     backgroundColor: draft.status === "PUBLISHED" ? "#dcfce7" : "#fff7ed", 
                     color: draft.status === "PUBLISHED" ? "#166534" : "#c2410c", 
                     padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" 
                   }}>
                     {draft.status}
                   </span>
                </div>
                <p style={{ color: "#4b5563", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>{draft.excerpt || "No excerpt provided for this draft."}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #f3f4f6" }}>
                   <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      Last updated: <strong>{mounted ? new Date(draft.updatedAt).toLocaleDateString() : "Loading..."}</strong>
                   </div>
                   <div style={{ display: "flex", gap: "12px" }}>
                      <a href={`/news/${draft.slug}?preview=true`} target="_blank" style={{ background: "none", border: "1px solid #d1d5db", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer", textDecoration: "none", color: "inherit" }}>
                        View Full Preview
                      </a>
                      <button style={{ backgroundColor: "#008236", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                        Publish to Live
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "6rem", backgroundColor: "#f9fafb", borderRadius: "16px", border: "1px dashed #d1d5db" }}>
          <h3 style={{ color: "#0B111D", marginBottom: "8px" }}>No Drafts Found</h3>
          <p style={{ color: "#6b7280" }}>Make sure you have content in Contentful with the content type ID "news".</p>
        </div>
      )}
    </div>
  );
}
