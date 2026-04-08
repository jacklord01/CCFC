"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const [activeTab, setActiveTab] = useState("MERCHANDISE");
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "MERCHANDISE", label: "Merchandise" },
    { id: "TICKET", label: "Match Tickets" },
    { id: "REGISTRATION", label: "Registration" },
    { id: "CENTENARY", label: "Centenary" },
    { id: "RAFFLE", label: "Raffles" },
    { id: "GAME", label: "Fundraising Games" },
  ];

  useEffect(() => {
    fetch("/api/settings").then(res => res.json()).then(data => setSettings(data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/shop?category=${activeTab}`);
      if (!res.ok) {
        setProducts([]);
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Shop fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Club Shop & Fundraising</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>Support Castlebar Celtic FC through merchandise, tickets, and club games.</p>
      
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <a 
          href="https://castlebar-celtic.sumupstore.com/products" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            display: "inline-flex", alignItems: "center", gap: "8px", 
            backgroundColor: "#008236", color: "white", textDecoration: "none", 
            padding: "14px 28px", borderRadius: "8px", fontWeight: "800",
            boxShadow: "0 10px 15px -3px rgba(0, 130, 54, 0.3)" 
          }}
        >
          View Full Store on SumUp
          <svg style={{ width: "16px", height: "16px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>
      
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "btn-primary" : "btn-secondary"}
            style={{ padding: "10px 24px", fontSize: "14px" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="shop-content animate-fade-in">
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>Loading listings...</div>
        ) : products.length > 0 ? (
          <div className="grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="card" style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px" }}>
                <div style={{ 
                  height: "220px", 
                  backgroundColor: "#f9fafb", 
                  marginBottom: "1.5rem", 
                  borderRadius: "12px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative"
                }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  ) : (
                    <span style={{ fontSize: "14px", color: "#9ca3af" }}>No Preview Available</span>
                  )}
                </div>
                
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>{product.name}</h3>
                <p style={{ fontSize: "14px", color: "#6b7280", flex: 1, marginBottom: "16px" }}>{product.description}</p>
                
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: "800", fontSize: "1.5rem", color: "var(--primary-color)" }}>€{product.price.toFixed(2)}</span>
                   </div>
                   
                   <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a href={settings?.SUMUP_LINK || "https://sumup.ie"} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: "100%", textAlign: "center", textDecoration: "none", backgroundColor: "#0B111D" }}>
                        Secure Purchase (SumUp)
                      </a>
                      <a href={`https://wa.me/${settings?.WHATSAPP_NUMBER || '353871924100'}?text=I'm interested in purchasing: ${product.name}`} target="_blank" rel="noopener noreferrer" style={{ width: "100%", textAlign: "center", textDecoration: "none", fontSize: "13px", color: "#008236", fontWeight: "700" }}>
                        Inquire via WhatsApp
                      </a>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "6rem", backgroundColor: "#f9fafb", borderRadius: "16px", border: "1px dashed #d1d5db" }}>
            <h3 style={{ color: "#0B111D", marginBottom: "8px" }}>No active listings</h3>
            <p style={{ color: "#6b7280" }}>We current have no items available in this category. Check back soon for club releases!</p>
          </div>
        )}
      </div>
    </div>
  );
}
