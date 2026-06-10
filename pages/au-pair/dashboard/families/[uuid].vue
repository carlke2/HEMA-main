<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <NuxtLink
          to="/au-pair/dashboard/browse-families"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0000FE] mb-6"
        >
          <icon name="mdi:arrow-left" />
          Back to families
        </NuxtLink>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else-if="family" class="max-w-3xl">
          <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div class="p-6">
              <div class="flex flex-wrap items-center gap-2 mb-4">
                <h1 class="text-2xl font-bold text-gray-900">{{ family.name }}</h1>
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    family.verified ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-800',
                  ]"
                >
                  {{ family.verified ? "Verified" : "Pending" }}
                </span>
              </div>
              <p v-if="family.location" class="flex items-center gap-2 text-gray-600 mb-2">
                <icon name="mdi:map-marker" class="text-[#0000FE]" />
                {{ family.location }}
              </p>
              <p v-if="family.country" class="flex items-center gap-2 text-gray-600 mb-2">
                <icon name="mdi:earth" class="text-[#0000FE]" />
                {{ formatEnumLabel(family.country) }}
              </p>
              <div v-if="family.tribe || family.religion" class="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span v-if="family.tribe">{{ formatEnumLabel(family.tribe) }}</span>
                <span v-if="family.religion">{{ family.religion }}</span>
              </div>
              <p v-if="family.description" class="mt-4 text-gray-700">{{ family.description }}</p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 text-gray-600">
          <p>Family not found.</p>
          <NuxtLink to="/au-pair/dashboard/browse-families" class="text-[#0000FE] font-medium mt-2 inline-block">
            Back to families
          </NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const route = useRoute();
const uuid = computed(() => route.params.uuid as string);
const loading = ref(true);
const family = ref<Record<string, unknown> | null>(null);

function formatEnumLabel(value: string | null | undefined): string {
  if (!value || typeof value !== "string") return "";
  return value.replace(/_/g, " ");
}

onMounted(async () => {
  if (!uuid.value) return;
  try {
    const { data, error } = await useFetch(`/api/v1/aupair/families/${uuid.value}`);
    if (error.value || !data.value) {
      family.value = null;
      return;
    }
    family.value = data.value as Record<string, unknown>;
  } catch {
    family.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
