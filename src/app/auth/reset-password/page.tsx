"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <AlertCircle size={48} color="#ef4444" style={{ margin: "0 auto 20px auto" }} />
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#111827" }}>Invalid Link</h2>
        <p style={{ color: "#6B7280", marginTop: "8px" }}>Please request a new reset link from the login page.</p>
        <Link href="/auth/forgot-password" style={{ display: "block", marginTop: "24px", color: "#008236", fontWeight: "700", textDecoration: "none" }}>Request Recovery Link</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 10) {
      setError("Security Policy: Passwords must be at least 10 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Credentials do not match. Please verify your entry.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Reset failed. Verification token may have expired.");
      }
    } catch (err) {
      setError("Network connectivity error.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#f0fdf4", color: "#008236", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
          <CheckCircle2 size={32} />
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#111827", marginBottom: "12px" }}>Access Restored</h2>
        <p style={{ color: "#6B7280", marginBottom: "32px", lineHeight: "1.5" }}>Your credentials have been securely updated. You may now proceed to the Admiral Portal.</p>
        <Link href="/admin/login" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", backgroundColor: "#008236", color: "white", padding: "16px", borderRadius: "12px", textDecoration: "none", fontWeight: "800" }}>
          Go to Dashboard <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#374151", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>New Secure Password</label>
        <div style={{ position: "relative" }}>
          <Lock style={{ position: "absolute", left: "14px", top: "14px", color: "#9CA3AF" }} size={20} />
          <input 
            type="password" 
            placeholder="Min. 10 characters" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "10px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", fontSize: "16px" }}
          />
        </div>
        <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "6px" }}>Use a combination of upper/lowercase and symbols for maximum security.</p>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: "800", color: "#374151", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.05em" }}>Confirm Entry</label>
        <div style={{ position: "relative" }}>
          <Lock style={{ position: "absolute", left: "14px", top: "14px", color: "#9CA3AF" }} size={20} />
          <input 
            type="password" 
            placeholder="Repeat password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: "14px 14px 14px 44px", borderRadius: "10px", border: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", fontSize: "16px" }}
          />
        </div>
      </div>

      {error && (
        <div style={{ backgroundColor: "#fef2f2", color: "#ef4444", padding: "14px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", border: "1px solid #fee2e2" }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{ backgroundColor: "#008236", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontWeight: "900", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px" }}
      >
        {loading ? <Loader2 className="animate-spin" style={{ margin: "0 auto" }} /> : "Reset & Finalize"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0B111D", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "white", borderRadius: "24px", padding: "48px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
           <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#111827", marginBottom: "8px" }}>Set New Credentials</h1>
           <p style={{ color: "#6B7280", fontSize: "15px" }}>Align your account with our updated 2026 security policies.</p>
        </div>

        <Suspense fallback={<div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>Verifying security token...</div>}>
          <ResetPasswordForm />
        </Suspense>

      </div>
    </main>
  );
}
