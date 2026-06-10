<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-6 pb-20 md:pb-6">
      <!-- Welcome Banner -->
      <div
        class="bg-blue-700 text-white rounded-lg p-6 mb-6 relative overflow-hidden"
      >
        <div class="relative z-10">
          <h1 class="text-2xl font-bold mb-2">Welcome, Administrator</h1>
          <p class="max-w-lg">
            Manage the Hema CultureMatch platform and ensure cultural
            connections thrive
          </p>
        </div>
        <div class="absolute -right-10 -bottom-10 opacity-20">
          <icon name="mdi:swirl" class="w-40 h-40 text-white" />
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-800">Total Au Pairs</p>
              <h2 class="text-3xl font-bold mt-1 text-gray-900">{{ stats.auPairs }}</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:account-supervisor" class="text-xl" />
            </div>
          </div>
          <p class="text-xs text-gray-700 mt-2">
            <span
              :class="
                stats.auPairsChange >= 0 ? 'text-green-600' : 'text-red-600'
              "
            >
              <Icon
                :name="
                  stats.auPairsChange >= 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'
                "
                class="inline"
              />
              {{ Math.abs(stats.auPairsChange) }}% this month
            </span>
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-800">Active Families</p>
              <h2 class="text-3xl font-bold mt-1 text-gray-900">{{ stats.families }}</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:home-heart" class="text-xl" />
            </div>
          </div>
          <p class="text-xs text-gray-700 mt-2">
            <span
              :class="
                stats.familiesChange >= 0 ? 'text-green-600' : 'text-red-600'
              "
            >
              <Icon
                :name="
                  stats.familiesChange >= 0
                    ? 'mdi:arrow-up'
                    : 'mdi:arrow-down'
                "
                class="inline"
              />
              {{ Math.abs(stats.familiesChange) }}% this month
            </span>
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-800">Successful Matches</p>
              <h2 class="text-3xl font-bold mt-1 text-gray-900">{{ stats.matches }}</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:handshake" class="text-xl" />
            </div>
          </div>
          <p class="text-xs text-gray-700 mt-2">
            <span
              :class="
                stats.matchesChange >= 0 ? 'text-green-600' : 'text-red-600'
              "
            >
              <Icon
                :name="
                  stats.matchesChange >= 0 ? 'mdi:arrow-up' : 'mdi:arrow-down'
                "
                class="inline"
              />
              {{ Math.abs(stats.matchesChange) }}% this month
            </span>
          </p>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-800">Education Enrollments</p>
              <h2 class="text-3xl font-bold mt-1 text-gray-900">{{ stats.enrollments }}</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:school" class="text-xl" />
            </div>
          </div>
          <p class="text-xs text-gray-700 mt-2">
            <span
              :class="
                stats.enrollmentsChange >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              "
            >
              <Icon
                :name="
                  stats.enrollmentsChange >= 0
                    ? 'mdi:arrow-up'
                    : 'mdi:arrow-down'
                "
                class="inline"
              />
              {{ Math.abs(stats.enrollmentsChange) }}% this month
            </span>
          </p>
        </div>
      </div>

      <!-- Recent Activity & Quick Actions -->
      <div class="grid lg:grid-cols-3 gap-6 mb-6">
        <!-- Recent Activity -->
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2"
        >
          <h2 class="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <icon name="mdi:clock" class="text-blue-600 mr-2" />
            Recent Activity
          </h2>

          <div class="space-y-4">
            <div
              v-for="(activity, index) in recentActivities"
              :key="index"
              class="flex items-start space-x-3 p-3 hover:bg-blue-50 rounded-md transition"
            >
              <div
                :class="`bg-${activity.color}-100 text-${activity.color}-600 p-2 rounded-full`"
              >
                <Icon :name="activity.icon" />
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <h3 class="font-medium text-gray-900">{{ activity.title }}</h3>
                  <span class="text-xs text-gray-600">{{
                    activity.time
                  }}</span>
                </div>
                <p class="text-sm text-gray-800 mt-1">
                  {{ activity.description }}
                </p>
                <div v-if="activity.action" class="mt-2">
                  <button
                    class="text-blue-600 text-xs font-medium hover:underline"
                  >
                    {{ activity.action }} →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            class="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
          >
            View All Activity
          </button>
        </div>

        <!-- Quick Actions -->
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 class="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <icon name="mdi:lightning-bolt" class="text-blue-600 mr-2" />
            Quick Actions
          </h2>

          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="(action, index) in quickActions"
              :key="index"
              @click="handleAction(action)"
              class="flex flex-col items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition"
            >
              <div class="bg-blue-600 text-white p-2 rounded-full mb-2">
                <Icon :name="action.icon" class="text-lg" />
              </div>
              <span class="text-xs font-medium text-center text-gray-800">{{
                action.name
              }}</span>
            </button>
          </div>

          <div class="mt-6">
            <h3 class="font-bold text-sm mb-2 text-gray-900">System Status</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700">Database</span>
                <span class="flex items-center text-green-600">
                  <icon name="mdi:check-circle" class="mr-1" /> Operational
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700">API Services</span>
                <span class="flex items-center text-green-600">
                  <icon name="mdi:check-circle" class="mr-1" /> Operational
                </span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-700">Last Backup</span>
                <span class="text-gray-700">Today 02:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Registrations -->
      <div
        class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-lg text-gray-900 flex items-center">
            <icon name="mdi:account-plus" class="text-blue-600 mr-2" />
            Recent Registrations
          </h2>
          <button class="text-blue-600 text-sm font-medium hover:underline">
            View All →
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50 text-gray-800 text-left">
              <tr>
                <th class="p-3 font-medium">Name</th>
                <th class="p-3 font-medium">Type</th>
                <th class="p-3 font-medium">Location</th>
                <th class="p-3 font-medium">Cultural Background</th>
                <th class="p-3 font-medium">Status</th>
                <th class="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(registration, index) in recentRegistrations"
                :key="index"
                class="hover:bg-blue-50 transition"
              >
                <td class="p-3">
                  <div class="flex items-center space-x-2">
                    <img
                      :src="registration.photo"
                      :alt="registration.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <span class="font-medium text-gray-900">{{ registration.name }}</span>
                  </div>
                </td>
                <td class="p-3 text-sm">
                  <span
                    :class="{
                      'bg-blue-100 text-blue-600':
                        registration.type === 'Au Pair',
                      'bg-purple-100 text-purple-600':
                        registration.type === 'Family',
                    }"
                    class="px-2 py-1 rounded-full text-xs"
                  >
                    {{ registration.type }}
                  </span>
                </td>
                <td class="p-3 text-sm text-gray-800">{{ registration.location }}</td>
                <td class="p-3 text-sm text-gray-800">
                  {{ registration.culturalBackground }}
                </td>
                <td class="p-3">
                  <span
                    :class="{
                      'bg-green-100 text-green-600':
                        registration.status === 'Verified',
                      'bg-amber-100 text-amber-600':
                        registration.status === 'Pending',
                      'bg-red-100 text-red-600':
                        registration.status === 'Needs Review',
                    }"
                    class="px-2 py-1 rounded-full text-xs"
                  >
                    {{ registration.status }}
                  </span>
                </td>
                <td class="p-3">
                  <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-800">
                      <icon name="mdi:eye" />
                    </button>
                    <button class="text-blue-600 hover:text-blue-800">
                      <icon name="mdi:pencil" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Matching Alerts -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 class="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <icon name="mdi:alert-circle" class="text-blue-600 mr-2" />
            Pending Approvals
          </h2>

          <div v-if="pendingApprovals.length > 0" class="space-y-3">
            <div
              v-for="(approval, index) in pendingApprovals"
              :key="index"
              class="border border-gray-200 rounded-md p-3 hover:bg-blue-50 transition"
            >
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-medium text-gray-900">{{ approval.type }}</h3>
                <span
                  class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {{ approval.daysPending }} days
                </span>
              </div>
              <p class="text-sm text-gray-800">{{ approval.description }}</p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-blue-600">{{
                  approval.relatedTo
                }}</span>
                <div class="flex space-x-2">
                  <button
                    class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                  >
                    Approve
                  </button>
                  <button
                    class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-600">
            <p>No pending approvals</p>
          </div>
        </div>

        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 class="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <icon name="mdi:calendar-alert" class="text-blue-600 mr-2" />
            Upcoming Milestones
          </h2>

          <div v-if="upcomingMilestones.length > 0" class="space-y-3">
            <div
              v-for="(milestone, index) in upcomingMilestones"
              :key="index"
              class="border border-gray-200 rounded-md p-3 hover:bg-blue-50 transition"
            >
              <div class="flex justify-between items-start mb-1">
                <h3 class="font-medium text-gray-900">{{ milestone.type }}</h3>
                <span
                  class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {{ milestone.date }}
                </span>
              </div>
              <p class="text-sm text-gray-800">
                {{ milestone.description }}
              </p>
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-blue-600">{{
                  milestone.relatedTo
                }}</span>
                <button
                  class="text-blue-600 text-xs font-medium hover:underline"
                >
                  View →
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-600">
            <p>No upcoming milestones</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const showProfileMenu = ref(false);

const stats = ref({
  auPairs: 248,
  auPairsChange: 5.2,
  families: 187,
  familiesChange: 3.8,
  matches: 143,
  matchesChange: 7.1,
  enrollments: 89,
  enrollmentsChange: 12.4,
});

const recentActivities = ref([
  {
    title: "New Au Pair Registration",
    description: "Amina Diallo from Senegal joined the platform",
    time: "2 hours ago",
    icon: "mdi:account-plus",
    color: "blue",
    action: "Review Profile",
  },
  {
    title: "Match Completed",
    description: "Johnson family matched with Fatou Bâ (92% cultural match)",
    time: "5 hours ago",
    icon: "mdi:handshake",
    color: "green",
    action: "View Contract",
  },
  {
    title: "Education Enrollment",
    description: "Early Childhood Education program started by 3 au pairs",
    time: "1 day ago",
    icon: "mdi:school",
    color: "purple",
    action: "View Report",
  },
  {
    title: "System Update",
    description: "Platform updated to version 2.3.1",
    time: "2 days ago",
    icon: "mdi:update",
    color: "amber",
    action: "View Changelog",
  },
]);

const quickActions = ref([
  { name: "Add User", icon: "mdi:account-plus", action: "addUser" },
  { name: "Create Match", icon: "mdi:handshake", action: "createMatch" },
  { name: "Verify Profile", icon: "mdi:shield-check", action: "verifyProfile" },
  { name: "Run Report", icon: "mdi:chart-box", action: "runReport" },
  { name: "Send Alert", icon: "mdi:alert", action: "sendAlert" },
  { name: "Add Program", icon: "mdi:book-plus", action: "addProgram" },
]);

const recentRegistrations = ref([
  {
    name: "Amina Diallo",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    type: "Au Pair",
    location: "Paris, France",
    culturalBackground: "Wolof (Senegal)",
    status: "Verified",
  },
  {
    name: "Johnson Family",
    photo:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    type: "Family",
    location: "London, UK",
    culturalBackground: "Yoruba (Nigeria)",
    status: "Verified",
  },
  {
    name: "Fatou Bâ",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    type: "Au Pair",
    location: "Brussels, Belgium",
    culturalBackground: "Fula (Mali)",
    status: "Pending",
  },
  {
    name: "Kwame Mensah",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "Cultural Mentor",
    location: "Berlin, Germany",
    culturalBackground: "Akan (Ghana)",
    status: "Needs Review",
  },
]);

const pendingApprovals = ref([
  {
    type: "Profile Verification",
    description: "New au pair profile requires documentation review",
    daysPending: 3,
    relatedTo: "Amina Diallo",
  },
  {
    type: "Contract Modification",
    description: "Family requested extension of trial period",
    daysPending: 1,
    relatedTo: "Johnson Family",
  },
  {
    type: "Education Program",
    description: "New course submission for approval",
    daysPending: 2,
    relatedTo: "Early Childhood Nutrition",
  },
]);

const upcomingMilestones = ref([
  {
    type: "Contract End",
    description: "Au pair contract ending soon",
    date: "in 2 weeks",
    relatedTo: "Fatou Bâ",
  },
  {
    type: "Visa Expiration",
    description: "Work visa needs renewal",
    date: "in 1 month",
    relatedTo: "Amina Diallo",
  },
  {
    type: "Education Completion",
    description: "Program completion certificate ready",
    date: "in 3 days",
    relatedTo: "Early Childhood Education",
  },
]);

const handleAction = (action) => {
  console.log("Action:", action.action);
  // Implement action logic here
};

const signOut = () => {
  console.log("Admin signing out");
  // router.push('/admin/login');
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