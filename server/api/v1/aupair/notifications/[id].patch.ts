import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number } | undefined;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  const notifId = id ? parseInt(id, 10) : NaN;
  if (!Number.isInteger(notifId)) {
    throw createError({ statusCode: 400, message: "Invalid notification id" });
  }

  const notif = await prisma.notification.findFirst({
    where: { id: notifId, userId: user.id },
  });
  if (!notif) {
    throw createError({ statusCode: 404, message: "Notification not found" });
  }

  const body = (await readBody(event)) || {};
  const data: { readAt?: Date | null } = {};
  if (body.read === true) data.readAt = new Date();
  if (body.read === false) data.readAt = null;

  const updated = await prisma.notification.update({
    where: { id: notifId },
    data,
  });
  return updated;
});
