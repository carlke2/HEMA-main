import prisma from "~/lib/prisma";

function isUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export default defineEventHandler(async (event) => {
  const { uuid } = event.context.params || {};

  if (!uuid || typeof uuid !== "string" || !isUUID(uuid)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid or missing agency ID",
    });
  }
  let { name, verified, avatar, description, website, socialLinks, email } =
    await readBody(event);

  if (
    !name &&
    !verified &&
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

  const existingAgency = await prisma.agency.findUnique({
    where: { uuid: uuid },
  });

  if (!existingAgency) {
    return createError({
      statusCode: 404,
      message: "Agency not found",
      data: {
        status: 404,
      },
    });
  }

  try {
    const agency = await prisma.agency.update({
      where: { uuid: uuid },
      data: {
        name,
        email,
        avatar,
        description,
        verified: verified !== undefined ? verified : existingAgency.verified,
        website,
        socialLinks,
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Agency updated successfully",
      data: {
        name: agency.name,
        email: agency.email,
        country: agency.country,
        location: agency.location,
        description: agency.description,
        website: agency.website,
        socialLinks: agency.socialLinks,
        avatar: agency.avatar,
        verified: agency.verified,
      },
    };
  } catch (error) {
    console.error("Error updating agency:", error);
    return createError({
      statusCode: 500,
      message: "Failed to update agency",
      data: {
        status: 500,
      },
    });
  }
});
