import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    return createError({
      statusCode: 400,
      message: "Contract ID is required",
    });
  }

  try {
    const contract = await prisma.contract.findUnique({
      where: { id: Number(id) },
    });

    if (!contract) {
      return createError({
        statusCode: 404,
        message: "Contract not found",
        data: {
          status: 404,
        },
      });
    }

    await prisma.contract.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "Contract deleted successfully",
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
