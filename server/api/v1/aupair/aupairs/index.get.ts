import prisma, { Country, Religion, AfricanTribes, Prisma } from "~/lib/prisma";

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
    const where: Prisma.UserWhereInput = {
      userType: "aupair",
      AuPairUserProfile: {}
    };

    // Families may only browse verified au-pairs
    const session = await getUserSession(event);
    const currentUser = session?.user as { userType?: string } | undefined;
    if (currentUser?.userType === "hostFamily") {
      where.verified = true;
    }

    // Filter by country
    if (query.country && Object.values(Country).includes(query.country as Country)) {
      where.AuPairUserProfile = {
        ...where.AuPairUserProfile,
        country: query.country as Country
      };
    }

    // Filter by location
    if (query.location) {
      where.AuPairUserProfile = {
        ...where.AuPairUserProfile,
        location: {
          contains: query.location,
          mode: "insensitive"
        }
      };
    }

    // Filter by tribe
    if (query.tribe && Object.values(AfricanTribes).includes(query.tribe as AfricanTribes)) {
      where.AuPairUserProfile = {
        ...where.AuPairUserProfile,
        tribe: query.tribe as AfricanTribes
      };
    }

    // Filter by religion
    if (query.religion && Object.values(Religion).includes(query.religion as Religion)) {
      where.AuPairUserProfile = {
        ...where.AuPairUserProfile,
        religion: query.religion as Religion
      };
    }

    // Filter by verification status (only when caller is not a family; families always get verified only)
    if (currentUser?.userType !== "hostFamily" && query.verified) {
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
        { fullName: { contains: query.search, mode: "insensitive" } },
        { email: { contains: query.search, mode: "insensitive" } }
      ];
    }

    // Pagination
    const limit = query.limit ? Math.min(Number(query.limit), 100) : 50;
    const offset = query.offset ? Number(query.offset) : 0;

    const [auPairs, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          AuPairUserProfile: true
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.user.count({ where }),
    ]);

    return { data: auPairs, total };
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
