import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiagPage() {
  
  const envCheck = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    DIRECT_URL: !!process.env.DIRECT_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    CONTENTFUL_ACCESS_TOKEN: !!process.env.CONTENTFUL_ACCESS_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  };

  let dbStatus = "Checking...";
  let tableStatuses: any = {};

  try {
    // 1. Basic Ping
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "Connected ✅";
    
    // 2. Table Specific Check (Schema Sync)
    // We do these individually so one missing table doesn't crash the whole diag page
    try { 
      const count = await prisma.user.count(); 
      tableStatuses.Users = `Found (${count} records)`;
    } catch (e: any) { 
      tableStatuses.Users = `Schema Missing ❌ (${e.message.split('\n')[0]})`;
    }

    try { 
      const count = await prisma.article.count(); 
      tableStatuses.Articles = `Found (${count} records)`;
    } catch (e: any) { 
      tableStatuses.Articles = `Schema Missing ❌ (${e.message.split('\n')[0]})`;
    }

    try { 
      const count = await prisma.match.count(); 
      tableStatuses.Matches = `Found (${count} records)`;
    } catch (e: any) { 
      tableStatuses.Matches = `Schema Missing ❌ (${e.message.split('\n')[0]})`;
    }

  } catch (err: any) {
    dbStatus = `Connection Failed ❌ (${err.message.split('\n')[0]})`;
  }

  return (
    <div style={{ padding: "100px 180px", fontFamily: "system-ui", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ color: "#008236", fontSize: "42px", fontWeight: 800, marginBottom: "20px" }}>Celtic 2026 Diagnostics</h1>
      <p style={{ fontSize: "18px", color: "#6B7280", marginBottom: "40px" }}>Verification of infrastructure, secrets propagation, and database schema synchronization.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        
        {/* Left Col: Database Status */}
        <div style={{ backgroundColor: "#F9FAFB", padding: "40px", borderRadius: "16px", border: "1px solid #EAEAEA" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>Database Health</h2>
          <div style={{ padding: "20px", borderRadius: "8px", backgroundColor: dbStatus.includes("✅") ? "#ECFDF5" : "#FEF2F2", color: dbStatus.includes("✅") ? "#065F46" : "#991B1B", fontWeight: 700, marginBottom: "30px" }}>
            {dbStatus}
          </div>

          <h3 style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "15px" }}>Schema Verification (Tables)</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(tableStatuses).map(([table, result]: [string, any]) => (
              <li key={table} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #EEE", fontSize: "15px" }}>
                <span style={{ fontWeight: 600 }}>{table}</span>
                <span style={{ color: result.includes("❌") ? "#DC2626" : "#008236", fontWeight: "bold" }}>{result}</span>
              </li>
            ))}
          </ul>
          
          {Object.values(tableStatuses).some((s: any) => s.includes("❌")) && (
             <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "8px", fontSize: "14px", color: "#92400E" }}>
                <strong>CRITICAL:</strong> Your database tables are missing in Production. <br />
                Run <code style={{ backgroundColor: "#FDE68A", padding: "2px 4px" }}>npx prisma db push</code> from your local environment against the Production DATABASE_URL.
             </div>
          )}
        </div>

        {/* Right Col: Secrets Propagation */}
        <div style={{ backgroundColor: "#F9FAFB", padding: "40px", borderRadius: "16px", border: "1px solid #EAEAEA" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>Environment Keys</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(envCheck).map(([key, value]) => (
              <li key={key} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #EEE", fontSize: "15px" }}>
                <span>{key}</span>
                <span style={{ fontWeight: 800, color: value ? "#008236" : "#DC2626" }}>
                  {value ? "FOUND ✅" : "MISSING ❌"}
                </span>
              </li>
            ))}
          </ul>

        </div>

      </div>

      <div style={{ marginTop: "60px", textAlign: "center", color: "#9CA3AF", fontSize: "14px" }}>
        &copy; 2026 Castlebar Celtic FC - Production Hardening Stage
      </div>
    </div>
  );
}
