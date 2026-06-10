<template>
  <div
    v-if="!pending && !error"
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <AppHeader />
      <div class="flex flex-col lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Left: Job Picks List -->
        <div
          class="lg:col-span-1 bg-white rounded-xl shadow overflow-y-auto max-h-[50vh] lg:max-h-screen"
          :class="{ 'hidden lg:block': selectedJob }"
        >
          <div class="p-4 border-b sticky top-0 bg-white z-10">
            <h2 class="text-lg font-semibold">Job Matches for You</h2>
            <p class="text-sm text-gray-500">
              Based on your profile, skills, and preferences
            </p>
          </div>
          <ul>
            <li
              v-for="(job, index) in jobs"
              :key="index"
              class="p-4 border-b hover:bg-blue-50 cursor-pointer"
              @click="selectJob(index)"
            >
              <div class="flex items-start gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="job.postedBy.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <h3 class="font-medium text-blue-900">{{ job.title }}</h3>
                    <span class="text-xs text-gray-400">{{
                      customTimeAgo(job.createdAt)
                    }}</span>
                  </div>
                  <p class="text-sm text-gray-600">{{ job.agency.name }}</p>
                  <p class="text-xs text-gray-400">{{ job.country }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right: Selected Job Details -->
        <div
          class="lg:col-span-2 bg-white rounded-xl shadow p-4 lg:p-6"
          :class="{ 'hidden lg:block': !selectedJob }"
        >
          <div v-if="selectedJob" class="space-y-4">
            <!-- Back button for mobile -->
            <button
              @click="selectedJob = null"
              class="lg:hidden flex items-center text-blue-600 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to list
            </button>

            <div class="flex items-start gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="selectedJob.postedBy.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 class="text-xl font-semibold text-gray-800">
                  {{ selectedJob?.title }}
                </h2>
                <p class="text-sm text-gray-600">
                  {{ selectedJob?.agency.name }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ selectedJob?.location }} •
                  {{ customTimeAgo(selectedJob?.createdAt) }}
                </p>
              </div>
            </div>

            <div
              class="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-700"
            >
              <p>
                We highlighted job details that match your skills and
                preferences.
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in selectedJob?.skills"
                :key="tag"
                class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                >{{ tag }}</span
              >
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                :disabled="applying"
                @click="submitApplication"
                class="bg-blue-600 text-white px-4 py-2 rounded flex-1 sm:flex-none"
              >
                <span v-if="!applying">Apply</span>
                <span v-else>Submitting application...</span>
              </button>
              <button
                class="border border-blue-600 text-blue-600 px-4 py-2 rounded flex-1 sm:flex-none"
              >
                Save
              </button>
            </div>

            <div class="text-sm text-gray-700">
              <h3 class="font-semibold mb-1">About the job</h3>
              <p>
                <strong>Location:</strong> {{ selectedJob?.location }},
                {{ selectedJob?.country }}
              </p>
              <!-- <p><strong>Open to:</strong> {{ selectedJob.openTo }}</p>
              <p><strong>Urgency:</strong> {{ selectedJob.urgency }}</p> -->
              <p class="mt-2">{{ selectedJob?.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <div v-if="pending">Loading...</div>
  <div v-if="error">{{ error.message }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  // @ts-ignore
  middleware: ["jobseeker-dashboard"],
});

import { ref } from "vue";
const { user } = useUserSession();

const applying = ref(false);

const selectedJob = ref<Job | null>(null);
const fileIds = ref<number[]>([]);

const selectJob = (index: number) => {
  selectedJob.value = jobs.value[index];
};

const { data, pending, error } = await useFetch("/api/v1/jobs");

interface Job {
  id: number;
  title: string;
  description: string;
  country: string;
  location: string;
  salary: number;
  skills: string[];
  isActive: boolean;
  agency: {
    id?: string;
    name?: string;
    country?: string;
    location?: string;
    verified?: boolean;
    createdAt?: Date;
  };
  createdAt: Date;
}

const jobs = ref<Job[]>([]);
watchEffect(() => {
  if (data.value && Array.isArray(data.value)) {
    jobs.value = (data.value as unknown as any[]).map((job) => ({
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
function customTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [name, secs] of intervals) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) {
      return `${value} ${name}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

async function submitApplication() {
  if (!selectedJob?.value || !user.value.id) return;

  try {
    applying.value = true;

    const response = await $fetch("/api/v1/job-applications", {
      method: "POST",
      body: {
        jobId: selectedJob?.value.id,
        userId: user.value.id,
        files: fileIds.value, // send empty or selected file IDs
      },
    });

    push.success("Application submitted successfully!");
    selectedJob.value = null;
  } catch (error: any) {
    push.error(error.data.message || "Something went wrong.");
  } finally {
    applying.value = false;
  }
}
</script>
