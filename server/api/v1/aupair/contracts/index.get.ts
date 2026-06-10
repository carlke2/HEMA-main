import prisma, { Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    search?: string;
    orderBy?: string;
    groupBy?: string;
    userId?: number;
    familyId?: string;
    startDate?: string;
    endDate?: string;
    salary?: number;
    currency?: string;
    workingHours?: string;
    leaveAndVacationPolicy?: string;
    terminationConditions?: string;
    status?: string;
  };

  const where: any = {};
  try {
    // const where: Prisma.AgencyWhereInput = {};

    if (query.familyId) {
      where.familyId = query.familyId;
    }
    if (query.userId) {
      where.userId = Number(query.userId);
    }
    if (query.status) {
      where.status = query.status;
    }
    if (query.currency) {
      where.currency = query.currency;
    }
    if (query.search) {
      // For case-insensitive search
      where.OR = [
        { description: { contains: query.search, mode: "insensitive" } },
        { duties: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.orderBy) {
      // Validate orderBy field
      const validOrderFields = ["startDate", "salary", "endDate", "createdAt"];
      if (!validOrderFields.includes(query.orderBy)) {
        query.orderBy = "createdAt"; // Default to createdAt if invalid
      }
    }

    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const contracts = await prisma.auPairContract.findMany({
      where: where,
      orderBy: query.orderBy
        ? { [query.orderBy]: "desc" }
        : { createdAt: "desc" },
      // take: 2,
      // skip: skip,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            userType: true,
            verified: true,
            gender: true,
            avatar: true,
            AuPairUserProfile: true,
          },
        },
        family: {
          select: {
            id: true,
            uuid: true,
            name: true,
            description: true,
            email: true,
            country: true,
            location: true,
            verified: true,
            children: true,
          },
        },
      },
    });

    return contracts;
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
