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

  const body = await readBody(event);
  const title = body?.title;
  const description = body?.description;
  const sortOrder = body?.sortOrder;

  const data: { title?: string; description?: string | null; sortOrder?: number } = {};
  if (typeof title === "string") data.title = title.trim();
  if (description !== undefined) data.description = description ?? null;
  if (sortOrder !== undefined) data.sortOrder = Number(sortOrder);

  const training = await prisma.training.update({
    where: { id: trainingId },
    data,
  });
  return training;
});
