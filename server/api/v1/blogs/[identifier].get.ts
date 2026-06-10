import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  let { identifier } = event.context.params || {};

  let blog = await prisma.blog.findUnique({
    where: {
      identifier: identifier,
    },
  });

  return blog;
});
