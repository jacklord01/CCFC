"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  if (!settings) return <div style={{ padding: "4rem", textAlign: "center" }}>Loading contact details...</div>;

  return (
    <main>
      {/* Dark Hero matching Figma */}
      <section style={{ backgroundColor: "var(--footer-bg)", color: "white", textAlign: "center", padding: "6rem 1rem" }}>
         <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "white" }}>How Can We Help?</h1>
         <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>Get in touch with Castlebar Celtic FC. We'd love to hear from you!</p>
      </section>

      {/* Main Form and Map Area */}
      <section className="section-white">
        <div className="container" style={{ display: "flex", flexWrap: "wrap", backgroundColor: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-color)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
           
           {/* Left Form Area */}
           <div style={{ flex: "1 1 400px", padding: "3rem" }}>
             <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
               Get in <span style={{ color: "var(--primary-color)" }}>Touch</span>
             </h2>

             {status === "SUCCESS" ? (
               <div style={{ padding: "2rem", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", textAlign: "center" }}>
                 <h3 style={{ color: "#166534", marginBottom: "1rem" }}>Message Sent!</h3>
                 <p style={{ color: "#166534" }}>Thank you for reaching out. A member of the Castlebar Celtic team will get back to you shortly.</p>
                 <button onClick={() => setStatus("IDLE")} className="btn-secondary" style={{ marginTop: "1rem" }}>Send Another Message</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
                  <input 
                    type="text" 
                    placeholder="Name *" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "6px", fontFamily: "inherit" }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "6px", fontFamily: "inherit" }}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone number *" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: "100%", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "6px", fontFamily: "inherit" }}
                  />
                  <textarea 
                    placeholder="Your Message*" 
                    required 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "6px", fontFamily: "inherit", resize: "vertical" }}
                  />
                  {status === "ERROR" && <p style={{ color: "#ef4444", fontSize: "14px" }}>Oops! Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === "SENDING"} className="btn-primary" style={{ width: "100%", border: "none", fontSize: "1.1rem" }}>
                    {status === "SENDING" ? "SENDING..." : "SEND"}
                  </button>
               </form>
             )}

             <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
               <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <a href={`https://wa.me/${settings.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" 
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "12px", 
                      backgroundColor: "#25D366", 
                      padding: "14px 28px", 
                      borderRadius: "50px", 
                      color: "white", 
                      textDecoration: "none",
                      fontWeight: "700",
                      fontSize: "1rem",
                      boxShadow: "0 6px 20px rgba(37, 211, 102, 0.25)"
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
               </div>
               <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                 <span style={{ fontSize: "1.5rem" }}>✉️</span>
                 <div>
                   <strong style={{ display: "block", fontSize: "0.85rem", textTransform: "uppercase" }}>Email</strong>
                   <a href={`mailto:${settings.NOTIFICATION_EMAIL}`} style={{ color: "var(--primary-color)", fontWeight: "600", fontSize: "0.9rem", textDecoration: "none" }}>
                     {settings.NOTIFICATION_EMAIL}
                   </a>
                 </div>
               </div>
             </div>
           </div>

           {/* Right Map Image Placeholder */}
           <div style={{ flex: "1 1 400px", minHeight: "400px", backgroundColor: "var(--background-muted)", position: "relative" }}>
              <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid var(--border-color)" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                     <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontWeight: "500" }}>Celtic Park, Castlebar</p>
                     <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>[Google Maps iFrame embed here]</p>
                  </div>
                </div>
              </div>
           </div>

        </div>
      </section>
    </main>
  );
}
