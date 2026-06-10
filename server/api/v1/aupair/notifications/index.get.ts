import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number } | undefined;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const query = getQuery(event) as { limit?: string; unreadOnly?: string; countOnly?: string };
  const countOnly = query.countOnly === "true";
  const limit = Math.min(parseInt(query.limit || "50", 10) || 50, 100);
  const unreadOnly = query.unreadOnly === "true";

  const where: { userId: number; readAt?: null } = { userId: user.id };
  if (unreadOnly) where.readAt = null;

  if (countOnly) {
    const unreadCount = await prisma.notification.count({
      where: { userId: user.id, readAt: null },
    });
    return { unreadCount };
  }

  const list = await prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return list;
});
