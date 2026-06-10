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

  await prisma.training.delete({ where: { id: trainingId } });
  return { success: true };
});
