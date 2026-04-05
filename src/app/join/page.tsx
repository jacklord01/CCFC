"use client";

import { useState } from "react";
import Link from "next/link";

export default function JoinPage() {
  const [type, setType] = useState<"PLAYER_REG" | "VOLUNTEER" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;

    setStatus("SUBMITTING");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type }),
      });

      if (res.ok) setStatus("SUCCESS");
      else setStatus("ERROR");
    } catch (err) {
      setStatus("ERROR");
    }
  };

  if (status === "SUCCESS") {
    return (
      <div className="container section animate-fade-in" style={{ textAlign: "center", maxWidth: "600px", margin: "100px auto" }}>
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>✅</div>
        <h1 style={{ marginBottom: "16px" }}>Request Sent!</h1>
        <p style={{ color: "#6b7280", lineHeight: "26px", marginBottom: "32px" }}>
          Thank you for reaching out to Castlebar Celtic FC. Your details have been sent to our club administrators, and we will be in touch shortly to finalize the next steps.
        </p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "16px", color: "#0B111D" }}>Join the Celtic Family</h1>
          <p style={{ color: "#6b7280", fontSize: "18px" }}>Whether you're a new player or a potential volunteer, we'd love to have you.</p>
        </header>

        {/* Path Selection */}
        {!type ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div 
              onClick={() => setType("PLAYER_REG")}
              className="card-hover" 
              style={{ 
                padding: "40px", textAlign: "center", cursor: "pointer", border: "2px solid #e5e7eb", borderRadius: "16px" 
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏃‍♂️</div>
              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>New Player / Minor</h3>
              <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>Register interest for a child or young player joining our academy or youth teams.</p>
            </div>
            <div 
              onClick={() => setType("VOLUNTEER")}
              className="card-hover" 
              style={{ 
                padding: "40px", textAlign: "center", cursor: "pointer", border: "2px solid #e5e7eb", borderRadius: "16px" 
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤝</div>
              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>Club Volunteer</h3>
              <p style={{ color: "#6b7280", fontSize: "14px", marginTop: "8px" }}>Interested in coaching, officiating, or helping with club administration?</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in" style={{ backgroundColor: "#F9FAFB", padding: "40px", borderRadius: "16px", border: "1px solid #E5E7EB" }}>
            <button 
              onClick={() => setType(null)} 
              style={{ background: "none", border: "none", color: "var(--primary-color)", fontWeight: "600", cursor: "pointer", marginBottom: "24px" }}
            >
              ← Change path
            </button>
            <h2 style={{ marginBottom: "24px" }}>
              {type === "PLAYER_REG" ? "Player Registration Interest" : "Volunteer Interest Form"}
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Full Name</label>
                <input 
                  type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-group">
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email Address</label>
                  <input 
                    type="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Phone Number</label>
                  <input 
                    type="tel" required value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                  {type === "PLAYER_REG" ? "Child's Name & Age / Details" : "Relevant Experience or Roles of Interest"}
                </label>
                <textarea 
                  required value={formData.details} rows={4}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={status === "SUBMITTING"}
                className="btn-primary" 
                style={{ width: "100%", padding: "16px", fontSize: "16px" }}
              >
                {status === "SUBMITTING" ? "Sending Request..." : "Submit Registration Request"}
              </button>
              
              {status === "ERROR" && (
                <p style={{ color: "#ef4444", textAlign: "center", marginTop: "16px" }}>
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}
            </form>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .card-hover {
          transition: all 0.2s ease;
        }
        .card-hover:hover {
          background-color: #F9FAFB;
          border-color: var(--primary-color) !important;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
