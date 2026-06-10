<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:school" class="text-blue-600 mr-2" />
          Education Programs
        </h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
          <icon name="mdi:plus" class="mr-1" /> Add Program
        </button>
      </div>

      <!-- Program Categories -->
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div class="flex overflow-x-auto space-x-3 pb-2">
          <button 
            v-for="(category, index) in categories" 
            :key="index"
            @click="activeCategory = category.id"
            :class="{
              'bg-blue-600 text-white': activeCategory === category.id,
              'bg-blue-50 text-blue-600 hover:bg-blue-100': activeCategory !== category.id
            }"
            class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Programs Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div 
          v-for="(program, index) in filteredPrograms" 
          :key="index"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
        >
          <div class="h-40 bg-blue-50 flex items-center justify-center">
            <Icon :name="program.icon" class="text-5xl text-blue-600" />
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-bold text-gray-900">{{ program.name }}</h3>
              <span :class="{
                'bg-green-100 text-green-600': program.status === 'Active',
                'bg-amber-100 text-amber-600': program.status === 'Draft',
                'bg-blue-100 text-blue-600': program.status === 'Upcoming'
              }" class="px-2 py-1 rounded-full text-xs">
                {{ program.status }}
              </span>
            </div>
            <p class="text-sm text-gray-700 mb-3 line-clamp-2">{{ program.description }}</p>
            
            <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
              <div class="flex items-center">
                <icon name="mdi:account-group" class="mr-1" />
                <span>{{ program.enrolled }} enrolled</span>
              </div>
              <div class="flex items-center">
                <icon name="mdi:clock" class="mr-1" />
                <span>{{ program.duration }}</span>
              </div>
            </div>
            
            <div class="flex justify-between">
              <button class="text-blue-600 text-xs font-medium hover:underline">
                View Details →
              </button>
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800">
                  <icon name="mdi:pencil" class="text-sm" />
                </button>
                <button class="text-blue-600 hover:text-blue-800">
                  <icon name="mdi:share-variant" class="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Program Statistics -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 class="font-bold text-lg text-gray-900 mb-4 flex items-center">
          <icon name="mdi:chart-line" class="text-blue-600 mr-2" />
          Enrollment Statistics
        </h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h3 class="font-medium text-sm text-gray-800 mb-3">Most Popular Programs</h3>
            <div class="space-y-3">
              <div v-for="(program, index) in popularPrograms" :key="index" class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                  {{ index + 1 }}
                </div>
                <div class="flex-1">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-800">{{ program.name }}</span>
                    <span class="font-medium text-gray-900">{{ program.enrolled }}</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      class="bg-blue-600 h-1.5 rounded-full" 
                      :style="{ width: (program.enrolled / maxEnrollment * 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="md:col-span-2">
            <h3 class="font-medium text-sm text-gray-800 mb-3">Monthly Enrollment</h3>
            <div class="bg-blue-50 p-4 rounded-lg h-full">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <div class="text-xl font-bold text-blue-600">289</div>
                  <div class="text-sm text-gray-600">Total enrollments this year</div>
                </div>
                <div class="flex space-x-2">
                  <button class="text-xs bg-white text-gray-700 px-2 py-1 rounded hover:bg-gray-100">Year</button>
                  <button class="text-xs bg-blue-600 text-white px-2 py-1 rounded">Month</button>
                  <button class="text-xs bg-white text-gray-700 px-2 py-1 rounded hover:bg-gray-100">Week</button>
                </div>
              </div>
              <!-- Placeholder for chart -->
              <div class="h-40 bg-white rounded flex items-center justify-center text-gray-600">
                Enrollment Chart Visualization
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';

const activeCategory = ref('all');

const categories = ref([
  { id: 'all', name: 'All Programs' },
  { id: 'language', name: 'Language Courses' },
  { id: 'childcare', name: 'Childcare Training' },
  { id: 'cultural', name: 'Cultural Education' },
  { id: 'safety', name: 'Safety Training' },
  { id: 'cooking', name: 'Cooking Classes' }
]);

const programs = ref([
  {
    id: 1,
    name: "Early Childhood Education",
    description: "Comprehensive training on child development, learning activities, and age-appropriate teaching methods.",
    icon: "mdi:human-baby-changing-table",
    category: "childcare",
    status: "Active",
    enrolled: 87,
    duration: "6 weeks"
  },
  {
    id: 2,
    name: "French Language Basics",
    description: "Beginner French language course focusing on conversational skills for daily interactions.",
    icon: "mdi:translate",
    category: "language",
    status: "Active",
    enrolled: 124,
    duration: "8 weeks"
  },
  {
    id: 3,
    name: "African Cuisine Cooking",
    description: "Learn to prepare traditional dishes from various African cultures.",
    icon: "mdi:chef-hat",
    category: "cooking",
    status: "Upcoming",
    enrolled: 32,
    duration: "4 weeks"
  },
  {
    id: 4,
    name: "Child Safety Certification",
    description: "Essential safety training including first aid and emergency response for childcare providers.",
    icon: "mdi:first-aid-kit",
    category: "safety",
    status: "Active",
    enrolled: 56,
    duration: "2 weeks"
  },
  {
    id: 5,
    name: "Cultural Traditions of West Africa",
    description: "Explore the rich cultural heritage, customs, and traditions of West African countries.",
    icon: "mdi:earth",
    category: "cultural",
    status: "Active",
    enrolled: 45,
    duration: "5 weeks"
  },
  {
    id: 6,
    name: "German Language Intermediate",
    description: "Intermediate German course focusing on grammar and expanded vocabulary.",
    icon: "mdi:translate",
    category: "language",
    status: "Draft",
    enrolled: 0,
    duration: "10 weeks"
  }
]);

const filteredPrograms = computed(() => {
  if (activeCategory.value === 'all') return programs.value;
  return programs.value.filter(program => program.category === activeCategory.value);
});

const popularPrograms = computed(() => {
  return [...programs.value]
    .filter(p => p.status === 'Active')
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, 5);
});

const maxEnrollment = computed(() => {
  return Math.max(...popularPrograms.value.map(p => p.enrolled));
});
</script>