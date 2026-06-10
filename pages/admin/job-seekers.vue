<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden rounded-2xl"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="bg-white p-6 rounded-xl shadow-md mt-8">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">Job Seekers</h2>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table
              class="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden"
            >
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="jobSeeker in jobSeekers" :key="jobSeeker.email">
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {{ jobSeeker.fullName }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600">
                    {{ jobSeeker.email }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600">
                    {{ jobSeeker.phone || "N/A" }}
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        jobSeeker.verified === true
                          ? 'bg-green-100 text-green-700'
                          : jobSeeker.verified === false
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700',
                      ]"
                    >
                      {{ jobSeeker.verified === true ? "Verified" : "Pending" }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">
                    <div class="flex gap-2">
                      <button
                        class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded hover:bg-yellow-200"
                        @click="suspend(jobSeeker)"
                      >
                        Suspend
                      </button>
                      <button
                        class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded hover:bg-green-200"
                        @click="verify(jobSeeker.id)"
                      >
                        Verify
                      </button>
                      <button
                        class="px-3 py-1 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200"
                        @click="remove(jobSeeker)"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>

                <tr v-if="!jobSeekers.length">
                  <td
                    colspan="5"
                    class="px-4 py-4 text-center text-sm text-gray-500"
                  >
                    No job seekers found.
                  </td>
                </tr>
              </tbody>
            </table>
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
// Fetch Job Seekers Data
const { data: jobSeekersData, error: jobSeekersDataError } = useFetch(
  "/api/v1/users",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      userType: "jobSeeker",
    },
  }
);
if (jobSeekersDataError.value) {
  push.error(jobSeekersDataError.value);
}
const jobSeekers = ref([]);
watchEffect(() => {
  if (jobSeekersData.value && Array.isArray(jobSeekersData.value)) {
    jobSeekers.value = jobSeekersData.value;
  } else {
    jobSeekers.value = [];
  }
});

const verify = async (jobSeekerId) => {
  const { data, error } = await useFetch(`/api/v1/users/${jobSeekerId}`, {
    method: "PUT",
    body: JSON.stringify({ verified: true }),
  });
  if (error.value) {
    push.error(error.value || "Failed to verify job seeker");
  } else {
    push.success("Job Seeker verified successfully");
  }
};
</script>
