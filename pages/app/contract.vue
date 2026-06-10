<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section>
        <h2 class="text-2xl font-semibold mb-6">📄 My Contract</h2>

        <div
          v-if="contract"
          class="bg-white shadow rounded-xl p-6 space-y-6 "
        >
          <!-- Header -->
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h3 class="text-xl font-semibold text-gray-900">
                {{ contract.position }}
              </h3>
              <p class="text-sm text-gray-600">
                Contract with <strong>{{ contract.agency }}</strong>
              </p>
            </div>
            <span
              :class="
                contract.status === 'Active'
                  ? 'text-green-700 bg-green-50 ring-green-600/20'
                  : 'text-yellow-700 bg-yellow-50 ring-yellow-600/20'
              "
              class="px-3 py-1 text-sm rounded-full ring-1 ring-inset font-medium"
            >
              {{ contract.status }}
            </span>
          </div>

          <!-- Contract Info -->
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt class="font-medium text-gray-700">Start Date</dt>
              <dd class="text-gray-900">{{ contract.startDate }}</dd>
            </div>
            <div>
              <dt class="font-medium text-gray-700">End Date</dt>
              <dd class="text-gray-900">{{ contract.endDate }}</dd>
            </div>
            <div>
              <dt class="font-medium text-gray-700">Payment (Monthly)</dt>
              <dd class="text-gray-900">
                {{ contract.currency }} {{ contract.salary }}
              </dd>
            </div>
            <div>
              <dt class="font-medium text-gray-700">Contract Length</dt>
              <dd class="text-gray-900">{{ contract.length }}</dd>
            </div>
          </dl>

          <!-- Additional Notes -->
          <div>
            <dt class="font-medium text-gray-700 mb-1">Notes</dt>
            <p class="text-gray-700 text-sm">{{ contract.notes }}</p>
          </div>

          <!-- Action -->
          <div class="flex items-center justify-between mt-6">
            <p class="text-sm text-gray-500">
              Signed on {{ contract.dateSigned }}
            </p>
            <button
              class="text-sm font-medium text-blue-600 hover:underline"
              @click="downloadContract"
            >
              📥 Download Contract PDF
            </button>
          </div>
        </div>

        <div v-else class="text-center py-10">
          <p class="text-gray-600">You currently have no active contracts.</p>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["jobseeker-dashboard"],
});

const contract = {
  position: "Live-in Housekeeper",
  agency: "CleanHome Recruiters",
  startDate: "2024-07-01",
  endDate: "2025-07-01",
  salary: "350",
  currency: "USD",
  length: "12 months",
  notes:
    "This is a renewable contract subject to performance and mutual agreement.",
  status: "Active",
  dateSigned: "2024-06-25",
};

const downloadContract = () => {
  alert("This would trigger a PDF download.");
};
</script>
<style scoped>
dl dt {
  font-weight: 500;
  margin-bottom: 0.25rem;
}
dl dd {
  margin-bottom: 1rem;
}
</style>
