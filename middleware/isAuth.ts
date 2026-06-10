export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn, user } = useUserSession();

  if (loggedIn.value) {
    return navigateTo("/app");
  }
});
