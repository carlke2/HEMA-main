export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value) {
    if (to.path !== "/au-pair/auth/sign-in") {
      return navigateTo("/au-pair/auth/sign-in");
    }
    // Allow navigation to /au-pair/auth/sign-in
    return;
  }

  // User is logged in
  switch (user.value.userType) {
    case "Admin":
    case "Support":
      if (to.path !== "/admin") {
        return navigateTo("/admin");
      }
      break;
    case "jobseekerUser":
      if (to.path !== "/app") {
        return navigateTo("/app");
      }
      break;
    case "agencyUser":
      if (to.path !== "/agency") {
        return navigateTo("/agency");
      }
      break;
    case "hostFamily":
      if (to.path !== "/au-pair/family") {
        return navigateTo("/au-pair/family");
      }
      break;
    case "aupair":
      // Unverified au-pairs must complete onboarding (curriculum) first
      if (user.value.verified !== true && to.path !== "/au-pair/dashboard/onboarding") {
        return navigateTo("/au-pair/dashboard/onboarding");
      }
      break;
    default:
      break;
  }
});
