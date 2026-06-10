<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:home-heart" class="text-[#0000FE] mr-2" />
            My Host Family
          </h1>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else class="grid md:grid-cols-3 gap-6">
          <!-- Family Profile Card -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-1">
            <div v-if="currentFamily" class="flex flex-col items-center">
              <img
                :src="currentFamily.photo"
                alt="Family"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4"
              />
              <h2 class="text-xl font-bold text-center text-gray-900">{{ currentFamily.name }}</h2>
              <p class="text-gray-600 text-sm">{{ currentFamily.location }}</p>

              <div class="w-full mt-6 space-y-3">
                <div v-if="currentFamily.childrenLabel" class="flex items-center">
                  <icon name="mdi:account-child" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600">{{ currentFamily.childrenLabel }}</span>
                </div>
                <div class="flex items-center">
                  <icon name="mdi:calendar" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600">With family since {{ currentFamily.startDate }}</span>
                </div>
                <div class="flex items-center">
                  <icon name="mdi:handshake" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600">Contract until {{ currentFamily.contractEnd }}</span>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8">
              <icon name="mdi:home-search" class="text-[#0000FE] text-5xl mx-auto mb-4" />
              <h3 class="font-bold mb-2 text-gray-900">No Current Placement</h3>
              <p class="text-gray-600 mb-4">You're not currently placed with a host family</p>
              <NuxtLink
                to="/au-pair/dashboard/browse-families"
                class="inline-block bg-[#0000FE] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Browse Available Families
              </NuxtLink>
            </div>
          </div>

          <!-- Cultural Alignment -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:handshake" class="text-[#0000FE] mr-2" />
              Placement details
            </h2>
            <div v-if="currentFamily" class="space-y-4">
              <div v-if="currentFamily.matchScore != null">
                <label class="block text-sm font-medium text-gray-600 mb-1">Match Score</label>
                <div class="flex items-center space-x-2">
                  <div class="w-full bg-gray-100 rounded-full h-3">
                    <div
                      class="bg-[#05FF88] h-3 rounded-full"
                      :style="{ width: Math.min(100, currentFamily.matchScore) + '%' }"
                    />
                  </div>
                  <span class="text-sm font-bold text-gray-900">{{ currentFamily.matchScore }}%</span>
                </div>
              </div>
              <div v-if="currentFamily.description">
                <label class="block text-sm font-medium text-gray-600 mb-2">About the family</label>
                <p class="text-gray-700 text-sm">{{ currentFamily.description }}</p>
              </div>
            </div>
            <div v-else class="text-center py-6 text-gray-600">
              <p>When you have an active placement, details will appear here.</p>
            </div>
          </div>

          <!-- Family Details (contract info) -->
          <div
            v-if="currentFamily && (currentFamily.description || currentFamily.duties)"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:note-text" class="text-[#0000FE] mr-2" />
              Role & family
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div v-if="currentFamily.duties">
                <h3 class="font-bold mb-2 text-gray-900">Duties</h3>
                <div class="bg-blue-50 p-4 rounded-md">
                  <p class="text-gray-900 whitespace-pre-wrap">{{ currentFamily.duties }}</p>
                </div>
              </div>
              <div v-if="currentFamily.description">
                <h3 class="font-bold mb-2 text-gray-900">Description</h3>
                <div class="bg-blue-50 p-4 rounded-md">
                  <p class="text-gray-900">{{ currentFamily.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const { user } = useUserSession();
const loading = ref(true);
const currentFamily = ref<Record<string, unknown> | null>(null);

function formatDate(d: string | Date) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

onMounted(async () => {
  const id = user.value?.id;
  if (!id) {
    loading.value = false;
    return;
  }
  try {
    const contracts = await $fetch<Array<Record<string, unknown>>>(
      `/api/v1/aupair/contracts?userId=${id}&status=ACTIVE`
    );
    if (Array.isArray(contracts) && contracts.length > 0) {
      const c = contracts[0];
      const family = c.family as Record<string, unknown> | undefined;
      if (family) {
        const children = family.children as Array<{ name?: string; yob?: string }> | undefined;
        const childrenCount = Array.isArray(children) ? children.length : 0;
        const childrenLabel = childrenCount
          ? `${childrenCount} child${childrenCount !== 1 ? "ren" : ""}`
          : null;
        currentFamily.value = {
          name: family.name ?? "Host Family",
          location: family.location ?? "",
          description: family.description ?? "",
          photo: (family.avatarUrl || family.avatar) ?? "/assets/images/abstract-user.png",
          childrenLabel,
          startDate: formatDate(c.startDate as string),
          contractEnd: formatDate(c.endDate as string),
          matchScore: (c.matchScore as number) ?? null,
          duties: c.duties ?? "",
        };
      }
    }
  } catch {
    currentFamily.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
