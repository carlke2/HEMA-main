import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let {
    userId,
    agencyId,
    jobTitle,
    description,
    duties,
    startDate,
    endDate,
    salary,
    currency,
    salaryFrequency,
    workingHours,
    leaveAndVacationPolicy,
    terminationConditions,
    status,
  } = await readBody(event);

  if (
    !userId ||
    !agencyId ||
    !jobTitle ||
    !description ||
    !duties ||
    !startDate ||
    !endDate ||
    !salary ||
    !currency ||
    !workingHours ||
    !leaveAndVacationPolicy ||
    !terminationConditions ||
    !status
  ) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }

  const contract = await prisma.contract.findUnique({
    where: { userId_agencyId: { userId: userId, agencyId: agencyId } },
  });

  if (contract) {
    return createError({
      statusCode: 409,
      message: "contract already exists",
      data: {
        status: 409,
      },
    });
  }

  const jobSeeker = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!jobSeeker) {
    return createError({
      statusCode: 404,
      message: "Job seeker not found",
      data: {
        status: 404,
      },
    });
  }

  const agency = await prisma.agency.findUnique({
    where: { uuid: agencyId },
  });

  if (!agency) {
    return createError({
      statusCode: 404,
      message: "Agency not found",
      data: {
        status: 404,
      },
    });
  }

  if (agency.verified === false) {
    return createError({
      statusCode: 403,
      message: "Agency is not verified",
      data: {
        status: 403,
      },
    });
  }
  try {
    const contract = await prisma.contract.create({
      data: {
        userId,
        agencyId,
        jobTitle,
        description,
        duties,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        salary,
        currency,
        salaryFrequency,
        workingHours,
        leaveAndVacationPolicy,
        terminationConditions,
        status,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "contract created successfully",
      data: {
        userId: userId,
        agencyId: agencyId,
        title: jobTitle,
        description: description,
        duties: duties,
        startDate: startDate,
        endDate: endDate,
        salary: salary,
        currency: currency,
        workingHours: workingHours,
        leaveAndVacationPolicy: leaveAndVacationPolicy,
        terminationConditions: terminationConditions,
        status: status,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error while creating contract",
      data: {
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
