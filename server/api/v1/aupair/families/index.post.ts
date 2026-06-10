import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let {
    fullName,
    phone,
    email,
    password,
    gender,
    tribe,
    religion,
    familyName,
    country,
    location,
  } = await readBody(event);

  if (
    !email ||
    !fullName ||
    !password ||
    !gender ||
    !tribe ||
    !religion ||
    !phone ||
    !familyName ||
    !country ||
    !location
  ) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });
  }

  let existsEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (existsEmail) {
    return createError({
      statusCode: 409,
      message: "Email already exists",
      data: {
        status: 409,
      },
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const [family, user, profile] = await prisma
      .$transaction([
        prisma.hostFamily.create({
          data: {
            name: familyName,
            country: country,
            tribe: tribe,
            religion: religion,
            location: location,
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
        prisma.user.create({
          data: {
            email: email,
            fullName: fullName,
            phone: phone,
            userType: "hostFamily",
            verified: false,
            password: hashedPassword,
            gender: gender,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
      ])
      .then(async ([family, user]) => {
        const profile = await prisma.hostFamilyUserProfile.create({
          data: {
            userId: user.id,
            familyId: family.uuid,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        return [family, user, profile] as const;
      });

    await clearUserSession(event);

    await setUserSession(event, {
      user: {
        userType: user.userType,
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        familyId: family.uuid,
      },

      loggedInAt: new Date(),
    });

    return {
      success: true,
      message: "Host Family and account user created successfully",
      family: {
        uuid: family.uuid,
        name: family.name,
        country: family.country,
        location: family.location,
        verified: family.verified,
        createdAt: family.createdAt,
      },
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        gender: user.gender,
        verified: user.verified,
        createdAt: user.createdAt,
        userType: user.userType,
        avatar: user.avatar,
      },
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      const targets = Array.isArray(error.meta?.target)
        ? error.meta.target
        : [String(error.meta?.target)];
      if (targets.includes("email")) {
        return createError({
          statusCode: 409,
          message: "Email already in use",
        });
      }
      if (targets.includes("name") && targets.includes("country")) {
        return createError({
          statusCode: 409,
          message: "Family already exists in that country",
        });
      }
      if (targets.includes("name")) {
        return createError({
          statusCode: 409,
          message: "Family name already exists",
        });
      }
    }
    console.error("Registration error:", error);
    return createError({
      statusCode: 500,
      message: error || "Internal Server Error",
    });
  }
});
