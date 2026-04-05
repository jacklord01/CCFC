import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  // TODO: Replace with live Contentful GraphQL Fetch when ENV vars are provided
  // async function fetchContentfulNews() {
  //   const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, ...);
  // }
  
  const newsItems = [
    { id: 1, tag: "Match Report", date: "March 9, 2026", title: "Victory Against Westport United", extract: "Our first team delivered a commanding performance in today's league match. Goals from...", slug: "victory-against-westport" },
    { id: 2, tag: "Youth", date: "March 7, 2026", title: "Youth Academy Expansion", extract: "Exciting news! We are expanding our youth academy program to accommodate more young footballers and...", slug: "youth-expansion" },
    { id: 3, tag: "Community", date: "March 5, 2026", title: "Community Event Success", extract: "Last Saturday was a fantastic day! Our club hosted a family fun day that raised EUR for local charities. We celebrating...", slug: "community-success" },
    { id: 4, tag: "Match Report", date: "March 9, 2026", title: "Victory Against Westport United", extract: "Our first team delivered a commanding performance in today's league match. Goals from...", slug: "victory-against-westport-2" },
    { id: 5, tag: "Youth", date: "March 7, 2026", title: "Youth Academy Expansion", extract: "Exciting news! We are expanding our youth academy program to accommodate more young footballers and...", slug: "youth-expansion-2" },
    { id: 6, tag: "Community", date: "March 5, 2026", title: "Community Event Success", extract: "Last Saturday was a fantastic day! Our club hosted a family fun day that raised EUR for local charities. We celebrating...", slug: "community-success-2" }
  ];

  return (
    <main>
       {/* Dark Hero matching Figma */}
       <section style={{ backgroundColor: "var(--footer-bg)", color: "white", textAlign: "center", padding: "6rem 1rem", backgroundImage: "radial-gradient(circle at top right, rgba(0,135,81,0.2) 0%, transparent 60%)" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "white" }}>Latest News</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>Stay up to date with match reports, club news, and community updates</p>
       </section>

       <section className="section-white">
         <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
               {newsItems.map((news) => (
                 <div key={news.id} className="card card-flush">
                    {/* Image Area with Tag */}
                    <div style={{ height: "220px", backgroundColor: "var(--background-muted)", position: "relative", backgroundImage: "url('/football_stadium_1775346359306.png')", backgroundSize: "cover" }}>
                       <span style={{ position: "absolute", top: "15px", left: "15px", backgroundColor: "var(--primary-color)", color: "white", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: "600", borderRadius: "4px" }}>
                         {news.tag}
                       </span>
                    </div>
                    {/* Content Area */}
                    <div style={{ padding: "1.5rem" }}>
                       <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                         <span>📅</span> {news.date}
                       </div>
                       <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--text-main)" }}>{news.title}</h3>
                       <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: "1.5" }}>{news.extract}</p>
                       <Link href="#" style={{ color: "var(--primary-color)", fontWeight: "600", fontSize: "0.9rem" }}>Read More →</Link>
                    </div>
                 </div>
               ))}
            </div>
            
            {/* Centered See More button */}
            <div style={{ textAlign: "center" }}>
               <button className="btn-primary" style={{ padding: "0.75rem 2.5rem", backgroundColor: "var(--primary-color)", border: "none" }}>See More</button>
            </div>
         </div>
       </section>
    </main>
  );
}
