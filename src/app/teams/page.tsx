import * as cheerio from 'cheerio';

// This Next.js Server Component scrapes FinalWhistle for the latest results!
async function getMatchData() {
  const data: { results: Array<{ match: string; score: string }> } = {
    results: [],
  };

  try {
    const res = await fetch('https://www.finalwhistle.ie/soccer/team/castlebar-celtic/', { next: { revalidate: 3600 } });
    const html = await res.text();
    const $ = cheerio.load(html);

    // We saw from earlier parsing the results are in event links and tabs
    // Finalwhistle has specific nested tables. Since this is a template, we will do a targeted best-effort scrape 
    // or stub data if the structure changes, providing a fallback array if scrape fails.

    $('h4').each((i, el) => {
       const text = $(el).text();
       if (text.includes('Castlebar Celtic v') || text.includes('v Castlebar Celtic')) {
          // This is a match heading
          const matchTarget = text;
          // Attempt to find preceding result (like "1 - 0")
          const score = $(el).prev('h5').text() || $(el).prevAll('h5').first().text() || "Result Hidden";
          // Attempt to find date (which is usually a parent or previous element in their specific DOM)
          // We will push a structured object
          data.results.push({
             match: matchTarget.trim(),
             score: score.trim() || 'TBC'
          });
       }
    });

    // Limit to 5 games
    data.results = data.results.slice(0, 5);

  } catch (error) {
    console.error("Failed to scrape FinalWhistle", error);
  }

  return data;
}

export default async function TeamsFixturesPage() {
  const matchData = await getMatchData();

  return (
    <div className="container section">
       <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Match Center</h1>
       
       <div className="grid-cols-2">
         
         <div className="card">
            <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Latest Results (FinalWhistle)
            </h2>
            {matchData.results.length > 0 ? (
              <ul style={{ listStyle: "none" }}>
                {matchData.results.map((r, i) => (
                  <li key={i} style={{ padding: "1rem 0", borderBottom: "1px solid var(--surface-hover)" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "600" }}>{r.match}</span>
                        <span style={{ backgroundColor: "var(--primary-dark)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "1rem", fontWeight: "bold" }}>
                          {r.score}
                        </span>
                     </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No recent results found or scraper unavailable. Please check the official FinalWhistle page.</p>
            )}
            
            <a href="https://www.finalwhistle.ie/soccer/team/castlebar-celtic/" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginTop: "1.5rem", width: "100%" }}>
              View Full Tables on FinalWhistle
            </a>
         </div>

         <div className="card">
            <h2 style={{ borderBottom: "2px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              Upcoming Fixtures
            </h2>
            <p className="text-muted mb-4">Our upcoming matches will be listed here based on Mayo League scheduling.</p>
            
            <div style={{ backgroundColor: "var(--surface-hover)", padding: "1rem", borderRadius: "var(--radius-sm)", marginBottom: "1rem" }}>
               <h4>Castlebar Celtic vs Westport United</h4>
               <p>Super League - Sat 14th Aug, 6:00 PM</p>
               <p style={{ fontSize: "0.9rem", color: "var(--primary-color)", marginTop: "0.5rem" }}>Celtic Park</p>
            </div>
            
            <div style={{ backgroundColor: "var(--surface-hover)", padding: "1rem", borderRadius: "var(--radius-sm)" }}>
               <h4>Ballyheane vs Castlebar Celtic</h4>
               <p>Super League - Sun 22nd Aug, 11:30 AM</p>
               <p style={{ fontSize: "0.9rem", color: "var(--primary-color)", marginTop: "0.5rem" }}>Ballyheane Pitch</p>
            </div>
         </div>
         
       </div>
    </div>
  );
}
