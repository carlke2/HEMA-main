
<template>
  <div
    class="relative flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <img
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
      alt="Background"
      class="absolute inset-0 w-full h-full object-cover -z-10"
    />
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-14 w-auto"
        src="/assets/images/logos/Logo-01.jpg"
        alt="Hema Logo"
      />
      <h2
        class="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900"
      >
        Sign up to Hema
      </h2>
    </div>
    <div class="w-4/5 sm:w-full max-w-md mx-auto mt-3 py-4">
      <div
        class="flex items-center bg-gray-100 border border-gray-200 rounded-xl p-1 shadow-sm"
      >
        <button
          @click="form.userType = 'jobSeeker'"
          @click.prevent="form.userType == 'jobSeeker'"
          class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none"
          :class="
            form.userType == 'jobSeeker'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          "
        >
          Job Seeker
        </button>

        <button
          @click="form.userType = 'agencyUser'"
          @click.prevent="form.userType == 'agencyUser'"
          class="flex-1 py-2 sm:py-2.5 px-2 sm:px-4 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 focus:outline-none"
          :class="
            form.userType == 'agencyUser'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          "
        >
          Employer
        </button>
      </div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-xl sm:px-12">
        <div class="space-y-6">
          <div>
            <label
              for="phone"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Phone</label
            >
            <div class="mt-2">
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="text"
                required
                placeholder="+254727845605"
                autocomplete="phone"
                class="block px-4 w-full rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white"
              />
            </div>
          </div>
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900 bg-white"
            >
              Full Name</label
            >
            <div class="mt-2">
              <input
                id="name"
                v-model="form.fullName"
                name="name"
                type="text"
                class="bg-white block w-full px-4 rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="gender"
              class="block text-sm font-medium leading-6 text-gray-900 bg-white"
              >Gender</label
            >
            <div class="mt-2">
              <select
                id="gender"
                name="gender"
                class="bg-white block w-full px-4 rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                v-model="form.gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
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
                type="email"
                v-model="form.email"
                autocomplete="email"
                class="bg-white block w-full rounded-xl px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div v-if="form.userType == 'agencyUser'">
            <label
              for="AgencyID"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Agency ID</label
            >
            <div class="mt-2">
              <input
                id="AgencyID"
                name="AgencyID"
                type="string"
                v-model="agencyId"
                class="bg-white block w-full rounded-xl px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                autocomplete="current-password"
                class="bg-white block w-full px-4 rounded-xl border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex h-6 items-center">
              <input
                id="terms"
                v-model="form.agreedToTerms"
                name="terms"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div class="ml-3 text-sm leading-6">
              <label for="terms" class="font-medium text-gray-900">
                I agree to the
                <NuxtLink
                  to="/terms"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Terms of Service</NuxtLink
                >
                and
                <NuxtLink
                  to="/privacy"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Privacy Policy</NuxtLink
                >.
              </label>
            </div>
          </div>

          <div>
            <button
              @click="createAccount"
              v-if="!loading"
              :disabled="!form.agreedToTerms"
              class="flex w-full max-w-full items-center justify-center text-center rounded-xl bg-white px-3 py-2  text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              :class="{ 'opacity-50 cursor-not-allowed': !form.agreedToTerms }"
            >
              Sign up
            </button>
            <div
              v-else
              class="flex items-center w-full h-10 justify-center rounded-xl bg-primaryColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryColor-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                  class="text-blue-500"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div v-if="form.userType == 'jobSeeker'">
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div
              class="relative flex justify-center text-sm font-medium leading-6"
            >
              <span class="bg-white px-6 text-gray-900">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 flex justify-center">
            <button
              @click="handleGoogleLogin"
              :disabled="!form.agreedToTerms"
              :class="{ 'opacity-50 cursor-not-allowed': !form.agreedToTerms }"
              class="flex w-full max-w-full items-center justify-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span class="text-sm font-semibold leading-6">Google</span>
            </button>
          </div>
        </div>
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

<script setup lang="ts">
definePageMeta({
  middleware: ["is-auth"],
});
let loading = ref(false);

let agencyId = ref("");

let form = ref({
  phone: "",
  fullName: "",
  gender: "Male",
  email: "",
  password: "",
  userType: "jobSeeker",
  verified: false,
  agreedToTerms: false,
});
function isValidPhoneNumber(phoneNumber: string) {
  const phoneRegex = /^\+\d{1,3}\d{6,14}$/;
  return phoneRegex.test(phoneNumber);
}
let validate = () => {
  // Check if terms are agreed to first
  if (!form.value.agreedToTerms) {
    push.error("You must agree to the Terms of Service and Privacy Policy.");
    return false;
  }
  if (!form.value.phone) {
    push.error("Phone number is required");
    return false;
  }
  if (form.value.phone) {
    const phoneValidity = isValidPhoneNumber(form.value.phone);
    if (!phoneValidity) {
      push.error(
        "Please enter a valid phone number in the format +254723456789"
      );
      return false;
    }
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.value.email)) {
    push.error("Please enter a valid email address");
    return false;
  }
  if (!form.value.email) {
    push.error("Email is required");
    return false;
  }
  if (!form.value.fullName) {
    push.error("Name is required");
    return false;
  }
  if (!form.value.password) {
    push.error("Password is required");
    return false;
  }
  return true;
};

function isUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// Handler for the Google login button
function handleGoogleLogin() {
  if (!form.value.agreedToTerms) {
    push.error("You must agree to the Terms of Service and Privacy Policy.");
    return;
  }
  // If the checkbox is checked, proceed with navigation.
  window.location.href = "/api/v1/auth/google";
}

async function createAccount() {
  if (!validate()) return;
  loading.value = true;
  if (form.value.userType == "agencyUser" && !agencyId.value) {
    push.error("Agency ID is required for agency users");
    loading.value = false;
    return;
  }
  if (form.value.userType == "agencyUser" && !isUUID(agencyId.value)) {
    push.error("Please enter a valid Agency ID");
    loading.value = false;
    return;
  }
  const payload = {
    ...form.value,
    ...(form.value.userType === "agencyUser"
      ? { agencyId: agencyId.value }
      : {}),
  };

  const { data, error } = await useFetch("/api/v1/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (error.value) {
    push.error(error.value.data.message);
  } else {
    push.success("Account created successfully");
    window.location.href = "/app";
  }

  loading.value = false;
  agencyId.value = "";
}

useHead({
  title: "Sign up | Hema",
  meta: [
    {
      name: "Sign up",
      content: "Sign up to your Hema account",
    },
  ],
});
</script>
```