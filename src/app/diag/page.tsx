import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DiagPage() {
  const availableKeys = Object.keys(process.env).sort();
  
  const envCheck = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    CONTENTFUL_SPACE_ID: !!process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: !!process.env.CONTENTFUL_ACCESS_TOKEN,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };

  let dbStatus = "Checking...";
  let tableChecks: any = {};

  try {
    await prisma.$connect();
    dbStatus = "Connected ✅";
    
    // Check specific tables to ensure schema is pushed
    try { tableChecks.Articles = await prisma.article.count(); } catch (e) { tableChecks.Articles = "Schema Missing ❌"; }
    try { tableChecks.Matches = await prisma.match.count(); } catch (e) { tableChecks.Matches = "Schema Missing ❌"; }
    try { tableChecks.Users = await prisma.user.count(); } catch (e) { tableChecks.Users = "Schema Missing ❌"; }
    try { tableChecks.Settings = await prisma.setting.count(); } catch (e) { tableChecks.Settings = "Schema Missing ❌"; }

  } catch (err: any) {
    dbStatus = `Connection Failed ❌ (${err.message || "Unknown error"})`;
  }

  return (
    <div style={{ padding: "100px 180px", fontFamily: "system-ui", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#008236" }}>Celtic 2026 Diagnostics</h1>
      <p>Use this page to verify infrastructure and schema synchronization on AWS Amplify.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px", marginTop: "40px" }}>
        
        {/* Left Col: Database */}
        <section style={{ backgroundColor: "#F9FAFB", padding: "30px", borderRadius: "12px", border: "1px solid #EAEAEA" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "20px", textTransform: "uppercase" }}>Database Health</h2>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: dbStatus.includes("✅") ? "#008236" : "#DC2626", marginBottom: "30px" }}>
            {dbStatus}
          </div>

          <h3 style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "15px" }}>Table Verification (Schema Push)</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {Object.entries(tableChecks).map(([key, value]) => (
              <li key={key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "14px", borderBottom: "1px solid #EEE" }}>
                <span>{key} Table</span>
                <span style={{ fontWeight: 800, color: value === "Schema Missing ❌" ? "#DC2626" : "#008236" }}>
                  {typeof value === "number" ? `${value} records found` : value}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Right Col: Environment */}
        <section style={{ backgroundColor: "#F9FAFB", padding: "30px", borderRadius: "12px", border: "1px solid #EAEAEA" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "20px", textTransform: "uppercase" }}>Propagated Keys</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
             {Object.entries(envCheck).map(([key, value]) => (
               <li key={key} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #EEE" }}>
                 <span style={{ fontSize: "14px" }}>{key}</span>
                 <span style={{ fontWeight: 800, color: value ? "#008236" : "#DC2626" }}>
                    {value ? "Found ✅" : "Missing ❌"}
                 </span>
               </li>
             ))}
          </ul>

          <h3 style={{ fontSize: "0.9rem", color: "#6B7280", marginTop: "30px", marginBottom: "15px" }}>Raw Runtime Inventory</h3>
          <div style={{ padding: "10px", backgroundColor: "#EEE", fontSize: "10px", height: "100px", overflow: "auto", borderRadius: "6px", fontFamily: "monospace" }}>
            {availableKeys.join(", ")}
          </div>
        </section>

      </div>

      <div style={{ marginTop: "60px", padding: "30px", backgroundColor: "#FEF2F2", border: "1px solid #FEE2E2", borderRadius: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", color: "#991B1B" }}>Urgent Recovery Actions:</h3>
        <ul style={{ color: "#991B1B", fontSize: "14px", marginTop: "10px" }}>
          <li>If any Table is "Schema Missing", run: <code style={{ fontWeight: 800 }}>npx prisma db push</code> against the production URL.</li>
          <li>If any Key is "Missing", check your <strong>Amplify Console</strong> for the correct spelling and branch settings.</li>
        </ul>
      </div>
    </div>
  );
}
