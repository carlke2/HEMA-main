import prisma, { Country, Religion, AfricanTribes } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id || isNaN(Number(id))) {
    return createError({
      statusCode: 400,
      message: "Invalid au pair ID",
    });
  }

  try {
    // Validate the au pair exists
    const existingAuPair = await prisma.user.findFirst({
      where: {
        id: Number(id),
        userType: "aupair",
      },
    });

    if (!existingAuPair) {
      return createError({
        statusCode: 404,
        message: "Au pair not found",
      });
    }

    // Prepare update data
    const updateData: any = {};
    const profileUpdateData: any = {};

    // Update user fields
    if (body.fullName) updateData.fullName = body.fullName;
    if (body.phone) updateData.phone = body.phone;
    if (body.email) updateData.email = body.email;
    if (body.gender) updateData.gender = body.gender;
    if (body.dateOfBirth) updateData.dateOfBirth = new Date(body.dateOfBirth);
    if (body.avatar) updateData.avatar = body.avatar;

    // Update profile fields
    if (body.country && Object.values(Country).includes(body.country)) {
      profileUpdateData.country = body.country;
    }
    if (body.location) profileUpdateData.location = body.location;
    if (body.tribe && Object.values(AfricanTribes).includes(body.tribe)) {
      profileUpdateData.tribe = body.tribe;
    }
    if (body.religion && Object.values(Religion).includes(body.religion)) {
      profileUpdateData.religion = body.religion;
    }
    if (body.education) profileUpdateData.education = body.education;
    if (body.skills && Array.isArray(body.skills)) {
      profileUpdateData.skills = body.skills;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    // Update profile if there are profile updates
    let updatedProfile = null;
    if (Object.keys(profileUpdateData).length > 0) {
      updatedProfile = await prisma.auPairUserProfile.update({
        where: { userId: Number(id) },
        data: profileUpdateData,
      });
    }

    // Return updated data
    const result = await prisma.user.findFirst({
      where: { id: Number(id) },
      include: {
        AuPairUserProfile: true,
      },
    });

    return result;
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
