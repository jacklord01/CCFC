"use client";

import { useState, useEffect } from "react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    fetchMessages();
  };

  if (loading) return <div>Loading inquiries...</div>;

  const unreadCount = messages.filter(m => m.status === "UNREAD").length;

  return (
    <div style={{ maxWidth: "1200px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "32px" }}>Contact Form Submissions</h1>

      <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
         <div style={{ backgroundColor: "#EFF6FF", padding: "16px 24px", borderRadius: "8px", border: "1px solid #DBEAFE" }}>
            <span style={{ fontSize: "14px", color: "#1D4ED8", fontWeight: "500" }}>Unread Messages</span>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#1E3A8A" }}>{unreadCount}</div>
         </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
         {messages.length > 0 ? messages.map((m) => (
           <div key={m.id} style={{ 
             backgroundColor: "white", padding: "24px", borderRadius: "12px", 
             border: "1px solid #e5e7eb", 
             borderLeft: m.status === "UNREAD" ? "6px solid #008236" : "6px solid #e5e7eb"
           }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                 <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "700" }}>{m.name}</h3>
                    <p style={{ fontSize: "13px", color: "#6b7280" }}>{m.email || "[No Email]"} | {m.phone}</p>
                 </div>
                 <div style={{ display: "flex", gap: "12px" }}>
                    {m.status === "UNREAD" ? (
                      <button onClick={() => handleStatusUpdate(m.id, "READ")} style={{ backgroundColor: "#008236", color: "white", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Mark as Read</button>
                    ) : m.status === "READ" ? (
                      <button onClick={() => handleStatusUpdate(m.id, "ARCHIVED")} style={{ backgroundColor: "#f3f4f6", color: "#374151", padding: "8px 16px", borderRadius: "6px", border: "1px solid #d1d5db", cursor: "pointer", fontWeight: "600", fontSize: "13px" }}>Archive</button>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600" }}>Archived</span>
                    )}
                 </div>
              </div>
              <p style={{ color: "#374151", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{m.message}</p>
              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f3f4f6", fontSize: "12px", color: "#9ca3af" }}>
                Received on: {new Date(m.createdAt).toLocaleString()}
              </div>
           </div>
         )) : (
           <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#f9fafb", borderRadius: "16px", border: "1px dashed #d1d5db", color: "#6b7280" }}>
             No messages in your inbox yet.
           </div>
         )}
      </div>
    </div>
  );
}
