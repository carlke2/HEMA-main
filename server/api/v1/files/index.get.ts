import prisma, { Prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    userId?: string;
    fileType?: string;
    search?: string;
  };

  const where: any = {};
  try {
    // const where: Prisma.AgencyWhereInput = {};

    if (query.userId) {
      where.userId = Number(query.userId);
    }
    if (query.fileType) {
      where.fileType = query.fileType;
    }
    if (query.search) {
      // For case-insensitive search
      where.OR = [
        { fileName: { contains: query.search, mode: "insensitive" } },
        { fileUrl: { contains: query.search, mode: "insensitive" } },
        { fileType: { contains: query.search, mode: "insensitive" } },
      ];
    }

    // Pagination
    // let take = 50; // Default limit
    // let skip = 0;
    // if (query.limit && !isNaN(Number(query.limit)))
    //   take = Math.min(Number(query.limit), 100);
    // if (query.offset && !isNaN(Number(query.offset)))
    //   skip = Number(query.offset);

    const files = await prisma.file.findMany({
      where: where,
      orderBy: { uploadedAt: "desc" },
      // take: 2,
      // skip: skip,
    });

    return files;
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
