import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number; userType?: string } | undefined;
  if (!user?.id || user.userType !== "aupair") {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const body = await readBody(event);
  const trainingStepId = body?.trainingStepId != null ? Number(body.trainingStepId) : NaN;
  if (!Number.isInteger(trainingStepId) || trainingStepId < 1) {
    throw createError({ statusCode: 400, message: "Valid trainingStepId is required" });
  }

  const step = await prisma.trainingStep.findUnique({
    where: { id: trainingStepId },
    include: { training: true },
  });
  if (!step) throw createError({ statusCode: 404, message: "Step not found" });

  const assigned = await prisma.trainingAssignment.findUnique({
    where: {
      userId_trainingId: { userId: user.id, trainingId: step.trainingId },
    },
  });
  if (!assigned) {
    throw createError({ statusCode: 403, message: "This training is not assigned to you" });
  }

  await prisma.trainingProgress.upsert({
    where: {
      userId_trainingStepId: { userId: user.id, trainingStepId },
    },
    create: {
      userId: user.id,
      trainingStepId,
      completedAt: new Date(),
    },
    update: { completedAt: new Date(), updatedAt: new Date() },
  });

  return { success: true };
});
