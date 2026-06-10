import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "file ID is required",
    });
  }
  let { fileName, fileType } = await readBody(event);

  if (!Number.isInteger(id)) {
    return createError({
      statusCode: 400,
      message: "Invalid file ID",
      data: {
        status: 400,
      },
    });
  }

  if (!fileName && !fileType) {
    return createError({
      statusCode: 400,
      message: "Missing values",
      data: {
        status: 400,
      },
    });
  }

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

  try {
    const updatedFile = await prisma.file.update({
      where: { id: Number(id) },
      data: {
        fileName,
        fileType,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "File updated successfully",
      data: {
        id: updatedFile.id,
        userId: updatedFile.userId,
        fileName: updatedFile.fileName,
        fileUrl: updatedFile.fileUrl,
        fileType: updatedFile.fileType,
        uploadedAt: updatedFile.uploadedAt,
      },
    };
  } catch (error) {
    console.error("Error updating job:", error);
    return createError({
      statusCode: 500,
      message: "Failed to update job",
      data: {
        status: 500,
      },
    });
  }
});
