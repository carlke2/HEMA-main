<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:account-supervisor" class="text-blue-600 mr-2" />
          Au Pairs – Verify
        </h1>
      </div>

      <p class="text-gray-600 mb-6">
        Only verified au pairs are shown to families. Use <strong>Verify</strong> to approve an au pair after they complete the onboarding steps.
      </p>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div v-if="loading" class="p-8 flex justify-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-blue-50 text-gray-700 text-left">
              <tr>
                <th class="p-3 font-medium">Name</th>
                <th class="p-3 font-medium">Email</th>
                <th class="p-3 font-medium">Phone</th>
                <th class="p-3 font-medium">Status</th>
                <th class="p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="au in auPairs" :key="au.id" class="hover:bg-blue-50 transition">
                <td class="p-3 font-medium text-gray-900">{{ au.fullName }}</td>
                <td class="p-3 text-sm text-gray-800">{{ au.email }}</td>
                <td class="p-3 text-sm text-gray-800">{{ au.phone || "—" }}</td>
                <td class="p-3">
                  <span
                    :class="{
                      'bg-green-100 text-green-700': au.verified === true,
                      'bg-amber-100 text-amber-700': au.verified !== true,
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ au.verified === true ? "Verified" : "Pending" }}
                  </span>
                </td>
                <td class="p-3">
                  <button
                    v-if="au.verified !== true"
                    type="button"
                    :disabled="verifyingId === au.id"
                    class="px-3 py-1.5 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200 disabled:opacity-60"
                    @click="verify(au.id)"
                  >
                    {{ verifyingId === au.id ? "Verifying…" : "Verify" }}
                  </button>
                  <span v-else class="text-sm text-gray-500">Verified</span>
                </td>
              </tr>
              <tr v-if="!auPairs.length && !loading">
                <td colspan="5" class="p-6 text-center text-gray-500">
                  No au pairs found.
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
const auPairs = ref([]);
const verifyingId = ref(null);

async function fetchAuPairs() {
  loading.value = true;
  try {
    const data = await $fetch("/api/v1/users", {
      params: { userType: "aupair" },
    });
    auPairs.value = Array.isArray(data) ? data : [];
  } catch (e) {
    push.error(e?.data?.message || "Failed to load au pairs");
    auPairs.value = [];
  } finally {
    loading.value = false;
  }
}

async function verify(id) {
  if (verifyingId.value) return;
  verifyingId.value = id;
  try {
    await $fetch(`/api/v1/users/${id}`, {
      method: "PATCH",
      body: { verified: true },
    });
    push.success("Au pair verified");
    await fetchAuPairs();
  } catch (e) {
    push.error(e?.data?.message || "Failed to verify");
  } finally {
    verifyingId.value = null;
  }
}

onMounted(() => fetchAuPairs());
</script>
