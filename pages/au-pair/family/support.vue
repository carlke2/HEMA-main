<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Dashboard Header -->
    <FamilyHeader />

    <div class="flex">
      <FamilySidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center">
            <Icon icon="mdi:hands-pray" class="text-[#0000FE] mr-2" />
            Cultural Support
          </h1>
          <button
            class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            <Icon icon="mdi:plus" class="mr-1" /> Request Support
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Cultural Mentors -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:account-tie-hat" class="text-[#0000FE] mr-2" />
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
                  <h3 class="font-bold">{{ mentor.name }}</h3>
                  <p class="text-sm text-gray-600">{{ mentor.specialty }}</p>
                  <p class="text-xs text-[#0000FE] mt-1">
                    {{ mentor.availability }}
                  </p>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              View All Mentors
            </button>
          </div>

          <!-- Upcoming Sessions -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:calendar" class="text-[#0000FE] mr-2" />
              My Sessions
            </h2>

            <div v-if="upcomingSessions.length > 0" class="space-y-3">
              <div
                v-for="(session, index) in upcomingSessions"
                :key="index"
                class="border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition"
              >
                <div class="flex justify-between items-start mb-1">
                  <h3 class="font-medium">{{ session.topic }}</h3>
                  <span
                    class="text-xs bg-blue-50 text-[#0000FE] px-2 py-1 rounded-full"
                  >
                    {{ session.date }}
                  </span>
                </div>
                <p class="text-sm text-gray-600">With {{ session.mentor }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-[#0000FE]">{{
                    session.format
                  }}</span>
                  <button
                    class="text-[#0000FE] text-xs font-medium hover:underline"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-600">
              <p>No upcoming sessions scheduled</p>
            </div>

            <button
              class="w-full mt-4 bg-[#0000FE] text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Book New Session
            </button>
          </div>

          <!-- Resources -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:book" class="text-[#0000FE] mr-2" />
              Cultural Resources
            </h2>

            <div class="space-y-3">
              <div
                v-for="(resource, index) in culturalResources"
                :key="index"
                class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition"
              >
                <div class="bg-blue-50 text-[#0000FE] p-2 rounded-full">
                  <Icon :name="resource.icon" />
                </div>
                <div>
                  <h3 class="font-medium text-sm">{{ resource.title }}</h3>
                  <p class="text-xs text-gray-600">
                    {{ resource.description }}
                  </p>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              Browse All Resources
            </button>
          </div>

          <!-- Support Requests -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:history" class="text-[#0000FE] mr-2" />
              My Support Requests
            </h2>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-blue-50 text-gray-700 text-left">
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
                    v-for="(request, index) in supportRequests"
                    :key="index"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="p-3 text-sm">{{ request.date }}</td>
                    <td class="p-3 font-medium">{{ request.topic }}</td>
                    <td class="p-3 text-sm">{{ request.mentor }}</td>
                    <td class="p-3">
                      <span
                        :class="{
                          'bg-green-100 text-green-500':
                            request.status === 'Completed',
                          'bg-amber-100 text-amber-500':
                            request.status === 'In Progress',
                          'bg-blue-100 text-blue-500':
                            request.status === 'Scheduled',
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
              class="w-full mt-4 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              View All Requests
            </button>
          </div>

          <!-- Cultural Tools -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:tools" class="text-[#0000FE] mr-2" />
              Cultural Tools
            </h2>

            <div class="grid md:grid-cols-4 gap-4">
              <button
                v-for="(tool, index) in culturalTools"
                :key="index"
                class="flex flex-col items-center p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                <div class="bg-[#0000FE] text-white p-3 rounded-full mb-2">
                  <Icon :name="tool.icon" class="text-xl" />
                </div>
                <span class="text-sm font-medium text-center">{{
                  tool.name
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["family-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const culturalMentors = ref([
  {
    name: "Elder Ama Diallo",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    specialty: "Wolof Traditions & Storytelling",
    availability: "Available weekly",
  },
  {
    name: "Dr. Kwame Mensah",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    specialty: "Cultural Transition Support",
    availability: "By appointment",
  },
]);

const upcomingSessions = ref([
  {
    topic: "Cultural Conflict Resolution",
    date: "Jun 15",
    mentor: "Dr. Kwame Mensah",
    format: "Video Call",
  },
  {
    topic: "Traditional Childcare Methods",
    date: "Jun 22",
    mentor: "Elder Ama Diallo",
    format: "In-Person",
  },
]);

const culturalResources = ref([
  {
    title: "Blending Cultures Guide",
    description: "How to merge African and Western parenting styles",
    icon: "mdi:book-open",
  },
  {
    title: "Language Learning Tools",
    description: "Wolof for families",
    icon: "mdi:translate",
  },
  {
    title: "Cultural Calendar",
    description: "Important African holidays and traditions",
    icon: "mdi:calendar",
  },
]);

const supportRequests = ref([
  {
    date: "2023-05-10",
    topic: "Holiday traditions",
    mentor: "Elder Ama Diallo",
    status: "Completed",
  },
  {
    date: "2023-05-28",
    topic: "Discipline approaches",
    mentor: "Dr. Kwame Mensah",
    status: "In Progress",
  },
  {
    date: "2023-06-05",
    topic: "Language barriers",
    mentor: "Tutor Mariam B.",
    status: "Scheduled",
  },
]);

const culturalTools = ref([
  { name: "Conflict Mediator", icon: "mdi:handshake" },
  { name: "Cultural Calendar", icon: "mdi:calendar" },
  { name: "Recipe Converter", icon: "mdi:chef-hat" },
  { name: "Language Translator", icon: "mdi:translate" },
]);
</script>
