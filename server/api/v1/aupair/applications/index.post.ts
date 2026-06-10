import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validate required fields
  if (!body.familyId || !body.auPairId) {
    return createError({
      statusCode: 400,
      message: "Family ID and Au Pair ID are required",
    });
  }

  try {
    // Check if application already exists
    const existingApplication = await prisma.auPairContract.findFirst({
      where: {
        userId: body.auPairId,
        familyId: body.familyId,
        status: {
          in: ["ACTIVE", "PENDING"]
        }
      }
    });

    if (existingApplication) {
      return createError({
        statusCode: 409,
        message: "Application already exists",
      });
    }

    // Create new application/contract
    const application = await prisma.auPairContract.create({
      data: {
        userId: body.auPairId,
        familyId: body.familyId,
        description: body.description || "Au pair application",
        duties: body.duties || "Childcare and cultural exchange",
        startDate: body.startDate ? new Date(body.startDate) : new Date(),
        endDate: body.endDate ? new Date(body.endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default 1 year
        salary: body.salary || 0,
        salaryFrequency: body.salaryFrequency || "MONTHLY",
        currency: body.currency || "USD",
        workingHours: body.workingHours || "40 hours per week",
        leaveAndVacationPolicy: body.leaveAndVacationPolicy || "Standard vacation policy",
        terminationConditions: body.terminationConditions || "Standard termination conditions",
        matchScore: body.matchScore || 0,
        status: "PENDING"
      },
      include: {
        user: {
          include: {
            AuPairUserProfile: true
          }
        },
        family: true
      }
    });

    return application;
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
