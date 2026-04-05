"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowLeft, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0B111D", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "white", borderRadius: "24px", padding: "48px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#f0fdf4", color: "#008236", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#111827", marginBottom: "8px" }}>Password Recovery</h1>
          <p style={{ color: "#6B7280", fontSize: "15px" }}>Secure access restoration for Castlebar Celtic Administrators.</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ backgroundColor: "#f0fdf4", color: "#008236", padding: "20px", borderRadius: "12px", marginBottom: "24px", fontSize: "14px", fontWeight: "600", border: "1px solid #dcfce7" }}>
              Recovery link dispatched. Please check your inbox (and spam folder) for further instructions.
            </div>
            <Link href="/admin/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#6B7280", textDecoration: "none", fontWeight: "700", fontSize: "14px" }}>
              <ArrowLeft size={16} /> Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#374151", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>Administrator Email</label>
              <div style={{ position: "relative" }}>
                <Mail style={{ position: "absolute", left: "14px", top: "14px", color: "#9CA3AF" }} size={20} />
                <input 
                  type="email" 
                  placeholder="e.g. manny@sll.ie" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "10px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", fontSize: "16px" }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: "#008236", color: "white", padding: "16px", borderRadius: "10px", border: "none", fontWeight: "900", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 10px 15px -3px rgba(0, 130, 54, 0.3)" }}
            >
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                   <Loader2 className="animate-spin" size={20} /> Generating Secure Token...
                </div>
              ) : "Send Recovery Link"}
            </button>

            <Link href="/admin/login" style={{ textAlign: "center", textDecoration: "none", color: "#6B7280", fontWeight: "700", fontSize: "14px", marginTop: "8px" }}>
              Back to Login
            </Link>
          </form>
        )}

      </div>
    </main>
  );
}
