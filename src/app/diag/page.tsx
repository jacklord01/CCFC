import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiagPage() {
  const availableKeys = Object.keys(process.env).sort();
  
  const envs = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_DATADOG_ID: !!process.env.NEXT_PUBLIC_DATADOG_ID, // Example check
    AMPLIFY_ENV: !!process.env.AMPLIFY_ENV,
    NODE_ENV: process.env.NODE_ENV,
  };

  let dbStatus = "Checking...";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "Connected ✅";
  } catch (err: any) {
    dbStatus = `Failed ❌ (${err.message || "Unknown error"})`;
  }

  return (
    <div style={{ padding: "100px 180px", fontFamily: "system-ui" }}>
      <h1 style={{ color: "#008236" }}>Celtic 2026 Diagnostics</h1>
      <p>Use this page to verify environment variables in your deployment portal.</p>
      
      <div style={{ marginTop: "40px", backgroundColor: "#F9FAFB", padding: "40px", borderRadius: "12px", border: "1px solid #EAEAEA" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "20px" }}>Database Status</h2>
        <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: dbStatus.includes("✅") ? "#008236" : "#DC2626" }}>
          {dbStatus}
        </div>

        <h2 style={{ fontSize: "1.2rem", marginTop: "40px", marginBottom: "20px" }}>Detected System Keys</h2>
        <div style={{ padding: "10px", backgroundColor: "#EEE", fontSize: "12px", maxHeight: "200px", overflow: "auto", borderRadius: "8px" }}>
          {availableKeys.join(", ")}
        </div>
      </div>

      <div style={{ marginTop: "40px", color: "#6B7280", fontSize: "14px" }}>
        <p>IMPORTANT: If any critical variable (DATABASE_URL, NEXTAUTH_SECRET) is "Missing", please add it to your Hosting Provider (Amplify Console) and redeploy.</p>
      </div>
    </div>
  );
}
