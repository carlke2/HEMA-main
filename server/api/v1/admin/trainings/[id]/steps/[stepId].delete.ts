import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { userType?: string } | undefined;
  if (user?.userType !== "Admin" && user?.userType !== "Support") {
    throw createError({ statusCode: 403, message: "Admin or Support only" });
  }

  const stepId = event.context.params?.stepId ? Number(event.context.params.stepId) : NaN;
  if (!Number.isInteger(stepId)) {
    throw createError({ statusCode: 400, message: "Invalid step id" });
  }

  await prisma.trainingStep.delete({ where: { id: stepId } });
  return { success: true };
});
