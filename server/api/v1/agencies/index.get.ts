import prisma, { Country, Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    country?: string;
    location?: string;
    verified?: string;
    limit?: string;
    offset?: string;
  };

  try {
    const where: Prisma.AgencyWhereInput = {};

    if (
      query.country &&
      Object.values(Country).includes(query.country as Country)
    ) {
      where.country = query.country as Country;
    }
    if (query.location) {
      where.location = query.location;
    }
    if (query.verified) {
      if (query.verified === "true") {
        where.verified = true;
      } else if (query.verified === "false") {
        where.verified = false;
      } else {
        where.verified = true;
      }
    }

    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const agencies = await prisma.agency.findMany({
      where: where,
      orderBy: { createdAt: "desc" },
      // take: 2,
      // skip: skip,
    });

    return agencies;
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
