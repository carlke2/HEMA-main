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
            <Icon icon="mdi:file-document-multiple" class="text-[#0000FE] mr-2" />
            My Applications
          </h1>
        </div>

        <!-- Status Tabs -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div class="flex border-b border-gray-200">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="{
                'bg-[#0000FE] text-white': activeTab === tab.value,
                'text-gray-700 hover:bg-blue-50': activeTab !== tab.value
              }"
              class="flex-1 px-4 py-3 text-sm font-medium transition"
            >
              {{ tab.label }}
              <span class="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {{ getApplicationsByStatus(tab.value).length }}
              </span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]"></div>
        </div>

        <!-- Applications List -->
        <div v-else-if="filteredApplications.length > 0" class="space-y-6">
          <div
            v-for="application in filteredApplications"
            :key="application.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <img
                    :src="application.user.avatar || '/assets/images/abstract-user.png'"
                    :alt="application.user.fullName"
                    class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h3 class="font-bold text-lg">{{ application.user.fullName }}</h3>
                    <p class="text-gray-600 text-sm">
                      {{ application.user.AuPairUserProfile?.location || 'Location not specified' }}
                    </p>
                    <div class="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span v-if="application.user.AuPairUserProfile?.tribe">
                        {{ application.user.AuPairUserProfile.tribe }} Tribe
                      </span>
                      <span v-if="application.user.AuPairUserProfile?.religion">
                        {{ application.user.AuPairUserProfile.religion }}
                      </span>
                      <span v-if="application.user.AuPairUserProfile?.country">
                        {{ application.user.AuPairUserProfile.country }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="text-right">
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800': application.status === 'PENDING',
                      'bg-green-100 text-green-800': application.status === 'ACTIVE',
                      'bg-red-100 text-red-800': application.status === 'TERMINATED',
                      'bg-gray-100 text-gray-800': application.status === 'INACTIVE'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ application.status }}
                  </span>
                  <p class="text-xs text-gray-600 mt-1">
                    Applied {{ formatDate(application.createdAt) }}
                  </p>
                </div>
              </div>

              <!-- Application Details -->
              <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Proposed Terms</h4>
                  <div class="space-y-1 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Start Date:</span>
                      <span>{{ formatDate(application.startDate) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">End Date:</span>
                      <span>{{ formatDate(application.endDate) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Salary:</span>
                      <span>{{ application.currency }} {{ application.salary }}/{{ application.salaryFrequency.toLowerCase() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Working Hours:</span>
                      <span>{{ application.workingHours }}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Match Score</h4>
                  <div class="flex items-center space-x-2">
                    <div class="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        class="bg-[#0000FE] h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${application.matchScore}%` }"
                      ></div>
                    </div>
                    <span class="text-sm font-medium">{{ application.matchScore }}%</span>
                  </div>
                  
                  <div class="mt-4">
                    <h4 class="font-medium text-gray-700 mb-2">Duties</h4>
                    <p class="text-sm text-gray-600">{{ application.duties }}</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  @click="viewProfile(application.user.id)"
                  class="px-4 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-blue-50 transition text-sm"
                >
                  View Profile
                </button>
                
                <button
                  v-if="application.status === 'PENDING'"
                  @click="updateApplicationStatus(application.id, 'ACTIVE')"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm"
                >
                  Accept
                </button>
                
                <button
                  v-if="application.status === 'PENDING'"
                  @click="updateApplicationStatus(application.id, 'INACTIVE')"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                >
                  Decline
                </button>
                
                <button
                  v-if="application.status === 'ACTIVE'"
                  @click="updateApplicationStatus(application.id, 'TERMINATED')"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm"
                >
                  Terminate
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <Icon icon="mdi:file-document-outline" class="text-[#0000FE] text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Applications Found</h3>
          <p class="text-gray-600 mb-4">
            {{ activeTab === 'all' ? 'You haven\'t made any applications yet.' : `No ${activeTab} applications found.` }}
          </p>
          <button
            @click="navigateTo('/au-pair/family/browse-au-pairs')"
            class="bg-[#0000FE] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Browse Au Pairs
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["family-dashboard"],
});

import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const { user } = useUserSession();

// State
const loading = ref(false);
const applications = ref([]);
const activeTab = ref('all');

// Tabs
const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Terminated', value: 'TERMINATED' },
  { label: 'Inactive', value: 'INACTIVE' }
];

// Computed
const filteredApplications = computed(() => {
  if (activeTab.value === 'all') {
    return applications.value;
  }
  return applications.value.filter(app => app.status === activeTab.value);
});

// Methods
const fetchApplications = async () => {
  loading.value = true;
  try {
    const { data, error } = await useFetch(`/api/v1/aupair/applications?familyId=${user.value.familyId}`);
    
    if (error.value) {
      throw error.value;
    }
    
    applications.value = data.value || [];
  } catch (error) {
    console.error('Error fetching applications:', error);
  } finally {
    loading.value = false;
  }
};

const getApplicationsByStatus = (status) => {
  if (status === 'all') {
    return applications.value;
  }
  return applications.value.filter(app => app.status === status);
};

const updateApplicationStatus = async (applicationId, newStatus) => {
  try {
    const { data, error } = await useFetch(`/api/v1/aupair/applications/${applicationId}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    });

    if (error.value) {
      throw error.value;
    }

    // Update the application in the local state
    const index = applications.value.findIndex(app => app.id === applicationId);
    if (index !== -1) {
      applications.value[index] = data.value;
    }

    // Show success message
    alert(`Application ${newStatus.toLowerCase()} successfully!`);
  } catch (error) {
    console.error('Error updating application status:', error);
    alert('Failed to update application status. Please try again.');
  }
};

const viewProfile = (auPairId) => {
  navigateTo(`/au-pair/family/au-pair-profile/${auPairId}`);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Initialize
onMounted(() => {
  fetchApplications();
});
</script>
