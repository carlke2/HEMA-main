<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <AppSidebar />
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <form @submit.prevent="submitForm">
        <div class="space-y-12">
          <div>
            <h2 class="text-2xl font-semibold leading-7 text-gray-900">
              Add New Agency User
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Create new user accounts for your agency team members
            </p>
            <div
              class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="name"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Full Name
                </label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    placeholder="Jane Doe"
                    required
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Email
                </label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    placeholder="user@example.com"
                    required
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="role"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Role
                </label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    v-model="form.role"
                    id="role"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-2 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled value="">Select a role</option>
                    <option value="recruiter">Human Resource</option>
                    <option value="support">Support</option>
                    <option value="admin">Admin</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Password
                </label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <div class="relative sm:max-w-md">
                    <input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      placeholder="••••••••"
                      required
                      class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6 pr-10"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        v-if="showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-eye"
                      >
                        <path
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-eye-off"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    </button>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    Minimum 8 characters with at least one number and one
                    special character
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-[#05FF88] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#05FF887D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FE]"
          >
            Add User
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
definePageMeta({
  middleware: ["agency-dashboard"],
});

const form = reactive({
  name: "",
  email: "",
  role: "",
  password: "",
});

const showPassword = ref(false);

const submitForm = () => {
  // Reset form
  form.name = "";
  form.email = "";
  form.role = "";
  form.password = "";
};
</script>
