import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="hero" style={{
        backgroundColor: "var(--primary-dark)",
        color: "white",
        padding: "6rem 0",
        textAlign: "center",
        borderBottom: "4px solid var(--accent-color)"
      }}>
        <div className="container animate-fade-in">
          <h1 style={{ color: "white", fontSize: "3rem", marginBottom: "1rem" }}>Welcome to Castlebar Celtic FC</h1>
          <p style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto 2rem", opacity: 0.9 }}>
            A legacy of football excellence, community spirit, and passion since 1924.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/shop" className="btn-primary" style={{ backgroundColor: "var(--accent-color)", color: "var(--text-main)" }}>Club Shop</Link>
            <Link href="/fundraise/lotto" className="btn-secondary" style={{ borderColor: "white", color: "white" }}>Play Lotto</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>Latest From The Club</h2>
        <div className="grid-cols-3">
          
          <div className="card">
            <h3>Club Shop Now Open</h3>
            <p className="mb-4 text-muted">Purchase official merchandise, pay your registration, or buy match tickets directly through our new portal.</p>
            <Link href="/shop" className="btn-primary">Visit Shop</Link>
          </div>
          
          <div className="card">
            <h3>Match Center</h3>
            <p className="mb-4 text-muted">Keep up to date with the latest team fixtures and final whistle results directly from the pitch.</p>
            <Link href="/teams" className="btn-secondary">View Fixtures</Link>
          </div>
          
          <div className="card" style={{ borderTop: "4px solid var(--accent-color)" }}>
            <h3>Support the Club Lotto</h3>
            <p className="mb-4 text-muted">Play our SmartLotto to support Castlebar Celtic's facilities and teams. Huge jackpots available!</p>
            <Link href="/fundraise/lotto" className="btn-primary" style={{ width: "100%" }}>Play Now</Link>
          </div>
          
        </div>
      </section>
      
      <section className="section" style={{ backgroundColor: "var(--surface-color)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Join The Pride of Mayo</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>We provide opportunities for young people of all backgrounds to play football safely, develop their skills, and enjoy the beautiful game.</p>
          <Link href="/shop?tab=registration" className="btn-primary">Player Registration</Link>
        </div>
      </section>
    </>
  );
}
