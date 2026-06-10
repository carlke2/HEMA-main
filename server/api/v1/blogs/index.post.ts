import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { content, thumbnail, title, type, tags, description } = await readBody(
    event
  );

  let identifier = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  try {
    await prisma.blog.create({
      data: {
        title,
        content,
        type,
        tags,
        thumbnail,
        identifier,
        description,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Add blog error:", error);
    return createError({
      statusCode: 400,
      message: error.message,
      data: {
        status: 400,
      },
    });
  }
});
