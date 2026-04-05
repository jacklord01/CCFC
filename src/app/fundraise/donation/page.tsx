export default function DonationPage() {
  return (
    <div className="container section">
       <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
         <h1 style={{ marginBottom: "1rem" }}>Support Castlebar Celtic</h1>
         <p className="text-muted" style={{ marginBottom: "2rem" }}>
            Your donations help us maintain our facilities and support youth development programs. 
         </p>
         <div className="card">
            <h2 style={{ marginBottom: "1.5rem" }}>Make a Donation</h2>
            <button className="btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>Proceed to Payment Gateway</button>
            <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>Payments processed securely via SumUp/Stripe (Integration pending).</p>
         </div>
       </div>
    </div>
  );
}
