"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    urls: [] as string[],
    caption: "",
    category: "MATCHES"
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch("/api/gallery?unapproved=true");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const fileForm = new FormData();
        fileForm.append("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: fileForm });
        const data = await res.json();
        if (data.url) uploadedUrls.push(data.url);
      }
      setFormData(prev => ({ ...prev, urls: [...prev.urls, ...uploadedUrls] }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Process each URL as a separate gallery item
    for (const fileUrl of formData.urls) {
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: fileUrl, caption: formData.caption, category: formData.category })
      });
    }

    setFormData({ urls: [], caption: "", category: "MATCHES" });
    fetchGallery();
    setSaving(false);
  };

  const handleApprove = async (id: string) => {
    await fetch("/api/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "APPROVED" })
    });
    fetchGallery();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will permanently delete the photo.")) return;
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    fetchGallery();
  };

  if (loading) return <div>Loading gallery...</div>;

  const pendingItems = items.filter(i => i.status === "PENDING");
  const approvedItems = items.filter(i => i.status === "APPROVED");

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Gallery Moderation & Management</h1>

      {/* Upload New Photo Section */}
      <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Upload Official Photo</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>Caption</label>
            <input 
              type="text" value={formData.caption} required
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
              placeholder="e.g. U16 Team Photo 2024"
            />
          </div>
          <div style={{ flex: "1 1 150px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px" }}
            >
              <option value="MATCHES">Matches</option>
              <option value="TEAMS">Teams</option>
              <option value="YOUTH">Youth</option>
              <option value="EVENTS">Events</option>
            </select>
          </div>
          <div style={{ flex: "1 1 200px" }}>
             <input type="file" accept="image/*" multiple onChange={handleFileUpload} disabled={uploading} />
             {formData.urls.length > 0 && <div style={{ fontSize: "12px", color: "#008236", marginTop: "4px" }}>{formData.urls.length} files staged for upload</div>}
          </div>
          <button type="submit" disabled={saving || uploading || formData.urls.length === 0} style={{ backgroundColor: "#008236", color: "white", padding: "10px 24px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
            {saving ? "Publishing..." : "Publish to Gallery"}
          </button>
        </form>
      </section>

      {/* Moderation Queue */}
      {pendingItems.length > 0 && (
         <section style={{ marginBottom: "40px" }}>
           <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px", color: "#ef4444" }}>Moderation Queue ({pendingItems.length} Pending)</h2>
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
             {pendingItems.map((item) => (
               <div key={item.id} style={{ backgroundColor: "#fef2f2", padding: "12px", borderRadius: "8px", border: "1px solid #fee2e2" }}>
                  <div style={{ width: "100%", height: "180px", borderRadius: "4px", backgroundColor: "#e5e7eb", marginBottom: "12px", overflow: "hidden", position: "relative" }}>
                     <img src={item.url} alt="pending" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <p style={{ fontSize: "13px", fontWeight: "500", marginBottom: "12px" }}>{item.caption || "No caption"}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                     <button onClick={() => handleApprove(item.id)} style={{ flex: 1, backgroundColor: "#008236", color: "white", padding: "8px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>Approve</button>
                     <button onClick={() => handleDelete(item.id)} style={{ flex: 1, backgroundColor: "#ef4444", color: "white", padding: "8px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>Delete</button>
                  </div>
               </div>
             ))}
           </div>
         </section>
      )}

      {/* Live Gallery List */}
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>Live Photos ({approvedItems.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {approvedItems.map((item) => (
          <div key={item.id} style={{ backgroundColor: "white", padding: "8px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
             <div style={{ width: "100%", height: "150px", borderRadius: "4px", backgroundColor: "#f3f4f6", marginBottom: "8px", overflow: "hidden" }}>
                <img src={item.url} alt="approved" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             </div>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <span style={{ fontSize: "11px", fontWeight: "600", color: "#008236", backgroundColor: "#f0fdf4", padding: "2px 6px", borderRadius: "4px" }}>{item.category}</span>
               <button onClick={() => handleDelete(item.id)} style={{ color: "#ef4444", fontSize: "12px", background: "none", border: "none", cursor: "pointer" }}>Delete</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
