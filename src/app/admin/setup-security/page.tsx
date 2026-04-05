"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SetupSecurityPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [twoFactor, setTwoFactor] = useState<{ secret: string; qrCode: string } | null>(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if we need step 2 (2FA)
    fetch("/api/auth/2fa").then(res => res.json()).then(data => setTwoFactor(data));
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) return setError("Passwords do not match");

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwords.new })
    });

    if (res.ok) setStep(2);
    else setError("Failed to update password");
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/2fa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, secret: twoFactor?.secret })
    });

    if (res.ok) router.push("/admin");
    else setError("Invalid security token");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "100px auto", padding: "40px", backgroundColor: "white", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0B111D" }}>Security Required</h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>Please complete your account setup to continue.</p>
      </div>

      {step === 1 ? (
        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
           <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Step 1: Set Your Secure Password</h3>
           <input 
             type="password" placeholder="New Password" required 
             value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})}
             style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
           />
           <input 
             type="password" placeholder="Confirm Password" required 
             value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
             style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
           />
           {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
           <button type="submit" style={{ backgroundColor: "#008236", color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "700" }}>Update & Proceed</button>
        </form>
      ) : (
        <form onSubmit={handleVerify2FA} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "center" }}>
           <h3 style={{ fontSize: "16px", fontWeight: "700" }}>Step 2: Enable 2FA Enforcement</h3>
           <p style={{ fontSize: "14px", color: "#6b7280" }}>Scan this QR code with your Authenticator app (Google, Microsoft, Authy).</p>
           
           {twoFactor?.qrCode && (
             <div style={{ padding: "20px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
               <img src={twoFactor.qrCode} alt="2FA QR Code" style={{ width: "200px", height: "200px", margin: "0 auto" }} />
               <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "12px", wordBreak: "break-all" }}>Secret: {twoFactor.secret}</div>
             </div>
           )}

           <input 
             type="text" placeholder="Enter 6-digit code" maxLength={6} required 
             value={token} onChange={(e) => setToken(e.target.value)}
             style={{ padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db", textAlign: "center", fontSize: "20px", letterSpacing: "4px" }}
           />
           {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>{error}</p>}
           <button type="submit" style={{ backgroundColor: "#008236", color: "white", padding: "14px", borderRadius: "8px", border: "none", fontWeight: "700" }}>Verify & Secure Account</button>
        </form>
      )}
    </div>
  );
}
