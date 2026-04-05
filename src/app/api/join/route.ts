import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, type, details } = data;

    if (!name || !phone || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const request = await prisma.memberRequest.create({
      data: {
        name,
        email: email || "",
        phone,
        type,
        details: details || "",
        status: "PENDING",
      },
    });

    // MOCK EMAIL LOG
    // In a real production environment with SMTP/Resend configured,
    // we would call our email utility here:
    // await sendAdminNotificationEmail(request);
    console.log("--------------------------------------------------");
    console.log("NEW MEMBERSHIP REQUEST RECEIVED:");
    console.log(`Type: ${type}`);
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Details: ${details}`);
    console.log("--------------------------------------------------");

    return NextResponse.json({ success: true, id: request.id });
  } catch (error) {
    console.error("Member Request Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
