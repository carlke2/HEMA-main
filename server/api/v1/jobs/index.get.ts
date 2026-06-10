import prisma, { Country, Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    country?: string;
    minSalary?: string;
    skills?: string;
    agencyId?: string;
    search?: string;
    orderBy?: string;
    groupBy?: string;
    limit?: string;
    offset?: string;
  };

  try {
    const where: Prisma.JobWhereInput = {};

    if (
      query.country &&
      Object.values(Country).includes(query.country as Country)
    ) {
      where.country = query.country as Country;
    }
    if (query.minSalary) {
      where.salary = { gte: Number(query.minSalary) };
    }
    if (query.skills) {
      const skillsArray = query.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (skillsArray.length) {
        where.skills = { hasSome: skillsArray };
      }
    }
    if (query.agencyId) {
      where.agencyId = query.agencyId;
    }

    if (query.search) {
      // For case-insensitive search
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { description: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.orderBy) {
      // Validate orderBy field
      const validOrderFields = ["createdAt", "salary"];
      if (!validOrderFields.includes(query.orderBy)) {
        query.orderBy = "createdAt"; // Default to createdAt if invalid
      }
    }
    if (query.groupBy) {
      // Parse the comma-separated groupBy fields into an array
      const validGroupByFields = ["country", "category"];
      if (!validGroupByFields.includes(query.groupBy)) {
        query.groupBy = "category";
      }

      // We include an aggregated field (_count) as required by groupBy.
      const groupByResults = await prisma.job.groupBy({
        by: query.groupBy as any, // Ensure this matches your Job model's scalar fields
        where,
        _count: { _all: true },
        // Optionally, you can add an orderBy if the grouped fields support ordering. For example:
        // orderBy: { [groupByFields[0]]: 'asc' },
      });
      return groupByResults;
    }
    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const jobs = await prisma.job.findMany({
      where: where,
      orderBy: query.orderBy
        ? { [query.orderBy]: "desc" }
        : { createdAt: "desc" },
      include: {
        agency: {
          select: {
            name: true,
            country: true,
            location: true,
            verified: true,
            avatar: true,
            description: true,
            website: true,
            socialLinks: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        jobApplications: {
          select: {
            id: true,
            applicant: {
              select: {
                id: true,
                fullName: true,
                phone: true,
                email: true,
                gender: true,
                avatar: true,
                verified: true,
              },
            },
            status: true,
            createdAt: true,
          },
        },
      },
      // take: 2,
      // skip: skip,
    });

    return jobs;
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
