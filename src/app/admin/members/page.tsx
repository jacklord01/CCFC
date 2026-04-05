"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminMembersPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/members"); // Note: I'll need to create this API
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ maxWidth: "1200px" }}>
      <header style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Membership Registration Requests</h1>
          <p style={{ color: "#6b7280" }}>Review incoming interest from new players and potential club volunteers.</p>
        </div>
        <Link href="/admin" className="btn-secondary">Back to Dashboard</Link>
      </header>

      {loading ? (
        <div style={{ padding: "40px", textAlign: "center" }}>Loading requests...</div>
      ) : requests.length > 0 ? (
        <div style={{ backgroundColor: "white", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <tr>
                <th style={{ padding: "16px", fontSize: "14px", fontWeight: "600" }}>Name</th>
                <th style={{ padding: "16px", fontSize: "14px", fontWeight: "600" }}>Type</th>
                <th style={{ padding: "16px", fontSize: "14px", fontWeight: "600" }}>Contact</th>
                <th style={{ padding: "16px", fontSize: "14px", fontWeight: "600" }}>Details</th>
                <th style={{ padding: "16px", fontSize: "14px", fontWeight: "600" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "16px", fontWeight: "600" }}>{req.name}</td>
                  <td style={{ padding: "16px" }}>
                    <span style={{ 
                      padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "700",
                      backgroundColor: req.type === "PLAYER_REG" ? "#dcfce7" : "#dbeafe",
                      color: req.type === "PLAYER_REG" ? "#166534" : "#1e40af"
                    }}>
                      {req.type === "PLAYER_REG" ? "PLAYER" : "VOLUNTEER"}
                    </span>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px" }}>
                    <div>{req.email}</div>
                    <div style={{ color: "#6b7280" }}>{req.phone}</div>
                  </td>
                  <td style={{ padding: "16px", fontSize: "14px", maxWidth: "300px" }}>
                    {req.details}
                  </td>
                  <td style={{ padding: "16px", fontSize: "13px", color: "#6b7280" }}>
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: "60px", textAlign: "center", backgroundColor: "white", borderRadius: "12px", border: "1px dashed #d1d5db" }}>
          <h3 style={{ marginBottom: "8px" }}>No requests found</h3>
          <p style={{ color: "#6b7280" }}>New submissions from the /join form will appear here.</p>
        </div>
      )}
    </div>
  );
}
