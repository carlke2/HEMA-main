<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="px-6 py-10 mx-auto max-w-6xl text-black">
        <h2 class="text-2xl font-semibold mb-8">
          📄 All Applications Overview
        </h2>

        <!-- Tabs -->
        <div class="mb-6 flex gap-4 border-b border-gray-300">
          <button
            @click="activeTab = 'job'"
            :class="[
              activeTab === 'job'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600',
              'pb-2 px-4 text-sm font-medium',
            ]"
          >
            Job Applications
          </button>
          <button
            @click="activeTab = 'agency'"
            :class="[
              activeTab === 'agency'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600',
              'pb-2 px-4 text-sm font-medium',
            ]"
          >
            Agency Verifications
          </button>
        </div>

        <!-- Job Applications -->
        <div v-if="activeTab === 'job'" class="space-y-6">
          <div
            v-for="application in jobApplicationsData"
            :key="application.id"
            class="border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <div class="flex justify-between">
              <div>
                <h3 class="text-lg font-semibold">
                  {{ application.job.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  Applicant: {{ application.applicant.fullName }} ({{
                    application.applicant.email
                  }})
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Applied on: {{ application.createdAt }}
                </p>
              </div>
              <span
                :class="[
                  statusBadge[application.status],
                  'rounded-full text-xs font-semibold px-3 py-1',
                ]"
              >
                {{ application.status }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-700">
              {{ application.job.description }}
            </p>
          </div>
        </div>

        <!-- Agency Verifications -->
        <div v-if="activeTab === 'agency'" class="space-y-6">
          <div
            v-for="agency in agencyApplications"
            :key="agency.id"
            class="border rounded-lg p-4 shadow-sm hover:shadow transition"
          >
            <div class="flex justify-between">
              <div>
                <h3 class="text-lg font-semibold">{{ agency.name }}</h3>
                <p class="text-sm text-gray-600">
                  Location: {{ agency.location }}
                </p>
                <p class="text-sm text-gray-500 mt-1">
                  Email: {{ agency.email }}
                </p>
                <p class="text-sm text-gray-500">
                  Submitted on: {{ agency.date }}
                </p>
              </div>
              <span
                :class="[
                  statusBadge[agency.status],
                  'rounded-full text-xs font-semibold px-3 py-1',
                ]"
              >
                {{ agency.status }}
              </span>
            </div>
            <div class="mt-3 flex gap-4">
              <button
                class="text-sm text-white bg-green-600 hover:bg-green-700 rounded-md px-4 py-1"
              >
                Approve
              </button>
              <button
                class="text-sm text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-1"
              >
                Reject
              </button>
              <button
                class="text-sm text-gray-700 underline hover:text-blue-600"
              >
                View Documents
              </button>
            </div>
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

const activeTab = ref("job");

// fetch applications
const { data: jobApplicationsData, error: jobApplicationsError } = useFetch(
  "/api/v1/job-applications",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (jobApplicationsError.value) {
  push.error(jobApplicationsError.value);
}
const applications = ref([]);
watchEffect(() => {
  if (jobApplicationsData.value && Array.isArray(jobApplicationsData.value)) {
    applications.value = jobApplicationsData.value;
  } else {
    jobApplicationsData.value = [];
  }
});

const jobApplications = [
  {
    id: 1,
    jobTitle: "Housekeeper - Nairobi",
    applicantName: "Mary Wanjiku",
    email: "mary@example.com",
    date: "2025-06-10",
    summary:
      "Experienced housekeeper looking to join a reputable family or agency.",
    status: "Pending",
  },
  {
    id: 2,
    jobTitle: "Driver - Mombasa",
    applicantName: "James Otieno",
    email: "james@example.com",
    date: "2025-06-09",
    summary:
      "Skilled driver with 5 years experience in Nairobi and Mombasa routes.",
    status: "Accepted",
  },
  {
    id: 3,
    jobTitle: "Nanny - Kisumu",
    applicantName: "Achieng Atieno",
    email: "achieng@example.com",
    date: "2025-06-08",
    summary:
      "Certified nanny with passion for children, looking for a live-in role.",
    status: "Rejected",
  },
];

const agencyApplications = [
  {
    id: 101,
    name: "Elite Recruiters Ltd.",
    location: "Nairobi, Kenya",
    email: "info@eliterecruiters.co.ke",
    date: "2025-06-07",
    status: "Pending",
  },
  {
    id: 102,
    name: "SwiftHire Agencies",
    location: "Eldoret, Kenya",
    email: "contact@swifthire.co.ke",
    date: "2025-06-05",
    status: "Approved",
  },
  {
    id: 103,
    name: "Umoja Placements",
    location: "Kisumu, Kenya",
    email: "umoja@placements.co.ke",
    date: "2025-06-03",
    status: "Rejected",
  },
];

const statusBadge = {
  Pending: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Approved: "bg-green-100 text-green-800",
};
</script>
