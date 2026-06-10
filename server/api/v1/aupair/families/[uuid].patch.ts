import prisma from "~/lib/prisma";

function isUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const currentUser = session?.user as { userType?: string } | undefined;
  const onlyAdminCanVerify = currentUser?.userType === "Admin" || currentUser?.userType === "Support";

  const { uuid } = event.context.params || {};

  if (!uuid || typeof uuid !== "string" || !isUUID(uuid)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or missing agency ID",
    });
  }
  let { name, verified, avatar, description, website, socialLinks, email } =
    await readBody(event);

  if (verified !== undefined && !onlyAdminCanVerify) {
    return createError({
      statusCode: 403,
      message: "Only an admin can verify or unverify families",
      data: { status: 403 },
    });
  }

  if (
    !name &&
    verified === undefined &&
    !avatar &&
    !description &&
    !website &&
    !socialLinks &&
    !email
  ) {
    return createError({
      statusCode: 400,
      message: "Missing values",
      data: {
        status: 400,
      },
    });
  }

  const existingFamily = await prisma.hostFamily.findUnique({
    where: { uuid: uuid },
  });

  if (!existingFamily) {
    return createError({
      statusCode: 404,
      message: "Family not found",
      data: {
        status: 404,
      },
    });
  }

  try {
    const family = await prisma.hostFamily.update({
      where: { uuid: uuid },
      data: {
        name,
        email,
        avatar,
        description,
        verified: verified !== undefined ? verified : existingFamily.verified,
        socialLinks,
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Agency updated successfully",
      data: {
        name: family.name,
        email: family.email,
        country: family.country,
        location: family.location,
        description: family.description,
        socialLinks: family.socialLinks,
        avatar: family.avatar,
        verified: family.verified,
      },
    };
  } catch (error) {
    console.error("Error updating family:", error);
    return createError({
      statusCode: 500,
      message: "Failed to update family",
      data: {
        status: 500,
      },
    });
  }
});
