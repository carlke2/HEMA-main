<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:face-agent" class="text-blue-600 mr-2" />
          Cultural Support
        </h1>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center"
        >
          <icon name="mdi:plus" class="mr-1" /> New Support Case
        </button>
      </div>

      <!-- Support Overview Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div
          class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-700">Open Cases</p>
              <h2 class="text-2xl font-bold mt-1 text-gray-900">24</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:inbox" class="text-xl" />
            </div>
          </div>
        </div>
        <div
          class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-700">Resolved This Month</p>
              <h2 class="text-2xl font-bold mt-1 text-gray-900">42</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:check-circle" class="text-xl" />
            </div>
          </div>
        </div>
        <div
          class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-700">Average Response Time</p>
              <h2 class="text-2xl font-bold mt-1 text-gray-900">6.5h</h2>
            </div>
            <div class="bg-blue-50 text-blue-600 p-3 rounded-full">
              <icon name="mdi:clock-fast" class="text-xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Support Cases Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden"
      >
        <div
          class="p-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h2 class="font-bold text-gray-900 flex items-center">
            <icon name="mdi:inbox" class="text-blue-600 mr-2" />
            Recent Support Cases
          </h2>
          <div class="flex space-x-2">
            <button
              class="text-blue-600 text-sm font-medium hover:underline"
            >
              View All →
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50 text-gray-700 text-left">
              <tr>
                <th class="p-3 font-medium">Case ID</th>
                <th class="p-3 font-medium">Subject</th>
                <th class="p-3 font-medium">User</th>
                <th class="p-3 font-medium">Category</th>
                <th class="p-3 font-medium">Status</th>
                <th class="p-3 font-medium">Last Updated</th>
                <th class="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="(caseItem, index) in supportCases"
                :key="index"
                class="hover:bg-blue-50 transition"
              >
                <td class="p-3 text-sm font-medium text-gray-900">#CS-{{ caseItem.id }}</td>
                <td class="p-3">
                  <div class="font-medium text-gray-900">{{ caseItem.subject }}</div>
                  <div class="text-xs text-gray-600 line-clamp-1">
                    {{ caseItem.description }}
                  </div>
                </td>
                <td class="p-3">
                  <div class="flex items-center space-x-2">
                    <img
                      :src="caseItem.userPhoto"
                      :alt="caseItem.userName"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <span class="text-sm text-gray-800">{{ caseItem.userName }}</span>
                  </div>
                </td>
                <td class="p-3">
                  <span
                    class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                  >
                    {{ caseItem.category }}
                  </span>
                </td>
                <td class="p-3">
                  <span
                    :class="{
                      'bg-green-100 text-green-600':
                        caseItem.status === 'Resolved',
                      'bg-amber-100 text-amber-600':
                        caseItem.status === 'In Progress',
                      'bg-red-100 text-red-600': caseItem.status === 'Urgent',
                    }"
                    class="px-2 py-1 rounded-full text-xs"
                  >
                    {{ caseItem.status }}
                  </span>
                </td>
                <td class="p-3 text-sm text-gray-600">
                  {{ caseItem.lastUpdated }}
                </td>
                <td class="p-3">
                  <div class="flex space-x-2">
                    <button class="text-blue-600 hover:text-blue-800 p-1">
                      <icon name="mdi:eye" />
                    </button>
                    <button class="text-blue-600 hover:text-blue-800 p-1">
                      <icon name="mdi:pencil" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cultural Resources -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 class="font-bold text-lg text-gray-900 mb-4 flex items-center">
          <icon name="mdi:book-open" class="text-blue-600 mr-2" />
          Cultural Resources
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(resource, index) in culturalResources"
            :key="index"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div class="flex items-start mb-3">
              <div class="bg-blue-50 text-blue-600 p-2 rounded-full mr-3">
                <Icon :name="resource.icon" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900">{{ resource.title }}</h3>
                <p class="text-xs text-gray-600">{{ resource.category }}</p>
              </div>
            </div>
            <p class="text-sm text-gray-700 mb-3 line-clamp-2">
              {{ resource.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-xs text-blue-600">{{
                resource.language
              }}</span>
              <button
                class="text-blue-600 text-xs font-medium hover:underline"
              >
                View Resource →
              </button>
            </div>
          </div>
        </div>

        <button
          class="w-full mt-6 bg-blue-50 text-blue-600 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
        >
          View All Resources
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const supportCases = ref([
  {
    id: 1024,
    subject: "Visa extension assistance",
    description:
      "Need help understanding visa extension requirements for France",
    userPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    userName: "Amina Diallo",
    category: "Immigration",
    status: "In Progress",
    lastUpdated: "2 hours ago",
  },
  {
    id: 1023,
    subject: "Cultural misunderstanding",
    description: "Conflict with host family about meal preparation customs",
    userPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    userName: "Kwame Mensah",
    category: "Cultural Adjustment",
    status: "Urgent",
    lastUpdated: "5 hours ago",
  },
  {
    id: 1022,
    subject: "Language barrier issue",
    description: "Struggling with local dialect in rural area",
    userPhoto: "https://randomuser.me/api/portraits/women/33.jpg",
    userName: "Ngozi Okonkwo",
    category: "Language Support",
    status: "In Progress",
    lastUpdated: "1 day ago",
  },
  {
    id: 1021,
    subject: "Contract clarification",
    description: "Questions about working hours interpretation",
    userPhoto:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    userName: "Johnson Family",
    category: "Contract",
    status: "Resolved",
    lastUpdated: "2 days ago",
  },
]);

const culturalResources = ref([
  {
    title: "Cultural Etiquette Guide",
    description:
      "Comprehensive guide to social norms and etiquette in various African countries",
    category: "Cultural Adjustment",
    language: "English, French",
    icon: "mdi:handshake",
  },
  {
    title: "Language Phrasebook",
    description:
      "Essential phrases in common African languages for daily communication",
    category: "Language Support",
    language: "Multilingual",
    icon: "mdi:translate",
  },
  {
    title: "Visa Requirements Handbook",
    description:
      "Updated information on visa requirements for European countries",
    category: "Immigration",
    language: "English",
    icon: "mdi:passport",
  },
  {
    title: "Conflict Resolution Tips",
    description:
      "Strategies for resolving cultural misunderstandings in host families",
    category: "Cultural Adjustment",
    language: "English, French",
    icon: "mdi:peace",
  },
  {
    title: "Traditional Recipes Collection",
    description:
      "Authentic recipes from various African cultures with adaptations for local ingredients",
    category: "Cultural Exchange",
    language: "English",
    icon: "mdi:food",
  },
  {
    title: "Mental Health Resources",
    description:
      "Support materials for dealing with homesickness and cultural shock",
    category: "Wellbeing",
    language: "English, French",
    icon: "mdi:heart-pulse",
  },
]);
</script>