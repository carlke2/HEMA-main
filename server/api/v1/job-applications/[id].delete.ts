import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    return createError({
      statusCode: 400,
      message: "Application ID is required",
    });
  }

  try {
    const jobApplication = await prisma.jobApplication.findUnique({
      where: { id: Number(id) },
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

    await prisma.jobApplication.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "Application deleted successfully",
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
