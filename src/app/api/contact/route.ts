import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClubSettings } from "@/lib/settings";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Save to Database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email: email || null,
        phone,
        message,
        status: "UNREAD"
      }
    });

    // 2. Fetch Notification Settings
    const settings = await getClubSettings();
    const notifyEmail = settings.NOTIFICATION_EMAIL || "pro@castlebarceltic.ie";

    // 3. Mock Email Notification Log
    console.log(`[NOTIFICATION] New Contact Form Entry!`);
    console.log(`To: ${notifyEmail}`);
    console.log(`Subject: New Message from ${name}`);
    console.log(`Body: ${message}`);

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Only Admin should GET messages - Middleware or Session check recommended
  // For now, we'll implement it here for the admin dashboard fetch
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(submissions);
}

export async function PATCH(req: Request) {
  const data = await req.json();
  const { id, status } = data;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing ID or status" }, { status: 400 });
  }

  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { status }
  });

  return NextResponse.json(updated);
}
