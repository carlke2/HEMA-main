<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-6 bg-white rounded-xl shadow text-black">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">📈 Reports & Logs</h2>
          <div class="space-x-4">
            <button
              @click="exportCSV(activityLogs, 'activity-log')"
              class="bg-[#0000FE] hover:bg-[#0000FE88] text-white px-4 py-2 rounded-md font-semibold shadow"
            >
              Export Activity Logs
            </button>
            <button
              @click="exportCSV(loginLogs, 'login-log')"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold shadow"
            >
              Export Login Logs
            </button>
          </div>
        </div>

        <!-- Login Logs -->
        <div class="mb-10">
          <h3 class="text-lg font-semibold mb-4">🔐 Login Logs</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(log, i) in loginLogs" :key="i">
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.user }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.role }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.date }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">{{ log.ip }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity Logs -->
        <div>
          <h3 class="text-lg font-semibold mb-4">📝 Activity Logs</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(log, i) in activityLogs" :key="i">
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.user }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.action }}
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-700">
                    {{ log.date }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref } from "vue";
definePageMeta({
  middleware: ["admin-dashboard"],
});

const loginLogs = ref([
  {
    user: "Jane Admin",
    role: "Admin",
    date: "2025-06-17 09:00",
    ip: "102.123.1.4",
  },
  {
    user: "David HR",
    role: "Recruiter",
    date: "2025-06-17 08:43",
    ip: "102.101.22.88",
  },
]);

const activityLogs = ref([
  {
    user: "Jane Admin",
    action: 'Approved agency "Global Talent"',
    date: "2025-06-17 09:01",
  },
  {
    user: "David HR",
    action: 'Posted job "Nanny - Dubai"',
    date: "2025-06-17 08:50",
  },
]);

function exportCSV(data, filename) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  data.forEach((row) => {
    csvRows.push(
      headers.map((field) => JSON.stringify(row[field] ?? "")).join(",")
    );
  });
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>
