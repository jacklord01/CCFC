import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.S3_REGION || "eu-west-1";
const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const bucketName = process.env.S3_BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !bucketName) {
  throw new Error("Missing S3 credentials in environment variables (S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_NAME).");
}

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
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

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  );

  // Return both the public URL and the Key for DB storage
  const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  
  return { url, key };
}

export { s3Client };
