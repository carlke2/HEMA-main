<template>
  <section
    class="min-h-screen bg-white text-gray-800 font-sans py-12 px-6 md:px-16"
  >
    <!-- Header Logo -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center space-x-2">
        <div class="font-bold text-2xl flex items-center space-x-1">
          <img src="/assets/images/logo.png" alt="Hema CultureMatch" class="w-auto h-10" />
        </div>
        <span class="text-lg font-medium text-gray-600"
          >Hema CultureMatch</span
        >
      </div>
    </div>

    <!-- Sign-In Card -->
    <div
      class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200"
    >
      <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      <!-- Sign-In Form -->
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            placeholder="your@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
            required
          />
          <div class="flex justify-end mt-1">
            <a href="#" class="text-xs text-[#0000FE] hover:underline"
              >Forgot password?</a
            >
          </div>
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="remember"
            class="h-4 w-4 border-gray-300 rounded focus:ring-[#0000FE] text-[#0000FE]"
          />
          <label for="remember" class="ml-2 block text-sm text-gray-600"
            >Remember me</label
          >
        </div>

        <div class="pt-2">
          <button
            type="submit"
            @click="login"
            v-if="!loading"
            class="w-full bg-[#0000FE] text-white py-2 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center cursor-pointer"
          >
            <icon name="mdi:login" class="mr-2" />
            Sign In
          </button>
          <div
            v-else
            class="w-full bg-[#0000FE] text-white py-2 rounded-md font-medium hover:bg-blue-700 transition flex items-center justify-center cursor-progress"
          >
            <svg
              class="text-gray-300 animate-spin"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-white"
              ></path>
            </svg>
          </div>
        </div>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-1 border-t border-gray-200"></div>
        <span class="px-4 text-sm text-gray-600">or</span>
        <div class="flex-1 border-t border-gray-200"></div>
      </div>

      <!-- Social Login -->
      <div class="space-y-3">
        <button
          class="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 py-2 rounded-md hover:bg-gray-50 transition"
        >
          <icon name="mdi:google" class="text-[#DB4437]" />
          <span>Continue with Google</span>
        </button>
        <button
          class="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 py-2 rounded-md hover:bg-gray-50 transition"
        >
          <icon name="mdi:facebook" class="text-[#4267B2]" />
          <span>Continue with Facebook</span>
        </button>
      </div>

      <!-- Sign-Up Link -->
      <p class="text-center mt-6 text-sm text-gray-600">
        New to Hema?
        <a href="/au-pair/auth/sign-up" class="text-[#0000FE] font-medium hover:underline"
          >Create an account</a
        >
      </p>
    </div>

    <!-- Cultural Motif -->
    <div class="text-center mt-8 text-[#0000FE]">
      <icon name="mdi:swirl" class="w-12 h-12 mx-auto" />
      <p class="text-xs mt-2 text-gray-600">
        Childcare that preserves culture
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["is-auth"],
});
let loading = ref(false);

let form = ref({
  email: "",
  password: "",
});

let validate = () => {
  if (!form.value.email) {
    push.error("Email is required");
    return false;
  }

  if (!form.value.password) {
    push.error("Password is required");
    return false;
  }
  return true;
};

async function login() {
  if (!validate()) return;
  loading.value = true;
  let { data, error } = await useFetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(form.value),
  });

  if (error.value) {
    push.error(error.value.data.message);
  } else {
    push.success("Login successful");
    window.location.href = "/app";
  }
  loading.value = false;
}

useHead({
  title: "Sign in | Hema Au Pair",
  meta: [
    {
      name: "Sign in",
      content: "Sign in to your Hema Au Pair account",
    },
  ],
});
</script>
