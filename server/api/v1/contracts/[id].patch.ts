import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "contract ID is required",
    });
  }
  const contractId = Number(id);
  if (isNaN(contractId) || !Number.isInteger(contractId)) {
    throw createError({
      statusCode: 400,
      message: "Invalid contract ID",
    });
  }
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
    workingHours,
    leaveAndVacationPolicy,
    terminationConditions,
    status,
  } = await readBody(event);

  if (!userId || !agencyId) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }
  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
  });

  if (!contract) {
    return createError({
      statusCode: 404,
      message: "Contract not found",
      data: {
        status: 404,
      },
    });
  }
  try {
    const contract = await prisma.contract.update({
      where: { id: contractId },
      data: {
        jobTitle,
        description,
        duties,
        startDate,
        endDate,
        salary,
        currency,
        workingHours,
        leaveAndVacationPolicy,
        terminationConditions,
        status,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "contract updated successfully",
      data: {
        userId: contract.userId,
        agencyId: contract.agencyId,
        title: contract.jobTitle,
        description: contract.description,
        duties: contract.duties,
        startDate: contract.startDate,
        endDate: contract.endDate,
        salary: contract.salary,
        currency: contract.currency,
        workingHours: contract.workingHours,
        leaveAndVacationPolicy: contract.leaveAndVacationPolicy,
        terminationConditions: contract.terminationConditions,
        status: contract.status,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error while updating contract",
      data: {
        status: 500,
      },
    });
  }
});
