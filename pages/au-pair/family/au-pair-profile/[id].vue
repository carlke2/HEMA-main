<template>
  <div class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans">
    <FamilyHeader />
    <div class="flex">
      <FamilySidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Back + loading / error -->
        <NuxtLink
          to="/au-pair/family/browse-au-pairs"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0000FE] mb-6"
        >
          <icon name="mdi:arrow-left" />
          Back to Browse Au Pairs
        </NuxtLink>

        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else-if="error" class="bg-white rounded-xl border border-red-200 p-6 text-center">
          <p class="text-red-600">{{ error }}</p>
          <NuxtLink
            to="/au-pair/family/browse-au-pairs"
            class="inline-block mt-4 text-[#0000FE] font-medium"
          >
            Return to browse
          </NuxtLink>
        </div>

        <template v-else-if="auPair">
          <div class="max-w-4xl mx-auto">
            <!-- Profile header card -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div class="flex flex-col sm:flex-row">
                <div class="sm:w-64 shrink-0 bg-gray-100 flex items-center justify-center aspect-square sm:aspect-auto sm:h-64">
                  <img
                    v-if="auPair.avatar"
                    :src="auPair.avatar"
                    :alt="auPair.fullName"
                    class="w-full h-full object-cover"
                  />
                  <icon
                    v-else
                    name="mdi:account-circle"
                    class="w-24 h-24 text-gray-400"
                  />
                </div>
                <div class="p-6 flex-1 flex flex-col justify-center">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <h1 class="text-2xl font-bold text-gray-900">
                      {{ auPair.fullName }}
                    </h1>
                    <span
                      :class="[
                        'px-2.5 py-1 rounded-full text-xs font-medium',
                        auPair.verified ? 'bg-green-500 text-white' : 'bg-amber-100 text-amber-800',
                      ]"
                    >
                      {{ auPair.verified ? "Verified" : "Pending verification" }}
                    </span>
                  </div>
                  <p v-if="profile?.location || profile?.country" class="text-gray-600 flex items-center gap-1 mb-4">
                    <icon name="mdi:map-marker" class="shrink-0 text-[#0000FE]" />
                    {{ formatLocation(profile) }}
                  </p>
                  <div class="flex flex-wrap gap-3 mt-auto">
                    <button
                      type="button"
                      @click="openOfferModal"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition"
                    >
                      <icon name="mdi:handshake-outline" />
                      Make offer
                    </button>
                    <NuxtLink
                      to="/au-pair/family/browse-au-pairs"
                      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back to list
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <!-- Details grid -->
            <div class="grid sm:grid-cols-2 gap-6">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <icon name="mdi:account-details" class="text-[#0000FE]" />
                  About
                </h2>
                <dl class="space-y-3 text-sm">
                  <div v-if="profile?.tribe">
                    <dt class="text-gray-500 font-medium">Tribe / Ethnicity</dt>
                    <dd class="text-gray-900">{{ formatEnumLabel(profile.tribe) }}</dd>
                  </div>
                  <div v-if="profile?.religion">
                    <dt class="text-gray-500 font-medium">Religion</dt>
                    <dd class="text-gray-900">{{ formatEnumLabel(profile.religion) }}</dd>
                  </div>
                  <div v-if="profile?.education">
                    <dt class="text-gray-500 font-medium">Education</dt>
                    <dd class="text-gray-900">{{ profile.education }}</dd>
                  </div>
                  <div v-if="auPair.gender">
                    <dt class="text-gray-500 font-medium">Gender</dt>
                    <dd class="text-gray-900">{{ formatEnumLabel(auPair.gender) }}</dd>
                  </div>
                  <div v-if="auPair.email">
                    <dt class="text-gray-500 font-medium">Contact</dt>
                    <dd class="text-gray-900">{{ auPair.email }}</dd>
                  </div>
                </dl>
              </div>
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <icon name="mdi:lightning-bolt" class="text-[#0000FE]" />
                  Skills
                </h2>
                <div v-if="profile?.skills?.length" class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in profile.skills"
                    :key="skill"
                    class="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0000FE] text-sm font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>
                <p v-else class="text-gray-500 text-sm">No skills listed yet.</p>
              </div>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["family-dashboard"],
});

const route = useRoute();
const id = computed(() => route.params.id);

const loading = ref(true);
const error = ref<string | null>(null);
const auPair = ref<Record<string, unknown> | null>(null);

const profile = computed(() => auPair.value?.AuPairUserProfile as Record<string, unknown> | undefined);

function formatEnumLabel(value: unknown): string {
  if (value == null || typeof value !== "string") return "";
  return value.replace(/_/g, " ");
}

function formatLocation(profileObj: Record<string, unknown> | undefined): string {
  if (!profileObj) return "—";
  const loc = (profileObj.location as string)?.trim() || "";
  const country = (profileObj.country as string)?.trim() || "";
  if (!country) return loc || "—";
  const countryDisplay = formatEnumLabel(country);
  if (!loc) return countryDisplay;
  if (loc.toLowerCase().includes(countryDisplay.toLowerCase())) return loc;
  return `${loc}, ${countryDisplay}`;
}

function openOfferModal() {
  navigateTo(`/au-pair/family/browse-au-pairs?offer=${auPair.value?.id}`);
}

onMounted(async () => {
  if (!id.value || isNaN(Number(id.value))) {
    error.value = "Invalid au pair.";
    loading.value = false;
    return;
  }
  try {
    const { data, error: err } = await useFetch(`/api/v1/aupair/aupairs/${id.value}`);
    if (err.value) {
      error.value = "Could not load this au pair.";
      return;
    }
    auPair.value = data.value as Record<string, unknown>;
  } catch {
    error.value = "Something went wrong.";
  } finally {
    loading.value = false;
  }
});
</script>
