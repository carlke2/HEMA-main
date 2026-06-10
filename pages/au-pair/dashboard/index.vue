<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Dashboard Header -->
    <AuPairHeader />

    <div class="flex">
      <AuPairSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Welcome Banner -->
        <div
          class="bg-[#0000FE] text-white rounded-lg p-6 mb-6 relative overflow-hidden"
        >
          <div class="relative z-10">
            <h1 class="text-2xl font-bold mb-2">
              Welcome back, {{ user.fullName }}!
            </h1>
            <p class="max-w-lg opacity-90">
              "Connecting Hands, Creating Futures"
            </p>
          </div>
          <div class="absolute -right-10 -bottom-10 opacity-20">
            <icon name="mdi:swirl" class="w-40 h-40 text-green-600" />
          </div>
        </div>

        <!-- Dashboard Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Current Placement Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-bold text-lg flex items-center text-[#2C3E50]">
                <icon name="mdi:home-heart" class="mr-2" />
                My Placement
              </h2>
              <span
                v-if="currentFamily && currentFamily.id"
                class="bg-[#7DCEA0]/20 text-[#2C3E50] text-xs px-2 py-1 rounded-full"
                >Active</span
              >
              <span
                v-else
                class="bg-[#ff0000]/20 text-[#2C3E50] text-xs px-2 py-1 rounded-full"
                >Inactive</span
              >
            </div>

            <div v-if="currentFamily && currentFamily.id" class="space-y-4">
              <div class="flex items-center space-x-4">
                <img
                  v-if="currentFamily.avatar"
                  :src="currentFamily.avatar"
                  alt="Family"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <img
                  v-else
                  src="/assets/images/abstract-user.png"
                  alt="Family"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 class="font-bold text-gray-900">
                    {{ currentFamily.name }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ currentFamily.location }}
                  </p>
                  <p class="text-xs text-[#0000FE] mt-1">
                    Cultural match: {{ currentFamily.matchScore }}%
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="bg-blue-50 p-2 rounded text-center">
                  <p class="font-bold text-[#0000FE]">
                    {{ currentFamily.children.length }}
                  </p>
                  <p class="text-xs text-gray-600">Children</p>
                </div>
                <div class="bg-blue-50 p-2 rounded text-center">
                  <p class="font-bold text-[#0000FE]">
                    {{ currentFamily.duration }}
                  </p>
                  <p class="text-xs text-gray-600">Months together</p>
                </div>
              </div>

              <button
                @click="openModal"
                class="w-full mt-2 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                View Family Details
              </button>
            </div>

            <div v-else class="text-center py-4 text-gray-600">
              <p class="mb-3">You're not currently placed with a family</p>
              <button
                class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Browse Matches
              </button>
            </div>
          </div>

          <!-- Education Progress Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <icon name="mdi:school" class="text-[#0000FE] mr-2" />
              My Education Path
            </h2>

            <div v-if="currentCourse" class="space-y-4">
              <div>
                <h3 class="font-medium text-gray-900">
                  {{ currentCourse.name }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ currentCourse.institution }}
                </p>
              </div>
            </div>

            <div v-else class="text-center py-4 text-[#2C3E50]/80">
              <p class="mb-3">You haven't added an education path yet</p>
              <button
                class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Choose Program
              </button>
            </div>
          </div>

          <!-- Cultural Connection Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <icon name="mdi:account-group" class="text-[#0000FE] mr-2" />
              Country Circle
            </h2>

            <div class="space-y-4">
              <p class="text-sm text-gray-600">
                Connect with {{ communityMembers.length }} other au pairs from
                {{ currentUser.AuPairUserProfile.country }}
              </p>

              <div class="flex -space-x-2">
                <img
                  v-for="(member, index) in communityMembers.slice(0, 5)"
                  :key="index"
                  :src="member.photo"
                  :alt="member.name"
                  class="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div
                  v-if="communityMembers.length > 5"
                  class="w-10 h-10 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-xs font-bold text-[#0000FE]"
                >
                  +{{ communityMembers.length - 5 }}
                </div>
              </div>
              <a href="dashboard/community">
                <button
                  class="w-full mt-2 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                >
                  Join Community
                </button></a
              >
            </div>
          </div>

          <!-- Quick Actions -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <icon name="mdi:lightning-bolt" class="text-[#0000FE] mr-2" />
              Quick Actions
            </h2>

            <div class="grid grid-cols-2 gap-3">
              <button
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                <icon
                  name="mdi:calendar-clock"
                  class="text-[#0000FE] text-xl mb-1"
                />
                <span class="text-xs text-center text-gray-900">Schedule</span>
              </button>
              <button
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                <icon
                  name="mdi:message-text"
                  class="text-[#0000FE] text-xl mb-1"
                />
                <span class="text-xs text-center text-gray-900">Messages</span>
              </button>
              <button
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                <icon
                  name="mdi:file-document"
                  class="text-[#0000FE] text-xl mb-1"
                />
                <span class="text-xs text-center text-gray-900">Documents</span>
              </button>
              <button
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                <icon
                  name="mdi:face-agent"
                  class="text-[#0000FE] text-xl mb-1"
                />
                <span class="text-xs text-center text-gray-900">Support</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl m-4 transform transition-all duration-300 ease-in-out"
        :class="{ 'scale-100': isModalOpen }"
      >
        <div class="flex justify-between items-center border-b pb-3 mb-4">
          <h3 class="text-2xl font-bold text-gray-800">
            Family & Contract Details
          </h3>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-800 transition"
          >
            <icon name="mdi:close" class="w-7 h-7" />
          </button>
        </div>
        <div
          v-if="currentFamily"
          class="space-y-4 text-gray-700 max-h-[70vh] overflow-y-auto pr-2"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Family Details Column -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-[#0000FE] border-b pb-2">
                Family Information
              </h4>
              <div class="flex items-center space-x-4">
                <img
                  v-if="currentFamily.avatar"
                  :src="currentFamily.avatar"
                  alt="Family"
                  class="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                />
                <img
                  v-else
                  src="/assets/images/abstract-user.png"
                  alt="Family"
                  class="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
                />
                <div>
                  <p><strong>Name:</strong> {{ currentFamily.name }}</p>
                  <p>
                    <strong>Location:</strong> {{ currentFamily.location }},
                    {{ currentFamily.country }}
                  </p>
                  <p>
                    <strong>Verified:</strong>
                    <span
                      :class="
                        currentFamily.verified
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                      >{{ currentFamily.verified ? "Yes" : "No" }}</span
                    >
                  </p>
                </div>
              </div>
              <div>
                <strong>Family Description:</strong>
                <p class="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                  {{ currentFamily.description || "No description provided." }}
                </p>
              </div>
            </div>
            <!-- Contract Details Column -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-[#0000FE] border-b pb-2">
                Contract Terms
              </h4>
              <p>
                <strong>Placement:</strong>
                {{
                  new Date(currentFamilyData[0].startDate).toLocaleDateString()
                }}
                -
                {{
                  new Date(currentFamilyData[0].endDate).toLocaleDateString()
                }}
              </p>
              <p>
                <strong>Salary:</strong> {{ currentFamilyData[0].salary }}
                {{ currentFamilyData[0].currency }} ({{
                  currentFamilyData[0].salaryFrequency
                }})
              </p>
              <p>
                <strong>Working Hours:</strong>
                {{ currentFamilyData[0].workingHours }}
              </p>
              <div>
                <strong>Contract Description:</strong>
                <p class="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                  {{ currentFamilyData[0].description }}
                </p>
              </div>
              <div>
                <strong>Duties:</strong>
                <p class="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                  {{ currentFamilyData[0].duties }}
                </p>
              </div>
              <div>
                <strong>Leave Policy:</strong>
                <p class="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                  {{ currentFamilyData[0].leaveAndVacationPolicy }}
                </p>
              </div>
              <div>
                <strong>Termination Conditions:</strong>
                <p class="text-sm mt-1 bg-gray-50 p-3 rounded-md">
                  {{ currentFamilyData[0].terminationConditions }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 text-right border-t pt-4">
          <button
            @click="closeModal"
            class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["aupair-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const { clear, fetch, user } = useUserSession();

const showProfileMenu = ref(false);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Fetch currently placed family's Data
const { data: currentFamilyData, error: currentFamilyDataError } =
  await useFetch(
    `/api/v1/aupair/contracts?userId=${user.value.id}&status=ACTIVE`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
if (currentFamilyDataError.value) {
  push.error("Error fetching contract data.");
}
const currentFamily = ref(null);
watchEffect(() => {
  if (
    currentFamilyData.value &&
    Array.isArray(currentFamilyData.value) &&
    currentFamilyData.value.length > 0
  ) {
    const contract = currentFamilyData.value[0];
    if (contract && contract.family) {
      const startDate = new Date(contract.startDate);
      const now = new Date();
      const durationInMonths =
        (now.getFullYear() - startDate.getFullYear()) * 12 +
        (now.getMonth() - startDate.getMonth());

      currentFamily.value = {
        ...contract.family,
        matchScore: contract.matchScore,
        duration: durationInMonths,
        photo: contract.family.photo,
        // children is not in the API response.
      };
    } else {
      currentFamily.value = null;
    }
  } else {
    currentFamily.value = null;
  }
});

// fetch aupair data
const { data: currentUserData, error: currentUserDataError } = await useFetch(
  `/api/v1/aupair/aupairs/${user.value.id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (currentUserDataError.value) {
  push.error("Error fetching current user data.");
}
const currentUser = ref({});
watchEffect(() => {
  if (currentUserData.value) {
    currentUser.value = currentUserData.value;
  } else {
    currentUser.value = {};
  }
});

// Fetch users in same country
const { data: communityUsersData, error: communityUsersDataError } =
  await useFetch(
    `/api/v1/aupair/aupairs?country=${currentUser.value.AuPairUserProfile.country}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
if (communityUsersDataError.value) {
  push.error("Error fetching community members data.");
}
const communityUsers = ref({});
watchEffect(() => {
  if (communityUsersData.value) {
    const raw = communityUsersData.value;
    communityUsers.value = Array.isArray(raw) ? raw : (raw?.data ?? raw ?? {});
  } else {
    communityUsers.value = {};
  }
});

const currentCourse = ref({
  name: "Early Childhood Education",
  institution: "Hema Sponsored Program",
  progress: 65,
  completedModules: 7,
  grade: "A-",
  daysLeft: 42,
});

const communityMembers = ref([
  { name: "Fatou", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  {
    name: "Aïssatou",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Mariama",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    name: "Khadija",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  { name: "Awa", photo: "https://randomuser.me/api/portraits/women/32.jpg" },
  {
    name: "Ramatoulaye",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  { name: "Wayne", photo: "https://randomuser.me/api/portraits/women/19.jpg" },
]);

const signOut = async () => {
  await clear();
  await navigateTo("/au-pair/auth/sign-in");
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
