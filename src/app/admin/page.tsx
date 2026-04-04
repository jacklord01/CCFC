import Link from "next/link";

export default function AdminDashboard() {
  // Static placeholder for template. In production, wrap this in a NextAuth/Next-Auth layout 
  // that verifies session user role (Dev Admin vs Club Admin).

  return (
    <div className="container section">
       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
         <h1>Club Administration Dashboard</h1>
         <span style={{ backgroundColor: "var(--primary-color)", color: "white", padding: "0.5rem 1rem", borderRadius: "100px", fontSize: "0.85rem" }}>
            Dev Admin Mode
         </span>
       </div>
       
       <div className="grid-cols-3">
         
         <div className="card">
            <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Member Management</h3>
            <p className="text-muted" style={{ marginBottom: "1.5rem" }}>Manage club administrators, treasurers, and volunteers' access.</p>
            <button className="btn-secondary" style={{ width: "100%", marginBottom: "0.5rem" }}>Add User</button>
            <button className="btn-secondary" style={{ width: "100%" }}>View Directory</button>
         </div>

         <div className="card">
            <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Website Settings</h3>
            <p className="text-muted" style={{ marginBottom: "1.5rem" }}>Change Club Theme Colours, upload logos, and update contact emails.</p>
            <button className="btn-primary" style={{ width: "100%", marginBottom: "0.5rem" }}>Global Config</button>
            <Link href="/policies/terms-and-conditions" className="btn-secondary" style={{ width: "100%", display: "inline-block", textAlign: "center" }}>Edit Policies</Link>
         </div>
         
         <div className="card">
            <h3 style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Shop & Finance</h3>
            <p className="text-muted" style={{ marginBottom: "1.5rem" }}>Update SumUp connections, view registration payments, and add products.</p>
            <button className="btn-secondary" style={{ width: "100%", marginBottom: "0.5rem" }}>Manage Shop Tabs</button>
            <button className="btn-secondary" style={{ width: "100%" }}>Payment Gateway Link</button>
         </div>
         
       </div>
       
       <div className="card" style={{ marginTop: "2rem" }}>
          <h2>System Logs & Analytics</h2>
          <p className="text-muted">Google Analytics ID: G-FXJWNN4TVV is currently active. Traffic events are being captured globally.</p>
       </div>
    </div>
  );
}
