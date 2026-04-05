import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// PUBLIC ENDPOINT - No Session Check
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string || "EVENTS";

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // Restriction: supporters can only upload to EVENTS category publicly
    if (category !== "EVENTS") {
      return NextResponse.json({ error: "Public uploads restricted to Events" }, { status: 403 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "public-gallery");
    await mkdir(uploadDir, { recursive: true });

    const filename = `public-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/public-gallery/${filename}`;

    // Create a PENDING item for moderation
    const galleryItem = await prisma.galleryItem.create({
      data: {
        url: fileUrl,
        caption: caption || "Supporter Upload",
        category: "EVENTS",
        status: "PENDING" // MODERATION REQUIRED
      }
    });

    return NextResponse.json({ success: true, url: fileUrl, id: galleryItem.id });
  } catch (error) {
    console.error("Public Gallery Upload Error:", error);
    return NextResponse.json({ error: "Public upload failed" }, { status: 500 });
  }
}
