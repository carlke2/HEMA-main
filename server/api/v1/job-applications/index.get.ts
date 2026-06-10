import prisma, { Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    userId?: string;
    orderBy?: string;
    status?: string;
    // groupBy?: string;
  };

  const where: any = {};
  try {
    // const where: Prisma.AgencyWhereInput = {};

    if (query.status) {
      where.status = query.status;
    }
    if (query.userId) {
      where.applicantId = Number(query.userId);
    }
    if (query.orderBy) {
      // Validate orderBy field
      const validOrderFields = ["createdAt", "salary"];
      if (!validOrderFields.includes(query.orderBy)) {
        query.orderBy = "createdAt"; // Default to createdAt if invalid
      }
    }
    // if (query.verified) {
    //   where.verified = query.verified as boolean;
    // }

    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const jobApplications = await prisma.jobApplication.findMany({
      where: where,
      orderBy: { createdAt: "desc" },
      include: {
        applicant: {
          select: {
            fullName: true,
            phone: true,
            email: true,
            userType: true,
            verified: true,
            avatar: true,
            gender: true,
          },
        },
        job: {
          select: {
            agency: true,
            title: true,
            description: true,
            category: true,
            country: true,
            location: true,
            salary: true,
            currency: true,
            skills: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        files: true,
      },
      // take: 2,
      // skip: skip,
    });

    return jobApplications;
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
