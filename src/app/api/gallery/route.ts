import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET - Supports public fetching (Approved only) and private (All for moderation)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const showUnapproved = searchParams.get("unapproved") === "true";

  const where: any = {};
  if (category) where.category = category;
  
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

// POST - Authenticated (Admin Upload)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const galleryItem = await prisma.galleryItem.create({
    data: {
      url: data.url,
      caption: data.caption || "",
      category: data.category,
      status: "APPROVED" // Admin uploads are auto-approved
    }
  });

  return NextResponse.json(galleryItem);
}

// PATCH - Authenticated (Moderation Approve)
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  if (!data.id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  const galleryItem = await prisma.galleryItem.update({
    where: { id: data.id },
    data: { status: data.status || "APPROVED" }
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
