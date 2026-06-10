<template>
  <div class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden">
    <AppSidebar />

    <main class="flex-1 p-6 overflow-auto">
      <h1 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <icon name="mdi:school" class="text-blue-600 mr-2" />
        Au-pair trainings
      </h1>
      <p class="text-gray-600 mb-6">
        Create trainings and lessons (e.g. First Aid, Childcare). Assign them to au-pairs so they can complete the lessons and become eligible for verification.
      </p>

      <!-- Assign to au-pair -->
      <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 class="font-bold text-lg text-gray-900 mb-4">Assign trainings to an au-pair</h2>
        <div class="flex flex-wrap gap-4 items-end">
          <div class="min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Au-pair</label>
            <select
              v-model="assignUserId"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            >
              <option value="">Select au-pair</option>
              <option
                v-for="u in auPairs"
                :key="u.id"
                :value="u.id"
              >
                {{ u.fullName }} ({{ u.email }})
              </option>
            </select>
          </div>
          <div class="min-w-[240px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Trainings</label>
            <select
              v-model="assignTrainingIds"
              multiple
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 h-24"
            >
              <option
                v-for="t in trainings"
                :key="t.id"
                :value="t.id"
              >
                {{ t.title }} ({{ (t.steps || []).length }} lessons)
              </option>
            </select>
            <p class="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <button
            type="button"
            :disabled="!assignUserId || !assignTrainingIds.length || assigning"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="assignTrainings"
          >
            {{ assigning ? "Assigning…" : "Assign" }}
          </button>
        </div>
      </section>

      <!-- List trainings -->
      <section class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="font-bold text-lg text-gray-900">All trainings</h2>
          <button
            type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            @click="showAddTraining = true"
          >
            Add training
          </button>
        </div>

        <div v-if="loading" class="p-8 flex justify-center">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="t in trainings"
            :key="t.id"
            class="p-4"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-900">{{ t.title }}</h3>
                <p v-if="t.description" class="text-sm text-gray-600 mt-1">{{ t.description }}</p>
                <p class="text-xs text-gray-500 mt-2">
                  {{ (t.steps || []).length }} lessons · {{ t._count?.assignments ?? 0 }} assignment(s)
                </p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  class="p-2 text-gray-500 hover:bg-gray-100 rounded"
                  :title="expandedId === t.id ? 'Collapse' : 'Expand'"
                  @click="expandedId = expandedId === t.id ? null : t.id"
                >
                  <icon :name="expandedId === t.id ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-5 h-5" />
                </button>
                <button
                  type="button"
                  class="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Delete training"
                  @click="deleteTraining(t.id)"
                >
                  <icon name="mdi:delete-outline" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Steps (expandable) -->
            <div v-if="expandedId === t.id" class="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
              <p class="text-sm font-medium text-gray-700">Lessons</p>
              <div
                v-for="(step, idx) in (t.steps || [])"
                :key="step.id"
                class="flex items-start gap-2 text-sm"
              >
                <span class="text-gray-500 w-6">{{ idx + 1 }}.</span>
                <div class="flex-1">
                  <span class="font-medium text-gray-900">{{ step.title }}</span>
                  <span v-if="step.description" class="text-gray-600"> – {{ step.description }}</span>
                </div>
                <button
                  type="button"
                  class="text-red-600 hover:underline"
                  @click="deleteStep(step.id, t.id)"
                >
                  Delete
                </button>
              </div>
              <div class="flex gap-2 pt-2">
                <input
                  v-model="newStepTitle[t.id]"
                  type="text"
                  placeholder="New lesson title"
                  class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  @keydown.enter="addStep(t.id)"
                />
                <button
                  type="button"
                  class="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                  @click="addStep(t.id)"
                >
                  Add lesson
                </button>
              </div>
            </div>
          </div>

          <div v-if="!trainings.length && !loading" class="p-8 text-center text-gray-500">
            No trainings yet. Click "Add training" to create one.
          </div>
        </div>
      </section>

      <!-- Add training modal -->
      <Teleport to="body">
        <div
          v-if="showAddTraining"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          @click.self="showAddTraining = false"
        >
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 class="font-bold text-lg text-gray-900 mb-4">New training</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  v-model="newTraining.title"
                  type="text"
                  placeholder="e.g. First Aid & Emergency Response"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
                <textarea
                  v-model="newTraining.description"
                  rows="2"
                  placeholder="Short description"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-2">
              <button
                type="button"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                @click="showAddTraining = false"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="!newTraining.title?.trim() || savingTraining"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                @click="createTraining"
              >
                {{ savingTraining ? "Creating…" : "Create" }}
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["admin-dashboard"],
});

const loading = ref(true);
const trainings = ref([]);
const auPairs = ref([]);
const assignUserId = ref("");
const assignTrainingIds = ref([]);
const assigning = ref(false);
const showAddTraining = ref(false);
const newTraining = ref({ title: "", description: "" });
const savingTraining = ref(false);
const expandedId = ref(null);
const newStepTitle = ref({});

async function loadTrainings() {
  try {
    const data = await $fetch("/api/v1/admin/trainings");
    trainings.value = Array.isArray(data) ? data : [];
  } catch (e) {
    push.error(e?.data?.message || "Failed to load trainings");
    trainings.value = [];
  }
}

async function loadAuPairs() {
  try {
    const data = await $fetch("/api/v1/users", { params: { userType: "aupair" } });
    auPairs.value = Array.isArray(data) ? data : [];
  } catch (e) {
    auPairs.value = [];
  }
}

async function assignTrainings() {
  const userId = assignUserId.value ? Number(assignUserId.value) : null;
  if (!userId || !assignTrainingIds.value.length) return;
  assigning.value = true;
  try {
    await $fetch("/api/v1/admin/trainings/assign", {
      method: "POST",
      body: { userId, trainingIds: assignTrainingIds.value },
    });
    push.success("Trainings assigned");
    assignUserId.value = "";
    assignTrainingIds.value = [];
  } catch (e) {
    push.error(e?.data?.message || "Failed to assign");
  } finally {
    assigning.value = false;
  }
}

async function createTraining() {
  if (!newTraining.value.title?.trim()) return;
  savingTraining.value = true;
  try {
    await $fetch("/api/v1/admin/trainings", {
      method: "POST",
      body: {
        title: newTraining.value.title.trim(),
        description: newTraining.value.description?.trim() || null,
      },
    });
    push.success("Training created");
    showAddTraining.value = false;
    newTraining.value = { title: "", description: "" };
    await loadTrainings();
  } catch (e) {
    push.error(e?.data?.message || "Failed to create");
  } finally {
    savingTraining.value = false;
  }
}

async function addStep(trainingId) {
  const title = newStepTitle.value[trainingId]?.trim();
  if (!title) return;
  try {
    await $fetch(`/api/v1/admin/trainings/${trainingId}/steps`, {
      method: "POST",
      body: { title },
    });
    newStepTitle.value[trainingId] = "";
    await loadTrainings();
    expandedId.value = trainingId;
  } catch (e) {
    push.error(e?.data?.message || "Failed to add lesson");
  }
}

async function deleteStep(stepId, trainingId) {
  if (!confirm("Delete this lesson?")) return;
  try {
    await $fetch(`/api/v1/admin/trainings/${trainingId}/steps/${stepId}`, { method: "DELETE" });
    await loadTrainings();
    expandedId.value = trainingId;
  } catch (e) {
    push.error(e?.data?.message || "Failed to delete");
  }
}

async function deleteTraining(id) {
  if (!confirm("Delete this training and all its lessons? Assignments will be removed.")) return;
  try {
    await $fetch(`/api/v1/admin/trainings/${id}`, { method: "DELETE" });
    await loadTrainings();
    if (expandedId.value === id) expandedId.value = null;
  } catch (e) {
    push.error(e?.data?.message || "Failed to delete");
  }
}

onMounted(async () => {
  loading.value = true;
  await Promise.all([loadTrainings(), loadAuPairs()]);
  loading.value = false;
});
</script>
