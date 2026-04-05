import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { recordAuditAction } from "@/lib/audit";

export async function GET() {
  const volunteers = await prisma.volunteer.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(volunteers);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const volunteer = await prisma.volunteer.create({
    data: {
      name: data.name,
      role: data.role,
      description: data.description,
      imageUrl: data.imageUrl,
      order: data.order || 0
    }
  });

  await recordAuditAction("CREATE_PERSONNEL", "VOLUNTEER", volunteer.id, `Added personnel: ${volunteer.name}`);

  return NextResponse.json(volunteer);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const { id, ...updateData } = data;

  const volunteer = await prisma.volunteer.update({
    where: { id },
    data: updateData
  });

  await recordAuditAction("UPDATE_PERSONNEL", "VOLUNTEER", id, `Updated personnel profile for: ${volunteer.name}`);

  return NextResponse.json(volunteer);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  const volunteer = await prisma.volunteer.findUnique({ where: { id } });

  await prisma.volunteer.delete({
    where: { id }
  });

  await recordAuditAction("DELETE_PERSONNEL", "VOLUNTEER", id, `Removed personnel: ${volunteer?.name || "Unknown"}`);

  return NextResponse.json({ success: true });
}
