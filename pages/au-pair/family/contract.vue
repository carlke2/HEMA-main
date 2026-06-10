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
            <Icon icon="mdi:file-document" class="text-[#0000FE] mr-2" />
            Contracts & Documents
          </h1>
          <button
            class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            <Icon icon="mdi:plus" class="mr-1" /> Add Document
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Current Contract -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:file-sign" class="text-[#0000FE] mr-2" />
              Current Contract
            </h2>

            <div v-if="currentContract" class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="bg-blue-50 text-[#0000FE] p-3 rounded-full">
                  <Icon icon="mdi:handshake" />
                </div>
                <div>
                  <h3 class="font-bold">{{ currentContract.title }}</h3>
                  <p class="text-sm text-gray-600">
                    With {{ currentContract.with }}
                  </p>
                  <p class="text-xs text-[#0000FE] mt-1">
                    Valid until {{ currentContract.endDate }}
                  </p>
                </div>
              </div>

              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Start Date:</span>
                  <span class="font-medium">{{
                    currentContract.startDate
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Duration:</span>
                  <span class="font-medium">{{
                    currentContract.duration
                  }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Education Sponsorship:</span>
                  <span class="font-medium">{{
                    currentContract.educationSponsorship
                  }}</span>
                </div>
              </div>

              <div class="flex space-x-3 pt-2">
                <button
                  class="flex-1 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  <Icon icon="mdi:download" class="mr-1" /> Download
                </button>
                <button
                  class="flex-1 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
                >
                  <Icon icon="mdi:share" class="mr-1" /> Share
                </button>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-600">
              <Icon
                name="mdi:file-remove"
                class="text-4xl mx-auto mb-3 text-[#0000FE]"
              />
              <p>No active contract</p>
            </div>
          </div>

          <!-- Visa & Legal Docs -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:passport" class="text-[#0000FE] mr-2" />
              Visa & Legal Documents
            </h2>

            <div v-if="legalDocuments.length > 0" class="space-y-3">
              <div
                v-for="(doc, index) in legalDocuments"
                :key="index"
                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition"
              >
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-50 text-[#0000FE] p-2 rounded-full">
                    <Icon :name="doc.icon" />
                  </div>
                  <div>
                    <h3 class="font-medium text-sm">{{ doc.name }}</h3>
                    <p class="text-xs text-gray-600">
                      Expires: {{ doc.expiry }}
                    </p>
                  </div>
                </div>
                <button class="text-[#0000FE] hover:text-blue-700">
                  <Icon icon="mdi:download" />
                </button>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-600">
              <p>No legal documents uploaded</p>
            </div>

            <button
              class="w-full mt-4 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              <Icon icon="mdi:upload" class="mr-1" /> Upload Documents
            </button>
          </div>

          <!-- Household Docs -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:home" class="text-[#0000FE] mr-2" />
              Household Documents
            </h2>

            <div v-if="householdDocuments.length > 0" class="space-y-3">
              <div
                v-for="(doc, index) in householdDocuments"
                :key="index"
                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition"
              >
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-50 text-[#0000FE] p-2 rounded-full">
                    <Icon :name="doc.icon" />
                  </div>
                  <div>
                    <h3 class="font-medium text-sm">{{ doc.name }}</h3>
                    <p class="text-xs text-gray-600">Added: {{ doc.added }}</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button class="text-[#0000FE] hover:text-blue-700">
                    <Icon icon="mdi:eye" />
                  </button>
                  <button class="text-[#0000FE] hover:text-blue-700">
                    <Icon icon="mdi:download" />
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-600">
              <p>No household documents uploaded</p>
            </div>

            <button
              class="w-full mt-4 bg-blue-50 text-[#0000FE] py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
            >
              <Icon icon="mdi:upload" class="mr-1" /> Upload Documents
            </button>
          </div>

          <!-- All Documents -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:file-multiple" class="text-[#0000FE] mr-2" />
              All Documents
            </h2>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-blue-50 text-gray-700 text-left">
                  <tr>
                    <th class="p-3">Document</th>
                    <th class="p-3">Type</th>
                    <th class="p-3">Date</th>
                    <th class="p-3">Status</th>
                    <th class="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr
                    v-for="(doc, index) in allDocuments"
                    :key="index"
                    class="hover:bg-gray-50 transition"
                  >
                    <td class="p-3">
                      <div class="flex items-center space-x-3">
                        <div
                          :class="`bg-${doc.color}-100 text-${doc.color}-500 p-2 rounded-full`"
                        >
                          <Icon :name="doc.icon" />
                        </div>
                        <span class="font-medium">{{ doc.name }}</span>
                      </div>
                    </td>
                    <td class="p-3 text-sm">{{ doc.type }}</td>
                    <td class="p-3 text-sm">{{ doc.date }}</td>
                    <td class="p-3">
                      <span
                        :class="`bg-${doc.statusColor}-100 text-${doc.statusColor}-500 text-xs px-2 py-1 rounded-full`"
                      >
                        {{ doc.status }}
                      </span>
                    </td>
                    <td class="p-3">
                      <div class="flex space-x-2">
                        <button class="text-[#0000FE] hover:text-blue-700">
                          <Icon icon="mdi:eye" />
                        </button>
                        <button class="text-[#0000FE] hover:text-blue-700">
                          <Icon icon="mdi:download" />
                        </button>
                        <button class="text-[#0000FE] hover:text-blue-700">
                          <Icon icon="mdi:share" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-between items-center mt-4">
              <span class="text-sm text-gray-600"
                >Showing 1-{{ allDocuments.length }} of
                {{ allDocuments.length }}</span
              >
              <button
                class="bg-blue-50 text-[#0000FE] px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition"
              >
                View All Documents
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

const currentContract = ref({
  title: "Dignity-First Au Pair Agreement",
  with: "Amina Diallo",
  startDate: "2023-03-15",
  endDate: "2025-03-15",
  duration: "24 months",
  educationSponsorship: "Early Childhood Education",
});

const legalDocuments = ref([
  {
    name: "Work Visa",
    icon: "mdi:passport",
    expiry: "2025-03-14",
    status: "Active",
  },
  {
    name: "Health Insurance",
    icon: "mdi:medical-bag",
    expiry: "2024-12-31",
    status: "Active",
  },
]);

const householdDocuments = ref([
  {
    name: "House Rules",
    icon: "mdi:home",
    added: "2023-03-10",
    status: "Active",
  },
  {
    name: "Emergency Contacts",
    icon: "mdi:phone",
    added: "2023-03-10",
    status: "Active",
  },
]);

const allDocuments = ref([
  {
    name: "Dignity-First Contract",
    type: "Contract",
    date: "2023-03-15",
    status: "Active",
    statusColor: "green",
    icon: "mdi:file-sign",
    color: "blue",
  },
  {
    name: "Work Visa",
    type: "Legal",
    date: "2023-03-01",
    status: "Active",
    statusColor: "green",
    icon: "mdi:passport",
    color: "amber",
  },
  {
    name: "House Rules",
    type: "Household",
    date: "2023-03-10",
    status: "Active",
    statusColor: "green",
    icon: "mdi:home",
    color: "purple",
  },
  {
    name: "Health Insurance",
    type: "Legal",
    date: "2023-03-05",
    status: "Active",
    statusColor: "green",
    icon: "mdi:medical-bag",
    color: "green",
  },
  {
    name: "Trial Agreement",
    type: "Contract",
    date: "2023-02-20",
    status: "Expired",
    statusColor: "red",
    icon: "mdi:file-document",
    color: "blue",
  },
]);
</script>
