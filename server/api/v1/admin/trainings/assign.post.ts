import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { userType?: string; id?: number } | undefined;
  if (user?.userType !== "Admin" && user?.userType !== "Support") {
    throw createError({ statusCode: 403, message: "Admin or Support only" });
  }

  const body = await readBody(event);
  const userId = body?.userId != null ? Number(body.userId) : NaN;
  const trainingId = body?.trainingId != null ? Number(body.trainingId) : NaN;
  const trainingIds = Array.isArray(body?.trainingIds) ? body.trainingIds.map(Number) : null;

  if (!Number.isInteger(userId)) {
    throw createError({ statusCode: 400, message: "Valid userId is required" });
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { userType: true },
  });
  if (!targetUser || targetUser.userType !== "aupair") {
    throw createError({ statusCode: 404, message: "Au-pair user not found" });
  }

  if (trainingIds && trainingIds.length > 0) {
    const created = [];
    for (const tid of trainingIds) {
      if (!Number.isInteger(tid)) continue;
      const training = await prisma.training.findUnique({ where: { id: tid } });
      if (!training) continue;
      const a = await prisma.trainingAssignment.upsert({
        where: { userId_trainingId: { userId, trainingId: tid } },
        create: { userId, trainingId: tid, assignedByUserId: user.id ?? undefined },
        update: {},
      });
      created.push(a);
    }
    return { success: true, assigned: created.length };
  }

  if (!Number.isInteger(trainingId)) {
    throw createError({ statusCode: 400, message: "trainingId or trainingIds is required" });
  }

  const training = await prisma.training.findUnique({ where: { id: trainingId } });
  if (!training) throw createError({ statusCode: 404, message: "Training not found" });

  await prisma.trainingAssignment.upsert({
    where: { userId_trainingId: { userId, trainingId } },
    create: { userId, trainingId, assignedByUserId: user.id ?? undefined },
    update: {},
  });
  return { success: true };
});
