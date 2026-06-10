import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let {
    userId,
    familyId,
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
    !familyId ||
    !description ||
    !duties ||
    !startDate ||
    !endDate ||
    !salary ||
    !currency ||
    !workingHours ||
    !leaveAndVacationPolicy ||
    !terminationConditions
  ) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }

  const contract = await prisma.auPairContract.findUnique({
    where: { userId_familyId: { userId: userId, familyId: familyId } },
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

  const aupair = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!aupair) {
    return createError({
      statusCode: 404,
      message: "Au Pair not found",
      data: {
        status: 404,
      },
    });
  }

  const family = await prisma.hostFamily.findUnique({
    where: { uuid: familyId },
  });

  if (!family) {
    return createError({
      statusCode: 404,
      message: "Family not found",
      data: {
        status: 404,
      },
    });
  }

  // if (family.verified === false) {
  //   return createError({
  //     statusCode: 403,
  //     message: "Host Family is not verified",
  //     data: {
  //       status: 403,
  //     },
  //   });
  // }
  try {
    const contract = await prisma.auPairContract.create({
      data: {
        userId,
        familyId,
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
        familyId: familyId,
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
    console.log("Error is: ", error);
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
