import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// PUBLIC ENDPOINT - No Session Check
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string || "EVENTS";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    // Restriction: supporters can only upload to EVENTS category publicly
    if (category !== "EVENTS") {
      return NextResponse.json({ error: "Public uploads restricted to Events" }, { status: 403 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "public-gallery");
    await mkdir(uploadDir, { recursive: true });

    const uploadedUrls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `public-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      const fileUrl = `/uploads/public-gallery/${filename}`;
      uploadedUrls.push(fileUrl);

      await prisma.galleryItem.create({
        data: {
          url: fileUrl,
          caption: caption || null,
          category: "EVENTS",
          status: "PENDING"
        }
      });
    }

    return NextResponse.json({ success: true, urls: uploadedUrls });
  } catch (error) {
    console.error("Public Gallery Upload Error:", error);
    return NextResponse.json({ error: "Public upload failed" }, { status: 500 });
  }
}
