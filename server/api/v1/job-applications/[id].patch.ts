import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Application ID is required",
    });
  }
  const jobId = Number(id);
  if (isNaN(jobId) || !Number.isInteger(jobId)) {
    throw createError({
      statusCode: 400,
      message: "Invalid job ID",
    });
  }
  let { files, status } = await readBody(event);

  if (!files && !status) {
    return createError({
      statusCode: 400,
      message: "Missing values",
      data: {
        status: 400,
      },
    });
  }

  const jobApplication = await prisma.jobApplication.findUnique({
    where: { id: jobId },
  });

  if (!jobApplication) {
    return createError({
      statusCode: 404,
      message: "Application not found",
      data: {
        status: 404,
      },
    });
  }

  try {
    const updatedJobApplication = await prisma.jobApplication.update({
      where: { id: jobId },
      data: {
        status,
        files,
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Application updated successfully",
    };
  } catch (error) {
    console.error("Error updating application:", error);
    return createError({
      statusCode: 500,
      message: "Failed to update application",
      data: {
        status: 500,
      },
    });
  }
});
