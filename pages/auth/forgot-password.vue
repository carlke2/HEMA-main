<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-14 w-auto"
        src="/assets/images/logos/Logo-01.jpg"
        alt="Hema Logo"
      />
      <h2
        class="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900"
      >
        Forgot Password?
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                v-model="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div>
              <button
                @click="sendCode"
                v-if="!loading"
                class="flex w-full h-10 justify-center rounded-md bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryColor-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Code
              </button>
              <div
                v-else
                class="flex items-center w-full h-10 justify-center rounded-md bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryColor-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <div class="spinner"></div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have an Account
        {{ " " }}
        <NuxtLink
          to="/au-pair/auth/sign-in"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign In</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
let email = ref("");
let loading = ref(false);

let validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const sendCode = async () => {
  if (!validateEmail(email.value)) {
    push.error("Please enter a valid email address");
    return;
  }
  loading.value = true;
  let { data, error } = await useFetch("/api/v1/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
    }),
  });

  if (error.value) {
    push.error(error.value.data.message);
  } else {
    push.success("Password reset code sent to your email");
  }
  loading.value = false;
};

useHead({
  title: "Forgot Password | Hema",
  meta: [
    {
      name: "description",
      content: "Forgot Password",
    },
  ],
});
</script>
