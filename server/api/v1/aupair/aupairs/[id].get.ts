import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id || isNaN(Number(id))) {
    return createError({
      statusCode: 400,
      message: "Invalid au pair ID",
    });
  }

  try {
    const auPair = await prisma.user.findFirst({
      where: {
        id: Number(id),
        userType: "aupair",
      },
      include: {
        AuPairUserProfile: true,
        files: {
          where: {
            fileType: {
              in: ["CV", "ID", "Passport", "Certification"]
            }
          }
        }
      },
    });

    if (!auPair) {
      return createError({
        statusCode: 404,
        message: "Au pair not found",
      });
    }

    return auPair;
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
