<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:handshake" class="text-blue-600 mr-2" />
          Matches Management
        </h1>
        <div class="flex space-x-3">
          <button
            class="bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition flex items-center"
          >
            <icon name="mdi:filter" class="mr-1" /> Filters
          </button>
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
          >
            <icon name="mdi:plus" class="mr-1" /> New Match
          </button>
        </div>
      </div>

      <!-- Match Status Tabs -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden"
      >
        <div class="flex border-b border-gray-200">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab.id"
            :class="{
              'text-blue-600 border-b-2 border-blue-600': activeTab === tab.id,
              'text-gray-700 hover:text-blue-600': activeTab !== tab.id,
            }"
            class="px-4 py-3 font-medium text-sm focus:outline-none"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Match Cards -->
        <div class="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(match, index) in filteredMatches"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div class="flex justify-between items-start mb-3">
              <div>
                <h3 class="font-bold text-gray-900">
                  {{ match.auPairName }} & {{ match.familyName }}
                </h3>
                <p class="text-sm text-gray-600">{{ match.matchDate }}</p>
              </div>
              <span
                :class="{
                  'bg-green-100 text-green-600': match.status === 'Active',
                  'bg-blue-100 text-blue-600': match.status === 'Trial',
                  'bg-amber-100 text-amber-600': match.status === 'Pending',
                  'bg-red-100 text-red-600': match.status === 'Ended',
                }"
                class="px-2 py-1 rounded-full text-xs"
              >
                {{ match.status }}
              </span>
            </div>

            <div class="flex items-center justify-between mb-3">
              <div class="flex -space-x-2">
                <img
                  :src="match.auPairPhoto"
                  class="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  :src="match.familyPhoto"
                  class="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <div
                class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ match.matchScore }}% Match
              </div>
            </div>

            <div class="text-sm text-gray-700 mb-3">
              <p class="mb-1">
                <span class="font-medium">Cultural Match:</span>
                {{ match.culturalMatch }}
              </p>
              <p class="mb-1">
                <span class="font-medium">Location:</span>
                {{ match.location }}
              </p>
              <p>
                <span class="font-medium">Duration:</span>
                {{ match.duration }}
              </p>
            </div>

            <div class="flex justify-between">
              <button class="text-blue-600 text-xs font-medium hover:underline">
                View Details →
              </button>
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800">
                  <icon name="mdi:email" class="text-sm" />
                </button>
                <button class="text-blue-600 hover:text-blue-800">
                  <icon name="mdi:pencil" class="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cultural Match Statistics -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 class="font-bold text-lg text-gray-900 mb-4 flex items-center">
          <icon name="mdi:chart-bar" class="text-blue-600 mr-2" />
          Match Statistics
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium text-sm text-gray-800 mb-3">
              Top Cultural Matches
            </h3>
            <div class="space-y-3">
              <div
                v-for="(match, index) in topMatches"
                :key="index"
                class="flex items-center"
              >
                <div
                  class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3"
                >
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-800">{{ match.cultures }}</span>
                    <span class="font-medium text-gray-900"
                      >{{ match.percentage }}%</span
                    >
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      class="bg-blue-600 h-1.5 rounded-full"
                      :style="{ width: match.percentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-medium text-sm text-gray-800 mb-3">
              Match Success Rate
            </h3>
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="flex justify-between items-end mb-2">
                <span class="text-3xl font-bold text-blue-600">87%</span>
                <span class="text-sm text-gray-600">Success Rate</span>
              </div>
              <p class="text-xs text-gray-600">
                Higher than platform average of 82%
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3 mt-4">
              <div class="bg-blue-50 p-2 rounded-lg text-center">
                <div class="text-lg font-bold text-blue-600">143</div>
                <div class="text-xs text-gray-600">Total Matches</div>
              </div>
              <div class="bg-blue-50 p-2 rounded-lg text-center">
                <div class="text-lg font-bold text-blue-600">124</div>
                <div class="text-xs text-gray-600">Successful</div>
              </div>
              <div class="bg-blue-50 p-2 rounded-lg text-center">
                <div class="text-lg font-bold text-blue-600">19</div>
                <div class="text-xs text-gray-600">Unsuccessful</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";

const activeTab = ref("all");

const tabs = ref([
  { id: "all", label: "All Matches" },
  { id: "active", label: "Active" },
  { id: "trial", label: "Trial Period" },
  { id: "pending", label: "Pending" },
  { id: "ended", label: "Completed" },
]);

const matches = ref([
  {
    auPairName: "Amina Diallo",
    auPairPhoto:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    familyName: "Johnson Family",
    familyPhoto:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    matchDate: "Matched on 15 Jun 2023",
    status: "Active",
    matchScore: 92,
    culturalMatch: "Wolof & Yoruba",
    location: "London, UK",
    duration: "12 months (started 1 month ago)",
  },
  {
    auPairName: "Fatou Bâ",
    auPairPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    familyName: "Müller Family",
    familyPhoto: "https://randomuser.me/api/portraits/women/65.jpg",
    matchDate: "Matched on 5 Jul 2023",
    status: "Trial",
    matchScore: 85,
    culturalMatch: "Fula & Akan",
    location: "Berlin, Germany",
    duration: "Trial period (2 weeks left)",
  },
  {
    auPairName: "Ngozi Okonkwo",
    auPairPhoto: "https://randomuser.me/api/portraits/women/33.jpg",
    familyName: "Andersen Family",
    familyPhoto: "https://randomuser.me/api/portraits/women/25.jpg",
    matchDate: "Matched on 22 May 2023",
    status: "Active",
    matchScore: 88,
    culturalMatch: "Igbo & Igbo",
    location: "Copenhagen, Denmark",
    duration: "6 months (3 months remaining)",
  },
  {
    auPairName: "Kwame Mensah",
    auPairPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    familyName: "Dubois Family",
    familyPhoto: "https://randomuser.me/api/portraits/men/75.jpg",
    matchDate: "Pending since 10 Jul 2023",
    status: "Pending",
    matchScore: 78,
    culturalMatch: "Akan & Wolof",
    location: "Paris, France",
    duration: "Pending approval",
  },
  {
    auPairName: "Aisha Conteh",
    auPairPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
    familyName: "Rossi Family",
    familyPhoto: "https://randomuser.me/api/portraits/women/55.jpg",
    matchDate: "Completed on 15 May 2023",
    status: "Ended",
    matchScore: 80,
    culturalMatch: "Mende & Yoruba",
    location: "Rome, Italy",
    duration: "Completed (6 months)",
  },
]);

const filteredMatches = computed(() => {
  if (activeTab.value === "all") return matches.value;
  return matches.value.filter((match) =>
    match.status.toLowerCase().includes(activeTab.value)
  );
});

const topMatches = ref([
  { cultures: "Yoruba ↔ Yoruba", percentage: 92 },
  { cultures: "Akan ↔ Igbo", percentage: 88 },
  { cultures: "Wolof ↔ Yoruba", percentage: 87 },
  { cultures: "Fula ↔ Akan", percentage: 85 },
  { cultures: "Igbo ↔ Hausa", percentage: 82 },
]);
</script>
