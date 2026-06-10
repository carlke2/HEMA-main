import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    search?: string;
    orderBy?: string;
    groupBy?: string;
    limit?: string;
    offset?: string;
  };
  const where: any = {};
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: "insensitive" } },
      { content: { contains: query.search, mode: "insensitive" } },
    ];
  }
  if (query.orderBy) {
    const validOrderFields = ["createdAt", "updatedAt"];
    if (!validOrderFields.includes(query.orderBy)) {
      query.orderBy = "createdAt";
    }
  }

  try {
    let blogs = await prisma.blog.findMany({
      where: where,
      orderBy: query.orderBy
        ? { [query.orderBy]: "desc" }
        : { createdAt: "desc" },
      take: query.limit ? Math.min(Number(query.limit), 100) : 50,
      skip: query.offset ? Number(query.offset) : 0,
    });
    return blogs;
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
