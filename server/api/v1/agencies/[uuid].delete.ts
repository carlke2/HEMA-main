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
      return createError({
        statusCode: 404,
        message: "Agency not found",
        data: {
          status: 404,
        },
      });
    }

    await prisma.agency.delete({
      where: { uuid: uuid },
    });

    return {
      status: 200,
      message: "Agency deleted successfully",
      data: {
        status: 200,
        AgencyUUID: agency.uuid,
        AgencyName: agency.name,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
      },
    });
  }
});
