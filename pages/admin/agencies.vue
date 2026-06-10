<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="bg-white p-6 rounded-xl shadow-md mt-8">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            Registered Agencies
          </h2>

          <div
            v-for="agency in agencies"
            :key="agency.id"
            class="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm"
          >
            <!-- Agency Overview -->
            <div class="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ agency.name }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ agency.country }} • {{ agency.location }}
                </p>
              </div>
              <div class="text-sm text-gray-700">
                <span class="font-medium">Jobs Posted:</span>
                {{ agency.jobsPosted }}
              </div>
              <div>
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    agency.verified === true
                      ? 'bg-green-100 text-green-700'
                      : agency.verified === false
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ agency.verified === true ? "Verified" : "Pending" }}
                </span>
              </div>
              <div class="flex gap-2 text-sm">
                <button
                  class="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200"
                  @click="approveAgency(agency)"
                >
                  Approve
                </button>
                <button
                  class="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                  @click="rejectAgency(agency)"
                >
                  Reject
                </button>
                <button
                  class="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  @click="suspendAgency(agency)"
                >
                  Suspend
                </button>
              </div>
            </div>

            <!-- Users under this agency -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-4 py-2 text-left text-xs font-medium text-gray-600"
                    >
                      Name
                    </th>
                    <th
                      class="px-4 py-2 text-left text-xs font-medium text-gray-600"
                    >
                      Email
                    </th>
                    <th
                      class="px-4 py-2 text-left text-xs font-medium text-gray-600"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-for="user in agency.users" :key="user.email">
                    <td class="px-4 py-2 text-sm text-gray-800">
                      {{ user.name }}
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-600">
                      {{ user.email }}
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-500">
                      {{ user.role }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            v-if="!agencies.length"
            class="text-center text-sm text-gray-500"
          >
            No registered agencies yet.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["admin-dashboard"],
});
// fetch agencies data
const { data: agenciesData, error: agenciesDataError } = useFetch(
  "/api/v1/agencies",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (agenciesDataError.value) {
  push.error(agenciesDataError.value);
}
const agencies = ref([]);
watchEffect(() => {
  if (agenciesData.value && Array.isArray(agenciesData.value)) {
    agencies.value = agenciesData.value;
  } else {
    agenciesData.value = [];
  }
});

const approveAgency = async (agency) => {
  const { data, error } = await useFetch(`/api/v1/agencies/${agency.uuid}`, {
    method: "PUT",
    body: JSON.stringify({ verified: true }),
  });
  if (error.value) {
    push.error(error.value || "Failed to verify agency");
  } else {
    push.success("Agency verified successfully");
  }
};

const rejectAgency = (agency) => {
  const confirmReject = confirm(`Reject ${agency.name}?`);
  if (confirmReject) {
    alert(`Rejected agency: ${agency.name}`);
    // API call goes here
  }
};

const suspendAgency = (agency) => {
  const confirmSuspend = confirm(`Suspend ${agency.name}?`);
  if (confirmSuspend) {
    alert(`Suspended agency: ${agency.name}`);
    // API call goes here
  }
};
</script>
