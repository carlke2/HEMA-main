<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-4 sm:p-6 rounded-xl">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Applicants for {{ job?.title }}
        </h2>

        <ul
          role="list"
          class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="application in job.jobApplications"
            :key="application.applicant.id"
            class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow hover:shadow-md transition-shadow"
          >
            <div
              class="flex w-full items-center justify-between space-x-4 p-4 sm:space-x-6 sm:p-6"
            >
              <div class="flex-1 truncate">
                <div class="flex items-center space-x-3">
                  <h3
                    class="truncate text-sm sm:text-base font-semibold text-gray-900"
                  >
                    {{ application.applicant.fullName }}
                  </h3>
                  <span
                    class="inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                    :class="{
                      'bg-yellow-50 text-yellow-800 ring-yellow-600/20':
                        application.status === 'APPLIED',
                      'bg-green-50 text-green-700 ring-green-600/20':
                        application.status === 'INTERVIEW',
                      'bg-blue-50 text-blue-700 ring-blue-600/20':
                        application.status === 'OFFERED' ||
                        application.status === 'ACCEPTED',
                      'bg-red-50 text-red-700 ring-red-600/20':
                        application.status === 'REJECTED',
                    }"
                  >
                    {{ application.status }}
                  </span>
                </div>
                <p class="mt-1 truncate text-xs sm:text-sm text-gray-500">
                  <strong>Email:</strong>
                  {{ application.applicant.email }}
                </p>
                <p class="mt-1 truncate text-xs sm:text-sm text-gray-500">
                  <strong>Phone:</strong>
                  {{ application.applicant.phone }}
                </p>
                <p class="mt-1 truncate text-xs sm:text-sm text-gray-500">
                  <strong>Country:</strong>
                  {{
                    application.applicant.jobSeekerProfile.country
                      ? application.applicant.jobSeekerProfile.country
                      : "N/A"
                  }}
                </p>
              </div>
              <img
                v-if="!application.applicant.avatar"
                alt="abstract user"
                src="/assets/images/abstract-user.png"
                class="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-full bg-gray-200 object-cover"
              />
              <img
                v-else
                :alt="application.applicant.fullName"
                :src="application.applicant.avatar"
                class="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-full bg-gray-200 object-cover"
              />
            </div>
            <div
              class="-mt-px flex divide-x divide-gray-200 text-xs sm:text-sm"
            >
              <div class="flex w-0 flex-1 justify-center py-3 text-gray-700">
                <span class="font-medium">Applied:</span>
                <span class="ml-1">{{
                  formatDate(application.createdAt)
                }}</span>
              </div>
              <div
                class="flex w-0 flex-1 justify-center py-3 text-indigo-600 hover:underline"
              >
                <button @click="openApplicantModal(application)">
                  View Details
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!-- Modal -->

        <div
          v-if="selectedApplicant"
          class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
          @click.self="selectedApplicant = null"
        >
          <div
            class="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl relative"
          >
            <div></div>
            <button
              @click="selectedApplicant = null"
              class="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
            >
              <icon name="lucide:x" class="h-5 w-5" />
            </button>

            <div class="flex items-center gap-4 mb-4">
              <img
                v-if="!selectedApplicant.applicant.avatar"
                alt="abstract user"
                src="/assets/images/abstract-user.png"
                class="w-14 h-14 rounded-full object-cover"
              />
              <img
                v-else
                :alt="selectedApplicant.applicant.fullName"
                :src="selectedApplicant.applicant.avatar"
                class="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 class="text-xl font-bold">
                  {{ selectedApplicant.applicant.fullName }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ selectedApplicant.applicant.email }}
                </p>
                <p class="text-sm text-gray-500">
                  Phone: {{ selectedApplicant.applicant.phone }}
                </p>
              </div>
            </div>

            <div class="mb-4">
              <h4 class="font-semibold mb-1">Supporting Files</h4>
              <ul class="text-sm list-disc ml-5">
                <li v-for="file in selectedApplicant.files" :key="file.id">
                  <a
                    :href="`https://your-s3-bucket-url/${file.fileUrl}`"
                    target="_blank"
                    class="text-blue-600 hover:underline"
                    >{{ file.fileName }}</a
                  >
                </li>
              </ul>
            </div>

            <div class="flex gap-2">
              <button
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                @click="
                  offerContract(
                    selectedApplicant.applicant.id,
                    selectedApplicant.id
                  )
                "
              >
                Offer Contract
              </button>
              <button
                class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                @click="reject(selectedApplicant.id)"
              >
                Reject
              </button>
              <button
                class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                @click="interview(selectedApplicant.id)"
              >
                Interview
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const jobId = route.params.id;

// Fetch unverified agency users' Data
const { data: jobData, error: jobDataError } = useFetch(
  `/api/v1/jobs/${jobId}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (jobDataError.value) {
  push.error(jobDataError.value || "Error fetching unverified agency users.");
}
let job = ref({});
watchEffect(() => {
  if (jobData.value) {
    job.value = jobData.value;
  } else {
    jobData.value = {};
  }
});

const selectedApplicant = ref(null);
const openApplicantModal = (applicant) => {
  selectedApplicant.value = applicant;
};
const updateStatus = (newStatus) => {
  if (!selectedApplicant.value) return;
  selectedApplicant.value.status = newStatus;
  applicants.value = applicants.value.map((a) =>
    a.id === selectedApplicant.value.id ? selectedApplicant.value : a
  );
};

async function offerContract(userId, jobApplicationId) {
  const status = "OFFERED";
  // Validate input
  if (!userId || !jobApplicationId) {
    const message = "Missing required parameters: userId or jobApplicationId.";
    console.error(message);
    push.error(message);
    return;
  }
  try {
    const {
      data: jobApplicationPatchData,
      error: jobApplicationPatchDataError,
    } = await useFetch(`/api/v1/job-applications/${jobApplicationId}`, {
      method: "PATCH",
      body: {
        status,
      },
    });
    if (jobApplicationPatchDataError?.value) {
      const message =
        jobApplicationPatchError.value.message ||
        "Failed to update job application status.";
      console.error("PATCH Error:", jobApplicationPatchError.value);
      push.error(message);
      return;
    }
    push.success("Job application status updated to OFFERED!");

    const { data: contractData, error: contractError } = await useFetch(
      "/api/v1/contracts",
      {
        method: "POST",
        body: JSON.stringify({
          agencyId: user.value.agencyId,
          jobTitle: job.value.title,
          description: job.value.description,
          userId: userId,
          duties: "As per the job description",
          endDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ).toISOString(),
          salary: job.value.salary,
          currency: job.value.currency,
          salaryFrequency: "MONTHLY",
          workingHours: "40 hours per week",
          leaveAndVacationPolicy: "As per company policy",
          terminationConditions: "As per company policy",
          status: "PENDING",
          applicantId: selectedApplicant.value.applicant.id,
        }),
      }
    );
    if (contractError?.value) {
      console.error("Contract Creation Error:", contractError.value);
      push.error(contractError.value || "Error creating contract.");
      throw contractError;
    }
    push.success("Notification of contract offer sent to apllicant!");
  } catch (error) {
    const errorMessage = error?.value.message;
    console.error("Unexpected Error:", errorMessage);
    push.error(errorMessage || "EROR");
    return errorMessage;
  }
}

async function interview(jobApplicationId) {
  const status = "INTERVIEW";
  try {
    const { data, error } = await useFetch(
      `/api/v1/job-applications/${jobApplicationId}`,
      {
        method: "PATCH",
        body: { status: status },
      }
    );
    if (error.value) {
      console.log("ERROR: ", error.value);
      throw error;
    }
    push.success("Notification of interview sent to applicant!");
    return true;
  } catch (error) {
    push.error(error.value);
    return error.value;
  }
}

async function reject(jobApplicationId) {
  const status = "REJECTED";
  try {
    const { data, error } = await useFetch(
      `/api/v1/job-applications/${jobApplicationId}`,
      {
        method: "PATCH",
        body: { status },
      }
    );
    if (error.value) {
      push.error(error.value);
      throw error;
    }
    push.success("Notification of rejection sent to applicant!");
    return true;
  } catch (error) {
    push.error(error.value);
    return error.value;
  }
}
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
