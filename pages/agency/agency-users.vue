<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <AppSidebar />
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <section class="bg-white p-6 rounded-xl shadow-md mt-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">
              Manage Agency Users
            </h2>
            <p class="text-sm text-gray-500">
              View, verify or remove users associated with your agency.
            </p>
          </div>
          <div>
            <!-- Trigger Button -->
            <button
              @click="openModal"
              class="bg-[#05FF88] text-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-[#05FF88cc] transition"
            >
              + Add User
            </button>

            <!-- Backdrop + Modal -->
            <div
              v-if="showModal"
              @click.self="closeModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            >
              <div
                class="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
              >
                <!-- Header -->
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-semibold text-gray-900">
                    Add New Agency User
                  </h3>
                  <button
                    @click="closeModal"
                    class="text-gray-400 hover:text-gray-600 text-xl leading-none font-semibold"
                  >
                    &times;
                  </button>
                </div>

                <!-- Form -->
                <form @submit.prevent="submitForm" class="space-y-5">
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Full Name</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Email</label
                    >
                    <input
                      v-model="form.email"
                      type="email"
                      placeholder="user@example.com"
                      required
                      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Role</label
                    >
                    <select
                      v-model="form.role"
                      required
                      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                    >
                      <option disabled value="">Select a role</option>
                      <option value="recruiter">Human Resource</option>
                      <option value="support">Support</option>
                      <option value="admin">Admin</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Password</label
                    >
                    <input
                      v-model="form.password"
                      type="password"
                      placeholder="••••••••"
                      required
                      class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                    />
                  </div>

                  <div class="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      @click="closeModal"
                      class="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="bg-[#0000FE] hover:bg-[#0000FE88] text-white px-4 py-2 rounded-md text-sm font-semibold"
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-gray-600 font-semibold">
                  Name
                </th>
                <th class="px-4 py-3 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th class="px-4 py-3 text-left text-gray-600 font-semibold">
                  Status
                </th>
                <th class="px-4 py-3 text-left text-gray-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="user in users" :key="user.email">
                <td class="px-4 py-3 text-gray-800">{{ user.fullName }}</td>
                <td class="px-4 py-3 text-gray-600">{{ user.email }}</td>
                <td class="px-4 py-3">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      user.verified === true
                        ? 'bg-green-100 text-green-700'
                        : user.verified === false
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700',
                    ]"
                  >
                    {{ user.verified ? "Verified" : "Pending" }}
                  </span>
                </td>
                <td class="px-4 py-3 space-x-2">
                  <NuxtLink
                    :to="`/agency/users/${user.email}`"
                    class="text-indigo-600 hover:underline text-sm"
                  >
                    View
                  </NuxtLink>
                  <button class="text-red-600 hover:underline text-sm">
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["agency-dashboard"],
});
const { user } = useUserSession();

const { data, pending, error } = await useFetch("/api/v1/users", {
  method: "GET",
  params: {
    agencyId: user.value?.agencyId,
  },
});

if (error.value) {
  push.error(error.value?.message);
}

interface User {
  fullName: string;
  email: string;
  gender: string;
  verified: boolean;
  avatar: string | null;
  agencyUserProfile: {
    userType: string;
  };
}

const users = ref<User[]>([]);
watchEffect(() => {
  if (data.value && Array.isArray(data.value)) {
    users.value = (data.value as unknown as any[]).map((user) => ({
      ...user,
    }));
  } else {
    users.value = [];
  }
});

const showModal = ref(false);

const form = reactive({
  name: "",
  email: "",
  role: "",
  password: "",
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = () => {
  // Reset form
  form.name = "";
  form.email = "";
  form.role = "";
  form.password = "";
  closeModal();
};
</script>
