<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Education Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:school" class="text-[#0000FE] mr-2" />
            My Education Path
          </h1>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Current Program Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-2"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:book-open" class="text-[#0000FE] mr-2" />
              Current Program
            </h2>

            <div v-if="currentProgram" class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="bg-blue-50 p-3 rounded-full">
                  <icon
                    name="mdi:certificate"
                    class="text-[#0000FE] text-2xl"
                  />
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900">
                    {{ currentProgram.name }}
                  </h3>
                  <p class="text-gray-600">
                    {{ currentProgram.institution }}
                  </p>
                  <p class="text-sm mt-1 text-gray-600">
                    Sponsored by: {{ currentProgram.sponsor }}
                  </p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <icon
                name="mdi:school-outline"
                class="text-[#0000FE] text-5xl mx-auto mb-4"
              />
              <h3 class="font-bold mb-2 text-gray-900">No Active Program</h3>
              <p class="text-gray-600 mb-4">
                You haven't enrolled in any education program yet
              </p>
              <button
                class="bg-[#0000FE] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Browse Programs
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
  middleware: ["aupair-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const currentProgram = ref({
  name: "Early Childhood Education Certification",
  institution: "Hema Sponsored Program",
  sponsor: "Johnson Family",
  progress: 65,
  completionDate: "December 2023",
  currentModule: {
    name: "Child Development Theories",
    description: "Understanding cognitive and emotional development stages",
    dueDate: "June 30, 2023",
  },
});

const programBenefits = ref([
  {
    icon: "mdi:account-tie",
    title: "Career Advancement",
    description: "Qualify for higher-paying childcare positions",
  },
  {
    icon: "mdi:home-city",
    title: "Business Opportunities",
    description: "Start your own daycare center back home",
  },
  {
    icon: "mdi:handshake",
    title: "Stronger Applications",
    description: "Stand out in future job or school applications",
  },
]);

const careerPaths = ref([
  "Preschool Teacher",
  "Childcare Center Director",
  "Pediatric Nurse Assistant",
  "Child Development Specialist",
]);

const completedModules = ref([
  {
    name: "Child Safety & First Aid",
    description: "Certified in pediatric emergency response",
    grade: "A",
    date: "March 2023",
  },
  {
    name: "Cultural Storytelling",
    description: "Using traditional tales in child development",
    grade: "A-",
    date: "April 2023",
  },
  {
    name: "Nutrition for Children",
    description: "Balancing traditional and modern diets",
    grade: "B+",
    date: "May 2023",
  },
]);
</script>
