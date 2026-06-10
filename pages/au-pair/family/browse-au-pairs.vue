<template>
  <div class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans">
    <!-- Dashboard Header -->
    <FamilyHeader />

    <div class="flex">
      <FamilySidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:home-heart" class="text-[#0000FE] mr-2" />
            Browse Au Pairs
          </h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              {{ totalAuPairs }} au pair(s) found
              <span v-if="totalPages > 1">
                · Page {{ currentPage }} of {{ totalPages }}
              </span>
            </span>
            <button
              @click="showFilters = !showFilters"
              class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition flex items-center"
            >
              <icon name="mdi:filter" class="mr-1" />
              {{ showFilters ? "Hide" : "Show" }} Filters
            </button>
          </div>
        </div>

        <!-- Filters Section -->
        <div
          v-if="showFilters"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
        >
          <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
            <icon name="mdi:filter-variant" class="text-[#0000FE] mr-2" />
            Search & Filter
          </h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Search by Name or Description
              </label>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search au pairs..."
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
              />
            </div>

            <!-- Country -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                v-model="filters.country"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">Select country</option>
                <option
                  v-for="country in countries"
                  :key="country.code"
                  :value="country.code"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>

            <!-- Tribe -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Preferred Tribe
              </label>
              <select
                v-model="filters.tribe"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">Select tribe</option>
                <option
                  v-for="tribe in africanTribes"
                  :key="tribe.code"
                  :value="tribe.code"
                >
                  {{ tribe.name }}
                </option>
              </select>
            </div>

            <!-- Religion -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Religion
              </label>
              <select
                v-model="filters.religion"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">Select religion</option>
                <option
                  v-for="religion in religions"
                  :key="religion.code"
                  :value="religion.code"
                >
                  {{ religion.name }}
                </option>
              </select>
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                v-model="filters.location"
                type="text"
                placeholder="City or region..."
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
              />
            </div>

            <!-- Families only see verified au-pairs (filter not shown) -->
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="clearFilters"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
            <button
              @click="applyFilters"
              class="bg-[#0000FE] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]"
          ></div>
        </div>

        <!-- Au Pairs Grid -->
        <div
          v-else-if="filteredAuPairs.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <article
            v-for="aupair in filteredAuPairs"
            :key="aupair.id"
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col min-w-0"
          >
            <!-- Card image: fixed aspect ratio, consistent placeholder -->
            <div class="relative w-full h-52 bg-gray-100 shrink-0">
              <img
                v-if="aupair.avatar"
                :src="aupair.avatar"
                :alt="aupair.fullName"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400"
              >
                <icon name="mdi:account-circle" class="w-20 h-20" />
              </div>
              <span
                :class="[
                  'absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium shadow-sm',
                  aupair.verified
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-100 text-amber-800',
                ]"
              >
                {{ aupair.verified ? "Verified" : "Pending verification" }}
              </span>
            </div>

            <!-- Card body -->
            <div class="p-5 flex flex-col flex-1">
              <h3 class="font-bold text-lg text-gray-900 mb-3 truncate" :title="aupair.fullName">
                {{ aupair.fullName }}
              </h3>

              <div class="space-y-2 text-sm text-gray-600 mb-5 flex-1 min-w-0">
                <div class="flex items-start gap-2 min-w-0">
                  <icon name="mdi:map-marker" class="shrink-0 text-[#0000FE] mt-0.5" />
                  <span class="truncate">
                    {{ formatLocation(aupair.AuPairUserProfile) }}
                  </span>
                </div>
                <div
                  v-if="aupair.AuPairUserProfile?.tribe"
                  class="flex items-center gap-2"
                >
                  <icon name="mdi:account-group" class="shrink-0 text-[#0000FE]" />
                  <span>{{ formatEnumLabel(aupair.AuPairUserProfile.tribe) }}</span>
                </div>
                <div
                  v-if="aupair.AuPairUserProfile?.religion"
                  class="flex items-center gap-2"
                >
                  <icon name="mdi:church" class="shrink-0 text-[#0000FE]" />
                  <span>{{ formatEnumLabel(aupair.AuPairUserProfile.religion) }}</span>
                </div>
              </div>

              <div class="flex gap-2 mt-auto">
                <NuxtLink
                  :to="`/au-pair/family/au-pair-profile/${aupair.id}`"
                  class="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition text-center inline-flex items-center justify-center"
                >
                  View Profile
                </NuxtLink>
                <button
                  v-if="familyInterestedIds.has(aupair.id)"
                  type="button"
                  disabled
                  class="flex-1 py-2.5 rounded-lg text-sm font-medium bg-gray-200 text-gray-600 cursor-default"
                >
                  Interested
                </button>
                <button
                  v-else
                  type="button"
                  :disabled="interestSending === aupair.id"
                  class="flex-1 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition disabled:opacity-60"
                  @click="expressInterest(aupair.id)"
                >
                  {{ interestSending === aupair.id ? 'Sending…' : "I'm interested" }}
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <icon
            name="mdi:home-heart-outline"
            class="text-[#0000FE] text-6xl mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            No Au Pairs Found
          </h3>
          <p class="text-gray-600 mb-4">
            Try adjusting your filters or search criteria
          </p>
          <button
            @click="clearFilters"
            class="bg-[#0000FE] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Clear All Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex flex-col items-center gap-4">
          <p class="text-sm text-gray-600">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }}–{{ Math.min(currentPage * itemsPerPage, totalAuPairs) }} of {{ totalAuPairs }} au pairs
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              @click="currentPage = currentPage - 1"
              :disabled="currentPage === 1"
              class="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <icon name="mdi:chevron-left" />
              Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              type="button"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition',
                currentPage === page
                  ? 'bg-[#0000FE] text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <button
              type="button"
              @click="currentPage = currentPage + 1"
              :disabled="currentPage === totalPages"
              class="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Next
              <icon name="mdi:chevron-right" />
            </button>
          </div>
        </div>
      </main>
    </div>
    <!-- Offer Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOfferModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="offer-modal-title"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            aria-hidden="true"
            @click="closeOfferModal"
          />
          <!-- Modal panel: scrollable, max height -->
          <div
            class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          >
            <!-- Header -->
            <div class="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
              <h2 id="offer-modal-title" class="text-xl font-bold text-gray-900">
                Make an Offer
              </h2>
              <button
                type="button"
                @click="closeOfferModal"
                class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
                aria-label="Close"
              >
                <icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Scrollable form -->
            <form @submit.prevent="sendOffer" class="flex flex-col flex-1 min-h-0">
              <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6 bg-white">
                <!-- Role details -->
                <section class="space-y-4">
                  <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Role details
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
                      <input
                        v-model="offerDetails.description"
                        type="text"
                        required
                        placeholder="Brief role description"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                    <div class="sm:col-span-2">
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Duties</label>
                      <input
                        v-model="offerDetails.duties"
                        type="text"
                        required
                        placeholder="Main duties and responsibilities"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Start Date</label>
                      <input
                        v-model="offerDetails.startDate"
                        type="date"
                        required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">End Date</label>
                      <input
                        v-model="offerDetails.endDate"
                        type="date"
                        required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Working Hours</label>
                      <input
                        v-model="offerDetails.workingHours"
                        type="text"
                        required
                        placeholder="e.g. 40 hours/week"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                  </div>
                </section>

                <!-- Compensation -->
                <section class="space-y-4">
                  <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Compensation
                  </h3>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Salary</label>
                      <input
                        v-model="offerDetails.salary"
                        type="number"
                        required
                        min="0"
                        step="any"
                        placeholder="0"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Frequency</label>
                      <select
                        v-model="offerDetails.salaryFrequency"
                        required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="HOURLY">Hourly</option>
                        <option value="ANNUALLY">Annually</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">Currency</label>
                      <select
                        v-model="offerDetails.currency"
                        required
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE]"
                      >
                        <option value="">Select currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="KSH">KSH</option>
                        <option value="AED">AED</option>
                        <option value="SAR">SAR</option>
                        <option value="BHD">BHD</option>
                        <option value="KWD">KWD</option>
                        <option value="OMR">OMR</option>
                        <option value="QAR">QAR</option>
                        <option value="IQD">IQD</option>
                      </select>
                    </div>
                  </div>
                </section>

                <!-- Policies -->
                <section class="space-y-4">
                  <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Policies
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">
                        Leave and vacation policy
                      </label>
                      <textarea
                        v-model="offerDetails.leaveAndVacationPolicy"
                        required
                        rows="3"
                        placeholder="Describe leave and vacation terms..."
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE] resize-y min-h-[80px]"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-900 mb-1.5">
                        Termination conditions
                      </label>
                      <textarea
                        v-model="offerDetails.terminationConditions"
                        required
                        rows="3"
                        placeholder="Describe termination terms..."
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0000FE] focus:border-[#0000FE] resize-y min-h-[80px]"
                      />
                    </div>
                  </div>
                </section>
              </div>

              <!-- Footer actions -->
              <div class="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-100 rounded-b-xl space-y-3">
                <p class="text-xs text-gray-700">
                  Sent offers appear under <NuxtLink to="/au-pair/family/applications" class="text-[#0000FE] font-medium hover:underline">My Applications</NuxtLink> in the sidebar.
                </p>
                <div class="flex flex-wrap items-center justify-end gap-3">
                  <button
                    type="button"
                    @click="closeOfferModal"
                    :disabled="offerSending"
                    class="px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-400 text-gray-800 bg-white hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    :disabled="offerSending"
                    class="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {{ offerSending ? "Sending…" : "Send Offer" }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<script setup>
definePageMeta({
  middleware: ["family-dashboard"],
});

import { ref, computed, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const { user } = useUserSession();

// State
const loading = ref(false);
const showFilters = ref(true);
const auPairs = ref([]);
const totalAuPairs = ref(0);
const currentPage = ref(1);
const itemsPerPage = 12;
const familyInterestedIds = ref(new Set());
const interestSending = ref(null);
const isOfferModalOpen = ref(false);
const selectedAuPairId = ref(null);
const extendOfferInterestId = ref(null);
const offerSending = ref(false);
const offerDetails = ref({
  description: "",
  duties: "",
  startDate: "",
  endDate: "",
  salary: null,
  salaryFrequency: "MONTHLY",
  currency: "",
  workingHours: "",
  leaveAndVacationPolicy: "",
  terminationConditions: "",
});

// Filters
const filters = ref({
  search: "",
  country: "",
  tribe: "",
  religion: "",
  location: "",
});

// Computed
const filteredAuPairs = computed(() => {
  return auPairs.value;
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalAuPairs.value / itemsPerPage));
});

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const fetchAuPairs = async () => {
  loading.value = true;
  try {
    const queryParams = new URLSearchParams();

    if (filters.value.search)
      queryParams.append("search", filters.value.search);
    if (filters.value.country)
      queryParams.append("country", filters.value.country);
    if (filters.value.tribe) queryParams.append("tribe", filters.value.tribe);
    if (filters.value.religion)
      queryParams.append("religion", filters.value.religion);
    if (filters.value.location)
      queryParams.append("location", filters.value.location);
    if (filters.value.verified)
      queryParams.append("verified", filters.value.verified);

    queryParams.append("limit", itemsPerPage.toString());
    queryParams.append(
      "offset",
      ((currentPage.value - 1) * itemsPerPage).toString()
    );

    const { data, error } = await useFetch(
      `/api/v1/aupair/aupairs?${queryParams.toString()}`
    );

    if (error.value) {
      const msg = error.value?.data?.message ?? error.value?.message;
      push.error(typeof msg === "string" ? msg : "Failed to load au pairs.");
      throw error.value;
    }

    const result = data.value;
    auPairs.value = result?.data ?? result ?? [];
    totalAuPairs.value = typeof result?.total === "number" ? result.total : auPairs.value.length;
  } catch (error) {
    console.error("Error fetching au pairs:", error);
    push.error("Failed to fetch au pairs. Please try again.");
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchAuPairs();
};

const clearFilters = () => {
  filters.value = {
    search: "",
    country: "",
    tribe: "",
    religion: "",
    location: "",
  };
  currentPage.value = 1;
  fetchAuPairs();
};

/** Format enum value for display (e.g. Seventh_Day_Adventist → Seventh Day Adventist) */
function formatEnumLabel(value) {
  if (!value || typeof value !== "string") return value;
  return value.replace(/_/g, " ");
}

/** Build location line from profile (avoid duplicating country in location) */
function formatLocation(profile) {
  if (!profile) return "";
  const loc = (profile.location || "").trim();
  const country = (profile.country || "").trim();
  if (!country) return loc || "—";
  const countryDisplay = formatEnumLabel(country);
  if (!loc) return countryDisplay;
  if (loc.toLowerCase().includes(countryDisplay.toLowerCase())) return loc;
  return `${loc}, ${countryDisplay}`;
}

const fetchFamilyInterests = async () => {
  if (!user.value?.familyId) return;
  try {
    const list = await $fetch("/api/v1/aupair/interest");
    const ids = new Set((list || []).map((i) => i.userId));
    familyInterestedIds.value = ids;
  } catch (_) {
    familyInterestedIds.value = new Set();
  }
};

const expressInterest = async (auPairId) => {
  if (!user.value?.familyId) {
    push.error("Your family profile is not set up.");
    return;
  }
  interestSending.value = auPairId;
  try {
    await $fetch("/api/v1/aupair/interest", {
      method: "POST",
      body: { userId: Number(auPairId) },
    });
    familyInterestedIds.value = new Set([...familyInterestedIds.value, auPairId]);
    push.success("The au pair will be notified that you're interested.");
  } catch (e) {
    const msg = e?.data?.message ?? e?.message;
    push.error(typeof msg === "string" ? msg : "Failed to send interest.");
  } finally {
    interestSending.value = null;
  }
};

const openOfferModal = (auPairId) => {
  selectedAuPairId.value = auPairId;
  isOfferModalOpen.value = true;
};

const closeOfferModal = () => {
  isOfferModalOpen.value = false;
  selectedAuPairId.value = null;
  // Reset offer details
  offerDetails.value = {
    description: "",
    duties: "",
    startDate: "",
    endDate: "",
    salary: null,
    salaryFrequency: "MONTHLY",
    currency: "",
    workingHours: "",
    leaveAndVacationPolicy: "",
    terminationConditions: "",
  };
};

const sendOffer = async () => {
  if (!selectedAuPairId.value) {
    push.error("No au pair selected.");
    return;
  }
  if (!user.value?.familyId) {
    push.error("Your family profile is not set up. Please complete your family profile first.");
    return;
  }
  if (offerSending.value) return;
  offerSending.value = true;
  try {
    const userId = Number(selectedAuPairId.value);
    const body = {
      userId,
      familyId: user.value.familyId,
      description: offerDetails.value.description,
      duties: offerDetails.value.duties,
      startDate: new Date(offerDetails.value.startDate).toISOString(),
      endDate: new Date(offerDetails.value.endDate).toISOString(),
      salary: Number(offerDetails.value.salary) || 0,
      currency: offerDetails.value.currency || "USD",
      salaryFrequency: offerDetails.value.salaryFrequency || "MONTHLY",
      workingHours: offerDetails.value.workingHours,
      leaveAndVacationPolicy: offerDetails.value.leaveAndVacationPolicy,
      terminationConditions: offerDetails.value.terminationConditions,
      status: "PENDING",
    };
    await $fetch("/api/v1/aupair/contracts", {
      method: "POST",
      body,
    });
    if (extendOfferInterestId.value) {
      try {
        await $fetch(`/api/v1/aupair/interest/${extendOfferInterestId.value}`, {
          method: "PATCH",
          body: { status: "OFFER_EXTENDED" },
        });
      } catch (_) {}
      extendOfferInterestId.value = null;
    }
    push.success("Offer sent! The au pair will see it under Contracts on their dashboard.");
    closeOfferModal();
  } catch (err) {
    const statusCode = err?.data?.statusCode ?? err?.data?.status ?? err?.statusCode ?? err?.status;
    const message = err?.data?.message ?? err?.message;
    if (statusCode === 409 || statusCode === "409") {
      push.error("You have already sent an offer to this au pair.");
      closeOfferModal();
    } else {
      push.error(message && typeof message === "string" ? message : "Failed to send offer. Please try again.");
    }
  } finally {
    offerSending.value = false;
  }
};

// Watch for page changes
watch(currentPage, () => {
  fetchAuPairs();
});

// Refetch when page changes
watch(currentPage, () => {
  fetchAuPairs();
});

// Initialize
const route = useRoute();
onMounted(async () => {
  await Promise.all([fetchAuPairs(), fetchFamilyInterests()]);
  const offerId = Array.isArray(route.query.offer) ? route.query.offer[0] : route.query.offer;
  const interestId = Array.isArray(route.query.interestId) ? route.query.interestId[0] : route.query.interestId;
  if (offerId && !isNaN(Number(offerId))) {
    selectedAuPairId.value = Number(offerId);
    if (interestId && !isNaN(Number(interestId))) extendOfferInterestId.value = Number(interestId);
    isOfferModalOpen.value = true;
  }
});

// List of all religions
const religions = [
  { code: "Christian", name: "Christian" },
  { code: "Muslim", name: "Muslim" },
  { code: "Hindu", name: "Hindu" },
  { code: "Buddhist", name: "Buddhist" },
  { code: "Seventh_Day_Adventist", name: "Seventh Day Adventist" },
  { code: "Presbyterian", name: "Presbyterian" },
  { code: "Jehovah_Witness", name: "Jehovah Witness" },
  { code: "Atheist", name: "Atheist" },
  { code: "Pagan", name: "Pagan" },
  { code: "Zionist", name: "Zionist" },
  { code: "Rastafari", name: "Rastafari" },
  { code: "Jew", name: "Jew" },
  { code: "Mormon", name: "Mormon" },
];

// List of all countries
const countries = [
  { code: "Afghanistan", name: "Afghanistan" },
  { code: "Albania", name: "Albania" },
  { code: "Algeria", name: "Algeria" },
  { code: "Andorra", name: "Andorra" },
  { code: "Angola", name: "Angola" },
  { code: "Antigua_and_Barbuda", name: "Antigua and Barbuda" },
  { code: "Argentina", name: "Argentina" },
  { code: "Armenia", name: "Armenia" },
  { code: "Australia", name: "Australia" },
  { code: "Austria", name: "Austria" },
  { code: "Azerbaijan", name: "Azerbaijan" },
  { code: "Bahamas", name: "Bahamas" },
  { code: "Bahrain", name: "Bahrain" },
  { code: "Bangladesh", name: "Bangladesh" },
  { code: "Barbados", name: "Barbados" },
  { code: "Belarus", name: "Belarus" },
  { code: "Belgium", name: "Belgium" },
  { code: "Belize", name: "Belize" },
  { code: "Benin", name: "Benin" },
  { code: "Bhutan", name: "Bhutan" },
  { code: "Bolivia", name: "Bolivia" },
  { code: "Bosnia_and_Herzegovina", name: "Bosnia and Herzegovina" },
  { code: "Botswana", name: "Botswana" },
  { code: "Brazil", name: "Brazil" },
  { code: "Brunei", name: "Brunei" },
  { code: "Bulgaria", name: "Bulgaria" },
  { code: "Burkina_Faso", name: "Burkina Faso" },
  { code: "Burundi", name: "Burundi" },
  { code: "Cabo_Verde", name: "Cabo Verde" },
  { code: "Cambodia", name: "Cambodia" },
  { code: "Cameroon", name: "Cameroon" },
  { code: "Canada", name: "Canada" },
  { code: "Central_African_Republic", name: "Central African Republic" },
  { code: "Chad", name: "Chad" },
  { code: "Chile", name: "Chile" },
  { code: "China", name: "China" },
  { code: "Colombia", name: "Colombia" },
  { code: "Comoros", name: "Comoros" },
  { code: "Congo_Brazzaville", name: "Congo-Brazzaville" },
  { code: "Congo_Kinshasa", name: "Congo-Kinshasa" },
  { code: "Costa_Rica", name: "Costa Rica" },
  { code: "Croatia", name: "Croatia" },
  { code: "Cuba", name: "Cuba" },
  { code: "Cyprus", name: "Cyprus" },
  { code: "Czech_Republic", name: "Czech Republic" },
  { code: "Denmark", name: "Denmark" },
  { code: "Djibouti", name: "Djibouti" },
  { code: "Dominica", name: "Dominica" },
  { code: "Dominican_Republic", name: "Dominican Republic" },
  { code: "East_Timor", name: "East Timor" },
  { code: "Ecuador", name: "Ecuador" },
  { code: "Egypt", name: "Egypt" },
  { code: "El_Salvador", name: "El Salvador" },
  { code: "Equatorial_Guinea", name: "Equatorial Guinea" },
  { code: "Eritrea", name: "Eritrea" },
  { code: "Estonia", name: "Estonia" },
  { code: "Eswatini", name: "Eswatini" },
  { code: "Ethiopia", name: "Ethiopia" },
  { code: "Fiji", name: "Fiji" },
  { code: "Finland", name: "Finland" },
  { code: "France", name: "France" },
  { code: "Gabon", name: "Gabon" },
  { code: "Gambia", name: "Gambia" },
  { code: "Georgia", name: "Georgia" },
  { code: "Germany", name: "Germany" },
  { code: "Ghana", name: "Ghana" },
  { code: "Greece", name: "Greece" },
  { code: "Grenada", name: "Grenada" },
  { code: "Guatemala", name: "Guatemala" },
  { code: "Guinea", name: "Guinea" },
  { code: "Guinea_Bissau", name: "Guinea-Bissau" },
  { code: "Guyana", name: "Guyana" },
  { code: "Haiti", name: "Haiti" },
  { code: "Honduras", name: "Honduras" },
  { code: "Hungary", name: "Hungary" },
  { code: "Iceland", name: "Iceland" },
  { code: "India", name: "India" },
  { code: "Indonesia", name: "Indonesia" },
  { code: "Iran", name: "Iran" },
  { code: "Iraq", name: "Iraq" },
  { code: "Ireland", name: "Ireland" },
  { code: "Israel", name: "Israel" },
  { code: "Italy", name: "Italy" },
  { code: "Ivory_Coast", name: "Ivory Coast" },
  { code: "Jamaica", name: "Jamaica" },
  { code: "Japan", name: "Japan" },
  { code: "Jordan", name: "Jordan" },
  { code: "Kazakhstan", name: "Kazakhstan" },
  { code: "Kenya", name: "Kenya" },
  { code: "Kiribati", name: "Kiribati" },
  { code: "North_Korea", name: "North Korea" },
  { code: "South_Korea", name: "South Korea" },
  { code: "Kosovo", name: "Kosovo" },
  { code: "Kuwait", name: "Kuwait" },
  { code: "Kyrgyzstan", name: "Kyrgyzstan" },
  { code: "Laos", name: "Laos" },
  { code: "Latvia", name: "Latvia" },
  { code: "Lebanon", name: "Lebanon" },
  { code: "Lesotho", name: "Lesotho" },
  { code: "Liberia", name: "Liberia" },
  { code: "Libya", name: "Libya" },
  { code: "Liechtenstein", name: "Liechtenstein" },
  { code: "Lithuania", name: "Lithuania" },
  { code: "Luxembourg", name: "Luxembourg" },
  { code: "Madagascar", name: "Madagascar" },
  { code: "Malawi", name: "Malawi" },
  { code: "Malaysia", name: "Malaysia" },
  { code: "Maldives", name: "Maldives" },
  { code: "Mali", name: "Mali" },
  { code: "Malta", name: "Malta" },
  { code: "Marshall_Islands", name: "Marshall Islands" },
  { code: "Mauritania", name: "Mauritania" },
  { code: "Mauritius", name: "Mauritius" },
  { code: "Mexico", name: "Mexico" },
  { code: "Micronesia", name: "Micronesia" },
  { code: "Moldova", name: "Moldova" },
  { code: "Monaco", name: "Monaco" },
  { code: "Mongolia", name: "Mongolia" },
  { code: "Montenegro", name: "Montenegro" },
  { code: "Morocco", name: "Morocco" },
  { code: "Mozambique", name: "Mozambique" },
  { code: "Myanmar", name: "Myanmar" },
  { code: "Namibia", name: "Namibia" },
  { code: "Nauru", name: "Nauru" },
  { code: "Nepal", name: "Nepal" },
  { code: "Netherlands", name: "Netherlands" },
  { code: "New_Zealand", name: "New Zealand" },
  { code: "Nicaragua", name: "Nicaragua" },
  { code: "Niger", name: "Niger" },
  { code: "Nigeria", name: "Nigeria" },
  { code: "North_Macedonia", name: "North Macedonia" },
  { code: "Norway", name: "Norway" },
  { code: "Oman", name: "Oman" },
  { code: "Pakistan", name: "Pakistan" },
  { code: "Palau", name: "Palau" },
  { code: "Palestine", name: "Palestine" },
  { code: "Panama", name: "Panama" },
  { code: "Papua_New_Guinea", name: "Papua New Guinea" },
  { code: "Paraguay", name: "Paraguay" },
  { code: "Peru", name: "Peru" },
  { code: "Philippines", name: "Philippines" },
  { code: "Poland", name: "Poland" },
  { code: "Portugal", name: "Portugal" },
  { code: "Qatar", name: "Qatar" },
  { code: "Romania", name: "Romania" },
  { code: "Russia", name: "Russia" },
  { code: "Rwanda", name: "Rwanda" },
  { code: "Saint_Kitts_and_Nevis", name: "Saint Kitts and Nevis" },
  { code: "Saint_Lucia", name: "Saint Lucia" },
  {
    code: "Saint_Vincent_and_the_Grenadines",
    name: "Saint Vincent and the Grenadines",
  },
  { code: "Samoa", name: "Samoa" },
  { code: "San_Marino", name: "San Marino" },
  { code: "Sao_Tome_and_Principe", name: "São Tomé and Príncipe" },
  { code: "Saudi_Arabia", name: "Saudi Arabia" },
  { code: "Senegal", name: "Senegal" },
  { code: "Serbia", name: "Serbia" },
  { code: "Seychelles", name: "Seychelles" },
  { code: "Sierra_Leone", name: "Sierra Leone" },
  { code: "Singapore", name: "Singapore" },
  { code: "Slovakia", name: "Slovakia" },
  { code: "Slovenia", name: "Slovenia" },
  { code: "Solomon_Islands", name: "Solomon Islands" },
  { code: "Somalia", name: "Somalia" },
  { code: "South_Africa", name: "South Africa" },
  { code: "South_Sudan", name: "South Sudan" },
  { code: "Spain", name: "Spain" },
  { code: "Sri_Lanka", name: "Sri Lanka" },
  { code: "Sudan", name: "Sudan" },
  { code: "Suriname", name: "Suriname" },
  { code: "Sweden", name: "Sweden" },
  { code: "Switzerland", name: "Switzerland" },
  { code: "Syria", name: "Syria" },
  { code: "Taiwan", name: "Taiwan" },
  { code: "Tajikistan", name: "Tajikistan" },
  { code: "Tanzania", name: "Tanzania" },
  { code: "Thailand", name: "Thailand" },
  { code: "Togo", name: "Togo" },
  { code: "Tonga", name: "Tonga" },
  { code: "Trinidad_and_Tobago", name: "Trinidad and Tobago" },
  { code: "Tunisia", name: "Tunisia" },
  { code: "Turkey", name: "Turkey" },
  { code: "Turkmenistan", name: "Turkmenistan" },
  { code: "Tuvalu", name: "Tuvalu" },
  { code: "Uganda", name: "Uganda" },
  { code: "Ukraine", name: "Ukraine" },
  { code: "United_Arab_Emirates", name: "United Arab Emirates" },
  { code: "United_Kingdom", name: "United Kingdom" },
  { code: "United_States", name: "United States" },
  { code: "Uruguay", name: "Uruguay" },
  { code: "Uzbekistan", name: "Uzbekistan" },
  { code: "Vanuatu", name: "Vanuatu" },
  { code: "Vatican_City", name: "Vatican City" },
  { code: "Venezuela", name: "Venezuela" },
  { code: "Vietnam", name: "Vietnam" },
  { code: "Yemen", name: "Yemen" },
  { code: "Zambia", name: "Zambia" },
  { code: "Zimbabwe", name: "Zimbabwe" },
];

const africanTribes = [
  {
    code: "Ababda",
    name: "Ababda",
  },
  {
    code: "Abaka",
    name: "Abaka",
  },
  {
    code: "Abbala_Arabs",
    name: "Abbala Arabs",
  },
  {
    code: "Abbe_Abe",
    name: "Abbe - Abe",
  },
  {
    code: "Abidji",
    name: "Abidji",
  },
  {
    code: "Abure",
    name: "Abure",
  },
  {
    code: "Acholi",
    name: "Acholi",
  },
  {
    code: "Ada",
    name: "Ada",
  },
  {
    code: "Adio",
    name: "Adio",
  },
  {
    code: "Adhola_Japadhola",
    name: "Adhola - Japadhola",
  },
  {
    code: "Adjoukrou_Adjukru",
    name: "Adjoukrou / Adjukru",
  },
  {
    code: "Adyumba",
    name: "Adyumba",
  },
  {
    code: "Afar",
    name: "Afar",
  },
  {
    code: "Agaw",
    name: "Agaw",
  },
  {
    code: "Aghem_Wum",
    name: "Aghem - Wum",
  },
  {
    code: "Agwa",
    name: "Agwa",
  },
  {
    code: "Agni_Anyi",
    name: "Agni / Anyi",
  },
  {
    code: "Ahanta",
    name: "Ahanta",
  },
  {
    code: "Aizi",
    name: "Aizi",
  },
  {
    code: "Aizo",
    name: "Aizo",
  },
  {
    code: "Aja",
    name: "Aja",
  },
  {
    code: "Aka_Pygmies",
    name: "Aka Pygmies",
  },
  {
    code: "Akan",
    name: "Akan",
  },
  {
    code: "Akie",
    name: "Akie",
  },
  {
    code: "Akiek",
    name: "Akiek",
  },
  {
    code: "Akowa_Pygmies",
    name: "Akowa Pygmies",
  },
  {
    code: "Aku",
    name: "Aku",
  },
  {
    code: "Akuapem",
    name: "Akuapem",
  },
  {
    code: "Akwamu",
    name: "Akwamu",
  },
  {
    code: "Alagwa",
    name: "Alagwa",
  },
  {
    code: "Alur",
    name: "Alur",
  },
  {
    code: "Amba_Bahamba",
    name: "Amba / Bahamba",
  },
  {
    code: "Ambele",
    name: "Ambele",
  },
  {
    code: "Amhara",
    name: "Amhara",
  },
  {
    code: "Angas",
    name: "Angas",
  },
  {
    code: "Annang",
    name: "Annang",
  },
  {
    code: "Annobonese",
    name: "Annobonese",
  },
  {
    code: "Antaifasy",
    name: "Antaifasy",
  },
  {
    code: "Antambahoaka",
    name: "Antambahoaka",
  },
  {
    code: "Antankarana",
    name: "Antankarana",
  },
  {
    code: "Antanosy",
    name: "Antanosy",
  },
  {
    code: "Antemoro",
    name: "Antemoro",
  },
  {
    code: "Antesaka",
    name: "Antesaka",
  },
  {
    code: "Anuak",
    name: "Anuak",
  },
  {
    code: "Anufo_Chakosi",
    name: "Anufo-Chakosi",
  },
  {
    code: "Anyi",
    name: "Anyi",
  },
  {
    code: "Aowin",
    name: "Aowin",
  },
  {
    code: "Arab",
    name: "Arab",
  },
  {
    code: "Arbore",
    name: "Arbore",
  },
  {
    code: "Argobba",
    name: "Argobba",
  },
  {
    code: "Ari",
    name: "Ari",
  },
  {
    code: "Aringa",
    name: "Aringa",
  },
  {
    code: "Arror",
    name: "Arror",
  },
  {
    code: "Ashanti",
    name: "Ashanti",
  },
  {
    code: "Assa_Asa",
    name: "Assa / Asa",
  },
  {
    code: "Asua_Pygmies",
    name: "Asua Pygmies",
  },
  {
    code: "Attie_Akye",
    name: "Attie / Akye",
  },
  {
    code: "Atuot",
    name: "Atuot",
  },
  {
    code: "Atyap",
    name: "Atyap",
  },
  {
    code: "Aushi",
    name: "Aushi",
  },
  {
    code: "Avatime",
    name: "Avatime",
  },
  {
    code: "Avikam",
    name: "Avikam",
  },
  {
    code: "Avukaya",
    name: "Avukaya",
  },
  {
    code: "Aweer",
    name: "Aweer",
  },
  {
    code: "Awori",
    name: "Awori",
  },
  {
    code: "Babanki",
    name: "Babanki",
  },
  {
    code: "Babinga_Pygmies",
    name: "Babinga Pygmies",
  },
  {
    code: "Babongo_Pygmies",
    name: "Babongo Pygmies",
  },
  {
    code: "Badinga",
    name: "Badinga",
  },
  {
    code: "Bafia_Rekpak",
    name: "Bafia / Rekpak",
  },
  {
    code: "Bafo_Bafaw",
    name: "Bafo - Bafaw",
  },
  {
    code: "Bafumbira",
    name: "Bafumbira",
  },
  {
    code: "Baga",
    name: "Baga",
  },
  {
    code: "Baganda_Ganda_Buganda",
    name: "Baganda / Ganda / Buganda",
  },
  {
    code: "Baggara_Arabs",
    name: "Baggara Arabs",
  },
  {
    code: "Bagirmi",
    name: "Bagirmi",
  },
  {
    code: "Bagisu",
    name: "Bagisu",
  },
  {
    code: "Bagwere",
    name: "Bagwere",
  },
  {
    code: "Bahima",
    name: "Bahima",
  },
  {
    code: "Bai",
    name: "Bai",
  },
  {
    code: "Bainuk",
    name: "Bainuk",
  },
  {
    code: "Bajuni",
    name: "Bajuni",
  },
  {
    code: "Baka_Pygmies",
    name: "Baka Pygmies",
  },
  {
    code: "Bakenyi",
    name: "Bakenyi",
  },
  {
    code: "Bakiga",
    name: "Bakiga",
  },
  {
    code: "Bakoko",
    name: "Bakoko",
  },
  {
    code: "Bakongo_Kongo",
    name: "Bakongo / Kongo",
  },
  {
    code: "Bakonjo",
    name: "Bakonjo",
  },
  {
    code: "Bakossi",
    name: "Bakossi",
  },
  {
    code: "Bakoya_Pygmies",
    name: "Bakoya Pygmies",
  },
  {
    code: "Bakutu",
    name: "Bakutu",
  },
  {
    code: "Bakwele_Kwele",
    name: "Bakwele / Kwele",
  },
  {
    code: "Bakweri",
    name: "Bakweri",
  },
  {
    code: "Balanda_Boor",
    name: "Balanda-Boor",
  },
  {
    code: "Balanta",
    name: "Balanta",
  },
  {
    code: "Balengue",
    name: "Balengue",
  },
  {
    code: "Balumbe_Pygmies",
    name: "Balumbe Pygmies",
  },
  {
    code: "Bambara",
    name: "Bambara",
  },
  {
    code: "Bambenga_Pygmies",
    name: "Bambenga Pygmies",
  },
  {
    code: "Bambuti_Mbuti",
    name: "Bambuti / Mbuti",
  },
  {
    code: "Bamileke",
    name: "Bamileke",
  },
  {
    code: "Bamum",
    name: "Bamum",
  },
  {
    code: "Bana",
    name: "Bana",
  },
  {
    code: "Banda",
    name: "Banda",
  },
  {
    code: "Banen",
    name: "Banen",
  },
  {
    code: "Bangala",
    name: "Bangala",
  },
  {
    code: "Bangelima",
    name: "Bangelima",
  },
  {
    code: "Bangubangu",
    name: "Bangubangu",
  },
  {
    code: "Bangwa",
    name: "Bangwa",
  },
  {
    code: "Baniabungo",
    name: "Baniabungo",
  },
  {
    code: "Banyambo",
    name: "Banyambo",
  },
  {
    code: "Banyankole",
    name: "Banyankole",
  },
  {
    code: "Banyaruguru",
    name: "Banyaruguru",
  },
  {
    code: "Banyarwanda",
    name: "Banyarwanda",
  },
  {
    code: "Banyole",
    name: "Banyole",
  },
  {
    code: "Banyoro",
    name: "Banyoro",
  },
  {
    code: "Banziri_Ganzi",
    name: "Banziri / Ganzi",
  },
  {
    code: "Bapoto_Upoto",
    name: "Bapoto / Upoto",
  },
  {
    code: "Bara",
    name: "Bara",
  },
  {
    code: "Barabaig",
    name: "Barabaig",
  },
  {
    code: "Barambo_Barambu",
    name: "Barambo / Barambu",
  },
  {
    code: "Bari",
    name: "Bari",
  },
  {
    code: "Bariba",
    name: "Bariba",
  },
  {
    code: "Barimba_Pygmies",
    name: "Barimba Pygmies",
  },
  {
    code: "Baruuli",
    name: "Baruuli",
  },
  {
    code: "Basamia",
    name: "Basamia",
  },
  {
    code: "Bashada",
    name: "Bashada",
  },
  {
    code: "Basotho",
    name: "Basotho",
  },
  {
    code: "Basoga",
    name: "Basoga",
  },
  {
    code: "Bassa_Cameroon",
    name: "Bassa (Cameroon)",
  },
  {
    code: "Bassa_Liberia",
    name: "Bassa (Liberia)",
  },
  {
    code: "Bassa_Nigeria",
    name: "Bassa (Nigeria)",
  },
  {
    code: "Bassari",
    name: "Bassari",
  },
  {
    code: "Batagwenda",
    name: "Batagwenda",
  },
  {
    code: "Basua",
    name: "Basua",
  },
  {
    code: "Batammariba",
    name: "Batammariba",
  },
  {
    code: "Batuku",
    name: "Batuku",
  },
  {
    code: "Batwa",
    name: "Batwa",
  },
  {
    code: "Baule",
    name: "Baule",
  },
  {
    code: "Bedaria_Bederia",
    name: "Bedaria / Bederia",
  },
  {
    code: "Bedik",
    name: "Bedik",
  },
  {
    code: "Beja",
    name: "Beja",
  },
  {
    code: "Bella",
    name: "Bella",
  },
  {
    code: "Bemba",
    name: "Bemba",
  },
  {
    code: "Bembe",
    name: "Bembe",
  },
  {
    code: "Bena",
    name: "Bena",
  },
  {
    code: "Bench",
    name: "Bench",
  },
  {
    code: "Benga",
    name: "Benga",
  },
  {
    code: "Beri",
    name: "Beri",
  },
  {
    code: "Berta_Berti",
    name: "Berta / Berti",
  },
  {
    code: "Berom",
    name: "Berom",
  },
  {
    code: "Bete",
    name: "Bete",
  },
  {
    code: "Beti_Pahuin",
    name: "Beti-Pahuin",
  },
  {
    code: "Betsileo",
    name: "Betsileo",
  },
  {
    code: "Betsimisaraka",
    name: "Betsimisaraka",
  },
  {
    code: "Bezanozano",
    name: "Bezanozano",
  },
  {
    code: "Biafada",
    name: "Biafada",
  },
  {
    code: "Bideyat_Beri",
    name: "Bideyat (Beri)",
  },
  {
    code: "Bidyogo_Bidjogo",
    name: "Bidyogo - Bidjogo",
  },
  {
    code: "Bijago",
    name: "Bijago",
  },
  {
    code: "Bilala_Bulala",
    name: "Bilala / Bulala",
  },
  {
    code: "Bilen",
    name: "Bilen",
  },
  {
    code: "Bimoba",
    name: "Bimoba",
  },
  {
    code: "Binga",
    name: "Binga",
  },
  {
    code: "Biombo_Bena_Biombo",
    name: "Biombo / Bena Biombo",
  },
  {
    code: "Bira_Babira",
    name: "Bira / Babira",
  },
  {
    code: "Birifor",
    name: "Birifor",
  },
  {
    code: "Bini_Edo",
    name: "Bini / Edo",
  },
  {
    code: "Bisa",
    name: "Bisa",
  },
  {
    code: "Birwa",
    name: "Birwa",
  },
  {
    code: "Bishari",
    name: "Bishari",
  },
  {
    code: "Bissa",
    name: "Bissa",
  },
  {
    code: "Bissio",
    name: "Bissio",
  },
  {
    code: "Boa_Ababua",
    name: "Boa / Ababua",
  },
  {
    code: "Bobo",
    name: "Bobo",
  },
  {
    code: "Boki",
    name: "Boki",
  },
  {
    code: "Boko",
    name: "Boko",
  },
  {
    code: "Bolgo",
    name: "Bolgo",
  },
  {
    code: "Bondei",
    name: "Bondei",
  },
  {
    code: "Bongo",
    name: "Bongo",
  },
  {
    code: "Boni_Aweer",
    name: "Boni / Aweer",
  },
  {
    code: "Bono",
    name: "Bono",
  },
  {
    code: "Borana",
    name: "Borana",
  },
  {
    code: "Borgu",
    name: "Borgu",
  },
  {
    code: "Boya_Larim",
    name: "Boya - Larim",
  },
  {
    code: "Bozo",
    name: "Bozo",
  },
  {
    code: "Bua_Niellim",
    name: "Bua / Niellim",
  },
  {
    code: "Bubi",
    name: "Bubi",
  },
  {
    code: "Budja_Buja",
    name: "Budja - Buja",
  },
  {
    code: "Budu_Mabudu",
    name: "Budu / Mabudu",
  },
  {
    code: "Buduma",
    name: "Buduma",
  },
  {
    code: "Bugakwe",
    name: "Bugakwe",
  },
  {
    code: "Bukusu",
    name: "Bukusu",
  },
  {
    code: "Bulahay",
    name: "Bulahay",
  },
  {
    code: "Bulsa",
    name: "Bulsa",
  },
  {
    code: "Bulu",
    name: "Bulu",
  },
  {
    code: "Bunda_Mpuon_Mbuun",
    name: "Bunda / Mpuon / Mbuun",
  },
  {
    code: "Bungu",
    name: "Bungu",
  },
  {
    code: "Bura",
    name: "Bura",
  },
  {
    code: "Busa",
    name: "Busa",
  },
  {
    code: "Burunge_Burungi",
    name: "Burunge / Burungi",
  },
  {
    code: "Bushongo_Bushong",
    name: "Bushongo / Bushong",
  },
  {
    code: "Busoga",
    name: "Busoga",
  },
  {
    code: "Buwal",
    name: "Buwal",
  },
  {
    code: "Buyu_Babuye",
    name: "Buyu / Babuye",
  },
  {
    code: "Bwa",
    name: "Bwa",
  },
  {
    code: "Bwende",
    name: "Bwende",
  },
  {
    code: "Bwile",
    name: "Bwile",
  },
  {
    code: "Bwisi",
    name: "Bwisi",
  },
  {
    code: "Chagga",
    name: "Chagga",
  },
  {
    code: "Chamba",
    name: "Chamba",
  },
  {
    code: "Chewa",
    name: "Chewa",
  },
  {
    code: "Chikide",
    name: "Chikide",
  },
  {
    code: "Chinene",
    name: "Chinene",
  },
  {
    code: "Chokwe",
    name: "Chokwe",
  },
  {
    code: "Chonyi",
    name: "Chonyi",
  },
  {
    code: "Chope",
    name: "Chope",
  },
  {
    code: "Chopi",
    name: "Chopi",
  },
  {
    code: "Cicipu",
    name: "Cicipu",
  },
  {
    code: "Cishinga",
    name: "Cishinga",
  },
  {
    code: "Cubal",
    name: "Cubal",
  },
  {
    code: "Cuepe",
    name: "Cuepe",
  },
  {
    code: "Cuis",
    name: "Cuis",
  },
  {
    code: "Dagaaba",
    name: "Dagaaba",
  },
  {
    code: "Dagik_Nuba",
    name: "Dagik (Nuba)",
  },
  {
    code: "Dagomba",
    name: "Dagomba",
  },
  {
    code: "Dahalo",
    name: "Dahalo",
  },
  {
    code: "Daju",
    name: "Daju",
  },
  {
    code: "Dakakari",
    name: "Dakakari",
  },
  {
    code: "Damay",
    name: "Damay",
  },
  {
    code: "Damara",
    name: "Damara",
  },
  {
    code: "Dangaleat",
    name: "Dangaleat",
  },
  {
    code: "Darod_Somali_Clan",
    name: "Darod (Somali Clan)",
  },
  {
    code: "Datoga",
    name: "Datoga",
  },
  {
    code: "Daza_Gourane",
    name: "Daza / Gourane",
  },
  {
    code: "Dendi",
    name: "Dendi",
  },
  {
    code: "Dengese_Ndengese",
    name: "Dengese / Ndengese",
  },
  {
    code: "Denkyira",
    name: "Denkyira",
  },
  {
    code: "Denya_Anyang",
    name: "Denya / Anyang",
  },
  {
    code: "Dghwede",
    name: "Dghwede",
  },
  {
    code: "Dhaiso",
    name: "Dhaiso",
  },
  {
    code: "Dida",
    name: "Dida",
  },
  {
    code: "Didinga",
    name: "Didinga",
  },
  {
    code: "Diffa_Arabs",
    name: "Diffa Arabs",
  },
  {
    code: "Digil_Somali_Clan",
    name: "Digil (Somali Clan)",
  },
  {
    code: "Digo",
    name: "Digo",
  },
  {
    code: "Dimba",
    name: "Dimba",
  },
  {
    code: "Dinka",
    name: "Dinka",
  },
  {
    code: "Diomande_Dan",
    name: "Diomande (Dan)",
  },
  {
    code: "Dir_Somali_Clan_Dan",
    name: "Dir (Somali Clan) (Dan)",
  },
  {
    code: "Dirasha_Gidole",
    name: "Dirasha / Gidole",
  },
  {
    code: "Dizi",
    name: "Dizi",
  },
  {
    code: "Djimini",
    name: "Djimini",
  },
  {
    code: "Dodoth",
    name: "Dodoth",
  },
  {
    code: "Dogon",
    name: "Dogon",
  },
  {
    code: "Dongotona",
    name: "Dongotona",
  },
  {
    code: "Dorobo",
    name: "Dorobo",
  },
  {
    code: "Dorze",
    name: "Dorze",
  },
  {
    code: "Dowayo",
    name: "Dowayo",
  },
  {
    code: "Duala",
    name: "Duala",
  },
  {
    code: "Dukawa",
    name: "Dukawa",
  },
  {
    code: "Duma_Adouma",
    name: "Duma - Adouma",
  },
  {
    code: "Dupa",
    name: "Dupa",
  },
  {
    code: "Duruma",
    name: "Duruma",
  },
  {
    code: "Dxeriku",
    name: "Dxeriku",
  },
  {
    code: "Dyula",
    name: "Dyula",
  },
  {
    code: "Ebira",
    name: "Ebira",
  },
  {
    code: "Ebrie",
    name: "Ebrie",
  },
  {
    code: "Edda",
    name: "Edda",
  },
  {
    code: "Edo",
    name: "Edo",
  },
  {
    code: "Efe",
    name: "Efe",
  },
  {
    code: "Efik",
    name: "Efik",
  },
  {
    code: "Ega",
    name: "Ega",
  },
  {
    code: "Eggon",
    name: "Eggon",
  },
  {
    code: "Egun",
    name: "Egun",
  },
  {
    code: "Ejagham",
    name: "Ejagham",
  },
  {
    code: "Eket",
    name: "Eket",
  },
  {
    code: "Ekiti",
    name: "Ekiti",
  },
  {
    code: "Ekoi",
    name: "Ekoi",
  },
  {
    code: "Ekonda_Mongo",
    name: "Ekonda (Mongo)",
  },
  {
    code: "El_Molo",
    name: "El Molo",
  },
  {
    code: "Elgeyo",
    name: "Elgeyo",
  },
  {
    code: "Eloyi_Afo",
    name: "Eloyi / Afo",
  },
  {
    code: "Embu",
    name: "Embu",
  },
  {
    code: "Esan",
    name: "Esan",
  },
  {
    code: "Ewe",
    name: "Ewe",
  },
  {
    code: "Ewondo",
    name: "Ewondo",
  },
  {
    code: "Ezillo",
    name: "Ezillo",
  },
  {
    code: "Falata",
    name: "Falata",
  },
  {
    code: "Falasha",
    name: "Falasha",
  },
  {
    code: "Fali_Kirdi",
    name: "Fali (Kirdi)",
  },
  {
    code: "Fang",
    name: "Fang",
  },
  {
    code: "Fante",
    name: "Fante",
  },
  {
    code: "Feroghe_Kaligi",
    name: "Feroghe / Kaligi",
  },
  {
    code: "Fipa",
    name: "Fipa",
  },
  {
    code: "Fon",
    name: "Fon",
  },
  {
    code: "Frafra",
    name: "Frafra",
  },
  {
    code: "Fulani",
    name: "Fulani",
  },
  {
    code: "Fulbe_Kanoumoudji",
    name: "Fulbe Kanoumoudji",
  },
  {
    code: "Fuliiru_Fuliro",
    name: "Fuliiru / Fuliro",
  },
  {
    code: "Fur",
    name: "Fur",
  },
  {
    code: "Ga",
    name: "Ga",
  },
  {
    code: "Gabra",
    name: "Gabra",
  },
  {
    code: "Gadabuursi",
    name: "Gadabuursi",
  },
  {
    code: "Gagu",
    name: "Gagu",
  },
  {
    code: "Galoa",
    name: "Galoa",
  },
  {
    code: "Galla",
    name: "Galla",
  },
  {
    code: "Gambue",
    name: "Gambue",
  },
  {
    code: "Gamergu",
    name: "Gamergu",
  },
  {
    code: "Ganguela",
    name: "Ganguela",
  },
  {
    code: "Garre",
    name: "Garre",
  },
  {
    code: "Gavar",
    name: "Gavar",
  },
  {
    code: "Gwa",
    name: "Gwa",
  },
  {
    code: "Gawwada",
    name: "Gawwada",
  },
  {
    code: "Gbaya",
    name: "Gbaya",
  },
  {
    code: "Gemjek_Kirdi",
    name: "Gemjek (Kirdi)",
  },
  {
    code: "Gimr_Kimr",
    name: "Gimr / Kimr",
  },
  {
    code: "Giriama",
    name: "Giriama",
  },
  {
    code: "Gisiga_Kirdi",
    name: "Gisiga (Kirdi)",
  },
  {
    code: "Glavda",
    name: "Glavda",
  },
  {
    code: "Gogo",
    name: "Gogo",
  },
  {
    code: "Gola",
    name: "Gola",
  },
  {
    code: "Gollo",
    name: "Gollo",
  },
  {
    code: "Goma",
    name: "Goma",
  },
  {
    code: "Gonja",
    name: "Gonja",
  },
  {
    code: "Gorowa_Goroa",
    name: "Gorowa / Goroa",
  },
  {
    code: "Gosha",
    name: "Gosha",
  },
  {
    code: "Gouin_Gwen",
    name: "Gouin / Gwen",
  },
  {
    code: "Grebo",
    name: "Grebo",
  },
  {
    code: "Griqua",
    name: "Griqua",
  },
  {
    code: "Guang",
    name: "Guang",
  },
  {
    code: "Guduf",
    name: "Guduf",
  },
  {
    code: "Guere_We",
    name: "Guere / We",
  },
  {
    code: "Gumuz",
    name: "Gumuz",
  },
  {
    code: "Gungu",
    name: "Gungu",
  },
  {
    code: "Gurage",
    name: "Gurage",
  },
  {
    code: "Gurma",
    name: "Gurma",
  },
  {
    code: "Guro",
    name: "Guro",
  },
  {
    code: "Gurunsi",
    name: "Gurunsi",
  },
  {
    code: "Gusii_Abagusii",
    name: "Gusii / Abagusii",
  },
  {
    code: "Gvoko",
    name: "Gvoko",
  },
  {
    code: "Gwari",
    name: "Gwari",
  },
  {
    code: "Gwikwe_Bushmen",
    name: "Gwikwe bushmen",
  },
  {
    code: "Gyele",
    name: "Gyele",
  },
  {
    code: "Ha",
    name: "Ha",
  },
  {
    code: "Habesha",
    name: "Habesha",
  },
  {
    code: "Hadimu",
    name: "Hadimu",
  },
  {
    code: "Hadiya",
    name: "Hadiya",
  },
  {
    code: "Hadzabe",
    name: "Hadzabe",
  },
  {
    code: "Hakaona",
    name: "Hakaona",
  },
  {
    code: "Ham",
    name: "Ham",
  },
  {
    code: "Hamer",
    name: "Hamer",
  },
  {
    code: "Handa",
    name: "Handa",
  },
  {
    code: "Harari",
    name: "Harari",
  },
  {
    code: "Hausa",
    name: "Hausa",
  },
  {
    code: "Hawadle_Somali_Clan",
    name: "Hawadle (Somali Clan)",
  },
  {
    code: "Hawazma",
    name: "Hawazma",
  },
  {
    code: "Hawiye_Somali_Clan",
    name: "Hawiye (Somali Clan)",
  },
  {
    code: "Haya",
    name: "Haya",
  },
  {
    code: "Hedareb",
    name: "Hedareb",
  },
  {
    code: "Hehe",
    name: "Hehe",
  },
  {
    code: "Hemba",
    name: "Hemba",
  },
  {
    code: "Herero",
    name: "Herero",
  },
  {
    code: "Hide_Tur",
    name: "Hide / Tur",
  },
  {
    code: "Himba",
    name: "Himba",
  },
  {
    code: "Holi_Ije",
    name: "Holi / Ije",
  },
  {
    code: "Holoholo",
    name: "Holoholo",
  },
  {
    code: "Hororo",
    name: "Hororo",
  },
  {
    code: "Humbi",
    name: "Humbi",
  },
  {
    code: "Humr_Humur",
    name: "Humr / Humur",
  },
  {
    code: "Hunde",
    name: "Hunde",
  },
  {
    code: "Hunganna_Bahuana",
    name: "Hunganna / Bahuana",
  },
  {
    code: "Hutu",
    name: "Hutu",
  },
  {
    code: "Hurza_Kirdi",
    name: "Hurza (Kirdi)",
  },
  {
    code: "Ibibio",
    name: "Ibibio",
  },
  {
    code: "Idoma",
    name: "Idoma",
  },
  {
    code: "Ifoto",
    name: "Ifoto",
  },
  {
    code: "Igala",
    name: "Igala",
  },
  {
    code: "Igbo",
    name: "Igbo",
  },
  {
    code: "Igbomina",
    name: "Igbomina",
  },
  {
    code: "Igede",
    name: "Igede",
  },
  {
    code: "Ijaw_Ijo",
    name: "Ijaw / Ijo",
  },
  {
    code: "Ije_Holi",
    name: "Ije / Holi",
  },
  {
    code: "Ijebu",
    name: "Ijebu",
  },
  {
    code: "Ijesha",
    name: "Ijesha",
  },
  {
    code: "Ikoma",
    name: "Ikoma",
  },
  {
    code: "Ila",
    name: "Ila",
  },
  {
    code: "Ilchamus",
    name: "Ilchamus",
  },
  {
    code: "Imatong",
    name: "Imatong",
  },
  {
    code: "Imraghen",
    name: "Imraghen",
  },
  {
    code: "Indri",
    name: "Indri",
  },
  {
    code: "Iramba_Nyiramba",
    name: "Iramba / Nyiramba",
  },
  {
    code: "Iraqw",
    name: "Iraqw",
  },
  {
    code: "Irigwe",
    name: "Irigwe",
  },
  {
    code: "Isaaq",
    name: "Isaaq",
  },
  {
    code: "Issa",
    name: "Issa",
  },
  {
    code: "Isukha",
    name: "Isukha",
  },
  {
    code: "Iteso_Teso",
    name: "Iteso - Teso",
  },
  {
    code: "Itsekiri",
    name: "Itsekiri",
  },
  {
    code: "Jabo",
    name: "Jabo",
  },
  {
    code: "Jakhanke_Jahanka",
    name: "Jakhanke / Jahanka",
  },
  {
    code: "Japadhola",
    name: "Japadhola",
  },
  {
    code: "Jeberti",
    name: "Jeberti",
  },
  {
    code: "Jenjo_Dza",
    name: "Jenjo / Dza",
  },
  {
    code: "Jibu",
    name: "Jibu",
  },
  {
    code: "Jie",
    name: "Jie",
  },
  {
    code: "Jijili",
    name: "Jijili",
  },
  {
    code: "Jiye",
    name: "Jiye",
  },
  {
    code: "Jola_Diola",
    name: "Jola / Diola",
  },
  {
    code: "Joluo_Luo",
    name: "Joluo (Luo)",
  },
  {
    code: "Jukun",
    name: "Jukun",
  },
  {
    code: "Jumjum",
    name: "Jumjum",
  },
  {
    code: "Jur",
    name: "Jur",
  },
  {
    code: "Jur_Mananger",
    name: "Jur Mananger",
  },
  {
    code: "Kababish",
    name: "Kababish",
  },
  {
    code: "Kabras",
    name: "Kabras",
  },
  {
    code: "Kabye_Kabre",
    name: "Kabye / Kabre",
  },
  {
    code: "Kachipo",
    name: "Kachipo",
  },
  {
    code: "Kadam",
    name: "Kadam",
  },
  {
    code: "Kadara_Adara",
    name: "Kadara / Adara",
  },
  {
    code: "Kafa_Kafficho",
    name: "Kafa / Kafficho",
  },
  {
    code: "Kagulu_Kaguru",
    name: "Kagulu / Kaguru",
  },
  {
    code: "Kakwa",
    name: "Kakwa",
  },
  {
    code: "Kalanga",
    name: "Kalanga",
  },
  {
    code: "Kalenjin",
    name: "Kalenjin",
  },
  {
    code: "Kamba",
    name: "Kamba",
  },
  {
    code: "Kambari",
    name: "Kambari",
  },
  {
    code: "Kami",
    name: "Kami",
  },
  {
    code: "Kamwe",
    name: "Kamwe",
  },
  {
    code: "Kanam",
    name: "Kanam",
  },
  {
    code: "Kanembu",
    name: "Kanembu",
  },
  {
    code: "Kango",
    name: "Kango",
  },
  {
    code: "Kanuri",
    name: "Kanuri",
  },
  {
    code: "Kaonde",
    name: "Kaonde",
  },
  {
    code: "Kapsiki_Kirdi",
    name: "Kapsiki (Kirdi)",
  },
  {
    code: "Karagwe_Nyambo",
    name: "Karagwe / Nyambo",
  },
  {
    code: "Karamojong",
    name: "Karamojong",
  },
  {
    code: "Karo",
    name: "Karo",
  },
  {
    code: "Karoninka",
    name: "Karoninka",
  },
  {
    code: "Kassena",
    name: "Kassena",
  },
  {
    code: "Karrayyu_Kereyu",
    name: "Karrayyu / Kereyu",
  },
  {
    code: "Katana_Mama",
    name: "Katana / Mama",
  },
  {
    code: "Kela_Akela",
    name: "Kela / Akela",
  },
  {
    code: "Keliko",
    name: "Keliko",
  },
  {
    code: "Kenga",
    name: "Kenga",
  },
  {
    code: "Kete_Mbagani",
    name: "Kete / Mbagani",
  },
  {
    code: "Ketebo_Mening",
    name: "Ketebo - Mening",
  },
  {
    code: "Kgalagadi_Bakgalagadi",
    name: "Kgalagadi / Bakgalagadi",
  },
  {
    code: "KhoiKhoi",
    name: "KhoiKhoi",
  },
  {
    code: "Khoisan",
    name: "Khoisan",
  },
  {
    code: "Kikuyu",
    name: "Kikuyu",
  },
  {
    code: "Kinga",
    name: "Kinga",
  },
  {
    code: "Kipsigis",
    name: "Kipsigis",
  },
  {
    code: "Kirdi",
    name: "Kirdi",
  },
  {
    code: "Kissi",
    name: "Kissi",
  },
  {
    code: "Kom",
    name: "Kom",
  },
  {
    code: "Koma",
    name: "Koma",
  },
  {
    code: "Komo_Bakumu",
    name: "Komo / Bakumu",
  },
  {
    code: "Komoganza",
    name: "Komoganza",
  },
  {
    code: "Kongo",
    name: "Kongo",
  },
  {
    code: "Konkomba",
    name: "Konkomba",
  },
  {
    code: "Kono",
    name: "Kono",
  },
  {
    code: "Konso",
    name: "Konso",
  },
  {
    code: "Konyagi_Wamei",
    name: "Konyagi / Wamei",
  },
  {
    code: "Konzo_Konjo",
    name: "Konzo - Konjo",
  },
  {
    code: "Korbo",
    name: "Korbo",
  },
  {
    code: "Korekore",
    name: "Korekore",
  },
  {
    code: "Koro",
    name: "Koro",
  },
  {
    code: "Kota",
    name: "Kota",
  },
  {
    code: "Kotoko",
    name: "Kotoko",
  },
  {
    code: "Kotokoli_Temba",
    name: "Kotokoli - Temba",
  },
  {
    code: "Kpelle",
    name: "Kpelle",
  },
  {
    code: "Krahn",
    name: "Krahn",
  },
  {
    code: "Krobo",
    name: "Krobo",
  },
  {
    code: "Krongo_Nuba",
    name: "Krongo (Nuba)",
  },
  {
    code: "Kru",
    name: "Kru",
  },
  {
    code: "Kuba",
    name: "Kuba",
  },
  {
    code: "Kujarke",
    name: "Kujarke",
  },
  {
    code: "Kuku",
    name: "Kuku",
  },
  {
    code: "Kulango",
    name: "Kulango",
  },
  {
    code: "Kumam",
    name: "Kumam",
  },
  {
    code: "Kunama",
    name: "Kunama",
  },
  {
    code: "Kunda",
    name: "Kunda",
  },
  {
    code: "Kung",
    name: "Kung",
  },
  {
    code: "Kurang",
    name: "Kurang",
  },
  {
    code: "Kuranko_Koranko",
    name: "Kuranko / Koranko",
  },
  {
    code: "Kuria",
    name: "Kuria",
  },
  {
    code: "Kurtey",
    name: "Kurtey",
  },
  {
    code: "Kurumba",
    name: "Kurumba",
  },
  {
    code: "Kusasi",
    name: "Kusasi",
  },
  {
    code: "Kusu",
    name: "Kusu",
  },
  {
    code: "Kutu",
    name: "Kutu",
  },
  {
    code: "Kuyu",
    name: "Kuyu",
  },
  {
    code: "Kwahu",
    name: "Kwahu",
  },
  {
    code: "Kwala",
    name: "Kwala",
  },
  {
    code: "Kwama",
    name: "Kwama",
  },
  {
    code: "Kwandu",
    name: "Kwandu",
  },
  {
    code: "Kwanyama",
    name: "Kwanyama",
  },
  {
    code: "Kwasio_Bujeba",
    name: "Kwasio - Bujeba",
  },
  {
    code: "Kwaya",
    name: "Kwaya",
  },
  {
    code: "Kwegu",
    name: "Kwegu",
  },
  {
    code: "Kwele_Bakwele",
    name: "Kwele / Bakwele",
  },
  {
    code: "Kwere",
    name: "Kwere",
  },
  {
    code: "Kwisi",
    name: "Kwisi",
  },
  {
    code: "Lafon",
    name: "Lafon",
  },
  {
    code: "Laka",
    name: "Laka",
  },
  {
    code: "Lala",
    name: "Lala",
  },
  {
    code: "Lamang",
    name: "Lamang",
  },
  {
    code: "Lamba_Togo",
    name: "Lamba (Togo)",
  },
  {
    code: "Lamba_Zambia",
    name: "Lamba (Zambia)",
  },
  {
    code: "Lambya",
    name: "Lambya",
  },
  {
    code: "Lango",
    name: "Lango",
  },
  {
    code: "Landuma",
    name: "Landuma",
  },
  {
    code: "Larim",
    name: "Larim",
  },
  {
    code: "Lega",
    name: "Lega",
  },
  {
    code: "Lele",
    name: "Lele",
  },
  {
    code: "Lendu",
    name: "Lendu",
  },
  {
    code: "Lengola",
    name: "Lengola",
  },
  {
    code: "Lenje",
    name: "Lenje",
  },
  {
    code: "Lese_Pygmies",
    name: "Lese Pygmies",
  },
  {
    code: "Ligbi",
    name: "Ligbi",
  },
  {
    code: "Lika",
    name: "Lika",
  },
  {
    code: "Limba",
    name: "Limba",
  },
  {
    code: "Lobedu",
    name: "Lobedu",
  },
  {
    code: "Lobi",
    name: "Lobi",
  },
  {
    code: "Logir",
    name: "Logir",
  },
  {
    code: "Logo",
    name: "Logo",
  },
  {
    code: "Loi_Baloi",
    name: "Loi / Baloi",
  },
  {
    code: "Lokoya",
    name: "Lokoya",
  },
  {
    code: "Loma",
    name: "Loma",
  },
  {
    code: "Lomwe",
    name: "Lomwe",
  },
  {
    code: "Longuda",
    name: "Longuda",
  },
  {
    code: "Lopit",
    name: "Lopit",
  },
  {
    code: "Lokele_Wagenia",
    name: "Lokele / Wagenia",
  },
  {
    code: "Loko",
    name: "Loko",
  },
  {
    code: "Losso",
    name: "Losso",
  },
  {
    code: "Lotuko",
    name: "Lotuko",
  },
  {
    code: "Lozi",
    name: "Lozi",
  },
  {
    code: "Luba",
    name: "Luba",
  },
  {
    code: "Luchazi",
    name: "Luchazi",
  },
  {
    code: "Lugbara",
    name: "Lugbara",
  },
  {
    code: "Lugot",
    name: "Lugot",
  },
  {
    code: "Luguru",
    name: "Luguru",
  },
  {
    code: "Luhya",
    name: "Luhya",
  },
  {
    code: "Lulua_Luluwa",
    name: "Lulua - Luluwa",
  },
  {
    code: "Lulubo",
    name: "Lulubo",
  },
  {
    code: "Lumbo_Lumbu",
    name: "Lumbo / Lumbu",
  },
  {
    code: "Lunda",
    name: "Lunda",
  },
  {
    code: "Lungu",
    name: "Lungu",
  },
  {
    code: "Luo",
    name: "Luo",
  },
  {
    code: "Luwo",
    name: "Luwo",
  },
  {
    code: "Lwalwa",
    name: "Lwalwa",
  },
  {
    code: "Lwena_Luvale",
    name: "Lwena / Luvale",
  },
  {
    code: "Maasai",
    name: "Maasai",
  },
  {
    code: "Maba",
    name: "Maba",
  },
  {
    code: "Maban",
    name: "Maban",
  },
  {
    code: "Mabas",
    name: "Mabas",
  },
  {
    code: "Mabato",
    name: "Mabato",
  },
  {
    code: "Mada_Kirdi",
    name: "Mada (Kirdi)",
  },
  {
    code: "Madi",
    name: "Madi",
  },
  {
    code: "Mafa_Kirdi",
    name: "Mafa (Kirdi)",
  },
  {
    code: "Mahafaly",
    name: "Mahafaly",
  },
  {
    code: "Mahi",
    name: "Mahi",
  },
  {
    code: "Mahongwe",
    name: "Mahongwe",
  },
  {
    code: "Mai_Mai",
    name: "Mai-Mai",
  },
  {
    code: "Majang_Majangir",
    name: "Majang / Majangir",
  },
  {
    code: "Makaa",
    name: "Makaa",
  },
  {
    code: "Makere",
    name: "Makere",
  },
  {
    code: "Makoa",
    name: "Makoa",
  },
  {
    code: "Makonde",
    name: "Makonde",
  },
  {
    code: "Makua",
    name: "Makua",
  },
  {
    code: "Malinke",
    name: "Malinke",
  },
  {
    code: "Mama_Katana",
    name: "Mama / Katana",
  },
  {
    code: "Mambila",
    name: "Mambila",
  },
  {
    code: "Mamprusi",
    name: "Mamprusi",
  },
  {
    code: "Mamvu",
    name: "Mamvu",
  },
  {
    code: "Mandara",
    name: "Mandara",
  },
  {
    code: "Malinke_Madinka",
    name: "Malinke / Mandinka",
  },
  {
    code: "Mande",
    name: "Mande",
  },
  {
    code: "Mandja",
    name: "Mandja",
  },
  {
    code: "Mangayat",
    name: "Mangayat",
  },
  {
    code: "Mangbetu",
    name: "Mangbetu",
  },
  {
    code: "Manjak",
    name: "Manjak",
  },
  {
    code: "Mankanya",
    name: "Mankanya",
  },
  {
    code: "Mano",
    name: "Mano",
  },
  {
    code: "Manyika",
    name: "Manyika",
  },
  {
    code: "Mao",
    name: "Mao",
  },
  {
    code: "Marakwet",
    name: "Marakwet",
  },
  {
    code: "Maravi_Nyanja",
    name: "Maravi / Nyanja",
  },
  {
    code: "Margi",
    name: "Margi",
  },
  {
    code: "Masa_Banana",
    name: "Masa - Banana",
  },
  {
    code: "Marka",
    name: "Marka",
  },
  {
    code: "Masaba",
    name: "Masaba",
  },
  {
    code: "Masalit",
    name: "Masalit",
  },
  {
    code: "Mau",
    name: "Mau",
  },
  {
    code: "Maya",
    name: "Maya",
  },
  {
    code: "Mbaka",
    name: "Mbaka",
  },
  {
    code: "Mbala_Bambala",
    name: "Mbala / Bambala",
  },
  {
    code: "Mbanja",
    name: "Mbanja",
  },
  {
    code: "Mbarakwengo",
    name: "Mbarakwengo",
  },
  {
    code: "Mbeere",
    name: "Mbeere",
  },
  {
    code: "Mbete_Ambete",
    name: "Mbete / Ambete",
  },
  {
    code: "Mbochi",
    name: "Mbochi",
  },
  {
    code: "Mboku",
    name: "Mboku",
  },
  {
    code: "Mbole",
    name: "Mbole",
  },
  {
    code: "Mbororo",
    name: "Mbororo",
  },
  {
    code: "Mbugwe",
    name: "Mbugwe",
  },
  {
    code: "Mbukushu",
    name: "Mbukushu",
  },
  {
    code: "Mbum",
    name: "Mbum",
  },
  {
    code: "Mbunda",
    name: "Mbunda",
  },
  {
    code: "Mbundu",
    name: "Mbundu",
  },
  {
    code: "Mbunza",
    name: "Mbunza",
  },
  {
    code: "Mbuva",
    name: "Mbuva",
  },
  {
    code: "Meen_Bodi_Mekan",
    name: "Meen - Bodi - Mekan",
  },
  {
    code: "Mende",
    name: "Mende",
  },
  {
    code: "Menit",
    name: "Menit",
  },
  {
    code: "Merina",
    name: "Merina",
  },
  {
    code: "Meru",
    name: "Meru",
  },
  {
    code: "Mesakin_Nuba",
    name: "Mesakin (Nuba)",
  },
  {
    code: "Messiria",
    name: "Messiria",
  },
  {
    code: "Metoko_Mituku",
    name: "Metoko / Mituku",
  },
  {
    code: "Midob_Meido",
    name: "Midob / Meido",
  },
  {
    code: "Mijikenda",
    name: "Mijikenda",
  },
  {
    code: "Mikea",
    name: "Mikea",
  },
  {
    code: "Mikifore",
    name: "Mikifore",
  },
  {
    code: "Mima",
    name: "Mima",
  },
  {
    code: "Mimi",
    name: "Mimi",
  },
  {
    code: "Mina",
    name: "Mina",
  },
  {
    code: "Mineo",
    name: "Mineo",
  },
  {
    code: "Minianka",
    name: "Minianka",
  },
  {
    code: "Mitsogo",
    name: "Mitsogo",
  },
  {
    code: "Moba_Bimoba",
    name: "Moba (Bimoba)",
  },
  {
    code: "Mofu_Kirdi",
    name: "Mofu (Kirdi)",
  },
  {
    code: "Mole_Dagbon",
    name: "Mole-Dagbon",
  },
  {
    code: "Molokwo_Kirdi",
    name: "Molokwo (Kirdi)",
  },
  {
    code: "Mongo",
    name: "Mongo",
  },
  {
    code: "Moor",
    name: "Moor",
  },
  {
    code: "Mora_Kirdi",
    name: "Mora (Kirdi)",
  },
  {
    code: "Morokodo",
    name: "Morokodo",
  },
  {
    code: "Moru",
    name: "Moru",
  },
  {
    code: "Mossi",
    name: "Mossi",
  },
  {
    code: "Moussey_Musei",
    name: "Moussey / Musei",
  },
  {
    code: "Mpongwe",
    name: "Mpongwe",
  },
  {
    code: "Muduvu",
    name: "Muduvu",
  },
  {
    code: "Muila",
    name: "Muila",
  },
  {
    code: "Mukogodo",
    name: "Mukogodo",
  },
  {
    code: "Muktele",
    name: "Muktele",
  },
  {
    code: "Mumuye",
    name: "Mumuye",
  },
  {
    code: "Mundang",
    name: "Mundang",
  },
  {
    code: "Mundari",
    name: "Mundari",
  },
  {
    code: "Mundu",
    name: "Mundu",
  },
  {
    code: "Munyoyaya",
    name: "Munyoyaya",
  },
  {
    code: "Murle",
    name: "Murle",
  },
  {
    code: "Mursi",
    name: "Mursi",
  },
  {
    code: "Musgum_Kirdi",
    name: "Musgum (Kirdi)",
  },
  {
    code: "Muyang_Kirdi",
    name: "Muyang (Kirdi)",
  },
  {
    code: "Mwanga",
    name: "Mwanga",
  },
  {
    code: "Nafana",
    name: "Nafana",
  },
  {
    code: "Nalu",
    name: "Nalu",
  },
  {
    code: "Nama",
    name: "Nama",
  },
  {
    code: "Nande",
    name: "Nande",
  },
  {
    code: "Nandi",
    name: "Nandi",
  },
  {
    code: "Napore",
    name: "Napore",
  },
  {
    code: "Nara",
    name: "Nara",
  },
  {
    code: "Ndaka",
    name: "Ndaka",
  },
  {
    code: "Ndali_Sukwa",
    name: "Ndali / Sukwa",
  },
  {
    code: "Ndamba",
    name: "Ndamba",
  },
  {
    code: "Ndau",
    name: "Ndau",
  },
  {
    code: "Ndebele",
    name: "Ndebele",
  },
  {
    code: "Ndembu",
    name: "Ndembu",
  },
  {
    code: "Ndengereko",
    name: "Ndengereko",
  },
  {
    code: "Ndogo",
    name: "Ndogo",
  },
  {
    code: "Ndowe",
    name: "Ndowe",
  },
  {
    code: "Ndreme",
    name: "Ndreme",
  },
  {
    code: "Ndyuka",
    name: "Ndyuka",
  },
  {
    code: "Nemadi",
    name: "Nemadi",
  },
  {
    code: "Neyo",
    name: "Neyo",
  },
  {
    code: "Ngando_Bangandu",
    name: "Ngando / Bangandu",
  },
  {
    code: "Ngbaka",
    name: "Ngbaka",
  },
  {
    code: "Ngbandi",
    name: "Ngbandi",
  },
  {
    code: "Ngendelengo",
    name: "Ngendelengo",
  },
  {
    code: "Ngombe",
    name: "Ngombe",
  },
  {
    code: "Ngonde",
    name: "Ngonde",
  },
  {
    code: "Ngongo",
    name: "Ngongo",
  },
  {
    code: "Ngoni",
    name: "Ngoni",
  },
  {
    code: "Ngulngule",
    name: "Ngulngule",
  },
  {
    code: "Nguni",
    name: "Nguni",
  },
  {
    code: "Ninzam_Ninzo",
    name: "Ninzam / Ninzo",
  },
  {
    code: "Njem",
    name: "Njem",
  },
  {
    code: "Njemps_Ilchamus",
    name: "Njemps / Ilchamus",
  },
  {
    code: "Nok",
    name: "Nok",
  },
  {
    code: "Nkanu",
    name: "Nkanu",
  },
  {
    code: "Nkoya",
    name: "Nkoya",
  },
  {
    code: "Nkundu",
    name: "Nkundu",
  },
  {
    code: "Nkutu_Kutshu",
    name: "Nkutu / Kutshu",
  },
  {
    code: "Nsenga",
    name: "Nsenga",
  },
  {
    code: "Nso",
    name: "Nso",
  },
  {
    code: "Ntomba",
    name: "Ntomba",
  },
  {
    code: "Nuba",
    name: "Nuba",
  },
  {
    code: "Nuba_Krongo",
    name: "Nuba Krongo",
  },
  {
    code: "Nuba_Mesakin",
    name: "Nuba Mesakin",
  },
  {
    code: "Nuba_Shatt",
    name: "Nuba Shatt",
  },
  {
    code: "Nubi_Nubian",
    name: "Nubi - Nubian",
  },
  {
    code: "Nuer",
    name: "Nuer",
  },
  {
    code: "Nuna_Nunuma",
    name: "Nuna / Nunuma",
  },
  {
    code: "Nupe",
    name: "Nupe",
  },
  {
    code: "Nyakyusa",
    name: "Nyakyusa",
  },
  {
    code: "Nyambo_Karagwe",
    name: "Nyambo / Karagwe",
  },
  {
    code: "Nyamwezi",
    name: "Nyamwezi",
  },
  {
    code: "Nyanga",
    name: "Nyanga",
  },
  {
    code: "Nyangatom",
    name: "Nyangatom",
  },
  {
    code: "Nyangia",
    name: "Nyangia",
  },
  {
    code: "Nyangwara",
    name: "Nyangwara",
  },
  {
    code: "Nyanja_Maravi",
    name: "Nyanja / Maravi",
  },
  {
    code: "Nyiha",
    name: "Nyiha",
  },
  {
    code: "Nyindu",
    name: "Nyindu",
  },
  {
    code: "Nzebi",
    name: "Nzebi",
  },
  {
    code: "Nzema",
    name: "Nzema",
  },
  {
    code: "Ogoni",
    name: "Ogoni",
  },
  {
    code: "Okavango_Peoples",
    name: "Okavango peoples",
  },
  {
    code: "Okebu_Kebu",
    name: "Okebu (Kebu)",
  },
  {
    code: "Okiek",
    name: "Okiek",
  },
  {
    code: "Olubo",
    name: "Olubo",
  },
  {
    code: "Omotic",
    name: "Omotic",
  },
  {
    code: "Ondo",
    name: "Ondo",
  },
  {
    code: "Opo",
    name: "Opo",
  },
  {
    code: "Orma",
    name: "Orma",
  },
  {
    code: "Oron",
    name: "Oron",
  },
  {
    code: "Oromo",
    name: "Oromo",
  },
  {
    code: "Oropom",
    name: "Oropom",
  },
  {
    code: "Ovambo",
    name: "Ovambo",
  },
  {
    code: "Ovimbundu",
    name: "Ovimbundu",
  },
  {
    code: "Owo",
    name: "Owo",
  },
  {
    code: "Papel",
    name: "Papel",
  },
  {
    code: "Parakuyo",
    name: "Parakuyo",
  },
  {
    code: "Pare",
    name: "Pare",
  },
  {
    code: "Pari_Lafon",
    name: "Pari - Lafon",
  },
  {
    code: "Pedi",
    name: "Pedi",
  },
  {
    code: "Pende",
    name: "Pende",
  },
  {
    code: "Pila_Pila",
    name: "Pila Pila",
  },
  {
    code: "Podoko_Kirdi",
    name: "Podoko (Kirdi)",
  },
  {
    code: "Pojulu",
    name: "Pojulu",
  },
  {
    code: "Pokomo",
    name: "Pokomo",
  },
  {
    code: "Pokot",
    name: "Pokot",
  },
  {
    code: "Pondo_Mpondo",
    name: "Pondo / Mpondo",
  },
  {
    code: "Punu",
    name: "Punu",
  },
  {
    code: "Qemant_Agaw",
    name: "Qemant (Agaw)",
  },
  {
    code: "Rahanweyn_Somali_Clan",
    name: "Rahanweyn (Somali Clan)",
  },
  {
    code: "Rangi",
    name: "Rangi",
  },
  {
    code: "Rashaida",
    name: "Rashaida",
  },
  {
    code: "Reguibat",
    name: "Reguibat",
  },
  {
    code: "Rendille",
    name: "Rendille",
  },
  {
    code: "Rer_Bare",
    name: "Rer Bare",
  },
  {
    code: "Reshe_Reshawa",
    name: "Reshe / Reshawa",
  },
  {
    code: "Rozwi_Rozvi",
    name: "Rozwi / Rozvi",
  },
  {
    code: "Rukuba",
    name: "Rukuba",
  },
  {
    code: "Rundi",
    name: "Rundi",
  },
  {
    code: "Sagara",
    name: "Sagara",
  },
  {
    code: "Saho",
    name: "Saho",
  },
  {
    code: "Sakalava",
    name: "Sakalava",
  },
  {
    code: "Sakata_Basakata",
    name: "Sakata / Basakata",
  },
  {
    code: "Sakuye",
    name: "Sakuye",
  },
  {
    code: "Salampasu",
    name: "Salampasu",
  },
  {
    code: "Samburu",
    name: "Samburu",
  },
  {
    code: "Samia",
    name: "Samia",
  },
  {
    code: "Samo_Kalemse",
    name: "Samo / kalemse",
  },
  {
    code: "San",
    name: "San",
  },
  {
    code: "Sandawe",
    name: "Sandawe",
  },
  {
    code: "Sango_Sanga",
    name: "Sango / Sanga",
  },
  {
    code: "Sanye_Watha",
    name: "Sanye - Watha",
  },
  {
    code: "Sara",
    name: "Sara",
  },
  {
    code: "Saransoor_Somali_Clan",
    name: "Saransoor (Somali Clan)",
  },
  {
    code: "Seba",
    name: "Seba",
  },
  {
    code: "Sebei",
    name: "Sebei",
  },
  {
    code: "Sefwi",
    name: "Sefwi",
  },
  {
    code: "Segeju",
    name: "Segeju",
  },
  {
    code: "Seke",
    name: "Seke",
  },
  {
    code: "Sena",
    name: "Sena",
  },
  {
    code: "Senga",
    name: "Senga",
  },
  {
    code: "Sengwer",
    name: "Sengwer",
  },
  {
    code: "Senufo",
    name: "Senufo",
  },
  {
    code: "Serahule",
    name: "Serahule",
  },
  {
    code: "Sere",
    name: "Sere",
  },
  {
    code: "Serer",
    name: "Serer",
  },
  {
    code: "Shai",
    name: "Shai",
  },
  {
    code: "Shambaa",
    name: "Shambaa",
  },
  {
    code: "Shangawa_Shanga",
    name: "Shangawa / Shanga",
  },
  {
    code: "Shatt_Thuri",
    name: "Shatt (Thuri)",
  },
  {
    code: "Sherbro",
    name: "Sherbro",
  },
  {
    code: "Shi_Mashi",
    name: "Shi / Mashi",
  },
  {
    code: "Shilluk",
    name: "Shilluk",
  },
  {
    code: "Shona",
    name: "Shona",
  },
  {
    code: "Shuwa_Arabs",
    name: "Shuwa Arabs",
  },
  {
    code: "Sidama_Sidamo_Sadama",
    name: "Sidama / Sidamo / Sadama",
  },
  {
    code: "Sihanaka",
    name: "Sihanaka",
  },
  {
    code: "Sinyar",
    name: "Sinyar",
  },
  {
    code: "Sissala",
    name: "Sissala",
  },
  {
    code: "Somalis",
    name: "Somalis",
  },
  {
    code: "Somba",
    name: "Somba",
  },
  {
    code: "Sonde",
    name: "Sonde",
  },
  {
    code: "Songhai",
    name: "Songhai",
  },
  {
    code: "Songo",
    name: "Songo",
  },
  {
    code: "Songora",
    name: "Songora",
  },
  {
    code: "Songye",
    name: "Songye",
  },
  {
    code: "Soninke",
    name: "Soninke",
  },
  {
    code: "Sonjo_Temi",
    name: "Sonjo (Temi)",
  },
  {
    code: "Suba",
    name: "Suba",
  },
  {
    code: "Subia_Subiya",
    name: "Subia / Subiya",
  },
  {
    code: "Suku",
    name: "Suku",
  },
  {
    code: "Sukuma",
    name: "Sukuma",
  },
  {
    code: "Sukur",
    name: "Sukur",
  },
  {
    code: "Sumbwa",
    name: "Sumbwa",
  },
  {
    code: "Sundi_Basundi",
    name: "Sundi / Basundi",
  },
  {
    code: "Suri",
    name: "Suri",
  },
  {
    code: "Surma",
    name: "Surma",
  },
  {
    code: "Susu",
    name: "Susu",
  },
  {
    code: "Swahili",
    name: "Swahili",
  },
  {
    code: "Swazi",
    name: "Swazi",
  },
  {
    code: "Tabwa",
    name: "Tabwa",
  },
  {
    code: "Taita",
    name: "Taita",
  },
  {
    code: "Tallensi",
    name: "Tallensi",
  },
  {
    code: "Tama",
    name: "Tama",
  },
  {
    code: "Tamberma",
    name: "Tamberma",
  },
  {
    code: "Tammari",
    name: "Tammari",
  },
  {
    code: "Tana_Orma",
    name: "Tana Orma",
  },
  {
    code: "Tanala",
    name: "Tanala",
  },
  {
    code: "Tandroy",
    name: "Tandroy",
  },
  {
    code: "Taneka",
    name: "Taneka",
  },
  {
    code: "Taveta",
    name: "Taveta",
  },
  {
    code: "Teda",
    name: "Teda",
  },
  {
    code: "Tchamba",
    name: "Tchamba",
  },
  {
    code: "Teke",
    name: "Teke",
  },
  {
    code: "Temba_Kotokoli",
    name: "Temba - Kotokoli",
  },
  {
    code: "Temne",
    name: "Temne",
  },
  {
    code: "Tenda_Tanda",
    name: "Tenda / Tanda",
  },
  {
    code: "Tenet",
    name: "Tenet",
  },
  {
    code: "Tepeth_So",
    name: "Tepeth / So",
  },
  {
    code: "Tera",
    name: "Tera",
  },
  {
    code: "Terik",
    name: "Terik",
  },
  {
    code: "Teso_Iteso",
    name: "Teso - Iteso",
  },
  {
    code: "Tetela",
    name: "Tetela",
  },
  {
    code: "Tharaka",
    name: "Tharaka",
  },
  {
    code: "Thembu_Tembu",
    name: "Thembu / Tembu",
  },
  {
    code: "Thur_Ethur",
    name: "Thur / Ethur",
  },
  {
    code: "Tid_Ik_Teuso",
    name: "Tid / Ik / Teuso",
  },
  {
    code: "Tiefo_Tyefo",
    name: "Tiefo / Tyefo",
  },
  {
    code: "Tigray",
    name: "Tigray",
  },
  {
    code: "Tigre",
    name: "Tigre",
  },
  {
    code: "Tigrinya",
    name: "Tigrinya",
  },
  {
    code: "Tikar",
    name: "Tikar",
  },
  {
    code: "Tiv",
    name: "Tiv",
  },
  {
    code: "Tjimba",
    name: "Tjimba",
  },
  {
    code: "Tofinou",
    name: "Tofinou",
  },
  {
    code: "Toma",
    name: "Toma",
  },
  {
    code: "Tonga",
    name: "Tonga",
  },
  {
    code: "Tonga_Malawi",
    name: "Tonga (Malawi)",
  },
  {
    code: "Tongwe",
    name: "Tongwe",
  },
  {
    code: "Topnaar",
    name: "Topnaar",
  },
  {
    code: "Topoke",
    name: "Topoke",
  },
  {
    code: "Toposa",
    name: "Toposa",
  },
  {
    code: "Toro_Tooro",
    name: "Toro / Tooro",
  },
  {
    code: "Toubou",
    name: "Toubou",
  },
  {
    code: "Tsemai",
    name: "Tsemai",
  },
  {
    code: "Tsimihety",
    name: "Tsimihety",
  },
  {
    code: "Tsonga",
    name: "Tsonga",
  },
  {
    code: "Tswa",
    name: "Tswa",
  },
  {
    code: "Tswana",
    name: "Tswana",
  },
  {
    code: "Tua",
    name: "Tua",
  },
  {
    code: "Tuareg",
    name: "Tuareg",
  },
  {
    code: "Tugen",
    name: "Tugen",
  },
  {
    code: "Tukulor_Haalpulaar",
    name: "Tukulor / Haalpulaar",
  },
  {
    code: "Tumbuka",
    name: "Tumbuka",
  },
  {
    code: "Tumbwe",
    name: "Tumbwe",
  },
  {
    code: "Tunjur_Tungur",
    name: "Tunjur / Tungur",
  },
  {
    code: "Tupuri_Kirdi",
    name: "Tupuri (Kirdi)",
  },
  {
    code: "Tur",
    name: "Tur",
  },
  {
    code: "Turka",
    name: "Turka",
  },
  {
    code: "Turkana",
    name: "Turkana",
  },
  {
    code: "Turu",
    name: "Turu",
  },
  {
    code: "Turumbu",
    name: "Turumbu",
  },
  {
    code: "Tutsi",
    name: "Tutsi",
  },
  {
    code: "Twa",
    name: "Twa",
  },
  {
    code: "Uldeme_Kirdi",
    name: "Uldeme (Kirdi)",
  },
  {
    code: "Uduk",
    name: "Uduk",
  },
  {
    code: "Ukelle",
    name: "Ukelle",
  },
  {
    code: "Urhobo",
    name: "Urhobo",
  },
  {
    code: "Vadoma",
    name: "Vadoma",
  },
  {
    code: "Vai",
    name: "Vai",
  },
  {
    code: "Vale",
    name: "Vale",
  },
  {
    code: "Vemgo",
    name: "Vemgo",
  },
  {
    code: "Venda",
    name: "Venda",
  },
  {
    code: "Veere_Vere",
    name: "Verre / Vere",
  },
  {
    code: "Vezo",
    name: "Vezo",
  },
  {
    code: "Vili",
    name: "Vili",
  },
  {
    code: "Vira_Bira",
    name: "Vira / Bira",
  },
  {
    code: "Vizik",
    name: "Vizik",
  },
  {
    code: "Watha_Sanye",
    name: "Watha - Sanye",
  },
  {
    code: "Wadela",
    name: "Wadela",
  },
  {
    code: "Waila",
    name: "Waila",
  },
  {
    code: "Wanda",
    name: "Wanda",
  },
  {
    code: "Wasa",
    name: "Wasa",
  },
  {
    code: "Welayta",
    name: "Welayta",
  },
  {
    code: "Welega_Oromo",
    name: "Welega Oromo",
  },
  {
    code: "Winiama",
    name: "Winiama",
  },
  {
    code: "Wodaabe",
    name: "Wodaabe",
  },
  {
    code: "Wogo",
    name: "Wogo",
  },
  {
    code: "Wolof",
    name: "Wolof",
  },
  {
    code: "Wongo",
    name: "Wongo",
  },
  {
    code: "Woyo",
    name: "Woyo",
  },
  {
    code: "Wula",
    name: "Wula",
  },
  {
    code: "Wum_Aghem",
    name: "Wum / Aghem",
  },
  {
    code: "Xanekwe",
    name: "Xanekwe",
  },
  {
    code: "Xhosa",
    name: "Xhosa",
  },
  {
    code: "Xindonga",
    name: "Xindonga",
  },
  {
    code: "Yaaku",
    name: "Yaaku",
  },
  {
    code: "Yacuba_Dan",
    name: "Yacuba - Dan",
  },
  {
    code: "Yaka",
    name: "Yaka",
  },
  {
    code: "Yako",
    name: "Yako",
  },
  {
    code: "Yakoma",
    name: "Yakoma",
  },
  {
    code: "Yalunka_Dialonke",
    name: "Yalunka / Dialonke",
  },
  {
    code: "Yansi_Yanzi",
    name: "Yansi / Yanzi",
  },
  {
    code: "Yao",
    name: "Yao",
  },
  {
    code: "Yaure",
    name: "Yaure",
  },
  {
    code: "Yeke_Garanganze",
    name: "Yeke / Garanganze",
  },
  {
    code: "Yeyi_Yeye",
    name: "Yeyi (Yeye)",
  },
  {
    code: "Yombe",
    name: "Yombe",
  },
  {
    code: "Yoruba",
    name: "Yoruba",
  },
  {
    code: "Yoruba_Egba",
    name: "Yoruba-Egba",
  },
  {
    code: "Yoruba_Ife",
    name: "Yoruba-Ife",
  },
  {
    code: "Yulu",
    name: "Yulu",
  },
  {
    code: "Zafimaniry",
    name: "Zafimaniry",
  },
  {
    code: "Zaraghawa_Beri",
    name: "Zaghawa (Beri)",
  },
  {
    code: "Zande",
    name: "Zande",
  },
  {
    code: "Zaramo",
    name: "Zaramo",
  },
  {
    code: "Zarma_Zerma",
    name: "Zarma / Zerma",
  },
  {
    code: "Zay",
    name: "Zay",
  },
  {
    code: "Zelidva",
    name: "Zelidva",
  },
  {
    code: "Zemba",
    name: "Zemba",
  },
  {
    code: "Zezuru",
    name: "Zezuru",
  },
  {
    code: "Zigua_Zigula",
    name: "Zigua / Zigula",
  },
  {
    code: "Zinza",
    name: "Zinza",
  },
  {
    code: "Zombo",
    name: "Zombo",
  },
  {
    code: "Zul",
    name: "Zul",
  },
  {
    code: "Zulgo_Kirdi",
    name: "Zulgo (Kirdi)",
  },
  {
    code: "Zulu",
    name: "Zulu",
  },
  {
    code: "Zyoba",
    name: "Zyoba",
  },
];
</script>
