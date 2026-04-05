import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrapeFinalWhistleMatches } from "@/lib/scraper";
import { recordAuditAction } from "@/lib/audit";
import { updateClubSetting } from "@/lib/settings";

export async function POST() {
  try {
    const matches = await scrapeFinalWhistleMatches();
    
    if (!matches || matches.length === 0) {
      return NextResponse.json({ message: "No new matches found on FinalWhistle" });
    }

    console.log(`[SCRAPER] Starting sync. Found ${matches.length} matches.`);

    // Update matches without relying on custom ID strings
    let updatedCount = 0;
    for (const match of (matches || [])) {
      try {
        console.log(`[SCRAPER] Processing: ${match.homeTeam} vs ${match.awayTeam} on ${match.date}`);
        
        // Find if we already have this specific match (Date + Teams)
        const existing = await prisma.match.findFirst({
          where: {
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            date: match.date
          }
        });

        if (existing) {
          await prisma.match.update({
            where: { id: existing.id },
            data: { score: match.score, type: match.type }
          });
        } else {
          await prisma.match.create({
            data: match
          });
        }
        updatedCount++;
      } catch (err) {
        console.error(`[SCRAPER] Failed to upsert match:`, err);
      }
    }

    console.log(`[SCRAPER] Completed sync. Updated ${updatedCount} records.`);

    // Update Last Sync Timestamp
    await updateClubSetting("LAST_MATCH_SYNC", new Date().toISOString());

    // Record Audit Log
    await recordAuditAction("SYNC_MATCHES", "MATCH", undefined, `Synced ${updatedCount} matches from FinalWhistle.ie`);

    return NextResponse.json({ success: true, count: updatedCount });
  } catch (error: any) {
    console.error("[SCRAPER] FATAL ERROR:", error.message, error.stack);
    return NextResponse.json({ error: "Failed to sync matches", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: { date: "desc" }
  });
  return NextResponse.json(matches);
}
