<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:home-heart" class="text-blue-600 mr-2" />
          Host Families – Verify
        </h1>
      </div>

      <p class="text-gray-600 mb-6">
        Only verified families can be shown as trusted to au pairs. Use <strong>Verify</strong> to approve a host family.
      </p>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div v-if="loading" class="p-8 flex justify-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50 text-gray-700 text-left">
              <tr>
                <th class="p-3 font-medium">Family</th>
                <th class="p-3 font-medium">Location</th>
                <th class="p-3 font-medium">Country</th>
                <th class="p-3 font-medium">Status</th>
                <th class="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="f in families" :key="f.uuid" class="hover:bg-blue-50 transition">
                <td class="p-3 font-medium text-gray-900">{{ f.name }}</td>
                <td class="p-3 text-sm text-gray-800">{{ f.location }}</td>
                <td class="p-3 text-sm text-gray-800">{{ f.country || "—" }}</td>
                <td class="p-3">
                  <span
                    :class="{
                      'bg-green-100 text-green-700': f.verified === true,
                      'bg-amber-100 text-amber-700': f.verified !== true,
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ f.verified === true ? "Verified" : "Pending" }}
                  </span>
                </td>
                <td class="p-3">
                  <button
                    v-if="f.verified !== true"
                    type="button"
                    :disabled="verifyingUuid === f.uuid"
                    class="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200 disabled:opacity-60"
                    @click="verify(f.uuid)"
                  >
                    {{ verifyingUuid === f.uuid ? "Verifying…" : "Verify" }}
                  </button>
                  <span v-else class="text-sm text-gray-500">Verified</span>
                </td>
              </tr>
              <tr v-if="!families.length && !loading">
                <td colspan="5" class="p-6 text-center text-gray-500">
                  No families found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["admin-dashboard"],
});

const loading = ref(true);
const families = ref([]);
const verifyingUuid = ref(null);

async function fetchFamilies() {
  loading.value = true;
  try {
    const data = await $fetch("/api/v1/aupair/families");
    families.value = Array.isArray(data) ? data : [];
  } catch (e) {
    push.error(e?.data?.message || "Failed to load families");
    families.value = [];
  } finally {
    loading.value = false;
  }
}

async function verify(uuid) {
  if (verifyingUuid.value) return;
  verifyingUuid.value = uuid;
  try {
    await $fetch(`/api/v1/aupair/families/${uuid}`, {
      method: "PATCH",
      body: { verified: true },
    });
    push.success("Family verified");
    await fetchFamilies();
  } catch (e) {
    push.error(e?.data?.message || "Failed to verify");
  } finally {
    verifyingUuid.value = null;
  }
}

onMounted(() => fetchFamilies());
</script>
