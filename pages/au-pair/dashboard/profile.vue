<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Profile Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:account-circle" class="text-[#0000FE] mr-2" />
            My Profile
          </h1>
          <button
            type="button"
            class="inline-flex items-center gap-2 bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            @click="openEditModal"
          >
            <icon name="mdi:pencil" class="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Personal Info Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-1"
          >
            <div class="flex flex-col items-center">
              <img
                v-if="!user.avatar"
                src="/assets/images/abstract-user.png"
                alt="Profile"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4"
              />
              <img
                v-else
                :src="user.avatar"
                alt="Profile"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mb-4"
              />
              <h2 class="text-xl font-bold text-center text-gray-900">
                {{ user.fullName }}
              </h2>
              <p class="text-gray-600 text-sm">
                {{ aupair?.auPairUserProfile?.role || "role" }}
              </p>

              <div class="w-full mt-6 space-y-3">
                <div class="flex items-center">
                  <icon name="mdi:map-marker" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600">
                    {{ aupair?.AuPairUserProfile?.location || "location" }},
                    {{ aupair?.AuPairUserProfile?.country || "country" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <icon name="mdi:passport" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600">
                    {{ aupair?.AuPairUserProfile?.status || "status" }}
                  </span>
                </div>
                <div class="flex items-center">
                  <icon name="mdi:calendar" class="text-[#0000FE] mr-2" />
                  <span class="text-sm text-gray-600"
                    >Member since
                    {{ aupair?.AuPairUserProfile?.createdAt || "date" }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Cultural Identity Card -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-2"
          >
            <h3 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:account-group" class="text-[#0000FE] mr-2" />
              Cultural Identity
            </h3>

            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1"
                  >Tribe/Ethnicity</label
                >
                <div class="bg-[#2C3E50]/5 p-3 rounded-md text-[#2C3E50]">
                  {{
                    aupair.AuPairUserProfile.tribe || "Please add your tribe"
                  }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1"
                  >Languages</label
                >
                <div class="bg-[#2C3E50]/5 p-3 rounded-md">
                  <span
                    v-if="aupair.AuPairUserProfile.languages"
                    v-for="(lang, index) in user.languages"
                    :key="index"
                    class="inline-block bg-[#D35400] text-white text-xs px-2 py-1 rounded-full mr-1 mb-1"
                  >
                    {{ lang }}
                  </span>
                  <span v-else class="text-black/25">
                    Please add your languages
                  </span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1"
                  >Religion</label
                >
                <div class="bg-[#2C3E50]/5 p-3 rounded-md text-[#2C3E50]">
                  {{
                    aupair.AuPairUserProfile.religion ||
                    "Please add your religion"
                  }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1"
                  >Traditional Skills</label
                >
                <div class="bg-[#2C3E50]/5 p-3 rounded-md">
                  <span
                    v-if="aupair.AuPairUserProfile.skills.length > 0"
                    v-for="(skill, index) in aupair.AuPairUserProfile.skills"
                    :key="index"
                    class="inline-block bg-white border border-[#D35400] text-[#D35400] text-xs px-2 py-1 rounded-full mr-1 mb-1"
                  >
                    {{ skill }}
                  </span>
                  <span v-else class="text-black/25">
                    Please add your skills
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="hover:shadow-md transition md:col-span-3">
            <Files />
          </div>
        </div>
      </main>
    </div>

    <!-- Edit Profile Modal -->
    <Teleport to="body">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="closeEditModal"
      >
        <div
          class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >
          <div class="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 id="edit-profile-title" class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <icon name="mdi:account-edit" class="text-[#0000FE]" />
              Edit Profile
            </h2>
            <button
              type="button"
              class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label="Close"
              @click="closeEditModal"
            >
              <icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>

          <div v-if="editFormLoading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
          </div>

          <form v-else @submit.prevent="saveProfile" class="flex flex-col flex-1 min-h-0">
            <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              <section class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Personal</h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Full name</label>
                    <input v-model="editForm.fullName" type="text" required class="profile-input" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
                    <input v-model="editForm.email" type="email" required class="profile-input" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
                    <input v-model="editForm.phone" type="text" class="profile-input" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Gender</label>
                    <select v-model="editForm.gender" class="profile-input">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="preferNotToSay">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </section>

              <section class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Location & identity</h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Country</label>
                    <select v-model="editForm.country" class="profile-input">
                      <option value="">Select country</option>
                      <option v-for="c in editCountries" :key="c.code" :value="c.code">{{ c.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Location (city/region)</label>
                    <input v-model="editForm.location" type="text" class="profile-input" placeholder="e.g. Nairobi" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Tribe / ethnicity</label>
                    <select v-model="editForm.tribe" class="profile-input">
                      <option value="">Select tribe</option>
                      <option v-for="t in editTribes" :key="t.code" :value="t.code">{{ t.name }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Religion</label>
                    <select v-model="editForm.religion" class="profile-input">
                      <option value="">Select religion</option>
                      <option v-for="r in editReligions" :key="r.code" :value="r.code">{{ r.name }}</option>
                    </select>
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Education</label>
                    <input v-model="editForm.education" type="text" class="profile-input" placeholder="e.g. Secondary, Some tertiary" />
                  </div>
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-900 mb-1.5">Skills (comma-separated)</label>
                    <input
                      v-model="editSkillsText"
                      type="text"
                      class="profile-input"
                      placeholder="e.g. Childcare, Cooking, English"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div class="shrink-0 flex flex-wrap gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                type="submit"
                :disabled="editSaving"
                class="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition disabled:opacity-60"
              >
                {{ editSaving ? "Saving…" : "Save changes" }}
              </button>
              <button
                type="button"
                class="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                @click="closeEditModal"
              >
                Cancel
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
  middleware: ["aupair-dashboard"],
});

const { user } = useUserSession();

// Fetch Au Pair's Data
const { data: auPairData, error: auPairDataError, refresh: refreshProfile } = await useFetch(
  `/api/v1/users/${user.value?.id}`,
  {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }
);
if (auPairDataError.value) {
  push.error(auPairDataError.value || "error");
}
const aupair = ref<Record<string, unknown>>({});
watchEffect(() => {
  if (auPairData.value) {
    aupair.value = auPairData.value as Record<string, unknown>;
  } else {
    aupair.value = {};
  }
});

// Edit profile modal
const showEditModal = ref(false);
const editFormLoading = ref(false);
const editSaving = ref(false);
const editSkillsText = ref("");
const editForm = ref({
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  country: "",
  location: "",
  tribe: "",
  religion: "",
  education: "",
});

const editCountries = [
  { code: "Kenya", name: "Kenya" },
  { code: "Uganda", name: "Uganda" },
  { code: "Tanzania", name: "Tanzania" },
  { code: "United_Kingdom", name: "United Kingdom" },
  { code: "United_States", name: "United States" },
  { code: "Canada", name: "Canada" },
  { code: "Germany", name: "Germany" },
  { code: "France", name: "France" },
  { code: "South_Africa", name: "South Africa" },
  { code: "Nigeria", name: "Nigeria" },
  { code: "Ethiopia", name: "Ethiopia" },
  { code: "Ghana", name: "Ghana" },
  { code: "Rwanda", name: "Rwanda" },
  { code: "Australia", name: "Australia" },
  { code: "Ireland", name: "Ireland" },
  { code: "Netherlands", name: "Netherlands" },
  { code: "United_Arab_Emirates", name: "United Arab Emirates" },
  { code: "Saudi_Arabia", name: "Saudi Arabia" },
  { code: "Qatar", name: "Qatar" },
];

const editTribes = [
  { code: "Luhya", name: "Luhya" },
  { code: "Kikuyu", name: "Kikuyu" },
  { code: "Luo", name: "Luo" },
  { code: "Kalenjin", name: "Kalenjin" },
  { code: "Kamba", name: "Kamba" },
  { code: "Gusii_Abagusii", name: "Gusii / Abagusii" },
  { code: "Meru", name: "Meru" },
  { code: "Maasai", name: "Maasai" },
  { code: "Turkana", name: "Turkana" },
  { code: "Samburu", name: "Samburu" },
  { code: "Embu", name: "Embu" },
  { code: "Mijikenda", name: "Mijikenda" },
  { code: "Taita", name: "Taita" },
  { code: "Swahili", name: "Swahili" },
  { code: "Baganda_Ganda_Buganda", name: "Baganda / Ganda" },
];

const editReligions = [
  { code: "Christian", name: "Christian" },
  { code: "Muslim", name: "Muslim" },
  { code: "Seventh_Day_Adventist", name: "Seventh Day Adventist" },
  { code: "Presbyterian", name: "Presbyterian" },
  { code: "Hindu", name: "Hindu" },
  { code: "Buddhist", name: "Buddhist" },
  { code: "Jehovah_Witness", name: "Jehovah Witness" },
  { code: "Atheist", name: "Atheist" },
  { code: "Jew", name: "Jew" },
  { code: "Mormon", name: "Mormon" },
];

async function openEditModal() {
  const id = user.value?.id;
  if (!id) {
    push.error("Not logged in");
    return;
  }
  showEditModal.value = true;
  editFormLoading.value = true;
  try {
    const { data, error } = await useFetch(`/api/v1/aupair/aupairs/${id}`);
    if (error.value || !data.value) {
      push.error("Could not load profile");
      closeEditModal();
      return;
    }
    const u = data.value as Record<string, unknown>;
    const profile = (u.AuPairUserProfile || u.auPairUserProfile) as Record<string, unknown> | undefined;
    editForm.value = {
      fullName: (u.fullName as string) ?? "",
      email: (u.email as string) ?? "",
      phone: (u.phone as string) ?? "",
      gender: (u.gender as string) ?? "",
      country: (profile?.country as string) ?? "",
      location: (profile?.location as string) ?? "",
      tribe: (profile?.tribe as string) ?? "",
      religion: (profile?.religion as string) ?? "",
      education: (profile?.education as string) ?? "",
    };
    const skills = profile?.skills;
    editSkillsText.value = Array.isArray(skills) ? skills.join(", ") : "";
  } catch {
    push.error("Failed to load profile");
    closeEditModal();
  } finally {
    editFormLoading.value = false;
  }
}

function closeEditModal() {
  showEditModal.value = false;
}

async function saveProfile() {
  const id = user.value?.id;
  if (!id) return;
  editSaving.value = true;
  try {
    const skills = editSkillsText.value
      ? editSkillsText.value.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const { error } = await useFetch(`/api/v1/aupair/aupairs/${id}`, {
      method: "PATCH",
      body: { ...editForm.value, skills },
    });
    if (error.value) {
      push.error((error.value as { data?: { message?: string } })?.data?.message || "Failed to save profile");
      return;
    }
    push.success("Profile updated");
    closeEditModal();
    await refreshProfile();
  } catch {
    push.error("Something went wrong");
  } finally {
    editSaving.value = false;
  }
}
</script>

<style scoped>
.profile-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: #111827;
  outline: none;
}
.profile-input::placeholder {
  color: #6b7280;
}
.profile-input:focus {
  border-color: #0000fe;
  box-shadow: 0 0 0 2px rgba(0, 0, 254, 0.25);
}
</style>
