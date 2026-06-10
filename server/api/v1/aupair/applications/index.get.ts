import prisma, { Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    familyId?: string;
    auPairId?: string;
    status?: string;
    limit?: string;
    offset?: string;
  };

  try {
    const where: Prisma.AuPairContractWhereInput = {};

    if (query.familyId) {
      where.familyId = query.familyId;
    }

    if (query.auPairId) {
      where.userId = Number(query.auPairId);
    }

    if (query.status) {
      where.status = query.status as any;
    }

    // Pagination
    const limit = query.limit ? Math.min(Number(query.limit), 100) : 50;
    const offset = query.offset ? Number(query.offset) : 0;

    const applications = await prisma.auPairContract.findMany({
      where,
      include: {
        user: {
          include: {
            AuPairUserProfile: true
          }
        },
        family: true
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return applications;
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
