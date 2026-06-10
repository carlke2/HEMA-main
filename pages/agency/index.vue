<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      <section class="bg-transparent text-gray-800 px-6 pt-10">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-semibold text-gray-800">
            Hello, {{ user.fullName }}
          </h1>
          <div>
            <!-- Post Job Button -->
            <button
              @click="openModal = true"
              class="bg-[#0000FE] hover:bg-[#0000FE7D] text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              + Post a job
            </button>
          </div>
        </div>

        <h2 class="text-lg font-semibold mb-4">Overview</h2>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow p-4">
            <p class="text-sm text-gray-500">Total Users</p>
            <p class="text-2xl font-semibold text-gray-800">
              {{ totalAgencyUsers }}
            </p>
          </div>
          <div class="bg-white rounded-xl shadow p-4">
            <p class="text-sm text-gray-500">Pending Approvals</p>
            <p class="text-2xl font-semibold text-yellow-600">
              {{ totalUnVerifiedAgencyUsers }}
            </p>
          </div>
          <div class="bg-white rounded-xl shadow p-4">
            <p class="text-sm text-gray-500">Verified Users</p>
            <p class="text-2xl font-semibold text-green-600">
              {{ totalVerifiedAgencyUsers }}
            </p>
          </div>
          <div class="bg-white rounded-xl shadow p-4">
            <p class="text-sm text-gray-500">Posted Jobs</p>
            <p class="text-2xl font-semibold text-blue-600">
              {{ totalAgencyJobs }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div class="bg-white rounded-xl p-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-2">
                <div class="bg-[#0000FE] p-2 rounded-full">
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <p class="text-sm font-medium">
                  Need experienced Vue frontend developer
                </p>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-4">
              <span
                class="inline-block bg-[#0000FE] text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                Draft job post
              </span>
              <p class="text-sm text-gray-500 mt-3">
                Add the skills you need to continue
              </p>
              <button
                class="mt-4 w-full border border-[#0000FE] text-[#0000FE] hover:bg-green-50 px-4 py-2 text-sm rounded-md transition"
              >
                Add skills
              </button>
            </div>
          </div>

          <div>
            <!-- Post Job Card -->
            <div
              @click="openModal = true"
              class="cursor-pointer bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 flex justify-center items-center min-h-[180px] hover:border-[#0000FE] transition"
            >
              <button
                class="text-[#0000FE] text-sm hover:underline pointer-events-none"
              >
                + Post a job
              </button>
            </div>

            <!-- Modal -->
            <div
              v-if="openModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
            >
              <div
                class="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl relative"
              >
                <h2 class="text-lg font-semibold mb-4 text-gray-800">
                  Post a New Job
                </h2>

                <form @submit.prevent="handleSubmit" class="space-y-4">
                  <!-- Job Title -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Job Title</label
                    >
                    <input
                      v-model="form.title"
                      type="text"
                      required
                      class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                      placeholder="e.g. Housekeeper"
                    />
                  </div>

                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <textarea
                      v-model="form.description"
                      required
                      class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                      rows="4"
                      placeholder="Brief job description..."
                    ></textarea>
                  </div>

                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700"
                      >Category</label
                    >
                    <select
                      v-model="form.category"
                      required
                      class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                    >
                      <option value="">Select a category</option>
                      <option
                        v-for="category in categories"
                        :key="category"
                        :value="category"
                      >
                        {{ category }}
                      </option>
                    </select>
                  </div>

                  <!-- Wanted skills -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700"
                      >Skills</label
                    >
                    <textarea
                      v-model="form.skills"
                      required
                      class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                      rows="1"
                      placeholder="smart, kind, hardworking..."
                    ></textarea>
                  </div>

                  <!-- Location, Country -->
                  <div class="flex gap-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700"
                        >Country</label
                      >
                      <select
                        v-model="form.country"
                        required
                        class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                      >
                        <option value="">Select a country</option>
                        <option
                          v-for="country in countries"
                          :key="country.code"
                          :value="country.name"
                        >
                          {{ country.name }}
                        </option>
                      </select>
                    </div>
                    <div class="w-1/2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Location</label
                      >
                      <input
                        v-model="form.location"
                        type="text"
                        required
                        class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                        placeholder="e.g. Nairobi"
                      />
                    </div>
                  </div>

                  <!-- Salary & Currency -->
                  <div class="flex gap-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium text-gray-700"
                        >Salary</label
                      >
                      <input
                        v-model="form.salary"
                        type="number"
                        required
                        class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                        placeholder="e.g. 1500"
                      />
                    </div>
                    <div class="w-1/3">
                      <label class="block text-sm font-medium text-gray-700"
                        >Currency</label
                      >
                      <select
                        v-model="form.currency"
                        required
                        class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-[#0000FE] focus:border-[#0000FE] text-sm"
                      >
                        <option value="">Select a currency</option>
                        <option value="KES">KES</option>
                        <option value="USD">USD</option>
                        <option value="AED">AED</option>
                        <option value="SAR">SAR</option>
                      </select>
                    </div>
                  </div>

                  <!-- Modal Actions -->
                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      @click="openModal = false"
                      class="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      :disabled="loading"
                      type="submit"
                      class="px-4 py-2 bg-[#0000FE] text-white rounded-md text-sm font-semibold hover:bg-[#0000FECC]"
                      @click="handleSubmit"
                    >
                      <span v-if="loading" class="flex items-center">
                        <Icon
                          name="line-md:loading-loop"
                          class="mr-2 size-5"
                          aria-hidden="true"
                        />Posting...
                      </span>
                      <span v-else>Post Job</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-transparent text-gray-800 py-6 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl">Help and resources</h2>
            <a
              href="#"
              class="text-[#0000FE] hover:underline flex items-center gap-1"
            >
              View all resources
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          <div
            class="bg-white p-6 rounded-xl mb-6 flex justify-between items-center"
          >
            <div>
              <p class="text-sm text-gray-400">Hema help</p>
              <h3 class="text-xl font-semibold mb-3">
                Browse help articles by category
              </h3>
              <button
                class="bg-[#0000FE] hover:bg-[#0000FE7D] text-white px-4 py-2 rounded-md text-sm"
              >
                Learn more
              </button>
            </div>
            <div class="hidden md:block">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4961/4961736.png"
                alt="Help Illustration"
                class="w-24 h-24 object-contain"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="bg-white p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <p class="text-sm text-gray-400">Manage your project</p>
                <h4 class="text-black">
                  Best practices on feedback post-contract
                </h4>
              </div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2954/2954893.png"
                  alt="Thumbs up"
                  class="w-16 h-auto"
                />
              </div>
            </div>

            <div
              class="bg-white p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <p class="text-sm text-gray-400">Trust & safety</p>
                <h4 class="text-black">
                  Keep yourself and others safe on Hema
                </h4>
              </div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1161/1161388.png"
                  alt="Safety"
                  class="w-16 h-auto"
                />
              </div>
            </div>

            <div
              class="bg-white p-5 rounded-xl flex justify-between items-center"
            >
              <div>
                <p class="text-sm text-gray-400">Pay for work</p>
                <h4 class="text-black">How to track your weekly spending</h4>
              </div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/17015/17015250.png"
                  alt="Invoice"
                  class="w-16 h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6 mt-7">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/agency/add-agency-user"
              class="bg-[#05FF88] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#05FF88]/80 transition"
            >
              Add New User
            </NuxtLink>
            <NuxtLink
              to="/agency/agency-users"
              class="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-500 transition"
            >
              Manage Users
            </NuxtLink>
            <NuxtLink
              to="/agency/profile"
              class="bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Edit Agency Profile
            </NuxtLink>
          </div>
        </div>
      </section>

      <footer
        class="bg-transparent text-gray-800 text-sm text-center py-8 mt-12 border-t border-gray-400"
      >
        <div class="max-w-6xl mx-auto px-6">
          <p>&copy; 2025 Hema. All rights reserved.</p>
          <nav class="mt-2">
            <a
              href="/privacy-policy"
              class="text-[#0000FE] hover:underline text-xs"
              >Privacy Policy</a
            >
            <span class="mx-2 text-gray-400 text-xs">|</span>
            <a href="/terms" class="text-[#0000FE] hover:underline text-xs"
              >Terms of Service</a
            >
          </nav>
        </div>
      </footer>
    </main>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["agency-dashboard"],
});

const { user, clear } = useUserSession();

if (!user.value || !user.value.agencyId) {
  push.error("You must be part of an agency to access this page.");
  await clear();
  await navigateTo("/auth/sign-in");
}
const agencyId = user.value.agencyId;
let router = useRouter();
const logout = () => {
  clear().then(() => {
    router.push("/auth/sign-in");
  });
};

const openModal = ref(false);
const loading = ref(false);

const form = ref<{
  title: string;
  description: string;
  category: string;
  country: string;
  location: string;
  skills: string | string[];
  salary: string;
  currency: string;
}>({
  title: "",
  description: "",
  category: "",
  country: "",
  location: "",
  skills: "",
  salary: "",
  currency: "",
});

function convertCountryToDBFormat(value: string) {
  if (typeof value !== "string") return value;
  return value
    .replace(/[-,'&]+/g, "")
    .trim()
    .replace(/\s+/g, "_");
}
function convertCategory(value: string) {
  if (typeof value !== "string") return value;
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
const handleSubmit = async () => {
  try {
    loading.value = true;
    form.value.country = convertCountryToDBFormat(form.value.country);
    form.value.category = convertCategory(form.value.category);
    if (typeof form.value.skills === "string") {
      form.value.skills = form.value.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => !!s);
    }
    const { data, error } = await useFetch("/api/v1/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form.value, agencyId }),
    });
    if (error?.value) {
      throw error.value;
    }
    push.success("Job posted successfully.");

    // Reset & close modal
    openModal.value = false;
    form.value = {
      title: "",
      description: "",
      category: "",
      country: "",
      location: "",
      skills: "",
      salary: "",
      currency: "",
    };
    loading.value = false;
    return;
  } catch (error: any) {
    const msg =
      error?.data?.message ||
      error?.message ||
      "Job posting failed. Please try again.";

    push.error(msg);
  } finally {
    loading.value = false;
  }
};
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo-Brazzaville" },
  { code: "CD", name: "Congo-Kinshasa" },
  { code: "CR", name: "Costa Rica" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "TL", name: "East Timor" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea‐Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "CI", name: "Ivory Coast" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" },
  { code: "XK", name: "Kosovo" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "UAE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vatican City" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const categories = [
  "Construction",
  "Skilled Trades",
  "General Labor",
  "Cleaning",
  "Healthcare",
  "Nursing",
  "Doctors",
  "Hospitality",
  "Restaurant",
  "Hotel",
  "Domestic",
  "Transport",
  "Logistics",
  "Warehouse",
  "Admin",
  "Customer Service",
  "Retail",
  "IT",
  "Engineering",
  "Finance",
  "Beauty",
  "Security",
  "Education",
  "Maintenance",
  "Marketing",
  "HR",
  "Other",
];

// Fetch Agency users Data
const { data: agencyUsersData, error: agencyUsersDataError } = useFetch(
  "/api/v1/users",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      agencyId: user.value?.agencyId,
    },
  }
);
if (agencyUsersDataError.value) {
  push.error(agencyUsersDataError.value);
}
let totalAgencyUsers = ref(0);
let agencyUsers = ref<any>([]);
watchEffect(() => {
  if (agencyUsersData.value && Array.isArray(agencyUsersData.value)) {
    agencyUsers.value = agencyUsersData.value;
    totalAgencyUsers.value = agencyUsers.value.length;
  } else {
    agencyUsers.value = [];
    totalAgencyUsers.value = agencyUsers.value.length;
  }
});

// Fetch unverified agency users' Data
const {
  data: unVerifiedAgencyUsersData,
  error: unVerifiedAgencyUsersDataError,
} = useFetch("/api/v1/users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    agencyId: agencyId,
    verified: "false",
  },
});
if (unVerifiedAgencyUsersDataError.value) {
  push.error(
    unVerifiedAgencyUsersDataError.value ||
      "Error fetching unverified agency users."
  );
}
let totalUnVerifiedAgencyUsers = ref(0);
let unVerifiedAgencyUsers = ref<any>([]);
watchEffect(() => {
  if (
    unVerifiedAgencyUsersData.value &&
    Array.isArray(unVerifiedAgencyUsersData.value)
  ) {
    unVerifiedAgencyUsers.value = unVerifiedAgencyUsersData.value;
    totalUnVerifiedAgencyUsers.value = unVerifiedAgencyUsers.value.length;
  } else {
    unVerifiedAgencyUsers.value = [];
    totalUnVerifiedAgencyUsers.value = unVerifiedAgencyUsers.value.length;
  }
});

// Fetch verified agency users Data
const { data: verifiedAgencyUsersData, error: verifiedAgencyUsersDataError } =
  useFetch("/api/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      agencyId: agencyId,
      verified: "true",
    },
  });
if (verifiedAgencyUsersDataError.value) {
  push.error(
    verifiedAgencyUsersDataError.value ||
      "Error fetching verified agency users."
  );
}
let totalVerifiedAgencyUsers = ref(0);
let verifiedAgencyUsers = ref<any>([]);
watchEffect(() => {
  if (
    verifiedAgencyUsersData.value &&
    Array.isArray(verifiedAgencyUsersData.value)
  ) {
    verifiedAgencyUsers.value = verifiedAgencyUsersData.value;
    totalVerifiedAgencyUsers.value = verifiedAgencyUsers.value.length;
  } else {
    verifiedAgencyUsers.value = [];
    totalVerifiedAgencyUsers.value = verifiedAgencyUsers.value.length;
  }
});

// Fetch agency jobs
const { data: agencyJobsData, error: agencyJobsDataError } = useFetch(
  "/api/v1/jobs",
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
if (agencyJobsDataError.value) {
  push.error(agencyJobsDataError.value);
}
let totalAgencyJobs = ref(0);
let agencyJobs = ref<any>([]);
watchEffect(() => {
  if (agencyJobsData.value && Array.isArray(agencyJobsData.value)) {
    agencyJobs.value = agencyJobsData.value;
    totalAgencyJobs.value = agencyJobsData.value.length;
  } else {
    agencyJobs.value = [];
    totalAgencyJobs.value = agencyJobs.value.length;
  }
});
</script>
