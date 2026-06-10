<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="p-6 bg-white rounded-xl shadow text-black">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">📬 Messaging & Notifications</h2>
        </div>

        <!-- Message Composer and Log -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Composer -->
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-gray-800"
                >Target Audience</label
              >
              <select
                v-model="target"
                class="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option disabled value="">Select target</option>
                <option value="all">All Users</option>
                <option value="employers">Only Employers</option>
                <option value="jobseekers">Only Job Seekers</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-800"
                >Choose Template</label
              >
              <select
                v-model="selectedTemplate"
                @change="applyTemplate"
                class="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option disabled value="">No template</option>
                <option
                  v-for="template in templates"
                  :key="template.id"
                  :value="template.id"
                >
                  {{ template.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-800"
                >Subject</label
              >
              <input
                type="text"
                v-model="subject"
                class="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE]"
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-800"
                >Message</label
              >
              <textarea
                v-model="body"
                rows="5"
                class="w-full mt-2 rounded-md border-gray-300 shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE]"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <div class="text-right">
              <button
                @click="sendMessage"
                class="bg-[#0000FE] hover:bg-[#0000FE88] text-white px-5 py-2 rounded-md font-semibold shadow"
              >
                Send Notification
              </button>
            </div>
          </div>

          <!-- Message Log -->
          <div>
            <h3 class="text-lg font-semibold mb-4">🗂️ Sent Messages</h3>
            <div class="h-[460px] overflow-y-auto space-y-4 pr-2">
              <div
                v-for="msg in messages"
                :key="msg.timestamp"
                class="p-4 bg-gray-50 border rounded-md"
              >
                <div class="text-sm text-gray-600 mb-1 font-medium">
                  {{ msg.subject }}
                </div>
                <div class="text-xs text-gray-500">
                  To: {{ msg.target }} • {{ msg.timestamp }}
                </div>
                <p class="text-sm mt-1">{{ msg.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
definePageMeta({
  middleware: ["admin-dashboard"],
});

const target = ref("");
const subject = ref("");
const body = ref("");
const selectedTemplate = ref("");
const messages = ref([]);

const templates = [
  {
    id: "approval",
    name: "Approval Notice",
    subject: "Your Request Has Been Approved",
    body: "Congratulations! Your application has been reviewed and approved by our team.",
  },
  {
    id: "rejection",
    name: "Rejection Notice",
    subject: "Your Request Was Not Approved",
    body: "We’re sorry to inform you that your request did not meet our requirements.",
  },
  {
    id: "status-update",
    name: "Status Update",
    subject: "Update Regarding Your Account",
    body: "There has been a status update on your account. Please login to review it.",
  },
];

const applyTemplate = () => {
  const template = templates.find((t) => t.id === selectedTemplate.value);
  if (template) {
    subject.value = template.subject;
    body.value = template.body;
  }
};

const sendMessage = () => {
  if (!target.value || !subject.value || !body.value) {
    alert("Please complete all fields.");
    return;
  }

  const message = {
    target: target.value,
    subject: subject.value,
    body: body.value,
    timestamp: new Date().toLocaleString(),
  };

  messages.value.unshift(message);
  localStorage.setItem("hema-messages", JSON.stringify(messages.value));

  subject.value = "";
  body.value = "";
  selectedTemplate.value = "";
  target.value = "";
};

onMounted(() => {
  const storedMessages = localStorage.getItem("hema-messages");
  if (storedMessages) {
    messages.value = JSON.parse(storedMessages);
  }
});
</script>
