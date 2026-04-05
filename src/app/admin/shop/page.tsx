"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageCropper from "@/components/ImageCropper";
import { Edit2, Package, Trash2, Plus, Sparkles, ShoppingBag } from "lucide-react";

export default function AdminShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "0",
    category: "MERCHANDISE",
    imageUrl: ""
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  
  // Image Cropper State
  const [cropImage, setCropImage] = useState<string | null>(null);

  const categories = [
    { id: "MERCHANDISE", label: "Merchandise" },
    { id: "TICKET", label: "Match Tickets" },
    { id: "REGISTRATION", label: "Player Registration" },
    { id: "CENTENARY", label: "Centenary" },
    { id: "RAFFLE", label: "Raffles" },
    { id: "GAME", label: "Games (Guess Score, LMS)" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/shop");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCropImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (blob: Blob) => {
    setCropImage(null);
    setUploading(true);
    const form = new FormData();
    form.append("file", blob, "product.jpg");

    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      setFormData({ ...formData, imageUrl: data.url });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const method = editingId ? "PATCH" : "POST";
    const body = editingId ? { ...formData, id: editingId } : formData;

    const res = await fetch("/api/shop", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setFormData({ name: "", description: "", price: "", stock: "0", category: "MERCHANDISE", imageUrl: "" });
      setEditingId(null);
      fetchProducts();
    }
    setSaving(false);
  };

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      description: p.description || "",
      price: p.price.toString(),
      stock: p.stock.toString(),
      category: p.category,
      imageUrl: p.imageUrl || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This item will be removed permanently.")) return;
    await fetch(`/api/shop?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Syncing inventory assets...</div>;

  const filteredProducts = activeFilter === "ALL" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div style={{ maxWidth: "1200px" }}>
      
      {cropImage && (
        <ImageCropper 
          image={cropImage} 
          aspectRatio={4/3} // Merchandise looks better in 4:3
          onCrop={handleCropComplete} 
          onCancel={() => setCropImage(null)} 
        />
      )}

      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0B111D", marginBottom: "8px" }}>Inventory Management</h1>
        <p style={{ color: "#6b7280" }}>Create and manage club merchandise, tickets, and fundraisers.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
        
        {/* Left: Product List */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0B111D" }}>Live Shop & Fundraising ({products.length})</h2>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
              <button onClick={() => setActiveFilter("ALL")} style={activeFilter === "ALL" ? activeTab : inactiveTab}>All</button>
              {categories.slice(0, 3).map(cat => (
                <button key={cat.id} onClick={() => setActiveFilter(cat.id)} style={activeFilter === cat.id ? activeTab : inactiveTab}>{cat.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filteredProducts.map((p) => (
              <div key={p.id} style={{ 
                backgroundColor: "white", padding: "16px", borderRadius: "16px", 
                border: "1px solid #e5e7eb", display: "flex", flexDirection: "column",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)"
              }}>
                 <div style={{ width: "100%", height: "180px", borderRadius: "12px", backgroundColor: "#f9fafb", marginBottom: "16px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    ) : (
                      <ShoppingBag size={40} color="#e5e7eb" />
                    )}
                    <div style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "white", padding: "6px 12px", borderRadius: "8px", fontWeight: "900", fontSize: "14px", border: "1px solid #e5e7eb", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                      €{p.price.toFixed(2)}
                    </div>
                 </div>
                 <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#111827", marginBottom: "4px" }}>{p.name}</h3>
                 <span style={{ fontSize: "10px", fontWeight: "800", color: "#008236", backgroundColor: "#f0fdf4", padding: "4px 10px", width: "fit-content", borderRadius: "6px", marginBottom: "12px", textTransform: "uppercase" }}>{p.category}</span>
                 <p style={{ fontSize: "13px", color: "#6b7280", flex: 1, lineHeight: "1.5" }}>{p.description}</p>
                 <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#9ca3af" }}>Stock: {p.stock}</span>
                    <div style={{ display: "flex", gap: "12px" }}>
                       <button onClick={() => handleEdit(p)} style={{ color: "#4b5563", fontSize: "13px", background: "none", border: "none", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}><Edit2 size={14} /> Edit</button>
                       <button onClick={() => handleDelete(p.id)} style={{ color: "#ef4444", fontSize: "13px", background: "none", border: "none", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}><Trash2 size={14} /> Remove</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Management Form */}
        <aside style={{ position: "sticky", top: "20px" }}>
          <section style={{ backgroundColor: "#0B111D", color: "white", padding: "32px", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
               {editingId ? <Edit2 size={24} color="#008236" /> : <Plus size={24} color="#008236" />}
               <h2 style={{ fontSize: "20px", fontWeight: "800" }}>{editingId ? "Update Listing" : "Create New Listing"}</h2>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div>
                <label style={labelStyle}>Listing Title</label>
                <input 
                  type="text" value={formData.name} required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Home Jersey 2026"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={selectStyle}
                  >
                    {categories.map(cat => <option key={cat.id} value={cat.id} style={{color: "black"}}>{cat.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Price (€)</label>
                  <input 
                    type="number" step="0.01" value={formData.price} required
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description / Instructions</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...inputStyle, minHeight: "80px" }}
                  rows={3}
                />
              </div>

              <div>
                 <label style={labelStyle}>Listing Visual (Cropping Active)</label>
                 <div style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.2)" }}>
                    <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden" }}>
                       {formData.imageUrl && <img src={formData.imageUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <input type="file" accept="image/*" onChange={onFileChange} style={{ fontSize: "12px", width: "100%" }} />
                      <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}>Recommended: High-res square/landscape image.</p>
                    </div>
                 </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({name: "", description: "", price: "", stock: "0", category: "MERCHANDISE", imageUrl: ""}); }} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "white", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
                )}
                <button type="submit" disabled={saving || uploading} style={{ flex: 2, backgroundColor: "#008236", color: "white", padding: "14px", borderRadius: "10px", border: "none", fontWeight: "900", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,130,54,0.2)" }}>
                  {saving ? "Processing..." : editingId ? "Update Metadata" : "Publish Listing"}
                </button>
              </div>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "11px", fontWeight: "900", color: "#9ca3af", textTransform: "uppercase" as const, marginBottom: "8px", letterSpacing: "0.5px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", color: "white", fontSize: "14px" };
const selectStyle = { ...inputStyle, appearance: "none" as const };

const activeTab = { padding: "8px 16px", borderRadius: "8px", backgroundColor: "#0B111D", color: "white", border: "none", fontWeight: "800", fontSize: "12px", cursor: "pointer" };
const inactiveTab = { padding: "8px 16px", borderRadius: "8px", backgroundColor: "transparent", color: "#6b7280", border: "1px solid #e5e7eb", fontWeight: "700", fontSize: "12px", cursor: "pointer" };
