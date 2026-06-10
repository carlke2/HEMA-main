import prisma from "~/lib/prisma";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password)
    return createError({
      statusCode: 400,
      message: "Email and password are required",
      data: {
        status: 400,
      },
    });

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return createError({
      statusCode: 404,
      message: "Invalid email or password",
      data: {
        status: 404,
      },
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return createError({
      statusCode: 401,
      message: "Invalid email or password",
      data: {
        status: 401,
        sentPass: password,
        userPass: user.password,
      },
    });

  await clearUserSession(event);

  const sessionUser: {
    userType: string;
    id: number;
    fullName: string;
    email: string;
    avatar: string | null;
    agencyId?: string | null;
    familyId?: string | null;
    verified?: boolean;
    firstLoginAt?: Date | null;
  } = {
    userType: user.userType,
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar,
  };

  if (user.userType === "agencyUser") {
    const agencyProfile = await prisma.agencyUserProfile.findUnique({
      where: { userId: user.id },
    });
    if (agencyProfile) {
      sessionUser.agencyId = agencyProfile.agencyId;
    }
  } else if (user.userType === "hostFamily") {
    const hostFamilyProfile = await prisma.hostFamilyUserProfile.findUnique({
      where: { userId: user.id },
    });
    if (hostFamilyProfile) {
      sessionUser.familyId = hostFamilyProfile.familyId;
    }
  } else if (user.userType === "aupair") {
    let firstLoginAt = user.firstLoginAt;
    if (!firstLoginAt) {
      firstLoginAt = new Date();
      await prisma.user.update({
        where: { id: user.id },
        data: { firstLoginAt },
      });
    }
    sessionUser.verified = user.verified;
    sessionUser.firstLoginAt = firstLoginAt;
  }

  await setUserSession(event, {
    user: sessionUser,
    loggedInAt: new Date(),
  });

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      userType: user.userType,
      avatar: user.avatar,
    },
  };
});
