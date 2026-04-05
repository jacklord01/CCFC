import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

// PUBLIC ENDPOINT - No Session Check
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string || "EVENTS";
    const uploaderName = formData.get("uploaderName") as string || "Supporter";
    const uploaderEmail = formData.get("uploaderEmail") as string || null;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files" }, { status: 400 });
    }

    const uploadedRecords = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to S3
      const { url, key } = await uploadToS3(
        buffer,
        file.name,
        file.type,
        "gallery"
      );

      // Save to Database
      const record = await prisma.galleryItem.create({
        data: {
          url: url,
          imageKey: key,
          caption: caption || null,
          category: category,
          status: "PENDING", // Fans always upload to PENDING
          uploaderName,
          uploaderEmail
        }
      });
      
      uploadedRecords.push(record);
    }

    return NextResponse.json({ success: true, count: uploadedRecords.length });
  } catch (error: any) {
    console.error("Public Gallery Upload Error:", error);
    return NextResponse.json({ 
      error: "Cloud upload failed", 
      details: error.message,
      code: error.code || "UNKNOWN"
    }, { status: 500 });
  }
}
