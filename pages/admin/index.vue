<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="pt-10 px-6 lg:px-12">
        <div class="max-w-6xl mx-auto">
          <!-- Page Title -->
          <h1 class="text-2xl font-semibold text-gray-800 mb-6">
            Admin Overview Dashboard
          </h1>

          <!-- Metrics Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Total Job Seekers</h3>
              <p class="text-2xl font-semibold text-blue-700">
                {{ totalJobSeekers }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Total Employers</h3>
              <p class="text-2xl font-semibold text-blue-700">N/A</p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Total Agencies</h3>
              <p class="text-2xl font-semibold text-blue-700">
                {{ totalAgencies }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Jobs Posted</h3>
              <p class="text-2xl font-semibold text-green-700">
                {{ totalJobs }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Total Applications</h3>
              <p class="text-2xl font-semibold text-indigo-700">
                {{ totalApplications }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Verified Agencies</h3>
              <p class="text-2xl font-semibold text-green-600">
                {{ totalVerifiedAgencies }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">Unverified Agencies</h3>
              <p class="text-2xl font-semibold text-red-500">
                {{ totalUnverifiedAgencies }}
              </p>
            </div>
            <div
              class="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-sm text-gray-500">New Signups This Week</h3>
              <p class="text-2xl font-semibold text-purple-600">Pending..</p>
            </div>
          </div>

          <!-- Activity and Category Chart Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div class="bg-white p-6 rounded-xl shadow">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Daily/Weekly Activity
              </h3>
              <div
                class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-400"
              >
                <!-- Replace with chart component -->
                Activity Chart Placeholder
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl shadow">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Top Job Categories
              </h3>
              <ul class="space-y-3">
                <li
                  v-for="jobCategory in jobCategories"
                  :key="jobCategory.category"
                  class="flex justify-between text-sm text-gray-700"
                >
                  <span>{{ jobCategory.category }}</span>
                  <span class="font-medium text-gray-900"
                    >{{ jobCategory._count._all }} Jobs</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Pending Approvals -->
          <div class="bg-white p-6 rounded-xl shadow">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">
              Pending Approvals
            </h3>
            <ul class="divide-y divide-gray-200">
              <li
                v-for="unverifiedAgency in unverifiedAgencies"
                :key="unverifiedAgency.id"
                class="flex justify-between py-3 text-sm text-gray-700"
              >
                <span
                  >{{ unverifiedAgency.name }} -
                  {{ unverifiedAgency.country }}</span
                >
                <span class="text-yellow-600 font-medium">Pending</span>
              </li>
            </ul>
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

let totalJobSeekers = ref(0);
let totalAgencies = ref(0);
let totalJobs = ref(0);
let totalApplications = ref(0);
let totalVerifiedAgencies = ref(0);
let totalUnverifiedAgencies = ref(0);

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
    totalJobSeekers.value = jobSeekers.value.length;
  } else {
    jobSeekers.value = [];
    totalJobSeekers.value = jobSeekers.value.length;
  }
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
  push.error(error.value);
}
const agencies = ref([]);
watchEffect(() => {
  if (agenciesData.value && Array.isArray(agenciesData.value)) {
    agencies.value = agenciesData.value;
    totalAgencies.value = agenciesData.value.length;
  } else {
    agenciesData.value = [];
    totalAgencies.value = agenciesData.value.length;
  }
});

// fetch jobs
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
    totalJobs.value = jobsData.value.length;
  } else {
    jobsData.value = [];
    totalJobs.value = jobsData.value.length;
  }
});

// fetch applications
const { data: applicationsData, error: applicationsDataError } = useFetch(
  "/api/v1/job-applications",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (applicationsDataError.value) {
  push.error(applicationsDataError.value);
}
const applications = ref([]);
watchEffect(() => {
  if (applicationsData.value && Array.isArray(applicationsData.value)) {
    applications.value = applicationsData.value;
    totalApplications.value = applicationsData.value.length;
  } else {
    applicationsData.value = [];
    totalApplications.value = applicationsData.value.length;
  }
});

// fetch unverified agencies
const { data: unverifiedAgenciesData, error: unverifiedAgenciesDataError } =
  useFetch("/api/v1/agencies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      verified: "false",
    },
  });
if (unverifiedAgenciesDataError.value) {
  push.error(unverifiedAgenciesDataError.value);
}
const unverifiedAgencies = ref([]);
watchEffect(() => {
  if (
    unverifiedAgenciesData.value &&
    Array.isArray(unverifiedAgenciesData.value)
  ) {
    unverifiedAgencies.value = unverifiedAgenciesData.value;
    totalUnverifiedAgencies.value = unverifiedAgenciesData.value.length;
  } else {
    unverifiedAgenciesData.value = [];
    totalUnverifiedAgencies.value = unverifiedAgenciesData.value.length;
  }
});

//fetch verified agencies
const { data: verifiedAgenciesData, error: verifiedAgenciesDataError } =
  useFetch("/api/v1/agencies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      verified: "true",
    },
  });
if (verifiedAgenciesDataError.value) {
  push.error(verifiedAgenciesDataError.value);
}
const verifiedAgencies = ref([]);
watchEffect(() => {
  if (verifiedAgenciesData.value && Array.isArray(verifiedAgenciesData.value)) {
    verifiedAgencies.value = verifiedAgenciesData.value;
    totalVerifiedAgencies.value = verifiedAgenciesData.value.length;
  } else {
    verifiedAgenciesData.value = [];
    totalVerifiedAgencies.value = verifiedAgenciesData.value.length;
  }
});

// fetch jobs by category
const { data: jobCategoriesData, error: jobCategoriesDataError } = useFetch(
  "/api/v1/jobs",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      groupBy: "category",
    },
  }
);
if (jobCategoriesDataError.value) {
  push.error(jobCategoriesDataError.value);
}
const jobCategories = ref([]);
watchEffect(() => {
  if (jobCategoriesData.value && Array.isArray(jobCategoriesData.value)) {
    jobCategories.value = jobCategoriesData.value;
  } else {
    jobCategoriesData.value = [];
  }
});

//fetch unverified agencies
</script>
