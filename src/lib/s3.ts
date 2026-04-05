import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "eu-west-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

export async function uploadToS3(
  file: Buffer,
  filename: string,
  contentType: string,
  folder: string = "gallery"
) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const uniqueId = Date.now();
  
  // Format: gallery/2026/04/1712345678-filename.jpg
  const key = `${folder}/${year}/${month}/${uniqueId}-${filename.replace(/\s+/g, "-")}`;
  const bucketName = process.env.S3_BUCKET_NAME || "";

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  // Return both the public URL and the Key for DB storage
  const url = `https://${bucketName}.s3.${process.env.S3_REGION || "eu-west-1"}.amazonaws.com/${key}`;
  
  return { url, key };
}

export { s3Client };
