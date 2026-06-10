import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let { name, email, password, gender, agencyName, country, location } =
    await readBody(event);

  if (!email || !name || !agencyName || !country || !location) {
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

    const [agency, user, profile] = await prisma
      .$transaction([
        // create agency
        prisma.agency.create({
          data: {
            name: agencyName,
            country: country,
            location: location,
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
        // create user
        prisma.user.create({
          data: {
            email: email,
            fullName: name,
            userType: "agencyUser",
            verified: false,
            password: hashedPassword,
            gender: gender,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }),
      ])
      .then(async ([agency, user]) => {
        const profile = await prisma.agencyUserProfile.create({
          data: {
            userId: user.id,
            agencyId: agency.uuid,
            userType: "Admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        return [agency, user, profile] as const;
      });

    setResponseStatus(event, 201);
    return {
      success: true,
      message: "Agency and admin user created successfully",
      agency: {
        uuid: agency.uuid,
        name: agency.name,
        country: agency.country,
        location: agency.location,
        verified: agency.verified,
        createdAt: agency.createdAt,
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
          message: "Agency already exists in that country",
        });
      }
      if (targets.includes("name")) {
        return createError({
          statusCode: 409,
          message: "Agency name already exists",
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
