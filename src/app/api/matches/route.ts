import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "UPCOMING";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const skip = (page - 1) * limit;

  try {
    const matches = await prisma.match.findMany({
      where: { type },
      orderBy: { date: type === "UPCOMING" ? "asc" : "desc" },
      skip,
      take: limit,
    });

    const total = await prisma.match.count({ where: { type } });

    return NextResponse.json({
      matches,
      hasMore: skip + matches.length < total
    });
  } catch (error) {
    console.error("Match Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
