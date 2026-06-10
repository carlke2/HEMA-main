import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Job ID is required",
    });
  }
  let { title, description, country, location, salary, skills, isActive } =
    await readBody(event);

  if (!Number.isInteger(id)) {
    return createError({
      statusCode: 400,
      message: "Invalid job ID",
      data: {
        status: 400,
      },
    });
  }

  if (!title && !description && !country && !location && !salary) {
    return createError({
      statusCode: 400,
      message: "Missing values",
      data: {
        status: 400,
      },
    });
  }

  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
  });

  if (!job) {
    return createError({
      statusCode: 404,
      message: "Job not found",
      data: {
        status: 404,
      },
    });
  }

  if (isActive) {
    if (typeof isActive !== "boolean") {
      return createError({
        statusCode: 404,
        message: "Invalid value",
        data: {
          status: 404,
        },
      });
    }
  }

  try {
    const updatedJob = await prisma.job.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        country,
        location,
        salary,
        skills: skills ? skills : job.skills,
        isActive,
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Job updated successfully",
      data: {
        title: updatedJob.title,
        description: updatedJob.description,
        country: updatedJob.country,
        location: updatedJob.location,
        salary: updatedJob.salary,
        skills: updatedJob.skills,
        isActive: updatedJob.isActive,
      },
    };
  } catch (error) {
    console.error("Error updating job:", error);
    return createError({
      statusCode: 500,
      message: "Failed to update job",
      data: {
        status: 500,
      },
    });
  }
});
