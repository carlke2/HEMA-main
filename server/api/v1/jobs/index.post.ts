import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let {
    agencyId,
    title,
    description,
    category,
    country,
    location,
    salary,
    currency,
    skills,
    isActive = true,
  } = await readBody(event);

  if (
    !agencyId ||
    !title ||
    !description ||
    !country ||
    !location ||
    !salary ||
    !category
  ) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }
  const agency = await prisma.agency.findUnique({
    where: { uuid: agencyId },
  });
  if (agency?.verified === false) {
    return createError({
      statusCode: 403,
      message: "Agency is not verified",
      data: {
        status: 403,
      },
    });
  }
  if (!agency) {
    return createError({
      statusCode: 404,
      message: "Agency not found",
      data: {
        status: 404,
      },
    });
  }
  if (typeof isActive !== "boolean") {
    isActive = false;
  }
  try {
    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        country,
        location,
        salary,
        currency: currency ? currency : "USD",
        skills: skills ? skills : [],
        isActive,
        agency: { connect: { uuid: agencyId } },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Job posted successfully",
      data: {
        title: job.title,
        description: job.description,
        category: job.category,
        country: job.country,
        location: job.location,
        salary: job.salary,
        currency: job.currency,
        skills: job.skills,
        isActive: job.isActive,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error while posting job",
      data: {
        status: 500,
      },
    });
  }
});
