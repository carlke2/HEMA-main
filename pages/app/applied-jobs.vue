<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-4 sm:p-6 rounded-xl">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Your Applied Jobs
        </h2>
        <ul
          role="list"
          class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="job in appliedJobs"
            :key="job.id"
            class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-shadow"
          >
            <div
              class="flex w-full items-center justify-between space-x-4 p-4 sm:space-x-6 sm:p-6"
            >
              <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                  <h3
                    class="truncate text-sm sm:text-base font-medium text-gray-900"
                  >
                    {{ job.job.title }}
                  </h3>
                  <span
                    class="inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                    :class="{
                      'bg-yellow-50 text-yellow-800 ring-yellow-600/20':
                        job.status === 'APPLIED',
                      'bg-green-50 text-green-700 ring-green-600/20':
                        job.status === 'INTERVIEW',
                      'bg-red-50 text-red-700 ring-red-600/20':
                        job.status === 'REJECTED',
                    }"
                  >
                    {{ job.status }}
                  </span>
                </div>
                <p class="mt-1 truncate text-xs sm:text-sm text-gray-500">
                  {{ job.job.agency.name }}
                </p>
              </div>
              <img
                v-if="!job.job.agency.avatarUrl"
                alt="abstract user"
                src="/assets/images/abstract-user.png"
                class="size-10 rounded-full object-cover"
              />
              <img
                v-else
                alt="User Profile"
                :src="job.job.agency.avatarUrl"
                class="size-10 rounded-full object-cover"
              />
            </div>
            <div>
              <div
                class="-mt-px flex divide-x divide-gray-200 text-xs sm:text-sm"
              >
                <div class="flex w-0 flex-1 justify-center py-3 text-gray-700">
                  <span class="font-medium">Applied:</span>
                  <span class="ml-1">{{ formatDate(job.createdAt) }}</span>
                </div>
                <div
                  class="flex w-0 flex-1 justify-center py-3 text-indigo-600 hover:underline"
                >
                  <NuxtLink :to="`#`">View Job</NuxtLink>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["jobseeker-dashboard"],
});
const { user } = useUserSession();

// Fetch users' applied jobs Data
const { data: appliedJobsData, error: appliedJobsDataError } = useFetch(
  "/api/v1/job-applications",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      userId: user.value.id,
    },
  }
);
if (appliedJobsDataError.value) {
  push.error(
    appliedJobsDataError.value || "Error fetching unverified agency users."
  );
}
let totalAppliedJobs = ref(0);
let appliedJobs = ref([]);
watchEffect(() => {
  if (appliedJobsData.value && Array.isArray(appliedJobsData.value)) {
    appliedJobs.value = appliedJobsData.value;
    totalAppliedJobs.value = appliedJobs.value.length;
    console.log("Applied Jobs:", appliedJobs.value);
  } else {
    appliedJobs.value = [];
    totalAppliedJobs.value = appliedJobs.value.length;
  }
});
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
