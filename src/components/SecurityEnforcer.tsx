"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SecurityEnforcer({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      setLoading(false);
      return;
    }

    const checkSecurity = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.ok) {
          const user = await res.json();
          const needsSetup = user.mustChangePassword || !user.twoFactorEnabled;
          
          if (needsSetup && pathname !== "/admin/setup-security") {
            router.push("/admin/setup-security");
          } else {
            setLoading(false);
          }
        } else {
          // If API fails (e.g. 401), allow access (layout will handle session check)
          setLoading(false);
        }
      } catch (error) {
        console.error("Security check failed:", error);
        setLoading(false);
      }
    };

    checkSecurity();
  }, [session, status, pathname, router]);

  if (status === "loading" || loading) {
    return (
      <div style={{ 
        display: "flex", 
        height: "100vh", 
        width: "100%", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#0B111D",
        color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="spinner" style={{ 
            width: "40px", height: "40px", border: "4px solid rgba(255,255,255,0.1)", 
            borderTopColor: "#008236", borderRadius: "50%", margin: "0 auto 20px"
          }}></div>
          <p style={{ fontWeight: "600", fontSize: "14px" }}>Verifying Secure Session...</p>
        </div>
        <style jsx>{`
          .spinner { animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
