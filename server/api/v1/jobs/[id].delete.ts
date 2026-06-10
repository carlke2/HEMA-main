import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    return createError({
      statusCode: 400,
      message: "Job ID is required",
    });
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id: Number(id) },
    });

    if (!job) {
      return createError({
        statusCode: 404,
        message: "Job not found",
        data: {
          status: 404,
        },
      });
    }

    await prisma.job.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "Job deleted successfully",
      data: {
        status: 200,
        jobId: job.id,
      },
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
