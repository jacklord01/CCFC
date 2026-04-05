"use client";

import { useState, useEffect } from "react";
export default function SettingsPage() {
  const [settings, setSettings] = useState({
    CLUB_NAME: "",
    CLUB_LOGO: "",
    WHATSAPP_NUMBER: "",
    NOTIFICATION_EMAIL: "",
    SUMUP_LINK: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Settings updated successfully! These changes are now live across the site.");
      } else {
        setMessage("Error updating settings.");
      }
    } catch (err) {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setSettings({ ...settings, CLUB_LOGO: data.url });
        setMessage("Logo uploaded! Remember to click 'Save All Changes' to finalize.");
      } else {
        setMessage("Logo upload failed.");
      }
    } catch (err) {
      setMessage("Error uploading logo.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading club settings...</div>;

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Club Branding & Settings</h1>
        <p style={{ color: "#6b7280" }}>Manage your "Common Denominators" across the entire Castlebar Celtic FC website.</p>
      </header>

      {message && (
        <div style={{
          padding: "16px",
          backgroundColor: message.includes("success") || message.includes("uploaded") ? "#d1fae5" : "#fee2e2",
          color: message.includes("success") || message.includes("uploaded") ? "#065f46" : "#991b1b",
          borderRadius: "8px",
          marginBottom: "24px",
          fontWeight: "500"
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Club Name */}
        <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>General Identity</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Club / Organization Name</label>
            <input
              type="text"
              value={settings.CLUB_NAME}
              onChange={(e) => setSettings({ ...settings, CLUB_NAME: e.target.value })}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
              placeholder="e.g. Castlebar Celtic FC"
            />
            <p style={{ fontSize: "12px", color: "#6b7280" }}>This name appears in the Header, Footer, and Page Titles.</p>
          </div>
        </section>

        {/* Logo Management */}
        <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Logo & Visuals</h2>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <div style={{ 
              width: "120px", height: "120px", 
              backgroundColor: "#f9fafb", 
              borderRadius: "8px", 
              border: "1px dashed #d1d5db",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden"
            }}>
              {settings.CLUB_LOGO ? (
                <img src={settings.CLUB_LOGO} alt="Club Logo Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              ) : (
                <span style={{ fontSize: "12px", color: "#9ca3af" }}>No Logo</span>
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>Upload New Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                style={{ fontSize: "14px" }}
              />
              <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "8px" }}>Ideal for transparent PNGs or SVGs from Figma.</p>
              {uploading && <div style={{ fontSize: "12px", color: "#008236", fontWeight: "600", marginTop: "4px" }}>Uploading logo...</div>}
            </div>
          </div>
        </section>

        {/* Contact & Payments */}
        <section style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Contact & Payments</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>WhatsApp Contact Number (No spaces or plus)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "16px", color: "#6b7280" }}>wa.me/</span>
              <input
                type="text"
                value={settings.WHATSAPP_NUMBER}
                onChange={(e) => setSettings({ ...settings, WHATSAPP_NUMBER: e.target.value })}
                style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
                placeholder="353871234567"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Admin Notification Email</label>
            <input
              type="email"
              value={settings.NOTIFICATION_EMAIL}
              onChange={(e) => setSettings({ ...settings, NOTIFICATION_EMAIL: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
              placeholder="e.g. pro@castlebarceltic.ie"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500" }}>Global SumUp Payment Link</label>
            <input
              type="url"
              value={settings.SUMUP_LINK}
              onChange={(e) => setSettings({ ...settings, SUMUP_LINK: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
              placeholder="e.g. https://sumup.ie/castlebarceltic"
            />
            <p style={{ fontSize: "12px", color: "#6b7280" }}>Supporters will be redirected here for shop purchases and club payments.</p>
          </div>
        </section>

        <button 
          type="submit" 
          disabled={saving || uploading}
          style={{
            backgroundColor: "#008236",
            color: "white",
            padding: "16px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: (saving || uploading) ? "not-allowed" : "pointer",
            opacity: (saving || uploading) ? 0.7 : 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}
        >
          {saving ? "Saving Changes..." : "Save All Changes"}
        </button>

      </form>
    </div>
  );
}
