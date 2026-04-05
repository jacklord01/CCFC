import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

// GET - Supports public fetching (Approved only) and private (All for moderation)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const showUnapproved = searchParams.get("unapproved") === "true";

  const where: any = {};
  if (category && category !== "ALL") where.category = category;
  
  // Public only sees approved. Admin can see both.
  if (!session || !showUnapproved) {
    where.status = "APPROVED";
  }

  const items = await prisma.galleryItem.findMany({
    where,
    orderBy: { createdAt: "desc" }
  });
  
  return NextResponse.json(items);
}

// POST - Authenticated (Admin Upload - though meestal public API handles this now)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const galleryItem = await prisma.galleryItem.create({
    data: {
      url: data.url,
      imageKey: data.imageKey || "",
      caption: data.caption || "",
      category: data.category,
      status: "APPROVED", // Admin uploads are auto-approved
      approvedBy: session.user?.name || "Admin",
      approvedAt: new Date()
    }
  });

  return NextResponse.json(galleryItem);
}

// PATCH - Authenticated (Moderation Approve/Reject)
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  const galleryItem = await prisma.galleryItem.update({
    where: { id: data.id },
    data: { 
      status: data.status || "APPROVED",
      approvedAt: data.status === "APPROVED" ? new Date() : null,
      approvedBy: data.status === "APPROVED" ? (session.user?.name || "Admin") : null
    }
  });

  return NextResponse.json(galleryItem);
}

// DELETE - Authenticated
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  await prisma.galleryItem.delete({
    where: { id }
  });
  return NextResponse.json({ success: true });
}
