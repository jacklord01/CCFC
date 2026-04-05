import { NextResponse } from "next/server";
import { getClubSettings, updateClubSetting, ClubSettings } from "@/lib/settings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const settings = await getClubSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const keys = Object.keys(data) as Array<keyof ClubSettings>;

  try {
    for (const key of keys) {
      await updateClubSetting(key, data[key]);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
