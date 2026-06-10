import { push } from "notivue";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let { jobId, userId, files = [] } = await readBody(event);
  if (!jobId || !userId) {
    return createError({
      statusCode: 400,
      message: "Job ID and User ID are required",
      data: {
        status: 400,
      },
    });
  }
  if (
    !Number.isInteger(jobId) ||
    !Number.isInteger(userId) ||
    jobId <= 0 ||
    userId <= 0
  ) {
    return createError({
      statusCode: 400,
      message: "Invalid input format",
      data: {
        status: 400,
      },
    });
  }
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || !job.isActive) {
      return createError({
        statusCode: 404,
        message:
          "Job is not available. It may have been deleted or is inactive.",
        data: {
          status: 404,
        },
      });
    }

    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        applicantId: userId,
      },
    });

    if (existingApplication) {
      return createError({
        statusCode: 409,
        message: "You have already applied to this job.",
        data: { status: 409 },
      });
    }

    let connectFiles: any = [];
    if (files.length > 0) {
      const validFiles = await prisma.file.findMany({
        where: {
          id: { in: files },
          userId: userId,
        },
        select: { id: true },
      });

      if (validFiles.length !== files.length) {
        return createError({
          statusCode: 400,
          message:
            "One or more files are invalid or do not belong to the user.",
          data: {
            status: 400,
          },
        });
      }

      connectFiles = validFiles.map((file) => ({ id: file.id }));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.userType !== "jobSeeker") {
      return createError({
        statusCode: 404,
        message: "User not found or not a job seeker",
        data: {
          status: 404,
        },
      });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        applicantId: userId,
        status: "APPLIED",
        files: connectFiles.length > 0 ? { connect: connectFiles } : undefined,
        createdAt: new Date(),
      },
    });

    return {
      status: 200,
      message: "Application submitted successfully",
      data: {
        status: 200,
        applicationId: application.id,
      },
    };
  } catch (error) {
    console.error("Error applying for job:", error);
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
        data: error,
      },
    });
  }
});
