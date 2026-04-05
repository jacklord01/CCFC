"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageCropper from "@/components/ImageCropper";
import { User, Edit2, Trash2, Plus, ArrowUpDown, ShieldCheck } from "lucide-react";

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    description: "",
    imageUrl: "",
    order: 0
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Image Cropper State
  const [cropImage, setCropImage] = useState<string | null>(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    const res = await fetch("/api/volunteers");
    const data = await res.json();
    setVolunteers(data);
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
    form.append("file", blob, "volunteer.jpg");

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

    const res = await fetch("/api/volunteers", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      setFormData({ name: "", role: "", description: "", imageUrl: "", order: 0 });
      setEditingId(null);
      fetchVolunteers();
    }
    setSaving(false);
  };

  const handleEdit = (v: any) => {
    setEditingId(v.id);
    setFormData({
      name: v.name,
      role: v.role,
      description: v.description || "",
      imageUrl: v.imageUrl || "",
      order: v.order || 0
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this staff/volunteer profile?")) return;
    await fetch(`/api/volunteers?id=${id}`, { method: "DELETE" });
    fetchVolunteers();
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading club personnel...</div>;

  return (
    <div style={{ maxWidth: "1200px" }}>
      
      {cropImage && (
        <ImageCropper 
          image={cropImage} 
          aspectRatio={1} // Staff portraits look best square
          onCrop={handleCropComplete} 
          onCancel={() => setCropImage(null)} 
        />
      )}

      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0B111D", marginBottom: "8px" }}>Personnel & Staff</h1>
        <p style={{ color: "#6b7280" }}>Manage the public profiles of club volunteers, coaches, and committee members.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
        
        {/* Left: Personnel Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0B111D" }}>Current Profiles ({volunteers.length})</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {volunteers.map((vol) => (
              <div key={vol.id} style={{ 
                backgroundColor: "white", padding: "24px", borderRadius: "16px", 
                border: "1px solid #e5e7eb", display: "flex", gap: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                 <div style={{ width: "80px", height: "80px", borderRadius: "16px", backgroundColor: "#f9fafb", flexShrink: 0, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                    {vol.imageUrl ? (
                      <img src={vol.imageUrl} alt={vol.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}><User size={32} /></div>
                    )}
                 </div>
                 <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#111827" }}>{vol.name}</h3>
                    <p style={{ color: "#008236", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>{vol.role}</p>
                    <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.6", marginBottom: "16px" }}>{vol.description || "No bio provided."}</p>
                    <div style={{ display: "flex", gap: "12px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
                       <button onClick={() => handleEdit(vol)} style={{ color: "#4b5563", fontSize: "12px", background: "none", border: "none", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}><Edit2 size={12} /> Edit</button>
                       <button onClick={() => handleDelete(vol.id)} style={{ color: "#ef4444", fontSize: "12px", background: "none", border: "none", cursor: "pointer", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}><Trash2 size={12} /> Remove</button>
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
               <h2 style={{ fontSize: "20px", fontWeight: "800" }}>{editingId ? "Update Profile" : "New Personnel"}</h2>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div>
                <label style={labelStyle}>Full Name</label>
                <input 
                  type="text" value={formData.name} required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Pat Davitt"
                />
              </div>

              <div>
                <label style={labelStyle}>Club Role</label>
                <input 
                  type="text" value={formData.role} required
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g. Club Chairman"
                />
              </div>

              <div>
                <label style={labelStyle}>Display Order</label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input 
                    type="number" value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <ArrowUpDown size={16} color="#9ca3af" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Short Bio (2-3 Lines)</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...inputStyle, minHeight: "80px" }}
                  rows={3}
                />
              </div>

              <div>
                 <label style={labelStyle}>Official Portrait (Square Crop)</label>
                 <div style={{ display: "flex", alignItems: "center", gap: "16px", backgroundColor: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.2)" }}>
                    <div style={{ width: "64px", height: "64px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                       {formData.imageUrl && <img src={formData.imageUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <input type="file" accept="image/*" onChange={onFileChange} style={{ fontSize: "12px", width: "100%" }} />
                      <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}>Cropping tool active on upload.</p>
                    </div>
                 </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setFormData({name: "", role: "", description: "", imageUrl: "", order: 0}); }} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "white", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
                )}
                <button type="submit" disabled={saving || uploading} style={{ flex: 2, backgroundColor: "#008236", color: "white", padding: "14px", borderRadius: "10px", border: "none", fontWeight: "900", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,130,54,0.2)" }}>
                   {saving ? "Saving..." : editingId ? "Save Changes" : "Add Personnel"}
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
