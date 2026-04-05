import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    const { url, key } = await uploadToS3(
      buffer,
      file.name,
      file.type,
      "admin-media"
    );

    // Update Media table
    const media = await prisma.media.create({
      data: {
        url: url,
        filename: file.name,
        fileSize: file.size,
        mimeType: file.type,
        // We could also store the key if we add it to the Media model, 
        // but for now, we'll store the public URL as before.
      }
    });

    return NextResponse.json({ success: true, url: url, id: media.id });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
