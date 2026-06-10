import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  let {
    fullName,
    phone,
    email,
    password,
    userType,
    gender,
    tribe,
    religion,
    country,
    location,
    agencyId,
    familyId,
  } = await readBody(event);
  if (!email || !password || !fullName || !userType || !phone)
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
      data: {
        status: 400,
      },
    });

  let alreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (alreadyExists)
    return createError({
      statusCode: 409,
      message: "User already exists",
      data: {
        status: 409,
      },
    });

  let existsPhone = await prisma.user.findFirst({
    where: { phone },
  });

  if (existsPhone) {
    return createError({
      statusCode: 409,
      message: "Phone number already exists",
      data: {
        status: 409,
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (phone.startsWith("0")) {
    phone = `+254${phone.slice(1)}`;
  }
  try {
    if (agencyId) {
      const agency = await prisma.agency.findFirst({
        where: { uuid: agencyId },
      });

      if (!agency || agencyId === "") {
        return createError({
          statusCode: 404,
          message: "Please input the agency ID",
          data: {
            status: 404,
          },
        });
      }
    } else if (familyId) {
      const family = await prisma.hostFamily.findFirst({
        where: { uuid: familyId },
      });

      if (!family || familyId === "") {
        return createError({
          statusCode: 404,
          message: "Please input the family ID",
          data: {
            status: 404,
          },
        });
      }
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: fullName,
        gender: gender,
        verified: false,
        userType: userType,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (agencyId) {
      const agencyUserProfile = await prisma.agencyUserProfile.create({
        data: {
          agencyId: agencyId,
          userType: "Support",
          userId: user.id,
          country: country,
          location: location,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (userType === "jobSeeker") {
      const jobSeekerProfile = await prisma.jobSeekerProfile.create({
        data: {
          userId: user.id,
          country: country,
          location: location,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (userType === "hostFamily") {
      const HostFamilyUserProfile = await prisma.hostFamilyUserProfile.create({
        data: {
          userId: user.id,
          familyId: familyId,
          country: country,
          location: location,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (userType === "aupair") {
      const AuPairUserProfile = await prisma.auPairUserProfile.create({
        data: {
          userId: user.id,
          country: country,
          tribe: tribe,
          religion: religion,
          location: location,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    await clearUserSession(event);

    const sessionUser: Record<string, unknown> = {
      userType: user.userType,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      agencyId: agencyId || null,
      familyId: familyId || null,
    };
    if (user.userType === "aupair") {
      sessionUser.verified = user.verified;
      sessionUser.firstLoginAt = user.firstLoginAt ?? null;
    }

    await setUserSession(event, {
      user: sessionUser,
      loggedInAt: new Date(),
    });

    return {
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar,
      },
    };
  } catch (error: any) {
    console.error(error);
    return createError({ statusCode: 500, message: error.message });
  }
});
