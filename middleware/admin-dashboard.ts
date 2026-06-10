export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value) {
    if (to.path !== "/auth/sign-in") {
      return navigateTo("/auth/sign-in");
    }
    // Allow navigation to /auth/sign-in
    return;
  }

  // User is logged in
  switch (user.value.userType) {
    case "agencyUser":
      if (to.path !== "/agency") {
        return navigateTo("/agency");
      }
      break;
    case "jobseekerUser":
      if (to.path !== "/app") {
        return navigateTo("/app");
      }
      break;
    case "aupair":
      if (to.path !== "/au-pair/dashboard") {
        return navigateTo("/au-pair/dashboard");
      }
      break;
    case "hostFamily":
      if (to.path !== "/au-pair/family") {
        return navigateTo("/au-pair/family");
      }
      break;
    default:
      break;
  }
});
