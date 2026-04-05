"use client";

import { useState, useEffect } from "react";
import { History, ShieldAlert, User, Activity } from "lucide-react";

export default function AdminAuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/admin/audit");
      const data = await res.json();
      setAuditLogs(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch audit logs", err);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        <Activity className="spinner" size={32} style={{ margin: "0 auto 16px" }} />
        <p>Retrieving secure audit trails...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <History size={32} color="#008236" />
            <h1 style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-1px", color: "#0B111D" }}>System Audit Log</h1>
          </div>
          <p style={{ color: "#6b7280", fontSize: "16px" }}>Transparent record of all administrative actions. These logs are permanent and cannot be deleted.</p>
        </div>
        <div style={{ padding: "8px 16px", backgroundColor: "#FEF2F2", border: "1px solid #FEE2E2", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", color: "#991B1B", fontSize: "12px", fontWeight: "700" }}>
          <ShieldAlert size={16} />
          TAMPER-PROOF LOGGING ACTIVE
        </div>
      </div>

      <div style={{ backgroundColor: "white", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#4B5563", textTransform: "uppercase" }}>Admin</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#4B5563", textTransform: "uppercase" }}>Action</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#4B5563", textTransform: "uppercase" }}>Target / Details</th>
              <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: "700", color: "#4B5563", textTransform: "uppercase" }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length > 0 ? auditLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: "1px solid #F3F4F6", transition: "background-color 0.2s" }}>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563" }}>
                      <User size={16} />
                    </div>
                    <span style={{ fontWeight: "600", color: "#111827", fontSize: "14px" }}>{log.adminName}</span>
                  </div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ 
                    fontSize: "11px", 
                    backgroundColor: log.action.includes("DELETE") ? "#FEF2F2" : log.action.includes("CREATE") ? "#ECFDF5" : "#EFF6FF", 
                    color: log.action.includes("DELETE") ? "#991B1B" : log.action.includes("CREATE") ? "#065F46" : "#1E40AF", 
                    padding: "4px 10px", 
                    borderRadius: "9999px", 
                    fontWeight: "700" 
                  }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", fontSize: "14px", color: "#4B5563", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {log.details || log.targetType}
                </td>
                <td style={{ padding: "16px 24px", fontSize: "13px", color: "#9CA3AF", fontFamily: "monospace" }}>
                  {mounted ? (
                    `${new Date(log.timestamp).toLocaleDateString()} ${new Date(log.timestamp).toLocaleTimeString()}`
                  ) : "Loading date..."}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: "64px", textAlign: "center", color: "#9CA3AF" }}>
                  No administrative actions recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .spinner { animation: spin 2s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        tr:hover { background-color: #F9FAFB; }
      `}</style>
    </div>
  );
}
