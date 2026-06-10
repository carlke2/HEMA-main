<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Dashboard Header -->
    <AuPairHeader />

    <div class="flex">
      <AuPairSidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon
              name="mdi:file-document-outline"
              class="text-[#0000FE] mr-2"
            />
            Contracts
          </h1>
          <p class="text-sm text-gray-600 mt-1">
            Offers from families appear here with status <strong>PENDING</strong>. Use View to see details and accept or reject.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]"
          ></div>
        </div>

        <!-- Contracts Table -->
        <div
          v-else-if="contracts.length > 0"
          class="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Family</th>
                <th scope="col" class="px-6 py-3">Start Date</th>
                <th scope="col" class="px-6 py-3">End Date</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="contract in contracts"
                :key="contract.id"
                class="bg-white border-b"
              >
                <td
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ contract.family?.name ?? "—" }}
                </td>
                <td class="px-6 py-4">{{ formatDate(contract.startDate) }}</td>
                <td class="px-6 py-4">{{ formatDate(contract.endDate) }}</td>
                <td class="px-6 py-4">
                  <span
                    :class="{
                      'bg-green-100 text-green-800':
                        contract.status === 'ACTIVE',
                      'bg-yellow-100 text-yellow-800':
                        contract.status === 'PENDING',
                      'bg-red-100 text-red-800': contract.status === 'REJECTED',
                      'bg-amber-100 text-amber-800':
                        contract.status === 'INACTIVE',
                      'bg-pink-100 text-pink-800':
                        contract.status === 'TERMINATED',
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ contract.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <button
                    @click="viewContract(contract)"
                    class="text-[#0000FE] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <icon
            name="mdi:file-document-outline"
            class="text-[#0000FE] text-6xl mx-auto mb-4"
          />
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            No Contracts Found
          </h3>
          <p class="text-gray-600">
            You do not have any contracts at the moment.
          </p>
        </div>
      </main>
    </div>

    <!-- Contract View Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedContract"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contract-modal-title"
          @click.self="closeContractModal"
          @keydown.escape="closeContractModal"
        >
          <div
            class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            @click.stop
          >
            <!-- Header -->
            <div class="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 id="contract-modal-title" class="text-xl font-bold text-gray-900">
                Contract – {{ contractFamilyName }}
              </h2>
              <button
                type="button"
                class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                aria-label="Close"
                @click="closeContractModal"
              >
                <icon name="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Scrollable content -->
            <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <!-- Status -->
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-600">Status</span>
                <span
                  :class="contractStatusClass"
                  class="px-2.5 py-1 rounded-full text-xs font-medium"
                >
                  {{ selectedContract.status }}
                </span>
              </div>

              <!-- Family -->
              <section class="space-y-2">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Family</h3>
                <p class="text-gray-700">{{ contractFamilyName }}</p>
                <p v-if="contractFamilyLocation" class="text-sm text-gray-600">{{ contractFamilyLocation }}</p>
              </section>

              <!-- Role -->
              <section class="space-y-2">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Role</h3>
                <p v-if="selectedContract.description" class="text-gray-700">{{ selectedContract.description }}</p>
                <p v-else class="text-gray-500 italic">No description provided.</p>
                <p v-if="selectedContract.duties" class="text-gray-700 mt-2"><strong>Duties:</strong> {{ selectedContract.duties }}</p>
              </section>

              <!-- Dates & hours -->
              <section class="space-y-2">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Dates & hours</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                  <p><strong>Start:</strong> {{ formatDate(selectedContract.startDate) }}</p>
                  <p><strong>End:</strong> {{ formatDate(selectedContract.endDate) }}</p>
                  <p v-if="selectedContract.workingHours" class="sm:col-span-2"><strong>Working hours:</strong> {{ selectedContract.workingHours }}</p>
                </div>
              </section>

              <!-- Compensation -->
              <section class="space-y-2">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Compensation</h3>
                <p class="text-gray-700">
                  {{ formatSalary(selectedContract.salary, selectedContract.currency, selectedContract.salaryFrequency) }}
                </p>
              </section>

              <!-- Policies -->
              <section class="space-y-3">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Policies</h3>
                <div v-if="selectedContract.leaveAndVacationPolicy">
                  <p class="text-sm font-medium text-gray-700">Leave & vacation</p>
                  <p class="text-gray-700 text-sm whitespace-pre-wrap">{{ selectedContract.leaveAndVacationPolicy }}</p>
                </div>
                <div v-if="selectedContract.terminationConditions">
                  <p class="text-sm font-medium text-gray-700">Termination</p>
                  <p class="text-gray-700 text-sm whitespace-pre-wrap">{{ selectedContract.terminationConditions }}</p>
                </div>
                <p v-if="!selectedContract.leaveAndVacationPolicy && !selectedContract.terminationConditions" class="text-gray-500 italic text-sm">No policy details provided.</p>
              </section>
            </div>

            <!-- Footer -->
            <div class="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                @click="closeContractModal"
              >
                Close
              </button>
              <template v-if="selectedContract.status === 'PENDING'">
                <button
                  type="button"
                  :disabled="contractActionLoading"
                  class="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="confirmDecline"
                >
                  {{ contractActionLoading && pendingAction === 'REJECTED' ? 'Declining…' : 'Decline' }}
                </button>
                <button
                  type="button"
                  :disabled="contractActionLoading"
                  class="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  @click="updateContractStatus('ACTIVE')"
                >
                  {{ contractActionLoading && pendingAction === 'ACTIVE' ? 'Accepting…' : 'Accept' }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Confirm decline dialog -->
    <Teleport to="body">
      <div
        v-if="showDeclineConfirm"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
        role="alertdialog"
        aria-labelledby="decline-confirm-title"
        @click.self="showDeclineConfirm = false"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6" @click.stop>
          <h3 id="decline-confirm-title" class="text-lg font-bold text-gray-900 mb-2">Decline offer?</h3>
          <p class="text-gray-600 text-sm mb-4">This cannot be undone. The family will see that you declined.</p>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              @click="showDeclineConfirm = false"
            >
              Cancel
            </button>
            <button
              type="button"
              :disabled="contractActionLoading"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-60"
              @click="confirmDeclineSubmit"
            >
              {{ contractActionLoading ? 'Declining…' : 'Decline offer' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const { user } = useUserSession();

// State
const loading = ref(false);
const contracts = ref([]);
const selectedContract = ref(null);
const contractActionLoading = ref(false);
const pendingAction = ref(null);
const showDeclineConfirm = ref(false);

// Computed: safe display values for the selected contract
const contractFamilyName = computed(() => {
  if (!selectedContract.value) return "Contract";
  const f = selectedContract.value.family;
  return f?.name ?? "Unknown family";
});

const contractFamilyLocation = computed(() => {
  if (!selectedContract.value?.family) return "";
  const f = selectedContract.value.family;
  const parts = [f.location, f.country].filter(Boolean);
  return parts.join(", ");
});

const contractStatusClass = computed(() => {
  const s = selectedContract.value?.status;
  const map = {
    ACTIVE: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    REJECTED: "bg-red-100 text-red-800",
    INACTIVE: "bg-amber-100 text-amber-800",
    TERMINATED: "bg-pink-100 text-pink-800",
  };
  return map[s] ?? "bg-gray-100 text-gray-800";
});

// Methods
const fetchContracts = async () => {
  loading.value = true;
  try {
    const data = await $fetch(`/api/v1/aupair/contracts?userId=${user.value?.id}`);
    contracts.value = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching contracts:", err);
    push.error("Failed to load contracts.");
  } finally {
    loading.value = false;
  }
};

const viewContract = (contract) => {
  selectedContract.value = contract;
  showDeclineConfirm.value = false;
};

const closeContractModal = () => {
  selectedContract.value = null;
  showDeclineConfirm.value = false;
};

function formatDate(dateString) {
  if (!dateString) return "—";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatSalary(salary, currency, frequency) {
  const num = salary != null ? Number(salary) : NaN;
  const amount = Number.isFinite(num) ? num.toLocaleString() : "—";
  const curr = currency ?? "";
  const freq = frequency ? String(frequency).toLowerCase() : "";
  if (!curr && !freq) return amount || "—";
  return [amount, curr, freq].filter(Boolean).join(" / ");
}

const updateContractStatus = async (status) => {
  if (!selectedContract.value || contractActionLoading.value) return;
  contractActionLoading.value = true;
  pendingAction.value = status;
  try {
    await $fetch(`/api/v1/aupair/applications/${selectedContract.value.id}`, {
      method: "PATCH",
      body: { status },
    });
    const index = contracts.value.findIndex((c) => c.id === selectedContract.value.id);
    if (index !== -1) contracts.value[index].status = status;
    closeContractModal();
    push.success(status === "ACTIVE" ? "Offer accepted." : "Offer declined.");
  } catch (err) {
    const msg = err?.data?.message ?? err?.message;
    push.error(typeof msg === "string" ? msg : "Failed to update. Please try again.");
  } finally {
    contractActionLoading.value = false;
    pendingAction.value = null;
  }
};

function confirmDecline() {
  showDeclineConfirm.value = true;
}

function confirmDeclineSubmit() {
  showDeclineConfirm.value = false;
  updateContractStatus("REJECTED");
}

// Escape key: close modal when open
function onEscape(e) {
  if (e.key === "Escape") {
    if (showDeclineConfirm.value) showDeclineConfirm.value = false;
    else if (selectedContract.value) closeContractModal();
  }
}

watch(selectedContract, (val) => {
  if (val) document.addEventListener("keydown", onEscape);
  else document.removeEventListener("keydown", onEscape);
});

onMounted(() => {
  fetchContracts();
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onEscape);
});
</script>

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
