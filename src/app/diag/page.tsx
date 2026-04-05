import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiagPage() {
  const envs = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    S3_UPLOAD_KEY: !!process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_REGION: !!process.env.S3_UPLOAD_REGION,
    S3_UPLOAD_BUCKET: !!process.env.S3_UPLOAD_BUCKET,
    WEB3FORMS_ACCESS_KEY: !!process.env.WEB3FORMS_ACCESS_KEY,
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

        <h2 style={{ fontSize: "1.2rem", marginTop: "40px", marginBottom: "20px" }}>Environment Variables</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(envs).map(([key, value]) => (
            <li key={key} style={{ padding: "12px 0", borderBottom: "1px solid #EEE", display: "flex", justifyContent: "space-between" }}>
              <span>{key}</span>
              <span style={{ fontWeight: "bold", color: value ? "#008236" : "#DC2626" }}>
                {value ? "Present ✅" : "Missing ❌"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "40px", color: "#6B7280", fontSize: "14px" }}>
        <p>IMPORTANT: If any critical variable (DATABASE_URL, NEXTAUTH_SECRET) is "Missing", please add it to your Hosting Provider (Amplify Console) and redeploy.</p>
      </div>
    </div>
  );
}
