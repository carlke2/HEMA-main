import prisma, { ContractStatus } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id || isNaN(Number(id))) {
    return createError({
      statusCode: 400,
      message: "Invalid application ID",
    });
  }

  try {
    // Validate the application exists
    const existingApplication = await prisma.auPairContract.findUnique({
      where: { id: Number(id) },
    });

    if (!existingApplication) {
      return createError({
        statusCode: 404,
        message: "Application not found",
      });
    }

    // Prepare update data
    const updateData: any = {};

    if (body.status && Object.values(ContractStatus).includes(body.status)) {
      updateData.status = body.status;
    }

    if (body.description) updateData.description = body.description;
    if (body.duties) updateData.duties = body.duties;
    if (body.startDate) updateData.startDate = new Date(body.startDate);
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    if (body.salary) updateData.salary = body.salary;
    if (body.salaryFrequency) updateData.salaryFrequency = body.salaryFrequency;
    if (body.currency) updateData.currency = body.currency;
    if (body.workingHours) updateData.workingHours = body.workingHours;
    if (body.leaveAndVacationPolicy) updateData.leaveAndVacationPolicy = body.leaveAndVacationPolicy;
    if (body.terminationConditions) updateData.terminationConditions = body.terminationConditions;
    if (body.matchScore) updateData.matchScore = body.matchScore;

    // Update application
    const updatedApplication = await prisma.auPairContract.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        user: {
          include: {
            AuPairUserProfile: true
          }
        },
        family: true
      }
    });

    return updatedApplication;
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
