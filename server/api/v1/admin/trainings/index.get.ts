import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { userType?: string } | undefined;
  if (user?.userType !== "Admin" && user?.userType !== "Support") {
    throw createError({ statusCode: 403, message: "Admin or Support only" });
  }

  const trainings = await prisma.training.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      steps: { orderBy: { sortOrder: "asc" } },
      _count: { select: { assignments: true } },
    },
  });
  return trainings;
});
