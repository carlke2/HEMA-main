import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const currentUser = session?.user as { userType?: string } | undefined;
  const onlyAdminCanVerify = currentUser?.userType === "Admin" || currentUser?.userType === "Support";

  const { id } = event.context.params || {};
  let {
    fullName,
    phone,
    email,
    password,
    gender,
    country,
    location,
    skills,
    userType,
    verified,
  } = await readBody(event);
  if (!id)
    return createError({
      statusCode: 400,
      message: "User ID is required",
      data: {
        status: 400,
      },
    });

  if (verified !== undefined && !onlyAdminCanVerify) {
    return createError({
      statusCode: 403,
      message: "Only an admin can verify or unverify users",
      data: { status: 403 },
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!user) {
    return createError({
      statusCode: 404,
      message: "User not found",
      data: {
        status: 404,
      },
    });
  }

  if (phone) {
    if (phone.startsWith("0")) {
      phone = `+254${phone.slice(1)}`;
    }
  }
  try {
    if (user.userType == "agencyUser") {
      if (country || location || userType) {
        await prisma.agencyUserProfile.update({
          where: { userId: user.id },
          data: {
            country: country,
            location: location,
            userType: userType,
          },
        });
      }
    } else {
      if (country || location || skills) {
        await prisma.jobSeekerProfile.update({
          where: { userId: user.id },
          data: {
            country: country,
            location: location,
            skills: skills,
          },
        });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: fullName,
        phone: phone,
        email: email,
        password: password ? await hashPassword(password) : user.password,
        gender,
        verified: verified !== undefined ? Boolean(verified) : user.verified,
        updatedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error: any) {
    console.error(error);
    return createError({ statusCode: 500, message: error.message });
  }
});
