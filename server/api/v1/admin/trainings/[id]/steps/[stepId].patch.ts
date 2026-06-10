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

  const body = await readBody(event);
  const data: { title?: string; description?: string | null; sortOrder?: number } = {};
  if (body?.title !== undefined) data.title = String(body.title).trim();
  if (body?.description !== undefined) data.description = body.description ?? null;
  if (body?.sortOrder !== undefined) data.sortOrder = Number(body.sortOrder);

  const step = await prisma.trainingStep.update({
    where: { id: stepId },
    data,
  });
  return step;
});
