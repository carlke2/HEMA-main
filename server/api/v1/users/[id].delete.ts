import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    return createError({
      statusCode: 400,
      message: "User ID is required",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return createError({
        statusCode: 404,
        message: "user not found",
        data: {
          status: 404,
        },
      });
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return {
      status: 200,
      message: "user deleted successfully",
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
      },
    });
  }
});
