"use client";

import { useState } from "react";

export default function GalleryUploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("category", "EVENTS"); // Supporters only upload to EVENTS

    try {
      const res = await fetch("/api/gallery/public-upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Success! Your photo has been sent for moderation. Thank you for contributing to the club gallery!");
        setFile(null);
        setCaption("");
        setTimeout(onClose, 3000);
      } else {
        setMessage("Upload failed. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white", padding: "32px", borderRadius: "16px",
        maxWidth: "500px", width: "100%", position: "relative"
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>&times;</button>
        
        <h2 style={{ fontSize: "24px", marginBottom: "8px", color: "#0B111D" }}>Upload Club Photos</h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>Share your matchday or event moments. Photos will be reviewed by our PRO before appearing live.</p>

        {message && (
          <div style={{ padding: "12px", borderRadius: "8px", backgroundColor: message.includes("Success") ? "#d1fae5" : "#fee2e2", color: message.includes("Success") ? "#065f46" : "#991b1b", marginBottom: "16px", fontSize: "14px" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Select Photo</label>
            <input 
              type="file" accept="image/*" required 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ fontSize: "14px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Caption (Optional)</label>
            <input 
              type="text" value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. U10s having fun at the barbecue!"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
            />
          </div>

          <button 
            type="submit" 
            disabled={uploading || !file}
            style={{
              backgroundColor: "#25D366", color: "white", padding: "14px",
              borderRadius: "8px", border: "none", fontWeight: "700",
              cursor: (uploading || !file) ? "not-allowed" : "pointer",
              opacity: (uploading || !file) ? 0.7 : 1
            }}
          >
            {uploading ? "Uploading..." : "Submit Photo"}
          </button>
        </form>
      </div>
    </div>
  );
}
