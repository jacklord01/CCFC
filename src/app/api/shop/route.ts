import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { recordAuditAction } from "@/lib/audit";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where: any = {};
  if (category) where.category = category;

  const products = await prisma.product.findMany({
    where,
    orderBy: { category: "asc" }
  });
  
  return NextResponse.json(products);
}

// POST - Authenticated
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description || "",
      price: parseFloat(data.price),
      stock: parseInt(data.stock) || 0,
      category: data.category,
      imageUrl: data.imageUrl || ""
    }
  });

  await recordAuditAction("CREATE_PRODUCT", "PRODUCT", product.id, `Created product: ${product.name}`);

  return NextResponse.json(product);
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const { id, ...updateData } = data;

  if (updateData.price) updateData.price = parseFloat(updateData.price);
  if (updateData.stock) updateData.stock = parseInt(updateData.stock) || 0;

  const product = await prisma.product.update({
    where: { id },
    data: updateData
  });

  await recordAuditAction("UPDATE_PRODUCT", "PRODUCT", id, `Updated product metadata for: ${product.name}`);

  return NextResponse.json(product);
}

// DELETE - Authenticated
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID" }, { status: 400 });

  const product = await prisma.product.findUnique({ where: { id } });
  
  await prisma.product.delete({
    where: { id }
  });

  await recordAuditAction("DELETE_PRODUCT", "PRODUCT", id, `Removed product: ${product?.name || "Unknown"}`);

  return NextResponse.json({ success: true });
}
