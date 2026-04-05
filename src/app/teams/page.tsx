import { prisma } from "@/lib/prisma";
import TeamsClient from "@/components/TeamsClient";

export const dynamic = "force-dynamic";

export default async function MatchesPage() {
  let initialMatches: any[] = [];
  let initialHasMore = false;

  try {
    // Fetch initial 6 upcoming matches on server
    initialMatches = await prisma.match.findMany({
      where: { type: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 6
    });

    const total = await prisma.match.count({ where: { type: "UPCOMING" } });
    initialHasMore = initialMatches.length < total;
  } catch (err) {
    console.error("Database connection failed for Teams Page", err);
  }

  return (
    <main style={{ backgroundColor: "#FFFFFF", maxWidth: "1920px", margin: "0 auto" }}>
      {/* 1. Dark Hero Banner */}
      <section style={{ 
        backgroundColor: "#0B111D", 
        color: "white", 
        textAlign: "center", 
        padding: "100px 180px", 
        backgroundImage: "radial-gradient(circle at center, rgba(0,130,54,0.15) 0%, transparent 70%)" 
      }}>
         <h1 style={{ fontSize: "60px", fontWeight: 800, marginBottom: "20px", textTransform: "uppercase" }}>Fixtures & Results</h1>
         <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "22px", maxWidth: "900px", margin: "0 auto" }}>
           Track every goal and every match from Castlebar Celtic's 2026 campaign.
         </p>
      </section>

      <section style={{ padding: "80px 180px" }}>
        <div className="container">
          <TeamsClient initialMatches={JSON.parse(JSON.stringify(initialMatches))} initialHasMore={initialHasMore} />
        </div>
      </section>
    </main>
  );
}
