<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <h1 class="text-2xl font-bold flex items-center text-gray-900 mb-2">
          <icon name="mdi:heart-outline" class="text-[#0000FE] mr-2" />
          Families interested in you
        </h1>
        <p class="text-gray-600 text-sm mb-6">
          These families would like to connect. View their profile, then choose Interested or Not interested.
        </p>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else-if="pendingInterests.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-200">
          <icon name="mdi:heart-outline" class="text-[#0000FE] text-6xl mx-auto mb-4" />
          <h2 class="text-xl font-bold text-gray-900 mb-2">No new interests</h2>
          <p class="text-gray-600">When a family shows interest, they’ll appear here.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <article
            v-for="interest in pendingInterests"
            :key="interest.id"
            class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"
          >
            <div class="p-5 flex-1">
              <div class="flex items-start justify-between gap-2 mb-3">
                <h3 class="font-bold text-lg text-gray-900">{{ interest.family?.name ?? "Family" }}</h3>
                <span v-if="interest.family?.verified" class="shrink-0 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Verified</span>
              </div>
              <p v-if="interest.family?.location" class="text-sm text-gray-600 mb-2">{{ interest.family.location }}</p>
              <p v-if="interest.family?.description" class="text-sm text-gray-600 line-clamp-2">{{ interest.family.description }}</p>

              <!-- Meet details (when meet is scheduled or done) -->
              <div
                v-if="(interest.status === 'MEET_SCHEDULED' || interest.status === 'MEET_DONE') && (interest.scheduledMeetAt || interest.meetingLink || interest.meetNotes)"
                class="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-100"
              >
                <p class="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">Meet details</p>
                <p v-if="interest.scheduledMeetAt" class="text-sm text-gray-800 flex items-center gap-1.5 mb-1">
                  <icon name="mdi:calendar-clock" class="text-[#0000FE] shrink-0" />
                  {{ formatDateTime(interest.scheduledMeetAt) }}
                </p>
                <a
                  v-if="interest.meetingLink"
                  :href="interest.meetingLink"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1.5 text-sm text-[#0000FE] font-medium hover:underline mb-1"
                >
                  <icon name="mdi:video-outline" class="shrink-0" />
                  Join meeting link
                </a>
                <p v-if="interest.meetNotes" class="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{{ interest.meetNotes }}</p>
              </div>
            </div>
            <div class="p-5 pt-0 flex flex-wrap gap-2">
              <NuxtLink
                :to="`/au-pair/dashboard/families/${interest.family?.uuid}`"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 text-center"
              >
                View family
              </NuxtLink>
              <button
                v-if="interest.status === 'FAMILY_INTERESTED'"
                type="button"
                :disabled="actionLoading === interest.id"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition disabled:opacity-60"
                @click="respondUninterested(interest)"
              >
                {{ actionLoading === interest.id ? "…" : "Not interested" }}
              </button>
              <button
                v-if="interest.status === 'FAMILY_INTERESTED'"
                type="button"
                :disabled="actionLoading === interest.id"
                class="flex-1 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition disabled:opacity-60"
                @click="respondInterested(interest)"
              >
                {{ actionLoading === interest.id ? "…" : "I'm interested" }}
              </button>
              <template v-if="interest.status !== 'FAMILY_INTERESTED'">
                <span class="py-2.5 text-sm text-gray-500">
                  {{ statusLabel(interest.status) }}
                </span>
              </template>
            </div>
          </article>
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
const interests = ref([]);
const actionLoading = ref(null);

const pendingInterests = computed(() => {
  return interests.value.filter((i) => i.status === "FAMILY_INTERESTED" || i.status === "AU_PAIR_INTERESTED" || i.status === "MEET_SCHEDULED" || i.status === "MEET_DONE");
});

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function statusLabel(status) {
  const map = {
    AU_PAIR_INTERESTED: "You’re interested – family will schedule the meet",
    MEET_SCHEDULED: "Meet scheduled",
    MEET_DONE: "Meet done – waiting for family",
    OFFER_EXTENDED: "Offer extended – see Contracts",
    FAMILY_DECLINED: "Family declined",
    AU_PAIR_UNINTERESTED: "Not interested",
  };
  return map[status] || status;
}

async function fetchInterests() {
  loading.value = true;
  try {
    interests.value = await $fetch("/api/v1/aupair/interest");
    if (!Array.isArray(interests.value)) interests.value = [];
  } catch {
    interests.value = [];
  } finally {
    loading.value = false;
  }
}

async function respondInterested(interest) {
  actionLoading.value = interest.id;
  try {
    await $fetch(`/api/v1/aupair/interest/${interest.id}`, {
      method: "PATCH",
      body: { status: "AU_PAIR_INTERESTED" },
    });
    push.success("The family has been notified. They will schedule a meet when ready.");
    await fetchInterests();
  } catch (e) {
    push.error(e?.data?.message || "Something went wrong.");
  } finally {
    actionLoading.value = null;
  }
}

async function respondUninterested(interest) {
  actionLoading.value = interest.id;
  try {
    await $fetch(`/api/v1/aupair/interest/${interest.id}`, {
      method: "PATCH",
      body: { status: "AU_PAIR_UNINTERESTED" },
    });
    push.success("The family has been notified.");
    await fetchInterests();
  } catch (e) {
    push.error(e?.data?.message || "Something went wrong.");
  } finally {
    actionLoading.value = null;
  }
}

onMounted(fetchInterests);
</script>
