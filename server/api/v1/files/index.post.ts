import prisma, { FileType } from "~/lib/prisma";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  const formData = await readFormData(event);
  const fileToUpload = formData.get("file");
  const userId = Number(formData.get("userId"));
  const fileType = formData.get("fileType");

  if (!userId || !fileType || !fileToUpload) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return createError({
      statusCode: 404,
      message: "User not found",
      data: {
        status: 404,
      },
    });
  }
  const file = await prisma.file.findUnique({
    where: { fileUrl: `${userId}/${(fileToUpload as File).name}` },
  });
  if (file) {
    return createError({
      statusCode: 409,
      message: "file already exists",
      data: {
        status: 409,
      },
    });
  }
  try {
    const fileBuffer = Buffer.from(await (fileToUpload as File).arrayBuffer());
    const upload = await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME || "hema",
        Key: `${userId}/${(fileToUpload as File).name}`,
        Body: fileBuffer,
        ContentType: (fileToUpload as File).type,
      })
    );

    const file = await prisma.file.create({
      data: {
        userId,
        fileName: (fileToUpload as File).name as string,
        fileUrl: `${userId}/${(fileToUpload as File).name}`,
        fileType: fileType as FileType,
        uploadedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "file uploaded successfully",
      data: {
        url: file.fileUrl,
        type: file.fileType,
        uploadedAt: file.uploadedAt,
        id: file.id,
        userId: file.userId,
        status: 200,
        upload: upload,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error while uploading file",
      data: {
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
