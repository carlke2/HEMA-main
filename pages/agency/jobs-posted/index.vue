<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-6 rounded-xl">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          Jobs You've Posted
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="job in jobs"
            :key="job.id"
            class="rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200 bg-white"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ job.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ job.location }}, {{ formatCountry(job.country) }}
                </p>
              </div>
              <span
                class="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-800"
              >
                {{ job.isActive ? "Open" : "Closed" }}
              </span>
            </div>

            <div class="mt-4">
              <p class="text-sm text-gray-500">
                Posted on: <span class="font-medium">{{ job.createdAt }}</span>
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Applicants:
                <span class="font-semibold text-gray-800">{{
                  job.applicants
                }}</span>
              </p>
            </div>

            <div class="mt-4">
              <NuxtLink
                :to="`/agency/jobs-posted/${job.id}`"
                class="inline-block text-sm font-medium text-indigo-600 hover:underline"
              >
                View Applicants →
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["agency-dashboard"],
});
const { user } = useUserSession();
function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

function formatCountry(country: string): string {
  if (typeof country !== "string") return country;
  return country.replace(/[_,'&]+/g, " ");
}
const { data, pending, error } = await useFetch("/api/v1/jobs", {
  method: "GET",
  params: {
    agencyId: user.value?.agencyId,
  },
});

if (error.value) {
  push.error(error.value?.message);
}

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
  applicants?: number;
  createdAt: String;
}

const jobs = ref<Job[]>([]);
watchEffect(() => {
  if (data.value && Array.isArray(data.value)) {
    jobs.value = (data.value as unknown as any[]).map((job) => ({
      ...job,
      applicants: Array.isArray(job.jobApplications)
        ? job.jobApplications.length
        : 0,
      createdAt: formatDate(new Date(job.createdAt)),
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
</script>
