<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <NuxtLink
          to="/au-pair/dashboard/family"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0000FE] mb-6"
        >
          <icon name="mdi:arrow-left" />
          Back to My Host Family
        </NuxtLink>

        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:home-heart" class="text-[#0000FE] mr-2" />
            Browse Available Families
          </h1>
          <span class="text-sm text-gray-600">
            {{ families.length }} family(ies) found
          </span>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else-if="families.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <article
            v-for="family in families"
            :key="family.uuid"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col min-w-0"
          >
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-start justify-between gap-2 mb-3">
                <h3 class="font-bold text-lg text-gray-900 truncate flex-1 min-w-0">
                  {{ family.name }}
                </h3>
                <span
                  :class="[
                    'shrink-0 px-2.5 py-1 rounded-full text-xs font-medium',
                    family.verified ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-800',
                  ]"
                >
                  {{ family.verified ? "Verified" : "Pending" }}
                </span>
              </div>

              <div class="space-y-2 text-sm text-gray-600 mb-4 flex-1 min-w-0">
                <div class="flex items-center gap-2 min-w-0">
                  <icon name="mdi:map-marker" class="shrink-0 text-[#0000FE]" />
                  <span class="truncate">{{ family.location }}</span>
                </div>
                <div v-if="family.country" class="flex items-center gap-2">
                  <icon name="mdi:earth" class="shrink-0 text-[#0000FE]" />
                  <span>{{ formatEnumLabel(family.country) }}</span>
                </div>
                <div v-if="family.tribe" class="flex items-center gap-2">
                  <icon name="mdi:account-group" class="shrink-0 text-[#0000FE]" />
                  <span>{{ formatEnumLabel(family.tribe) }}</span>
                </div>
                <div v-if="family.religion" class="flex items-center gap-2">
                  <icon name="mdi:church" class="shrink-0 text-[#0000FE]" />
                  <span>{{ family.religion }}</span>
                </div>
                <p v-if="family.description" class="text-gray-600 text-sm line-clamp-3 mt-2">
                  {{ family.description }}
                </p>
              </div>

              <NuxtLink
                :to="`/au-pair/dashboard/families/${family.uuid}`"
                class="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition"
              >
                View family
                <icon name="mdi:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <div v-else class="text-center py-12 bg-white rounded-xl border border-gray-200">
          <icon name="mdi:home-heart-outline" class="text-[#0000FE] text-6xl mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Families Found</h3>
          <p class="text-gray-600 mb-4">
            There are no host families in the pool right now. Check back later.
          </p>
          <NuxtLink
            to="/au-pair/dashboard/family"
            class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline"
          >
            <icon name="mdi:arrow-left" />
            Back to My Host Family
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

const loading = ref(true);
const families = ref<any[]>([]);

function formatEnumLabel(value: string | null | undefined): string {
  if (!value || typeof value !== "string") return "";
  return value.replace(/_/g, " ");
}

onMounted(async () => {
  try {
    const { data, error } = await useFetch("/api/v1/aupair/families");
    if (error.value) {
      push.error("Could not load families");
      return;
    }
    families.value = Array.isArray(data.value) ? data.value : [];
  } catch (e) {
    push.error("Something went wrong");
  } finally {
    loading.value = false;
  }
});
</script>
