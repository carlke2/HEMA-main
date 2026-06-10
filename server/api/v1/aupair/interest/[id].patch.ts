import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session?.user as { id: number; userType?: string; familyId?: string } | undefined;
  if (!user?.id) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const id = getRouterParam(event, "id");
  const interestId = id ? parseInt(id, 10) : NaN;
  if (!Number.isInteger(interestId)) {
    throw createError({ statusCode: 400, message: "Invalid interest id" });
  }

  const interest = await prisma.familyAuPairInterest.findUnique({
    where: { id: interestId },
    include: { family: true, user: true },
  });
  if (!interest) {
    throw createError({ statusCode: 404, message: "Interest not found" });
  }

  const body = (await readBody(event)) || {};
  const isFamily = user.userType === "hostFamily" && user.familyId === interest.familyId;
  const isAuPair = user.id === interest.userId;

  // Au pair: respond interested / uninterested, or schedule meet
  if (isAuPair) {
    const status = body.status as string | undefined;
    if (status === "AU_PAIR_UNINTERESTED") {
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: { status: "AU_PAIR_UNINTERESTED" },
      });
      const familyUser = await prisma.hostFamilyUserProfile.findFirst({
        where: { familyId: interest.familyId },
        include: { user: true },
      });
      if (familyUser?.userId) {
        await prisma.notification.create({
          data: {
            userId: familyUser.userId,
            type: "CONNECTION_UNSUCCESSFUL",
            title: "Connection update",
            message: "The au pair has decided not to move forward at this time. You can continue browsing other au pairs.",
            relatedType: "interest",
            relatedId: String(interestId),
          },
        });
      }
      return { success: true, status: "AU_PAIR_UNINTERESTED" };
    }

    if (status === "AU_PAIR_INTERESTED") {
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: { status: "AU_PAIR_INTERESTED" },
      });
      const familyUser = await prisma.hostFamilyUserProfile.findFirst({
        where: { familyId: interest.familyId },
      });
      if (familyUser?.userId) {
        await prisma.notification.create({
          data: {
            userId: familyUser.userId,
            type: "AU_PAIR_INTERESTED",
            title: "The au pair is interested",
            message: `${interest.user?.fullName ?? "The au pair"} is interested in connecting. Schedule a meet from My connections when ready.`,
            relatedType: "interest",
            relatedId: String(interestId),
          },
        });
      }
      return { success: true };
    }
  }

  // Family: schedule meet (if au pair already interested), mark meet done, extend offer, or decline
  if (isFamily) {
    const status = body.status as string | undefined;
    if (status === "MEET_SCHEDULED" && (interest.status === "AU_PAIR_INTERESTED" || interest.status === "FAMILY_INTERESTED")) {
      const rawAt = body.scheduledMeetAt;
      const scheduledMeetAt = rawAt ? new Date(rawAt) : null;
      if (!scheduledMeetAt || Number.isNaN(scheduledMeetAt.getTime())) {
        throw createError({
          statusCode: 400,
          message: "A valid date and time are required to schedule a meet",
          data: { status: 400 },
        });
      }
      const meetingLink = typeof body.meetingLink === "string" && body.meetingLink.trim() ? body.meetingLink.trim() : undefined;
      const meetNotes = typeof body.meetNotes === "string" && body.meetNotes.trim() ? body.meetNotes.trim() : undefined;
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: {
          status: "MEET_SCHEDULED",
          scheduledMeetAt,
          meetingLink,
          meetNotes,
        },
      });
      await prisma.notification.create({
        data: {
          userId: interest.userId,
          type: "MEET_SCHEDULED",
          title: "Meet scheduled",
          message: `A meet has been scheduled with ${interest.family.name}. Check your Families interested page for details.`,
          relatedType: "interest",
          relatedId: String(interestId),
        },
      });
      return { success: true };
    }

    if (status === "MEET_DONE") {
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: { status: "MEET_DONE" },
      });
      await prisma.notification.create({
        data: {
          userId: interest.userId,
          type: "POST_MEET_AU_PAIR",
          title: "Thanks for meeting",
          message: "The family is deliberating. We'll notify you when they decide.",
          relatedType: "interest",
          relatedId: String(interestId),
        },
      });
      const familyUser = await prisma.hostFamilyUserProfile.findFirst({
        where: { familyId: interest.familyId },
      });
      if (familyUser?.userId) {
        await prisma.notification.create({
          data: {
            userId: familyUser.userId,
            type: "POST_MEET_FAMILY",
            title: "Next step",
            message: "Do you want to extend an offer to this au pair or continue browsing?",
            relatedType: "interest",
            relatedId: String(interestId),
          },
        });
      }
      return { success: true };
    }

    if (status === "FAMILY_DECLINED") {
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: { status: "FAMILY_DECLINED" },
      });
      await prisma.notification.create({
        data: {
          userId: interest.userId,
          type: "FAMILY_DECLINED",
          title: "Update on your connection",
          message: "The family has decided not to extend an offer at this time. You can keep browsing other families.",
          relatedType: "interest",
          relatedId: String(interestId),
        },
      });
      return { success: true };
    }

    if (status === "OFFER_EXTENDED") {
      await prisma.familyAuPairInterest.update({
        where: { id: interestId },
        data: { status: "OFFER_EXTENDED" },
      });
      await prisma.notification.create({
        data: {
          userId: interest.userId,
          type: "OFFER_EXTENDED",
          title: "You have an offer",
          message: `${interest.family.name} has extended an offer. Check your Contracts to accept or decline.`,
          relatedType: "interest",
          relatedId: String(interestId),
        },
      });
      return { success: true };
    }
  }

  throw createError({ statusCode: 400, message: "Invalid update for this interest" });
});
