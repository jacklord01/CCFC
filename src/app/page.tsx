import Image from "next/image";
import Link from "next/link";
import { getClubSettings } from "@/lib/settings";

async function getMatches() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/matches/scrape`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const settings = await getClubSettings();
  const matches = await getMatches();

  const results = matches.filter((m: any) => m.type === "RESULT").slice(0, 3);
  const upcoming = matches.filter((m: any) => m.type === "UPCOMING").slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" style={{ 
        height: "80vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        textAlign: "center",
        background: `linear-gradient(rgba(11, 17, 29, 0.8), rgba(11, 17, 29, 0.8)), url('/football_stadium_1775346359306.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white"
      }}>
        <div className="container animate-fade-in">
          <h1 style={{ fontSize: "4rem", marginBottom: "1rem", color: "white" }}>{settings.CLUB_NAME}</h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "2rem", opacity: 0.9 }}>100 Years of Footballing Excellence in Mayo</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <Link href="/about" className="btn-primary">Our History</Link>
            <Link href="/shop" className="btn-outline-white">Club Shop</Link>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">Latest Club News</h2>
          <div className="grid-cols-3">
             {/* We will map dynamic News here via Contentful API in the next step */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="card card-flush">
                 <div style={{ height: "200px", backgroundColor: "#eee", borderRadius: "12px 12px 0 0" }}></div>
                 <div style={{ padding: "1.5rem" }}>
                   <span className="badge">Featured</span>
                   <h3 style={{ marginTop: "1rem" }}>Match Report: Celtic Clinch Crucial Win</h3>
                   <p className="text-muted">Read our full match overview from Saturday's game at Celtic Park.</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Matches Overview */}
      <section className="section bg-dark text-white" style={{ backgroundColor: "var(--footer-bg)" }}>
        <div className="container">
          <div className="grid-cols-2" style={{ gap: "4rem" }}>
            
            {/* Results */}
            <div>
              <h2 style={{ color: "white", marginBottom: "2rem" }}>Latest Results</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {results.length > 0 ? results.map((m: any) => (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div style={{ flex: 1, textAlign: "right", fontWeight: "bold" }}>{m.homeTeam}</div>
                    <div style={{ margin: "0 2rem", fontSize: "1.2rem", fontWeight: "900", color: "#25D366" }}>{m.score}</div>
                    <div style={{ flex: 1, fontWeight: "bold" }}>{m.awayTeam}</div>
                  </div>
                )) : (
                  <p style={{ opacity: 0.6 }}>No recent results listed.</p>
                )}
              </div>
            </div>

            {/* Fixtures */}
            <div>
              <h2 style={{ color: "white", marginBottom: "2rem" }}>Upcoming Fixtures</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {upcoming.length > 0 ? upcoming.map((m: any) => (
                  <div key={m.id} style={{ padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                    <div style={{ fontWeight: "700", marginBottom: "0.5rem" }}>{m.homeTeam} vs {m.awayTeam}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                       <span>{new Date(m.date).toLocaleDateString()}</span>
                       <span>{m.location}</span>
                    </div>
                  </div>
                )) : (
                  <p style={{ opacity: 0.6 }}>Check back soon for upcoming fixtures.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Supporters Corner */}
      <section className="section section-white">
        <div className="container" style={{ textAlign: "center" }}>
           <h2 className="section-title">Proudly Supported By</h2>
           <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto 3rem auto" }}>
              Join the hundreds of supporters who make Castlebar Celtic FC one of the most vibrant clubs in the country.
           </p>
           <Link href="/join" className="btn-primary">Become a Member</Link>
        </div>
      </section>
    </main>
  );
}
