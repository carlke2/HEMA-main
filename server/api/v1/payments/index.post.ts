import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let { payerId, payeeId, agencyId, amount, currency, status } = await readBody(
    event
  );

  if (!agencyId || !payerId || !payeeId || !amount || !currency || !status) {
    return createError({
      statusCode: 400,
      message: "Some required fields are missing",
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
    const payment = await prisma.payment.create({
      data: {
        payerId,
        payeeId,
        agencyId,
        amount,
        currency,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: "Payment added successfully",
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
