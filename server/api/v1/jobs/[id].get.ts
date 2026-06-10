import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Job ID is required",
    });
  }

  try {
    const job = await prisma.job.findUnique({
      where: {
        id: Number(id),
      },
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
                jobSeekerProfile: true,
              },
            },
            files: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    return job;
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
