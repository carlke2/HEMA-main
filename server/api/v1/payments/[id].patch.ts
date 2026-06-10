import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  let { agencyId, amount, currency, status } = await readBody(event);

  if (!agencyId && !amount && !currency && !status) {
    return createError({
      statusCode: 400,
      message: "Missing values",
      data: {
        status: 400,
      },
    });
  }
  const agency = await prisma.agency.findUnique({
    where: { uuid: agencyId },
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
  if (agency?.verified === false) {
    return createError({
      statusCode: 403,
      message: "Agency is not verified",
      data: {
        status: 403,
      },
    });
  }
  try {
    const payment = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        agencyId,
        amount,
        currency,
        status,
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Payment updated successfully",
      data: {
        payment,
        status: 200,
      },
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error while posting job",
      data: {
        status: 500,
      },
    });
  }
});
