import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number; userType?: string; familyId?: string } | undefined;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const isFamily = user.userType === "hostFamily" && user.familyId;

  if (isFamily) {
    const list = await prisma.familyAuPairInterest.findMany({
      where: { familyId: user.familyId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatar: true,
            gender: true,
          },
        },
        family: {
          select: {
            uuid: true,
            name: true,
            location: true,
            country: true,
            description: true,
            verified: true,
          },
        },
      },
    });
    return list;
  }

  // Au pair: interests where I am the au pair (families interested in me, or later stages)
  const list = await prisma.familyAuPairInterest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          avatar: true,
        },
      },
      family: {
        select: {
          uuid: true,
          name: true,
          location: true,
          country: true,
          description: true,
          verified: true,
        },
      },
    },
  });
  return list;
});
