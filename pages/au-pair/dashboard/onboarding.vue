<template>
  <div class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <div class="max-w-3xl mx-auto">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold flex items-center text-gray-900">
              <icon name="mdi:school" class="text-[#0000FE] mr-2" />
              Training & verification
            </h1>
            <p class="mt-2 text-gray-600">
              Complete the trainings and lessons assigned to you by the admin. When all lessons are done, an admin can verify your account so you appear to families.
            </p>
          </div>

          <!-- Progress summary -->
          <div
            v-if="progress.totalSteps > 0"
            class="mb-6 p-5 rounded-xl bg-white border border-gray-200 shadow-sm"
          >
            <h2 class="font-bold text-gray-900 mb-3">Your progress</h2>
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-[#0000FE]">{{ progress.completedSteps }}</span>
                <span class="text-gray-600">of {{ progress.totalSteps }} lessons completed</span>
              </div>
              <div class="flex-1 min-w-0 max-w-md">
                <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-[#0000FE] transition-all duration-300"
                    :style="{ width: progressPercent + '%' }"
                  />
                </div>
              </div>
            </div>
            <p class="mt-3 text-sm font-medium text-gray-700">
              <span v-if="progress.lessonsLeft > 0">
                <strong>{{ progress.lessonsLeft }}</strong> lesson{{ progress.lessonsLeft === 1 ? '' : 's' }} left to complete before you can be verified.
              </span>
              <span v-else class="text-green-700">
                All assigned lessons completed. You’re ready for admin verification.
              </span>
            </p>
          </div>

          <!-- Status banner -->
          <div
            class="mb-6 p-4 rounded-lg border bg-amber-50 border-amber-200 text-amber-900"
          >
            <p class="font-medium">Your status: Pending verification</p>
            <p class="text-sm mt-1 opacity-90">
              An admin assigns trainings (e.g. First Aid, Childcare) to you. Complete all assigned lessons, then an administrator will verify your account. Only verified au pairs are visible to families.
            </p>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="flex justify-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0000FE]"
            />
          </div>

          <!-- Assigned trainings -->
          <div v-else-if="trainings.length" class="space-y-6">
            <article
              v-for="training in trainings"
              :key="training.trainingId"
              class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div class="p-5 border-b border-gray-100 bg-gray-50/50">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <h2 class="font-bold text-lg text-gray-900">{{ training.title }}</h2>
                    <p v-if="training.description" class="text-sm text-gray-600 mt-1">
                      {{ training.description }}
                    </p>
                  </div>
                  <span class="shrink-0 text-sm font-medium text-gray-600">
                    {{ training.completedCount }} / {{ training.stepCount }} lessons
                  </span>
                </div>
              </div>
              <ul class="divide-y divide-gray-100">
                <li
                  v-for="(step, index) in training.steps"
                  :key="step.id"
                  class="p-5 flex items-start gap-4"
                >
                  <div
                    :class="[
                      'shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
                      step.completed ? 'bg-green-500' : 'bg-[#0000FE]',
                    ]"
                  >
                    <icon v-if="step.completed" name="mdi:check" class="w-5 h-5" />
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-gray-900">{{ step.title }}</h3>
                    <p v-if="step.description" class="text-sm text-gray-600 mt-1">
                      {{ step.description }}
                    </p>
                    <div class="mt-3 flex items-center gap-2">
                      <span
                        v-if="step.completed"
                        class="inline-flex items-center gap-1 text-sm text-green-700"
                      >
                        <icon name="mdi:check-circle" class="w-4 h-4" />
                        Completed
                      </span>
                      <button
                        v-else
                        type="button"
                        :disabled="completingStepId === step.id"
                        class="inline-flex items-center gap-1 text-sm font-medium text-[#0000FE] hover:underline disabled:opacity-60"
                        @click="completeStep(step.id)"
                      >
                        {{ completingStepId === step.id ? "Marking…" : "Mark as complete" }}
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </article>
          </div>

          <!-- Empty state: no trainings assigned yet -->
          <div v-else class="text-center py-12 bg-white rounded-xl border border-gray-200">
            <icon name="mdi:school-outline" class="text-[#0000FE] text-5xl mx-auto mb-4" />
            <h3 class="font-bold text-gray-900 mb-2">No trainings assigned yet</h3>
            <p class="text-gray-600 max-w-md mx-auto">
              An administrator will assign trainings and lessons to you (e.g. First Aid, Childcare). Once assigned, they will appear here. Complete all lessons to be eligible for verification.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const loading = ref(true);
const trainings = ref([]);
const progress = ref({
  totalSteps: 0,
  completedSteps: 0,
  lessonsLeft: 0,
  readyForVerification: false,
});
const completingStepId = ref(null);

const progressPercent = computed(() => {
  const total = progress.value.totalSteps;
  if (total === 0) return 0;
  return Math.round((progress.value.completedSteps / total) * 100);
});

async function load() {
  loading.value = true;
  try {
    const data = await $fetch("/api/v1/aupair/trainings/assigned");
    trainings.value = data?.trainings ?? [];
    progress.value = data?.progress ?? {
      totalSteps: 0,
      completedSteps: 0,
      lessonsLeft: 0,
      readyForVerification: false,
    };
  } catch (e) {
    console.error(e);
    trainings.value = [];
    progress.value = {
      totalSteps: 0,
      completedSteps: 0,
      lessonsLeft: 0,
      readyForVerification: false,
    };
  } finally {
    loading.value = false;
  }
}

async function completeStep(trainingStepId) {
  if (completingStepId.value) return;
  completingStepId.value = trainingStepId;
  try {
    await $fetch("/api/v1/aupair/trainings/complete-step", {
      method: "POST",
      body: { trainingStepId },
    });
    await load();
  } catch (e) {
    push.error(e?.data?.message || "Failed to mark lesson complete");
  } finally {
    completingStepId.value = null;
  }
}

onMounted(() => load());
</script>
