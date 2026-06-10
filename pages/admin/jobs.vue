<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-6 bg-white rounded-xl shadow">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
        >
          <h2 class="text-2xl font-semibold text-gray-900">Job Management</h2>
          <div class="flex flex-wrap gap-4">
            <select
              v-model="filters.agency"
              class="border rounded px-3 py-1 text-sm"
            >
              <option value="">All Agencies</option>
              <option
                v-for="agency in uniqueAgencies"
                :key="agency"
                :value="agency"
              >
                {{ agency }}
              </option>
            </select>
            <select
              v-model="filters.category"
              class="border rounded px-3 py-1 text-sm"
            >
              <option value="">All Categories</option>
              <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <select
              v-model="filters.status"
              class="border rounded px-3 py-1 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th class="px-4 py-3">Job Title</th>
                <th class="px-4 py-3">Agency</th>
                <th class="px-4 py-3">Category</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Applicants</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="job in filteredJobs"
                :key="job.id"
                class="border-t hover:bg-gray-50"
              >
                <td class="px-4 py-3 font-medium text-gray-900">
                  {{ job.title }}
                </td>
                <td class="px-4 py-3">{{ job.agency.name }}</td>
                <td class="px-4 py-3">{{ job.category }}</td>
                <td>
                  <span
                    class="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                    :class="{
                      'bg-green-100 text-green-700': job.status === 'Active',
                      'bg-yellow-100 text-yellow-700': job.status === 'Pending',
                      'bg-red-100 text-red-700': job.status === 'Rejected',
                      'bg-gray-100 text-gray-700': job.status === 'Closed',
                    }"
                  >
                    {{ job.status }}
                  </span>
                </td>
                <td class="px-4 py-3">{{ job.applicants }}</td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button
                    @click="flagJob(job.id)"
                    class="text-xs text-orange-600 hover:underline"
                  >
                    Flag
                  </button>
                  <button
                    @click="deleteJob(job.id)"
                    class="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredJobs.length === 0">
                <td colspan="6" class="px-4 py-6 text-center text-gray-400">
                  No jobs match your filters.
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
import { ref, computed } from "vue";
definePageMeta({
  middleware: ["admin-dashboard"],
});

const { data: jobsData, error: jobsDataError } = useFetch("/api/v1/jobs", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
if (jobsDataError.value) {
  push.error(jobsDataError.value);
}
const jobs = ref([]);
watchEffect(() => {
  if (jobsData.value && Array.isArray(jobsData.value)) {
    jobs.value = jobsData.value;
  } else {
    jobs.value = [];
  }
});

const filters = ref({
  agency: "",
  category: "",
  status: "",
});

const uniqueAgencies = computed(() => [
  ...new Set(jobs.value.map((j) => j.agency.name)),
]);
const uniqueCategories = computed(() => [
  ...new Set(jobs.value.map((j) => j.category)),
]);

const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    return (
      (filters.value.agency === "" ||
        job.agency.name === filters.value.agency) &&
      (filters.value.category === "" ||
        job.category === filters.value.category) &&
      (filters.value.status === "" || job.status === filters.value.status)
    );
  });
});

const deleteJob = (id) => {
  jobs.value = jobs.value.filter((job) => job.id !== id);
};

const flagJob = (id) => {
  alert(`Job ID ${id} flagged for review.`);
};
</script>
