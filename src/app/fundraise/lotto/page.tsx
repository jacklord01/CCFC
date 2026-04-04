import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Club Lotto | Castlebar Celtic FC',
  description: 'Support Castlebar Celtic FC by playing our SmartLotto online. Win huge jackpots while supporting local football.',
};

export default function LottoPage() {
  return (
    <div className="container section">
      <div style={{ textAlign: "center", marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem" }}>
        <h1>Play The Club Lotto</h1>
        <p className="text-muted" style={{ fontSize: "1.1rem" }}>
          By playing the Castlebar Celtic FC SmartLotto, you are directly supporting the 
          development of our facilities, coaching equipment, and youth teams. Thank you for your continued support!
        </p>
      </div>
      
      <div className="card" style={{ padding: "0", overflow: "hidden", display: "flex", justifyContent: "center", backgroundColor: "#f8f9fa" }}>
        {/* Responsive iFrame Wrapper */}
        <div style={{ position: "relative", width: "100%", height: "800px", maxWidth: "700px" }}>
          <iframe 
            src="https://sll.ie/castlebar-celtic?type=lotto" 
            title="Castlebar Celtic SmartLotto"
            style={{ width: "100%", height: "100%", border: "none", overflow: "hidden" }}
            scrolling="yes"
          />
        </div>
      </div>
    </div>
  );
}
