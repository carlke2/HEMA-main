import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  forcePathStyle: true,
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "your_access_key_id",
    secretAccessKey:
      process.env.S3_SECRET_ACCESS_KEY || "your_secret_access_key",
  },
});

export default defineEventHandler(async (event) => {
  const { fileUrl, expiresIn } = await readBody(event);
  if (!fileUrl) {
    return createError({
      statusCode: 400,
      message: "File URL is required",
      data: {
        status: 400,
      },
    });
  }
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME || "hema",
      Key: fileUrl,
    });

    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: Number(expiresIn) || 60, // Default to 60 seconds if not provided
    });

    return {
      statusCode: 200,
      statusMessage: "OK",
      message: "Presigned URL generated successfully",
      data: {
        presignedUrl,
      },
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to upload file to S3",
    });
  }
});
