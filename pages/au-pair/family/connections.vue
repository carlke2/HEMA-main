<template>
  <div class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans">
    <FamilyHeader />
    <div class="flex">
      <FamilySidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <h1 class="text-2xl font-bold flex items-center text-gray-900 mb-2">
          <icon name="mdi:handshake-outline" class="text-[#0000FE] mr-2" />
          My connections
        </h1>
        <p class="text-gray-600 text-sm mb-6">
          Au pairs you’ve shown interest in and the status of each connection.
        </p>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
        </div>

        <div v-else-if="interests.length === 0" class="text-center py-12 bg-white rounded-xl border border-gray-200">
          <icon name="mdi:handshake-outline" class="text-[#0000FE] text-6xl mx-auto mb-4" />
          <h2 class="text-xl font-bold text-gray-900 mb-2">No connections yet</h2>
          <p class="text-gray-600 mb-4">When you click “I’m interested” on an au pair, they’ll appear here.</p>
          <NuxtLink to="/au-pair/family/browse-au-pairs" class="text-[#0000FE] font-medium hover:underline">Browse au pairs</NuxtLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="interest in interests"
            :key="interest.id"
            class="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 class="font-bold text-lg text-gray-900">{{ interest.user?.fullName ?? "Au pair" }}</h3>
                <p class="text-sm text-gray-600">{{ interest.user?.email }}</p>
                <span :class="statusClass(interest.status)" class="inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ statusLabel(interest.status) }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2 items-center">
                <NuxtLink
                  :to="`/au-pair/family/au-pair-profile/${interest.userId}`"
                  class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  View profile
                </NuxtLink>
                <template v-if="interest.status === 'AU_PAIR_INTERESTED'">
                  <button
                    type="button"
                    :disabled="actionLoading === interest.id"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 disabled:opacity-60"
                    @click="openScheduleMeet(interest)"
                  >
                    Schedule meet
                  </button>
                </template>
                <template v-if="interest.status === 'MEET_SCHEDULED'">
                  <span v-if="interest.scheduledMeetAt" class="text-sm text-gray-600">
                    Meet: {{ formatDateTime(interest.scheduledMeetAt) }}
                  </span>
                  <a
                    v-if="interest.meetingLink"
                    :href="interest.meetingLink"
                    target="_blank"
                    rel="noopener"
                    class="px-4 py-2 rounded-lg text-sm font-medium border border-[#0000FE] text-[#0000FE] hover:bg-blue-50"
                  >
                    Join link
                  </a>
                  <button
                    type="button"
                    :disabled="actionLoading === interest.id"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-60"
                    @click="markMeetDone(interest)"
                  >
                    {{ actionLoading === interest.id ? "…" : "We’ve had the meet" }}
                  </button>
                </template>
                <template v-if="interest.status === 'MEET_DONE'">
                  <button
                    type="button"
                    :disabled="actionLoading === interest.id"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 disabled:opacity-60"
                    @click="declineConnection(interest)"
                  >
                    {{ actionLoading === interest.id ? "…" : "Continue browsing" }}
                  </button>
                  <NuxtLink
                    :to="`/au-pair/family/browse-au-pairs?offer=${interest.userId}&interestId=${interest.id}`"
                    class="px-4 py-2 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 inline-block"
                  >
                    Extend offer
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Schedule meet modal (family schedules) -->
    <Teleport to="body">
      <div
        v-if="scheduleMeetInterest"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="scheduleMeetInterest = null"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-1">Schedule a meet</h3>
          <p class="text-sm text-gray-600 mb-4">Choose a date and time. The au pair will be notified.</p>
          <form novalidate @submit.prevent="submitScheduleMeet" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">Date & time <span class="text-red-600">*</span></label>
              <input
                v-model="scheduleForm.scheduledMeetAt"
                type="datetime-local"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
                placeholder="Pick date and time"
              />
              <p v-if="scheduleFormError" class="text-sm text-red-600 mt-1">{{ scheduleFormError }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">Meeting link (optional)</label>
              <input
                v-model="scheduleForm.meetingLink"
                type="text"
                placeholder="https://meet.google.com/..."
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-1">Notes (optional)</label>
              <textarea
                v-model="scheduleForm.meetNotes"
                rows="2"
                placeholder="Agenda or instructions"
                class="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" class="px-4 py-2 border border-gray-200 rounded-lg" @click="scheduleMeetInterest = null">Cancel</button>
              <button type="submit" :disabled="familySending" class="px-4 py-2 bg-[#0000FE] text-white rounded-lg disabled:opacity-60">
                {{ familySending ? "Sending…" : "Schedule meet" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["family-dashboard"],
});

const { user } = useUserSession();
const loading = ref(true);
const interests = ref([]);
const actionLoading = ref(null);
const scheduleMeetInterest = ref(null);
const familySending = ref(false);
const scheduleForm = ref({
  scheduledMeetAt: "",
  meetingLink: "",
  meetNotes: "",
});
const scheduleFormError = ref("");
const scheduleMeetModalRef = ref(null);

function statusLabel(status) {
  const map = {
    FAMILY_INTERESTED: "Waiting for au pair",
    AU_PAIR_INTERESTED: "Au pair interested",
    MEET_SCHEDULED: "Meet scheduled",
    MEET_DONE: "Meet done",
    OFFER_EXTENDED: "Offer extended",
    FAMILY_DECLINED: "Declined",
    AU_PAIR_UNINTERESTED: "Not interested",
  };
  return map[status] || status;
}

function statusClass(status) {
  const map = {
    FAMILY_INTERESTED: "bg-yellow-100 text-yellow-800",
    AU_PAIR_INTERESTED: "bg-blue-100 text-blue-800",
    MEET_SCHEDULED: "bg-green-100 text-green-800",
    MEET_DONE: "bg-amber-100 text-amber-800",
    OFFER_EXTENDED: "bg-green-100 text-green-800",
    FAMILY_DECLINED: "bg-gray-100 text-gray-800",
    AU_PAIR_UNINTERESTED: "bg-red-100 text-red-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
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

function closeScheduleModal() {
  if (familySending.value) return;
  scheduleMeetInterest.value = null;
  scheduleFormError.value = "";
}

function openScheduleMeet(interest) {
  scheduleMeetInterest.value = interest;
  scheduleFormError.value = "";
  scheduleForm.value = {
    scheduledMeetAt: "",
    meetingLink: "",
    meetNotes: "",
  };
  nextTick(() => {
    scheduleMeetModalRef.value?.querySelector("#schedule-datetime")?.focus();
  });
}

function parseDateTimeLocal(value) {
  const raw = value?.trim();
  if (!raw) return null;
  // datetime-local value is "YYYY-MM-DDTHH:mm" (local time)
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return new Date(raw);
  const [, y, mo, d, h, mi] = match.map(Number);
  return new Date(y, mo - 1, d, h, mi);
}

async function submitScheduleMeet() {
  if (!scheduleMeetInterest.value) return;
  scheduleFormError.value = "";
  const rawAt = scheduleForm.value.scheduledMeetAt?.trim();
  if (!rawAt) {
    scheduleFormError.value = "Please choose a date and time.";
    return;
  }
  const scheduledDate = parseDateTimeLocal(rawAt);
  if (!scheduledDate || Number.isNaN(scheduledDate.getTime())) {
    scheduleFormError.value = "Please enter a valid date and time (e.g. use the picker).";
    return;
  }
  if (scheduledDate.getTime() < Date.now() - 60000) {
    scheduleFormError.value = "Please choose a future date and time.";
    return;
  }
  familySending.value = true;
  try {
    await $fetch(`/api/v1/aupair/interest/${scheduleMeetInterest.value.id}`, {
      method: "PATCH",
      body: {
        status: "MEET_SCHEDULED",
        scheduledMeetAt: scheduledDate.toISOString(),
        meetingLink: scheduleForm.value.meetingLink?.trim() || undefined,
        meetNotes: scheduleForm.value.meetNotes?.trim() || undefined,
      },
    });
    push.success("Meet scheduled. The au pair has been notified.");
    closeScheduleModal();
    await fetchInterests();
  } catch (e) {
    const msg = e?.data?.message ?? e?.message;
    scheduleFormError.value = typeof msg === "string" ? msg : "Failed to schedule. Please try again.";
    push.error(scheduleFormError.value);
  } finally {
    familySending.value = false;
  }
}

async function markMeetDone(interest) {
  actionLoading.value = interest.id;
  try {
    await $fetch(`/api/v1/aupair/interest/${interest.id}`, {
      method: "PATCH",
      body: { status: "MEET_DONE" },
    });
    push.success("Thanks! You can now extend an offer or continue browsing.");
    await fetchInterests();
  } catch (e) {
    push.error(e?.data?.message || "Something went wrong.");
  } finally {
    actionLoading.value = null;
  }
}

async function declineConnection(interest) {
  actionLoading.value = interest.id;
  try {
    await $fetch(`/api/v1/aupair/interest/${interest.id}`, {
      method: "PATCH",
      body: { status: "FAMILY_DECLINED" },
    });
    push.success("The au pair has been notified.");
    await fetchInterests();
  } catch (e) {
    push.error(e?.data?.message || "Something went wrong.");
  } finally {
    actionLoading.value = null;
  }
}

function onScheduleEscape(e) {
  if (e.key === "Escape") closeScheduleModal();
}

watch(scheduleMeetInterest, (val) => {
  if (val) document.addEventListener("keydown", onScheduleEscape);
  else document.removeEventListener("keydown", onScheduleEscape);
});

onMounted(fetchInterests);
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onScheduleEscape);
});
</script>
