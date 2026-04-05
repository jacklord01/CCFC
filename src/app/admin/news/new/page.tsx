"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, Image as ImageIcon, Send, ArrowLeft, 
  Settings, Layout, Type, Globe, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "UPDATE",
    isPublished: false,
    imageUrl: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/news"), 1500);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <CheckCircle2 size={80} color="#008236" style={{ marginBottom: "24px" }} />
        <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#111827" }}>Article Published</h2>
        <p style={{ color: "#6B7280", marginTop: "12px" }}>The site is being updated with your new post...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0B111D", marginBottom: "8px" }}>Dispatch News</h1>
          <p style={{ color: "#6b7280" }}>Broadcast club updates, results, and stories directly to the public site.</p>
        </div>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#4B5563", textDecoration: "none", fontWeight: "700" }}>
           <ArrowLeft size={18} /> Cancel & Return
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px" }}>
        
        {/* Left: Editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <section style={{ backgroundColor: "white", padding: "40px", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
            <div style={{ marginBottom: "32px" }}>
               <label style={{ display: "block", fontSize: "14px", fontWeight: "800", color: "#374151", marginBottom: "12px", textTransform: "uppercase" }}>Article Headline</label>
               <input 
                 type="text" placeholder="e.g. Juniors Clinch League Title" required 
                 value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                 style={{ width: "100%", padding: "18px", borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "24px", fontWeight: "800", color: "#111827" }}
               />
            </div>

            <div style={{ marginBottom: "32px" }}>
               <label style={{ display: "block", fontSize: "14px", fontWeight: "800", color: "#374151", marginBottom: "12px", textTransform: "uppercase" }}>Brief Excerpt</label>
               <textarea 
                 placeholder="Quick summary for the news feed (1-2 sentences)..." rows={3}
                 value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                 style={{ width: "100%", padding: "18px", borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "16px", lineHeight: "1.6" }}
               />
            </div>

            <div>
               <label style={{ display: "block", fontSize: "14px", fontWeight: "800", color: "#374151", marginBottom: "12px", textTransform: "uppercase" }}>Full Article Content</label>
               <textarea 
                 placeholder="Write your story here. Use line breaks for paragraphs." rows={15} required
                 value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                 style={{ width: "100%", padding: "18px", borderRadius: "12px", border: "1px solid #E5E7EB", fontSize: "16px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}
               />
            </div>
          </section>

        </div>

        {/* Right: Settings */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
           
           <section style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                 <Settings size={20} color="#008236" />
                 <h2 style={{ fontSize: "18px", fontWeight: "800" }}>Publication Settings</h2>
              </div>

              <div style={{ marginBottom: "24px" }}>
                 <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#9CA3AF", marginBottom: "8px", textTransform: "uppercase" }}>Category</label>
                 <select 
                   value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                   style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "14px", fontWeight: "700" }}
                 >
                    <option value="UPDATE">General Update</option>
                    <option value="MATCH">Match Result</option>
                    <option value="YOUTH">Youth Academy</option>
                    <option value="COMMUNITY">Community / Charity</option>
                 </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                 <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#9CA3AF", marginBottom: "8px", textTransform: "uppercase" }}>Featured Image URL</label>
                 <div style={{ position: "relative" }}>
                   <ImageIcon style={{ position: "absolute", left: "14px", top: "14px", color: "#9CA3AF" }} size={16} />
                   <input 
                     type="text" placeholder="https://..." 
                     value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                     style={{ width: "100%", padding: "12px 12px 12px 40px", borderRadius: "8px", border: "1px solid #E5E7EB", fontSize: "13px" }}
                   />
                 </div>
                 <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "8px" }}>Upload to Gallery first to get a URL, or paste an external link.</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", backgroundColor: "#F9FAFB", borderRadius: "8px" }}>
                 <input 
                   type="checkbox" id="publish" 
                   checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                   style={{ width: "20px", height: "20px", accentColor: "#008236", cursor: "pointer" }}
                 />
                 <label htmlFor="publish" style={{ fontSize: "14px", fontWeight: "700", color: "#374151", cursor: "pointer" }}>Make Public Immediately</label>
              </div>

              <button 
                type="submit" disabled={loading}
                style={{ width: "100%", marginTop: "32px", padding: "18px", backgroundColor: "#008236", color: "white", borderRadius: "12px", border: "none", fontWeight: "900", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", boxShadow: "0 10px 20px rgba(0,130,54,0.2)" }}
              >
                <Send size={18} /> {loading ? "Dispatching..." : "Submit Article"}
              </button>
           </section>

           <section style={{ backgroundColor: "#0B111D", color: "white", padding: "32px", borderRadius: "16px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "900", marginBottom: "16px", color: "#008236" }}>OVERSIGHT NOTICE</h3>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "12px" }}>
                 <div style={{ display: "flex", gap: "10px" }}><CheckCircle2 size={16} /> <span>All local articles bypass moderation but are logged in the Audit Trail.</span></div>
                 <div style={{ display: "flex", gap: "10px" }}><Globe size={16} /> <span>Articles appear instantly on the public News feed.</span></div>
                 <div style={{ display: "flex", gap: "10px" }}><Type size={16} /> <span>Maintain professional tone for all official communications.</span></div>
              </div>
           </section>

        </aside>

      </form>
    </div>
  );
}
