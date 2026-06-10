import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { identifier } = event.context.params || {};

  try {
    await prisma.blog.delete({
      where: {
        identifier,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Delete blog error:", error);
    return { error: error.message };
  }
});
