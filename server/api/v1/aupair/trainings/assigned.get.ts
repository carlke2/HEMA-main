import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number; userType?: string } | undefined;
  if (!user?.id || user.userType !== "aupair") {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const assignments = await prisma.trainingAssignment.findMany({
    where: { userId: user.id },
    include: {
      training: {
        include: {
          steps: { orderBy: { sortOrder: "asc" } },
        },
      },
    },
    orderBy: { assignedAt: "desc" },
  });

  const progressRows = await prisma.trainingProgress.findMany({
    where: { userId: user.id },
    select: { trainingStepId: true, completedAt: true },
  });
  const completedStepIds = new Set(
    progressRows.filter((p) => p.completedAt).map((p) => p.trainingStepId)
  );

  let totalSteps = 0;
  let completedSteps = 0;

  const list = assignments.map((a) => {
    const steps = (a.training as any).steps || [];
    const stepsWithProgress = steps.map((s: { id: number; title: string; description: string | null; sortOrder: number }) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      sortOrder: s.sortOrder,
      completed: completedStepIds.has(s.id),
    }));
    const stepCount = stepsWithProgress.length;
    const completedCount = stepsWithProgress.filter((s: { completed: boolean }) => s.completed).length;
    totalSteps += stepCount;
    completedSteps += completedCount;

    return {
      assignmentId: a.id,
      trainingId: a.training.id,
      title: a.training.title,
      description: a.training.description,
      steps: stepsWithProgress,
      completedCount,
      stepCount,
      allCompleted: stepCount > 0 && completedCount === stepCount,
    };
  });

  return {
    trainings: list,
    progress: {
      totalSteps,
      completedSteps,
      lessonsLeft: totalSteps - completedSteps,
      readyForVerification: totalSteps > 0 && completedSteps >= totalSteps,
    },
  };
});
