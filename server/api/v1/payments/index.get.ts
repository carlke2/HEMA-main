import prisma, { Country, Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    country?: string;
    minSalary?: string;
    skills?: string;
    agencyId?: string;
    search?: string;
    orderBy?: string; // e.g., "createdAt", "salary"
    limit?: string;
    offset?: string;
  };

  try {
    const where: Prisma.PaymentWhereInput = {};

    if (query.orderBy && !["createdAt", "amount"].includes(query.orderBy)) {
      return (query.orderBy = "createdAt");
    }
    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const payments = await prisma.payment.findMany({
      where: where,
      orderBy: query.orderBy
        ? { [query.orderBy]: "desc" }
        : { createdAt: "desc" },
      // take: 2,
      // skip: skip,
    });

    return payments;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
