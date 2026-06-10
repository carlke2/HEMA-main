import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Payment ID is required",
    });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!payment) {
      return createError({
        statusCode: 404,
        message: "payment not found",
        data: {
          status: 404,
        },
      });
    }

    await prisma.payment.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "payment deleted successfully",
      data: {
        status: 200,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
