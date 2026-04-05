"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials. Try pro@castlebarceltic.ie / password123");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#F3F4F6", width: "100%" }}>
       <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
          
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
             <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#0B111D", marginBottom: "8px" }}>Admin Portal Login</h1>
             <p style={{ color: "#6b7280", fontSize: "14px" }}>Sign in to manage the club platform</p>
          </div>

          {error && <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: "10px", borderRadius: "6px", marginBottom: "20px", fontSize: "14px", textAlign: "center" }}>{error}</div>}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
             <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pro@castlebarceltic.ie"
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
                  required
                />
             </div>
             <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#374151" }}>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "16px" }}
                  required
                />
             </div>
             <button type="submit" style={{ backgroundColor: "var(--primary-color)", color: "white", padding: "12px", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", border: "none", cursor: "pointer", marginTop: "10px" }}>
               Secure Sign In
             </button>
          </form>
       </div>
    </div>
  );
}
