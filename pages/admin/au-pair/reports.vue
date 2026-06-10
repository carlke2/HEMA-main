<template>
  <div class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans">
    <!-- Dashboard Header -->
    <AdmHeader />

    <div class="flex">
      <AdmSidebar />
  <main class="flex-1 p-6 pb-20 md:pb-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold flex items-center">
        <icon name="mdi:chart-box" class="text-[#A47551] mr-2" />
        Reports & Analytics
      </h1>
      <button class="bg-[#A47551] text-white px-4 py-2 rounded-md hover:bg-[#8C6243] transition flex items-center">
        <icon name="mdi:file-export" class="mr-1" /> Export Data
      </button>
    </div>

    <!-- Report Filters -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-[#D6CBBE] mb-6">
      <div class="grid md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm text-[#6E5841] mb-1">Report Type</label>
          <select class="w-full border border-[#D6CBBE] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A47551]">
            <option>All Reports</option>
            <option>User Activity</option>
            <option>Match Success</option>
            <option>Program Enrollment</option>
            <option>Financial</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-[#6E5841] mb-1">Time Period</label>
          <select class="w-full border border-[#D6CBBE] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A47551]">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
        </div>
        <div>
          <label class="block text-sm text-[#6E5841] mb-1">Cultural Background</label>
          <select class="w-full border border-[#D6CBBE] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A47551]">
            <option>All Backgrounds</option>
            <option>Yoruba</option>
            <option>Igbo</option>
            <option>Akan</option>
            <option>Wolof</option>
          </select>
        </div>
        <div class="flex items-end">
          <button class="w-full bg-[#A47551] text-white px-4 py-2 rounded-md hover:bg-[#8C6243] transition">
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-4 rounded-lg shadow-sm border border-[#D6CBBE]">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-[#6E5841]">New Users</p>
            <h2 class="text-2xl font-bold mt-1">48</h2>
            <p class="text-xs text-[#6E5841] mt-1">
              <span class="text-green-500">
                <icon name="mdi:arrow-up" class="inline" /> 12% from last month
              </span>
            </p>
          </div>
          <div class="bg-[#F3E9DC] text-[#A47551] p-3 rounded-full">
            <icon name="mdi:account-plus" class="text-xl" />
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-[#D6CBBE]">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-[#6E5841]">Successful Matches</p>
            <h2 class="text-2xl font-bold mt-1">23</h2>
            <p class="text-xs text-[#6E5841] mt-1">
              <span class="text-green-500">
                <icon name="mdi:arrow-up" class="inline" /> 8% from last month
              </span>
            </p>
          </div>
          <div class="bg-[#F3E9DC] text-[#A47551] p-3 rounded-full">
            <icon name="mdi:handshake" class="text-xl" />
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-[#D6CBBE]">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-[#6E5841]">Program Enrollments</p>
            <h2 class="text-2xl font-bold mt-1">76</h2>
            <p class="text-xs text-[#6E5841] mt-1">
              <span class="text-green-500">
                <icon name="mdi:arrow-up" class="inline" /> 15% from last month
              </span>
            </p>
          </div>
          <div class="bg-[#F3E9DC] text-[#A47551] p-3 rounded-full">
            <icon name="mdi:school" class="text-xl" />
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-sm border border-[#D6CBBE]">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-[#6E5841]">Support Cases</p>
            <h2 class="text-2xl font-bold mt-1">18</h2>
            <p class="text-xs text-[#6E5841] mt-1">
              <span class="text-red-500">
                <icon name="mdi:arrow-down" class="inline" /> 5% from last month
              </span>
            </p>
          </div>
          <div class="bg-[#F3E9DC] text-[#A47551] p-3 rounded-full">
            <icon name="mdi:face-agent" class="text-xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      <!-- User Growth Chart -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-[#D6CBBE]">
        <h2 class="font-bold text-lg mb-4 flex items-center">
          <icon name="mdi:chart-line" class="text-[#A47551] mr-2" />
          User Growth
        </h2>
        <div class="h-64 bg-[#F9F5F0] rounded flex items-center justify-center text-[#6E5841]">
          User Growth Chart Visualization
        </div>
        <div class="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div class="font-bold text-[#A47551]">1,248</div>
            <div class="text-[#6E5841]">Total Users</div>
          </div>
          <div>
            <div class="font-bold text-[#A47551]">843</div>
            <div class="text-[#6E5841]">Au Pairs</div>
          </div>
          <div>
            <div class="font-bold text-[#A47551]">405</div>
            <div class="text-[#6E5841]">Families</div>
          </div>
        </div>
      </div>
      
      <!-- Match Success Chart -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-[#D6CBBE]">
        <h2 class="font-bold text-lg mb-4 flex items-center">
          <icon name="mdi:chart-pie" class="text-[#A47551] mr-2" />
          Match Success Rate
        </h2>
        <div class="h-64 bg-[#F9F5F0] rounded flex items-center justify-center text-[#6E5841]">
          Match Success Pie Chart
        </div>
        <div class="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div class="font-bold text-green-500">87%</div>
            <div class="text-[#6E5841]">Successful</div>
          </div>
          <div>
            <div class="font-bold text-amber-500">8%</div>
            <div class="text-[#6E5841]">Trial Ended</div>
          </div>
          <div>
            <div class="font-bold text-red-500">5%</div>
            <div class="text-[#6E5841]">Unsuccessful</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white p-6 rounded-lg shadow-sm border border-[#D6CBBE]">
      <h2 class="font-bold text-lg mb-4 flex items-center">
        <icon name="mdi:file-document" class="text-[#A47551] mr-2" />
        Recent Reports
      </h2>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#F3E9DC] text-[#6E5841] text-left">
            <tr>
              <th class="p-3">Report Name</th>
              <th class="p-3">Type</th>
              <th class="p-3">Generated By</th>
              <th class="p-3">Date</th>
              <th class="p-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#D6CBBE]">
            <tr v-for="(report, index) in recentReports" :key="index" class="hover:bg-[#F9F5F0] transition">
              <td class="p-3 font-medium">{{ report.name }}</td>
              <td class="p-3">
                <span class="text-xs bg-[#F3E9DC] text-[#6E5841] px-2 py-1 rounded-full">
                  {{ report.type }}
                </span>
              </td>
              <td class="p-3 text-sm">{{ report.generatedBy }}</td>
              <td class="p-3 text-sm text-[#6E5841]">{{ report.date }}</td>
              <td class="p-3">
                <div class="flex space-x-2">
                  <button class="text-[#A47551] hover:text-[#8C6243] p-1">
                    <icon name="mdi:download" />
                  </button>
                  <button class="text-[#A47551] hover:text-[#8C6243] p-1">
                    <icon name="mdi:eye" />
                  </button>
                  <button class="text-[#A47551] hover:text-[#8C6243] p-1">
                    <icon name="mdi:share-variant" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button class="w-full mt-4 bg-[#F3E9DC] text-[#A47551] py-2 rounded-md text-sm font-medium hover:bg-[#DEC6A4] transition">
        View All Reports
      </button>
    </div>
  </main>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const recentReports = ref([
  {
    name: "Monthly User Activity",
    type: "User Analytics",
    generatedBy: "Admin User",
    date: "Today, 10:45 AM"
  },
  {
    name: "Q2 Match Success Report",
    type: "Match Analytics",
    generatedBy: "System",
    date: "Yesterday, 2:30 PM"
  },
  {
    name: "Cultural Program Enrollment",
    type: "Education Analytics",
    generatedBy: "Admin User",
    date: "Jul 12, 2023"
  },
  {
    name: "Annual Financial Summary",
    type: "Financial",
    generatedBy: "System",
    date: "Jul 1, 2023"
  },
  {
    name: "Support Case Resolution",
    type: "Support Analytics",
    generatedBy: "Admin User",
    date: "Jun 28, 2023"
  }
]);
</script>