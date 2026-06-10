<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <h1 class="text-2xl font-bold flex items-center text-gray-900 mb-2">
          <icon name="mdi:bell-outline" class="text-[#0000FE] mr-2" />
          Notifications
        </h1>
        <p class="text-gray-600 text-sm mb-6">Updates about families and your connections.</p>

        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0000FE]" />
        </div>
        <div v-else-if="notifications.length === 0" class="text-center py-12 text-gray-500">
          No notifications yet.
        </div>
        <ul v-else class="space-y-3">
          <li
            v-for="n in notifications"
            :key="n.id"
            :class="[
              'p-4 rounded-lg border',
              n.readAt ? 'bg-gray-50 border-gray-200' : 'bg-blue-50/50 border-[#0000FE]/20',
            ]"
          >
            <div class="flex justify-between gap-2">
              <div>
                <p class="font-medium text-gray-900">{{ n.title }}</p>
                <p class="text-sm text-gray-700 mt-1">{{ n.message }}</p>
                <p class="text-xs text-gray-500 mt-2">{{ formatDate(n.createdAt) }}</p>
              </div>
              <button
                v-if="!n.readAt"
                type="button"
                class="shrink-0 text-[#0000FE] text-sm hover:underline"
                @click="markRead(n)"
              >
                Mark read
              </button>
            </div>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const loading = ref(true);
const notifications = ref([]);

function formatDate(d) {
  return d ? new Date(d).toLocaleString() : "";
}

async function fetchNotifications() {
  loading.value = true;
  try {
    notifications.value = await $fetch("/api/v1/aupair/notifications");
    if (!Array.isArray(notifications.value)) notifications.value = [];
  } catch {
    notifications.value = [];
  } finally {
    loading.value = false;
  }
}

async function markRead(n) {
  try {
    await $fetch(`/api/v1/aupair/notifications/${n.id}`, {
      method: "PATCH",
      body: { read: true },
    });
    n.readAt = new Date().toISOString();
  } catch (_) {}
}

onMounted(fetchNotifications);
</script>
