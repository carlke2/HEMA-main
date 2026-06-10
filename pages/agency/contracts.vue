<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen">
      <section class="p-6 max-w-6xl mx-auto">
        <!-- Page Title -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-gray-900">
            📄 Contract Management
          </h2>
          <p class="text-gray-600 mt-1">
            Streamline your hiring process with digital contract creation,
            tracking, and signing.
          </p>
        </div>

        <!-- Contracts Grid -->
        <ul
          role="list"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <li
            v-for="contract in contracts"
            :key="contract.id"
            class="relative rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div
              class="flex items-center gap-x-4 border-b border-gray-100 p-6 relative"
            >
              <img
                v-if="!contract.user.avatar"
                alt="abstract user"
                src="/assets/images/abstract-user.png"
                class="h-12 w-12 flex-none rounded-lg bg-gray-100 object-cover ring-1 ring-gray-200"
              />
              <img
                v-else
                alt="User Profile"
                :src="contract.user.avatar"
                class="h-12 w-12 flex-none rounded-lg bg-gray-100 object-cover ring-1 ring-gray-200"
              />
              <div class="min-w-0 flex-1">
                <h3 class="text-sm font-semibold text-gray-900 truncate">
                  {{ contract.jobTitle }}
                </h3>
                <p class="text-xs text-gray-500 truncate">
                  {{ contract.user.fullName }}
                </p>
              </div>
              <div class="relative flex-shrink-0 z-30">
                <button
                  type="button"
                  @click.stop="openModal(contract)"
                  class="p-2 rounded-full focus:outline-none hover:text-red-700 transition"
                  aria-label="Contract options"
                >
                  <icon
                    name="lucide:more-vertical"
                    class="h-5 w-5 text-black"
                  />
                </button>
              </div>
            </div>
            <dl class="divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div class="flex justify-between py-3">
                <dt class="text-gray-500">Contact</dt>
                <dd class="text-gray-900">{{ contract.user.phone }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-gray-500">Start Date</dt>
                <dd class="text-gray-900">
                  <time :datetime="contract.startDate">
                    {{ formatDate(contract.startDate) }}
                  </time>
                </dd>
              </div>
              <div class="flex justify-between items-center py-3">
                <dt class="text-gray-500">Status</dt>
                <dd>
                  <span
                    class="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium capitalize"
                    :class="{
                      'bg-green-100 text-green-700':
                        contract.status === 'Active',
                      'bg-yellow-100 text-yellow-700':
                        contract.status === 'Pending',
                      'bg-red-100 text-red-700': contract.status === 'Rejected',
                      'bg-gray-100 text-gray-700': contract.status === 'Closed',
                    }"
                  >
                    {{ contract.status }}
                  </span>
                </dd>
              </div>
            </dl>
          </li>
        </ul>
      </section>

      <!-- Modal -->
      <div
        v-if="selectedContract"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
        @click.self="selectedContract = null"
      >
        <div class="bg-white rounded-lg w-full max-w-xl p-6 relative">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                Contract Details
              </h2>
              <p class="text-sm text-gray-500">
                Full information about {{ selectedContract.user.fullName }}'s
                contract.
              </p>
            </div>
            <button
              @click="selectedContract = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <icon name="lucide:x" class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <img
                v-if="!selectedContract.user.avatar"
                alt="abstract user"
                src="/assets/images/abstract-user.png"
                class="w-16 h-16 rounded-full object-cover"
              />
              <img
                v-else
                alt="User Profile"
                :src="selectedContract.user.avatar"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  {{ selectedContract.user.fullName }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ selectedContract.jobtitle }}
                </p>
              </div>
            </div>
            <div class="text-sm text-gray-700 space-y-1">
              <p><strong>Status:</strong> {{ selectedContract.status }}</p>
              <p><strong>Phone:</strong> {{ selectedContract.user.phone }}</p>
              <p><strong>Email:</strong> {{ selectedContract.user.email }}</p>
              <p>
                <strong>Start Date:</strong>
                {{ formatDate(selectedContract.startDate) }}
              </p>
              <p>
                <strong>End Date:</strong>
                {{
                  selectedContract.endDate
                    ? formatDate(selectedContract.endDate)
                    : "N/A"
                }}
              </p>
              <p>
                <strong
                  >{{
                    selectedContract.salaryFrequency.charAt(0).toUpperCase() +
                    selectedContract.salaryFrequency.slice(1).toLowerCase()
                  }}
                  Pay:</strong
                >
                {{ selectedContract.salary }}
                {{ selectedContract.currency }}
              </p>
            </div>
            <div class="flex justify-end gap-3 mt-4">
              <button
                class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm text-black"
                @click="selectedContract = null"
              >
                Close
              </button>
              <button
                class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded text-sm"
              >
                Edit
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

definePageMeta({ middleware: ["agency-dashboard"] });

const { user } = useUserSession();

const agencyId = user.value.agencyId;

const selectedContract = ref<any>(null);
const openModal = (contract: any) => {
  selectedContract.value = contract;
};

const statuses: Record<string, string> = {
  Active: "bg-green-50 text-green-800",
  Pending: "bg-yellow-50 text-yellow-800",
  Terminated: "bg-red-50 text-red-800",
};

function formatDate(dateString: string): string {
  try {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined);
  } catch {
    return dateString;
  }
}

// Fetch contracts
const { data: contractsData, error: contractsDataError } = useFetch(
  "/api/v1/contracts",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      agencyId: agencyId,
    },
  }
);
if (contractsDataError.value) {
  push.error(contractsDataError.value);
}
let totalContracts = ref(0);
let contracts = ref<any>([]);
watchEffect(() => {
  if (contractsData.value && Array.isArray(contractsData.value)) {
    contracts.value = contractsData.value;
    totalContracts.value = contractsData.value.length;
  } else {
    contracts.value = [];
    totalContracts.value = contracts.value.length;
  }
});
</script>
