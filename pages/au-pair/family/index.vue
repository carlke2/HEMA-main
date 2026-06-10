<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <FamilyHeader />

    <div class="flex">
      <FamilySidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Welcome -->
        <div
          class="bg-[#0000FE] text-white rounded-lg p-6 mb-6 relative overflow-hidden"
        >
          <div class="relative z-10">
            <h1 class="text-2xl font-bold mb-1">
              Welcome, {{ familyName }}!
            </h1>
            <p class="text-white/90 text-sm">
              Manage your au pair placement and connections from here.
            </p>
          </div>
          <div class="absolute -right-10 -bottom-10 opacity-20">
            <Icon icon="mdi:home-heart" class="w-40 h-40 text-white" />
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- My Au Pair -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-bold text-lg flex items-center text-gray-900">
                <Icon icon="mdi:account-supervisor" class="text-[#0000FE] mr-2" />
                My Au Pair
              </h2>
              <span
                v-if="currentAuPair?.contractStatus === 'ACTIVE'"
                class="bg-[#E8F5E9] text-[#2E7D32] text-xs px-2 py-1 rounded-full"
              >
                Active
              </span>
              <span
                v-else-if="currentAuPair?.contractStatus === 'PENDING'"
                class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
              >
                Offer pending
              </span>
            </div>

            <div v-if="currentAuPair" class="space-y-4">
              <div class="flex items-center space-x-4">
                <img
                  :src="currentAuPair.photo"
                  alt="Au Pair"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div class="min-w-0">
                  <h3 class="font-bold text-gray-900">{{ currentAuPair.name }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ currentAuPair.tribe || currentAuPair.country || 'Au pair' }}
                    <template v-if="currentAuPair.tribe && currentAuPair.country"> • {{ currentAuPair.country }}</template>
                  </p>
                  <p v-if="currentAuPair.matchScore != null" class="text-xs text-[#0000FE] mt-1">
                    Match: {{ currentAuPair.matchScore }}%
                  </p>
                </div>
              </div>
              <NuxtLink
                :to="currentAuPair.userId ? `/au-pair/family/au-pair-profile/${currentAuPair.userId}` : '/au-pair/family/au-pair'"
                class="block w-full mt-2 bg-[#0000FE] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition text-center"
              >
                View full profile
              </NuxtLink>
            </div>

            <div v-else class="text-center py-4 text-gray-600">
              <p class="mb-3">You don't have an active au pair</p>
              <NuxtLink
                to="/au-pair/family/browse-au-pairs"
                class="inline-block bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Find your match
              </NuxtLink>
            </div>
          </div>

          <!-- Quick actions -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <Icon icon="mdi:lightning-bolt" class="text-[#0000FE] mr-2" />
              Quick actions
            </h2>
            <div class="grid grid-cols-2 gap-3">
              <NuxtLink
                to="/au-pair/family/browse-au-pairs"
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition text-[#0000FE]"
              >
                <Icon icon="mdi:account-group" class="text-xl mb-1" />
                <span class="text-xs text-center">Browse au pairs</span>
              </NuxtLink>
              <NuxtLink
                to="/au-pair/family/connections"
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition text-[#0000FE]"
              >
                <Icon icon="mdi:handshake-outline" class="text-xl mb-1" />
                <span class="text-xs text-center">My connections</span>
              </NuxtLink>
              <NuxtLink
                to="/au-pair/family/applications"
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition text-[#0000FE]"
              >
                <Icon icon="mdi:file-document-multiple" class="text-xl mb-1" />
                <span class="text-xs text-center">Applications</span>
              </NuxtLink>
              <NuxtLink
                to="/au-pair/family/contract"
                class="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition text-[#0000FE]"
              >
                <Icon icon="mdi:file-document" class="text-xl mb-1" />
                <span class="text-xs text-center">Contracts & docs</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Your family -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <Icon icon="mdi:home" class="text-[#0000FE] mr-2" />
              Your family
            </h2>
            <div v-if="hostFamily.name" class="space-y-2 text-sm text-gray-700">
              <p class="font-medium">{{ hostFamily.name }}</p>
              <p v-if="hostFamily.location" class="text-gray-600">{{ hostFamily.location }}</p>
              <p v-if="hostFamily.country" class="text-gray-600">{{ hostFamily.country }}</p>
            </div>
            <div v-else class="text-sm text-gray-600">
              <p>Family profile is loading.</p>
            </div>
          </div>

          <!-- Support -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2 lg:col-span-1">
            <h2 class="font-bold text-lg flex items-center mb-4 text-gray-900">
              <Icon icon="mdi:face-agent" class="text-[#0000FE] mr-2" />
              Support
            </h2>
            <p class="text-sm text-gray-600 mb-4">
              Get help with placements, contracts, and cultural support.
            </p>
            <NuxtLink
              to="/au-pair/family/support"
              class="inline-block bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Go to support
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["family-dashboard"],
});

import { ref, onMounted, watchEffect } from "vue";
import { Icon } from "@iconify/vue";

const { user } = useUserSession();
const loading = ref(true);
const hostFamily = ref<Record<string, unknown>>({});
const currentAuPair = ref<Record<string, unknown> | null>(null);

const familyName = computed(() => {
  const name = hostFamily.value?.name;
  if (name && typeof name === "string") return name;
  const u = user.value as { fullName?: string } | undefined;
  return u?.fullName ?? "there";
});

function formatDate(d: string | Date) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function buildAuPairFromContract(c: Record<string, unknown>, status: string) {
  const u = c.user as Record<string, unknown> | undefined;
  if (!u) return null;
  const profile = u.AuPairUserProfile as Record<string, unknown> | undefined;
  const skills = (profile?.skills as string[] | undefined) ?? [];
  return {
    userId: u.id,
    name: u.fullName ?? "Au Pair",
    photo: u.avatar ?? "/assets/images/abstract-user.png",
    tribe: profile?.tribe ?? "",
    country: profile?.country ?? "",
    startDate: formatDate(c.startDate as string),
    endDate: formatDate(c.endDate as string),
    matchScore: (c.matchScore as number) ?? null,
    education: (profile?.education as string) ?? "",
    skillsLabel: skills.length ? skills.join(", ") : "",
    contractStatus: status,
  };
}

onMounted(async () => {
  const familyId = (user.value as { familyId?: string })?.familyId;
  if (!familyId) {
    loading.value = false;
    return;
  }

  try {
    const [familyRes, activeRes] = await Promise.all([
      $fetch<Record<string, unknown>>(`/api/v1/aupair/families/${familyId}`).catch(() => ({})),
      $fetch<Array<Record<string, unknown>>>(`/api/v1/aupair/contracts?familyId=${familyId}&status=ACTIVE`).catch(() => []),
    ]);

    if (familyRes && Object.keys(familyRes).length) {
      hostFamily.value = familyRes;
    }

    let contracts = Array.isArray(activeRes) ? activeRes : [];
    if (contracts.length > 0) {
      currentAuPair.value = buildAuPairFromContract(contracts[0], "ACTIVE");
      loading.value = false;
      return;
    }

    const pendingRes = await $fetch<Array<Record<string, unknown>>>(
      `/api/v1/aupair/contracts?familyId=${familyId}&status=PENDING`
    ).catch(() => []);
    contracts = Array.isArray(pendingRes) ? pendingRes : [];
    if (contracts.length > 0) {
      currentAuPair.value = buildAuPairFromContract(contracts[0], "PENDING");
    } else {
      currentAuPair.value = null;
    }
  } catch {
    currentAuPair.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
