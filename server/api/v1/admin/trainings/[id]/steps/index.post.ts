import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { userType?: string } | undefined;
  if (user?.userType !== "Admin" && user?.userType !== "Support") {
    throw createError({ statusCode: 403, message: "Admin or Support only" });
  }

  const id = event.context.params?.id;
  const trainingId = id ? Number(id) : NaN;
  if (!Number.isInteger(trainingId)) {
    throw createError({ statusCode: 400, message: "Invalid training id" });
  }

  const training = await prisma.training.findUnique({ where: { id: trainingId } });
  if (!training) throw createError({ statusCode: 404, message: "Training not found" });

  const body = await readBody(event);
  const title = body?.title;
  const description = body?.description ?? null;
  const sortOrder = body?.sortOrder != null ? Number(body.sortOrder) : 0;

  if (!title || typeof title !== "string" || !title.trim()) {
    throw createError({ statusCode: 400, message: "Title is required" });
  }

  const step = await prisma.trainingStep.create({
    data: { trainingId, title: title.trim(), description, sortOrder },
  });
  return step;
});
