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

  try {
    const agency = await prisma.agency.findUnique({
      where: { uuid: uuid },
    });

    if (!agency) {
      throw createError({
        statusCode: 404,
        statusMessage: "Agency not found",
      });
    }

    return agency;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
