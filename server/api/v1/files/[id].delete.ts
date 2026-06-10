import prisma from "~/lib/prisma";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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
  const { id } = event.context.params || {};
  if (!id) {
    return createError({
      statusCode: 400,
      message: "File ID is required",
    });
  }

  try {
    const file = await prisma.file.findUnique({
      where: { id: Number(id) },
    });

    if (!file) {
      return createError({
        statusCode: 404,
        message: "File not found",
        data: {
          status: 404,
        },
      });
    }
    const s3Delete = await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || "hema",
        Key: file.fileUrl,
      })
    );
    await prisma.file.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "File deleted successfully",
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
      },
    });
  }
});
