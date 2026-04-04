"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Wrapping in Suspense because we use useSearchParams()
export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "merchandise";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: "merchandise", label: "Merchandise" },
    { id: "tickets", label: "Match Tickets" },
    { id: "registration", label: "Player Registration" },
    { id: "centenary", label: "Centenary Tickets" },
  ];

  return (
    <div className="container section">
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Club Shop</h1>
      
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "btn-primary" : "btn-secondary"}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="shop-content animate-fade-in">
        {activeTab === "merchandise" && (
          <div>
            <h2>Official Merchandise</h2>
            <p>Purchase official Castlebar Celtic FC gear.</p>
            <div className="grid-cols-3" style={{ marginTop: "2rem" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="card" style={{ textAlign: "center" }}>
                  <div style={{ height: "150px", backgroundColor: "var(--surface-hover)", marginBottom: "1rem", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>Image Placeholder</div>
                  <h3>Club Jersey #{i}</h3>
                  <p style={{ fontWeight: "bold", fontSize: "1.2rem", margin: "0.5rem 0" }}>€45.00</p>
                  {/* Placeholder button until payment links are added */}
                  <a href="#" className="btn-primary" style={{ width: "100%" }}>Buy on SumUp</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="card">
            <h2>Upcoming Match Tickets</h2>
            <p className="text-muted" style={{ marginBottom: "1.5rem" }}>Purchase digital tickets for upcoming games. Scan at the gate.</p>
            <div style={{ padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "1.1rem" }}>Vs Westport United FC</strong>
                <p>Saturday, 3:00 PM | Celtic Park</p>
              </div>
              <a href="#" className="btn-primary">Buy Ticket (€10)</a>
            </div>
          </div>
        )}

        {activeTab === "registration" && (
          <div className="card" style={{ borderTop: "4px solid var(--primary-color)" }}>
            <h2>Annual Player Registration</h2>
            <p className="text-muted" style={{ marginBottom: "1.5rem" }}>All players must be registered with the club prior to participating in matches or training.</p>
            
            <div className="grid-cols-2">
              <div style={{ padding: "1.5rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                <h3>Juvenile / Youth</h3>
                <p>U6 to U18 Boys & Girls</p>
                <h4 style={{ color: "var(--primary-color)", margin: "1rem 0" }}>€120.00</h4>
                <a href="#" className="btn-secondary" style={{ width: "100%" }}>Register Child</a>
              </div>
              <div style={{ padding: "1.5rem", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                <h3>Senior Player</h3>
                <p>Adult Teams</p>
                <h4 style={{ color: "var(--primary-color)", margin: "1rem 0" }}>€150.00</h4>
                <a href="#" className="btn-secondary" style={{ width: "100%" }}>Register Adult</a>
              </div>
            </div>
            <p style={{ fontSize: "0.85rem", marginTop: "1rem" }} className="text-muted">By continuing with registration, you agree to our Player & Parent Code of Conduct located in our policies section.</p>
          </div>
        )}

        {activeTab === "centenary" && (
          <div className="card" style={{ backgroundColor: "var(--primary-dark)", color: "white" }}>
            <h2 style={{ color: "var(--accent-color)" }}>Centenary Celebration 2024</h2>
            <p style={{ marginBottom: "1.5rem", opacity: 0.9 }}>Join us in celebrating 100 years of Castlebar Celtic FC. A gala night of memories, awards, and football heritage.</p>
            <div style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "var(--radius-sm)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
               <div>
                  <h3 style={{ color: "white" }}>Standard Admission Ticket</h3>
                  <p style={{ opacity: 0.8 }}>Includes 3-course meal and entertainment</p>
               </div>
               <a href="#" className="btn-primary" style={{ backgroundColor: "var(--accent-color)", color: "var(--text-main)" }}>Buy Ticket (€80)</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
