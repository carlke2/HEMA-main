<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <!-- Sidebar - full height and collapsible -->
    <AppSidebar />

    <!-- Main Content - scrollable -->
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <!-- Header -->
      <AppHeader />

      <!-- Job Search Status -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl p-4 shadow">
          <h3 class="text-sm text-gray-500">Applications Submitted</h3>
          <p class="text-2xl font-semibold text-blue-700">
            {{ totalJobSeekerApplications }}
          </p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow">
          <h3 class="text-sm text-gray-500">Progressed Applications</h3>
          <p class="text-2xl font-semibold text-blue-700">
            {{ totalJobSeekerProgressedApplications }}
          </p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow">
          <h3 class="text-sm text-gray-500">Saved Opportunities</h3>
          <p class="text-2xl font-semibold text-blue-700">N/A</p>
        </div>
        <div class="bg-white rounded-xl p-4 shadow">
          <h3 class="text-sm text-gray-500">Profile Visits</h3>
          <p class="text-2xl font-semibold text-blue-700">N/A</p>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Application Response Trend Card -->
        <div class="bg-white rounded-xl p-4 shadow">
          <h4 class="text-md font-semibold mb-2">Application Response Trend</h4>
          <div class="flex space-x-2 items-end h-24">
            <div class="w-4 bg-blue-700 h-12 rounded"></div>
            <div class="w-4 bg-blue-500 h-16 rounded"></div>
            <div class="w-4 bg-blue-300 h-20 rounded"></div>
            <div class="w-4 bg-blue-200 h-24 rounded"></div>
            <div class="w-4 bg-blue-100 h-16 rounded"></div>
            <div class="w-4 bg-gray-200 h-12 rounded"></div>
            <div class="w-4 bg-gray-100 h-8 rounded"></div>
          </div>
          <div class="flex justify-between text-xs mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        <!-- Next Scheduled Interview Card -->
        <div class="bg-white rounded-xl p-4 shadow">
          <h4 class="text-md font-semibold mb-2">Next Scheduled Interview</h4>
          <p class="text-sm text-gray-600">Housekeeping - DubaiCare Homes</p>
          <p class="text-xs text-gray-400 mb-2">Tomorrow, 2:00 pm - 3:30 pm</p>
          <div class="space-y-2">
            <div>
              <!-- Trigger Button -->
              <button
                @click="showModal = true"
                class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm w-full"
              >
                Prepare with Hema
              </button>

              <!-- Modal -->
              <transition name="fade">
                <div
                  v-if="showModal"
                  class="fixed inset-0 z-50 flex items-center justify-center bg-black/30  px-4"
                  @click.self="closeModal"
                >
                  <div
                    class="bg-white rounded-xl overflow-hidden max-w-2xl w-full shadow-xl relative"
                  >
                    <!-- Close Button -->
                    <button
                      class="absolute top-3 right-3 text-black text-xl"
                      @click="closeModal"
                    >
                      ✖
                    </button>

                    <!-- YouTube Video Embed -->
                    <div class="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        :src="youtubeEmbedUrl"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        class="rounded-b-xl"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <button
              class="border border-blue-600 text-blue-600 px-4 py-2 rounded-full text-sm w-full"
            >
              Request Reschedule
            </button>
          </div>
        </div>

        <!-- Profile Completion Card -->
        <div class="bg-white rounded-xl p-4 shadow">
          <h4 class="text-md font-semibold mb-2">Profile Completion</h4>
          <div class="relative w-24 h-24 mx-auto">
            <svg class="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="#e5e7eb"
                stroke-width="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="#1d4ed8"
                stroke-width="10"
                fill="none"
                stroke-dasharray="238"
                stroke-dashoffset="60"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div
              class="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-700"
            >
              75%
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            <NuxtLink to="/profile/complete" class="text-blue-600 underline">
              Finish profile for better matches
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Recommended Roles (will span full width on mobile, 2/3 on desktop) -->
        <div class="bg-white rounded-xl p-4 shadow lg:col-span-2">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-md font-semibold">Recommended Roles</h4>
            <NuxtLink to="/app/job-matching" class="text-blue-600 text-sm">
              View all
            </NuxtLink>
          </div>
          <ul v-for="job in jobs" class="space-y-3">
            <li
              class="p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
                <div>
                  <h5 class="font-medium">{{ job.title }}</h5>
                  <p class="text-sm text-gray-600">
                    {{ job.location }}, {{ job.country }}
                  </p>
                </div>
                <span class="text-sm text-blue-600 sm:text-right"
                  >{{ job.salary }} {{ job.currency }}</span
                >
              </div>
              <div
                class="flex flex-col sm:flex-row sm:justify-between mt-2 gap-2"
              >
                <span class="text-xs text-gray-500">{{ job.category }}</span>
                <div class="flex space-x-2">
                  <button
                    @click="submitApplication(job.id)"
                    class="text-blue-600 text-sm"
                  >
                    Apply
                  </button>
                  <button class="text-gray-500 text-sm">Save</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Skills Section (will be full width below recommended roles on mobile) -->
        <div class="bg-white rounded-xl p-4 shadow">
          <h4 class="text-md font-semibold mb-4">Skills You Can Learn</h4>
          <ul class="space-y-3">
            <li
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <span class="text-sm">Basic Arabic</span>
              <div class="w-full sm:w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  style="width: 80%"
                ></div>
              </div>
            </li>
            <li
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <span class="text-sm">Housekeeping Techniques</span>
              <div class="w-full sm:w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  style="width: 60%"
                ></div>
              </div>
            </li>
            <li
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <span class="text-sm">Customer Etiquette</span>
              <div class="w-full sm:w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  style="width: 70%"
                ></div>
              </div>
            </li>
            <li
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
            >
              <span class="text-sm">Food Safety</span>
              <div class="w-full sm:w-1/2 bg-gray-200 rounded-full h-2">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  style="width: 50%"
                ></div>
              </div>
            </li>
          </ul>
          <button
            class="mt-4 bg-blue-600 text-white px-3 py-2 rounded-full text-sm w-full"
          >
            Explore Training Programs
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["jobseeker-dashboard"],
});

import { ref } from "vue";

let { user } = useUserSession();

const isSidebarOpen = ref(false);

// Close sidebar when clicking outside on mobile
const handleClickOutside = (event) => {
  if (
    window.innerWidth < 768 &&
    isSidebarOpen.value &&
    !event.target.closest("aside")
  ) {
    isSidebarOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});

// Fetch Job Seeker's Data
const {
  data: jobSeekerApplicationsData,
  error: jobSeekerApplicationsDataError,
} = useFetch("/api/v1/job-applications", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    userId: user.value.id,
  },
});
if (jobSeekerApplicationsDataError.value) {
  push.error(jobSeekerApplicationsDataError.value);
}
const jobSeekersApplications = ref([]);
const totalJobSeekerApplications = ref(0);
watchEffect(() => {
  if (
    jobSeekerApplicationsData.value &&
    Array.isArray(jobSeekerApplicationsData.value)
  ) {
    jobSeekersApplications.value = jobSeekerApplicationsData.value;
    totalJobSeekerApplications.value = jobSeekersApplications.value.length;
  } else {
    jobSeekersApplications.value = [];
    totalJobSeekerApplications.value = jobSeekersApplications.value.length;
  }
});

// Fetch Job Seeker's shortlisted jobs Data
const {
  data: jobSeekerProgressedApplicationsData,
  error: jobSeekerProgressedApplicationsDataError,
} = useFetch("/api/v1/job-applications", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    userId: user.value.id,
    status: "INTERVIEW",
  },
});
if (jobSeekerProgressedApplicationsDataError.value) {
  push.error(jobSeekerProgressedApplicationsDataError.value);
}
const jobSeekerProgressedApplications = ref([]);
const totalJobSeekerProgressedApplications = ref(0);
watchEffect(() => {
  if (
    jobSeekerProgressedApplicationsData.value &&
    Array.isArray(jobSeekerProgressedApplicationsData.value)
  ) {
    jobSeekerProgressedApplications.value =
      jobSeekerProgressedApplicationsData.value;
    totalJobSeekerProgressedApplications.value =
      jobSeekersApplications.value.length;
  } else {
    totalJobSeekerProgressedApplications.value = [];
    totalJobSeekerProgressedApplications.value =
      totalJobSeekerProgressedApplications.value.length;
  }
});

const { data, pending, error } = await useFetch("/api/v1/jobs");

const jobs = ref([]);
watchEffect(() => {
  if (data.value && Array.isArray(data.value)) {
    jobs.value = data.value.map((job) => ({
      ...job,
      createdAt: new Date(job.createdAt),
      agency: {
        ...job.agency,
        createdAt: job.agency?.createdAt
          ? new Date(job.agency.createdAt)
          : undefined,
      },
    }));
  } else {
    jobs.value = [];
  }
});

async function submitApplication(jobId) {
  try {
    const { data, error } = await useFetch("/api/v1/job-applications", {
      method: "POST",
      body: {
        jobId: jobId,
        userId: user.value.id,
      },
    });
    if (error.value) {
      throw error.value;
    }
    push.success("Application submitted successfully!");
  } catch (error) {
    push.error(error.data.message || "Something went wrong.");
  }
}
const showModal = ref(false);
const youtubeVideoId = "HJLBuP5YYpA"; // Replace with your YouTube video ID
const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`;

const closeModal = () => {
  showModal.value = false;
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
