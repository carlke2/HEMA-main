<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Support Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:hands-pray" class="text-[#0000FE] mr-2" />
            Cultural Support
          </h1>
          <button
            class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Request Support
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Cultural Mentors -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:account-tie-hat" class="text-[#0000FE] mr-2" />
              Cultural Mentors
            </h2>

            <div class="space-y-4">
              <div
                v-for="(mentor, index) in culturalMentors"
                :key="index"
                class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition"
              >
                <img
                  :src="mentor.photo"
                  :alt="mentor.name"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 class="font-bold text-gray-900">{{ mentor.name }}</h3>
                  <p class="text-sm text-gray-600">{{ mentor.role }}</p>
                  <p class="text-xs text-[#0000FE] mt-1">
                    {{ mentor.expertise }}
                  </p>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              View All Mentors
            </button>
          </div>

          <!-- Support Resources -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:book-open" class="text-[#0000FE] mr-2" />
              Learning Resources
            </h2>

            <div class="space-y-3">
              <div
                v-for="(resource, index) in learningResources"
                :key="index"
                class="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition"
              >
                <div class="flex items-start space-x-2">
                  <div class="bg-blue-50 text-[#0000FE] p-2 rounded-full">
                    <Icon :name="resource.icon" />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ resource.title }}
                    </h3>
                    <p class="text-sm text-gray-600">
                      {{ resource.description }}
                    </p>
                    <div class="flex justify-between items-center mt-2">
                      <span class="text-xs text-[#0000FE]">{{
                        resource.type
                      }}</span>
                      <button
                        class="text-[#0000FE] text-xs font-medium hover:underline"
                      >
                        Access →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Browse All Resources
            </button>
          </div>

          <!-- Past Support Requests -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:history" class="text-[#0000FE] mr-2" />
              My Support History
            </h2>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-blue-50 text-gray-900 text-left">
                  <tr>
                    <th class="p-3">Date</th>
                    <th class="p-3">Topic</th>
                    <th class="p-3">Mentor</th>
                    <th class="p-3">Status</th>
                    <th class="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="(request, index) in supportHistory"
                    :key="index"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="p-3 text-sm text-gray-900">
                      {{ request.date }}
                    </td>
                    <td class="p-3 font-medium text-gray-900">
                      {{ request.topic }}
                    </td>
                    <td class="p-3 text-sm text-gray-900">
                      {{ request.mentor }}
                    </td>
                    <td class="p-3">
                      <span
                        :class="{
                          'bg-[#05FF88]/20 text-gray-900':
                            request.status === 'Completed',
                          'bg-blue-100 text-gray-900':
                            request.status === 'Pending',
                          'bg-gray-100 text-gray-900':
                            request.status === 'In Progress',
                        }"
                        class="text-xs px-2 py-1 rounded-full"
                      >
                        {{ request.status }}
                      </span>
                    </td>
                    <td class="p-3">
                      <button
                        class="text-[#0000FE] text-sm font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              class="w-full mt-4 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              View Full History
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["aupair-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const culturalMentors = ref([
  {
    name: "Elder Ama Diallo",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "Cultural Elder",
    expertise: "Wolof Traditions & Storytelling",
  },
  {
    name: "Dr. Kwame Mensah",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "Psychologist",
    expertise: "Cultural Transition Support",
  },
  {
    name: "Chef Fatima Sow",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    role: "Culinary Expert",
    expertise: "Traditional West African Cuisine",
  },
]);

const learningResources = ref([
  {
    title: "Wolof Language Course",
    description: "Interactive lessons for beginners to advanced",
    type: "Online Course",
    icon: "mdi:translate",
  },
  {
    title: "Cultural Transition Guide",
    description: "Navigating life abroad while keeping your heritage",
    type: "E-book",
    icon: "mdi:book",
  },
  {
    title: "Traditional Childcare Methods",
    description: "African approaches to early childhood development",
    type: "Video Series",
    icon: "mdi:video",
  },
]);

const upcomingSessions = ref([
  {
    title: "Monthly Check-In",
    date: "Jun 15",
    mentor: "Elder Ama Diallo",
    format: "Video Call",
    duration: "30 mins",
  },
  {
    title: "Language Practice",
    date: "Jun 20",
    mentor: "Tutor Mariam B.",
    format: "In-Person",
    duration: "1 hour",
  },
]);

const culturalTools = ref([
  { name: "Language Translator", icon: "mdi:translate" },
  { name: "Holiday Calendar", icon: "mdi:calendar" },
  { name: "Recipe Converter", icon: "mdi:chef-hat" },
  { name: "Conflict Mediator", icon: "mdi:handshake" },
]);

const supportHistory = ref([
  {
    date: "2023-05-10",
    topic: "Homesickness support",
    mentor: "Dr. Kwame Mensah",
    status: "Completed",
  },
  {
    date: "2023-04-22",
    topic: "Traditional weaning foods",
    mentor: "Chef Fatima Sow",
    status: "Completed",
  },
  {
    date: "2023-06-01",
    topic: "Visa extension questions",
    mentor: "Legal Advisor",
    status: "In Progress",
  },
]);
</script>
