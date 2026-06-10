import { H3Event, EventHandlerRequest } from "h3";
import prisma from "~/lib/prisma";
import { registerEmail } from "~/server/utils/emails";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event: H3Event<EventHandlerRequest>, { user }: any) {
    let alreadyExists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (alreadyExists) {
      await setUserSession(event, {
        user: {
          userType: alreadyExists.userType,
          id: alreadyExists.id,
          fullName: alreadyExists.fullName,
          email: alreadyExists.email,
          avatar: alreadyExists.avatar,
        },
      });
      // app send to subscription page
      return sendRedirect(event, "/app");
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          password: "google",
          fullName: user.name || "No Name",
          gender: user.gender || "Other",
          avatar: user.picture || "",
          verified: false,
          userType: "jobSeeker",
          phone: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      await registerEmail(newUser.fullName, newUser.email);

      await setUserSession(event, {
        user: {
          userType: newUser.userType,
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      });
      return sendRedirect(event, "/app");
    }
  },
  onError(event: H3Event<EventHandlerRequest>, error: any) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
