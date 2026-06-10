import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};

  if (!id) {
    return createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  try {
    const user = prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        fullName: true,
        email: true,
        phone: true,
        userType: true,
        verified: true,
        avatar: true,
        gender: true,
        agencyUserProfile: true,
        jobSeekerProfile: true,
        HostFamilyUserProfile: true,
        AuPairUserProfile: true,
      },
    });
    if (!user) {
      return createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return user;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
