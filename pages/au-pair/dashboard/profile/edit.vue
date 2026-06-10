<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />
      <main class="flex-1 p-6 pb-20 md:pb-6">
        <NuxtLink
          to="/au-pair/dashboard/profile"
          class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0000FE] mb-6"
        >
          <icon name="mdi:arrow-left" />
          Back to Profile
        </NuxtLink>

        <div class="max-w-2xl">
          <h1 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <icon name="mdi:account-edit" class="text-[#0000FE]" />
            Edit Profile
          </h1>

          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0000FE]" />
          </div>

          <form v-else @submit.prevent="saveProfile" class="space-y-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <!-- Personal -->
            <section class="space-y-4">
              <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Personal</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Full name</label>
                  <input
                    v-model="form.fullName"
                    type="text"
                    required
                    class="input"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    class="input"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
                  <input
                    v-model="form.phone"
                    type="text"
                    class="input"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Gender</label>
                  <select v-model="form.gender" class="input">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="preferNotToSay">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Location & identity -->
            <section class="space-y-4">
              <h2 class="text-sm font-semibold text-gray-900 uppercase tracking-wide">Location & identity</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Country</label>
                  <select v-model="form.country" class="input">
                    <option value="">Select country</option>
                    <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Location (city/region)</label>
                  <input v-model="form.location" type="text" class="input" placeholder="e.g. Nairobi" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Tribe / ethnicity</label>
                  <select v-model="form.tribe" class="input">
                    <option value="">Select tribe</option>
                    <option v-for="t in tribes" :key="t.code" :value="t.code">{{ t.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Religion</label>
                  <select v-model="form.religion" class="input">
                    <option value="">Select religion</option>
                    <option v-for="r in religions" :key="r.code" :value="r.code">{{ r.name }}</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Education</label>
                  <input v-model="form.education" type="text" class="input" placeholder="e.g. Secondary, Some tertiary" />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-900 mb-1.5">Skills (comma-separated)</label>
                  <input
                    v-model="skillsText"
                    type="text"
                    class="input"
                    placeholder="e.g. Childcare, Cooking, English"
                  />
                </div>
              </div>
            </section>

            <div class="flex flex-wrap gap-3 pt-4">
              <button
                type="submit"
                :disabled="saving"
                class="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0000FE] text-white hover:bg-blue-700 transition disabled:opacity-60"
              >
                {{ saving ? "Saving…" : "Save changes" }}
              </button>
              <NuxtLink
                to="/au-pair/dashboard/profile"
                class="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </NuxtLink>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["aupair-dashboard"],
});

const { user } = useUserSession();
const loading = ref(true);
const saving = ref(false);
const skillsText = ref("");

const form = ref({
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

const countries = [
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

const tribes = [
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

const religions = [
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

onMounted(async () => {
  const id = user.value?.id;
  if (!id) {
    push.error("Not logged in");
    await navigateTo("/au-pair/auth/sign-in");
    return;
  }
  try {
    const { data, error } = await useFetch(`/api/v1/aupair/aupairs/${id}`);
    if (error.value || !data.value) {
      push.error("Could not load profile");
      return;
    }
    const u = data.value as any;
    form.value = {
      fullName: u.fullName ?? "",
      email: u.email ?? "",
      phone: u.phone ?? "",
      gender: u.gender ?? "",
      country: u.AuPairUserProfile?.country ?? "",
      location: u.AuPairUserProfile?.location ?? "",
      tribe: u.AuPairUserProfile?.tribe ?? "",
      religion: u.AuPairUserProfile?.religion ?? "",
      education: u.AuPairUserProfile?.education ?? "",
    };
    skillsText.value = Array.isArray(u.AuPairUserProfile?.skills)
      ? u.AuPairUserProfile.skills.join(", ")
      : "";
  } catch (e) {
    push.error("Failed to load profile");
  } finally {
    loading.value = false;
  }
});

async function saveProfile() {
  const id = user.value?.id;
  if (!id) return;
  saving.value = true;
  try {
    const skills = skillsText.value
      ? skillsText.value.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const { error } = await useFetch(`/api/v1/aupair/aupairs/${id}`, {
      method: "PATCH",
      body: {
        ...form.value,
        skills,
      },
    });
    if (error.value) {
      push.error(error.value.data?.message || "Failed to save profile");
      return;
    }
    push.success("Profile updated");
    await navigateTo("/au-pair/dashboard/profile");
  } catch (e) {
    push.error("Something went wrong");
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: #111827;
  outline: none;
}
.input::placeholder {
  color: #6b7280;
}
.input:focus {
  border-color: #0000fe;
  box-shadow: 0 0 0 2px rgba(0, 0, 254, 0.25);
}
</style>
