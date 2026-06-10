<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="bg-white p-6 rounded-xl shadow">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
        >
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">
              🏢 Agency Verification Center
            </h2>
            <p class="text-sm text-gray-600 mt-1">
              Review and verify newly registered agencies
            </p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th class="px-4 py-3">Agency Name</th>
                <th class="px-4 py-3">Country</th>
                <th class="px-4 py-3">Submitted Docs</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="agency in agencies"
                :key="agency.id"
                class="border-t hover:bg-gray-50"
              >
                <td class="px-4 py-3 font-medium text-gray-900">
                  {{ agency.name }}
                </td>
                <td class="px-4 py-3">{{ agency.country }}</td>
                <td class="px-4 py-3 text-blue-600 underline cursor-pointer">
                  View Docs
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    :class="{
                      'bg-yellow-100 text-yellow-700':
                        agency.verified === false,
                      'bg-green-100 text-green-700': agency.verified === true,
                    }"
                  >
                    {{ agency.verified ? "Verified" : "Pending" }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button
                    v-if="agency.verified === false"
                    @click="approveAgency(agency)"
                    class="text-green-600 hover:underline text-xs"
                  >
                    Approve
                  </button>
                  <button
                    v-if="agency.status === 'Pending'"
                    @click="updateStatus(agency.id, 'Rejected')"
                    class="text-red-600 hover:underline text-xs"
                  >
                    Reject
                  </button>
                  <span v-else class="text-gray-400 text-xs italic">
                    No actions
                  </span>
                </td>
              </tr>

              <tr v-if="agencies.length === 0">
                <td colspan="5" class="text-center text-gray-500 py-8">
                  No agencies awaiting verification
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";
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

const updateStatus = (id, newStatus) => {
  const agency = agencies.value.find((a) => a.id === id);
  if (agency) agency.status = newStatus;
};
</script>
