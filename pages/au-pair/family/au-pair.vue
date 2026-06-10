<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <FamilyHeader />

    <div class="flex">
      <FamilySidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <Icon icon="mdi:account-supervisor" class="text-[#0000FE] mr-2" />
            My Au Pair
          </h1>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else class="grid md:grid-cols-3 gap-6">
          <!-- Profile Card -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-1">
            <div v-if="auPair" class="flex flex-col items-center">
              <img
                :src="auPair.photo"
                alt="Au Pair"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4"
              />
              <span
                v-if="auPair.contractStatus === 'PENDING'"
                class="mb-2 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-800"
              >
                Offer pending acceptance
              </span>
              <h2 class="text-xl font-bold text-center text-gray-900">{{ auPair.name }}</h2>
              <p class="text-gray-600 text-sm text-center">
                {{ auPair.tribe ? `${auPair.tribe} from ${auPair.country}` : auPair.country || 'Au Pair' }}
              </p>

              <div class="w-full mt-6 space-y-3">
                <div class="flex items-center">
                  <Icon icon="mdi:calendar" class="text-[#0000FE] mr-2" />
                  <span class="text-sm">With family since {{ auPair.startDate }}</span>
                </div>
                <div class="flex items-center">
                  <Icon icon="mdi:handshake" class="text-[#0000FE] mr-2" />
                  <span class="text-sm">Contract until {{ auPair.endDate }}</span>
                </div>
                <div v-if="auPair.skillsLabel" class="flex items-center">
                  <Icon icon="mdi:translate" class="text-[#0000FE] mr-2" />
                  <span class="text-sm">{{ auPair.skillsLabel }}</span>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <Icon icon="mdi:account-search" class="text-[#0000FE] text-5xl mx-auto mb-4" />
              <p class="mb-3 text-gray-700">You don't have an active au pair</p>
              <NuxtLink
                to="/au-pair/family/matching"
                class="inline-block bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Find Your Match
              </NuxtLink>
            </div>
          </div>

          <!-- Cultural Alignment / placement details -->
          <div
            v-if="auPair"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <Icon icon="mdi:handshake" class="text-[#0000FE] mr-2" />
              Placement details
            </h2>
            <div class="space-y-4">
              <div v-if="auPair.matchScore != null">
                <label class="block text-sm font-medium text-gray-700 mb-1">Match Score</label>
                <div class="flex items-center space-x-2">
                  <div class="w-full bg-gray-100 rounded-full h-3">
                    <div
                      class="bg-[#0000FE] h-3 rounded-full"
                      :style="{ width: Math.min(100, auPair.matchScore) + '%' }"
                    />
                  </div>
                  <span class="text-sm font-bold text-gray-900">{{ auPair.matchScore }}%</span>
                </div>
              </div>
              <div v-if="auPair.education">
                <label class="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <p class="text-sm text-gray-600">{{ auPair.education }}</p>
              </div>
              <div v-if="auPair.skillsLabel">
                <label class="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <p class="text-sm text-gray-600">{{ auPair.skillsLabel }}</p>
              </div>
            </div>
          </div>

          <!-- Contact / extra column when we have au pair -->
          <div
            v-if="auPair"
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <Icon icon="mdi:card-account-details" class="text-[#0000FE] mr-2" />
              Contact
            </h2>
            <div class="space-y-2 text-sm">
              <p v-if="auPair.email" class="text-gray-700">{{ auPair.email }}</p>
              <p v-if="auPair.phone" class="text-gray-700">{{ auPair.phone }}</p>
            </div>
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
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const { user } = useUserSession();
const loading = ref(true);
const auPair = ref<Record<string, unknown> | null>(null);

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
    name: u.fullName ?? "Au Pair",
    photo: u.avatar ?? "/assets/images/abstract-user.png",
    tribe: profile?.tribe ?? "",
    country: profile?.country ?? "",
    startDate: formatDate(c.startDate as string),
    endDate: formatDate(c.endDate as string),
    matchScore: (c.matchScore as number) ?? null,
    education: (profile?.education as string) ?? "",
    skillsLabel: skills.length ? skills.join(", ") : "",
    email: u.email ?? "",
    phone: u.phone ?? "",
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
    // Prefer ACTIVE (accepted); if none, show PENDING (offer sent) so the card is filled when matched or when offer was sent
    let contracts = await $fetch<Array<Record<string, unknown>>>(
      `/api/v1/aupair/contracts?familyId=${familyId}&status=ACTIVE`
    );
    if (Array.isArray(contracts) && contracts.length > 0) {
      auPair.value = buildAuPairFromContract(contracts[0], "ACTIVE");
      loading.value = false;
      return;
    }
    contracts = await $fetch<Array<Record<string, unknown>>>(
      `/api/v1/aupair/contracts?familyId=${familyId}&status=PENDING`
    );
    if (Array.isArray(contracts) && contracts.length > 0) {
      auPair.value = buildAuPairFromContract(contracts[0], "PENDING");
    } else {
      auPair.value = null;
    }
  } catch {
    auPair.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
