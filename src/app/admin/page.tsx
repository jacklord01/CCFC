"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [syncing, setSyncing] = useState(false);
  const [stats, setStats] = useState({ products: 0, members: 0, messages: 0, lastSync: "" });

  useEffect(() => {
    // Fetch basic stats for the dashboard
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, lastSync: data.LAST_MATCH_SYNC })));
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/matches/scrape", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully synced ${data.count} matches!`);
        setStats(prev => ({ ...prev, lastSync: new Date().toISOString() }));
      }
    } catch (err) {
      alert("Sync failed. Check logs.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <header style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>Welcome, Admin</h1>
        <p style={{ color: "#6b7280" }}>Your central hub for managing Castlebar Celtic FC.</p>
      </header>

      {/* Action Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "40px" }}>
         
         {/* Match Sync Card */}
         <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Match Center</h3>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
              Pull the latest fixtures and scores directly from FinalWhistle.ie.
            </p>
            <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
              Last sync: {stats.lastSync ? new Date(stats.lastSync).toLocaleString() : "Never"}
            </div>
            <button 
              onClick={handleSync}
              disabled={syncing}
              style={{ 
                width: "100%", backgroundColor: "#008236", color: "white", padding: "12px", borderRadius: "6px", border: "none", fontWeight: "700", cursor: syncing ? "wait" : "pointer", opacity: syncing ? 0.7 : 1 
              }}
            >
              {syncing ? "Syncing..." : "Sync Live Data Now"}
            </button>
         </div>

         {/* Quick Links */}
         <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "12px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>Quick Actions</h3>
            <Link href="/admin/messages" style={{ color: "var(--primary-color)", textDecoration: "none", fontSize: "15px", fontWeight: "600" }}>→ Review Unread Messages</Link>
            <Link href="/admin/gallery" style={{ color: "var(--primary-color)", textDecoration: "none", fontSize: "15px", fontWeight: "600" }}>→ Approve Supporter Photos</Link>
            <Link href="/admin/news/preview" style={{ color: "var(--primary-color)", textDecoration: "none", fontSize: "15px", fontWeight: "600" }}>→ Preview Blog Drafts</Link>
         </div>

      </div>

      {/* Real-time Status Card */}
      <div style={{ backgroundColor: "#0B111D", color: "white", padding: "32px", borderRadius: "16px" }}>
         <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Platform Health</h2>
         <div style={{ display: "flex", gap: "40px" }}>
            <div>
               <div style={{ fontSize: "32px", fontWeight: "800", color: "#25D366" }}>Live</div>
               <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Scraper Engine</div>
            </div>
            <div>
               <div style={{ fontSize: "32px", fontWeight: "800", color: "#25D366" }}>OK</div>
               <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>Contentful Pipeline</div>
            </div>
         </div>
      </div>
    </div>
  );
}
