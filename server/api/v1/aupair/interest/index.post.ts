import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number; userType?: string; familyId?: string } | undefined;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  if (user.userType !== "hostFamily" || !user.familyId) {
    throw createError({ statusCode: 403, message: "Only host families can express interest" });
  }

  const body = await readBody(event);
  const auPairUserId = body?.userId != null ? Number(body.userId) : NaN;
  if (!Number.isInteger(auPairUserId)) {
    throw createError({ statusCode: 400, message: "Valid userId (au pair) is required" });
  }

  try {
    const existing = await prisma.familyAuPairInterest.findUnique({
      where: {
        familyId_userId: { familyId: user.familyId, userId: auPairUserId },
      },
    });
    if (existing) {
      return existing;
    }

    const auPair = await prisma.user.findUnique({
      where: { id: auPairUserId },
    });
    if (!auPair || auPair.userType !== "aupair") {
      throw createError({ statusCode: 404, message: "Au pair not found" });
    }

    const interest = await prisma.familyAuPairInterest.create({
      data: {
        familyId: user.familyId,
        userId: auPairUserId,
        status: "FAMILY_INTERESTED",
      },
      include: {
        family: { select: { name: true } },
        user: { select: { fullName: true } },
      },
    });

    await prisma.notification.create({
      data: {
        userId: auPairUserId,
        type: "FAMILY_INTERESTED",
        title: "A family is interested in you",
        message: `${interest.family.name} would like to connect. View their profile and choose Interested or Not interested.`,
        relatedType: "interest",
        relatedId: String(interest.id),
      },
    });

    return interest;
  } catch (e: any) {
    if (e?.statusCode) throw e;
    console.error("[POST /api/v1/aupair/interest]", e);
    const msg = e?.message ?? String(e);
    if (msg.includes("does not exist") || msg.includes("Unknown table") || msg.includes("relation")) {
      throw createError({
        statusCode: 503,
        message: "Interest feature is not set up. Run: npx prisma db push",
        data: { originalError: msg },
      });
    }
    throw createError({
      statusCode: 500,
      message: msg || "Failed to create interest",
      data: { originalError: msg },
    });
  }
});
