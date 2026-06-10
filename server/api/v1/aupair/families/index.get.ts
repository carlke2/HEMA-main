import prisma, { Country, AfricanTribes, Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    country?: string;
    location?: string;
    tribe?: string;
    religion?: string;
    verified?: string;
    limit?: string;
    offset?: string;
    search?: string;
  };

  try {
    const where: Prisma.HostFamilyWhereInput = {};

    // Filter by country
    if (query.country && Object.values(Country).includes(query.country as Country)) {
      where.country = query.country as Country;
    }

    // Filter by location
    if (query.location) {
      where.location = {
        contains: query.location,
        mode: "insensitive"
      };
    }

    // Filter by tribe
    if (query.tribe && Object.values(AfricanTribes).includes(query.tribe as AfricanTribes)) {
      where.tribe = query.tribe as AfricanTribes;
    }

    // Filter by religion
    if (query.religion) {
      where.religion = {
        contains: query.religion,
        mode: "insensitive"
      };
    }

    // Filter by verification status
    if (query.verified) {
      if (query.verified === "true") {
        where.verified = true;
      } else if (query.verified === "false") {
        where.verified = false;
      } else {
        where.verified = true;
      }
    }

    // Search functionality
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { email: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } }
      ];
    }

    // Pagination
    const limit = query.limit ? Math.min(Number(query.limit), 100) : 50;
    const offset = query.offset ? Number(query.offset) : 0;

    const families = await prisma.hostFamily.findMany({
      where,
      include: {
        children: true,
        users: {
          include: {
            user: {
              select: {
                fullName: true,
                email: true,
                avatar: true,
                verified: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    return families;
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
