import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { content, type, tags, identifier } = await readBody(event);
  let blocks = content.blocks;
  let title = content.blocks[0].data.text;
  let imageThumbnail = blocks.find((block: any) => block.type == "image");
  let thumbnail = imageThumbnail.data.file.url;
  let description = content.blocks[1].data.text;

  try {
    let blog = await prisma.blog.update({
      where: {
        identifier,
      },
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
    return { error: error.message };
  }
});
