<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Dashboard Header -->
    <FamilyHeader />

    <div class="flex">
      <FamilySidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center">
            <Icon icon="mdi:card-search" class="text-[#0000FE] mr-2" />
            Find Your Cultural Match
          </h1>
          <button
            v-if="currentAuPair"
            class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            <Icon icon="mdi:account-supervisor" class="mr-1" /> View Current Au
            Pair
          </button>
        </div>

        <!-- Matching Steps -->
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div class="flex items-center space-x-4 mb-4 md:mb-0">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="flex items-center"
              >
                <div
                  :class="{
                    'bg-[#0000FE] text-white': currentStep >= index,
                    'bg-blue-50 text-gray-700': currentStep < index,
                  }"
                  class="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                >
                  {{ index + 1 }}
                </div>
                <span
                  :class="{
                    'font-bold text-gray-900': currentStep >= index,
                    'text-gray-600': currentStep < index,
                  }"
                  class="ml-2 text-sm hidden sm:inline"
                >
                  {{ step }}
                </span>
              </div>
            </div>

            <div class="text-sm text-gray-600">
              <span class="font-medium">{{ matches.length }}</span> potential
              matches found
            </div>
          </div>
        </div>

        <!-- Current Step Content -->
        <div
          v-if="currentStep === 0"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 class="font-bold text-lg mb-6 flex items-center">
            <Icon icon="mdi:account-filter" class="text-[#0000FE] mr-2" />
            Cultural Preferences
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Tribe/Ethnicity -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tribe/Ethnic Preference</label
              >
              <select
                v-model="preferences.tribe"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">No preference</option>
                <option
                  v-for="(tribe, index) in africanTribes"
                  :key="index"
                  :value="tribe.name"
                >
                  {{ tribe.name }}
                </option>
              </select>
            </div>

            <!-- Language -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Language Preference</label
              >
              <select
                v-model="preferences.language"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">No preference</option>
                <option
                  v-for="(language, index) in languages"
                  :key="index"
                  :value="language"
                >
                  {{ language }}
                </option>
              </select>
            </div>

            <!-- Religion -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Religious Compatibility</label
              >
              <select
                v-model="preferences.religion"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">No preference</option>
                <option value="Important">Important to match</option>
                <option value="Flexible">Flexible</option>
                <option value="NotImportant">Not important</option>
              </select>
            </div>

            <!-- Childcare Approach -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Childcare Philosophy</label
              >
              <select
                v-model="preferences.childcareApproach"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
              >
                <option value="">No preference</option>
                <option value="Traditional">Traditional</option>
                <option value="Modern">Modern</option>
                <option value="Blended">Blended</option>
              </select>
            </div>

            <!-- Cuisine -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Cuisine Familiarity</label
              >
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(cuisine, index) in cuisines"
                  :key="index"
                  @click="toggleCuisine(cuisine)"
                  :class="{
                    'bg-[#0000FE] text-white':
                      preferences.cuisines.includes(cuisine),
                    'bg-blue-50 text-gray-700':
                      !preferences.cuisines.includes(cuisine),
                  }"
                  class="px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition"
                >
                  {{ cuisine }}
                </button>
              </div>
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button
              @click="findMatches"
              class="bg-[#0000FE] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Find Matches →
            </button>
          </div>
        </div>

        <!-- Match Results -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div class="flex justify-between items-center mb-4">
              <h2 class="font-bold text-lg flex items-center">
                <Icon icon="mdi:account-group" class="text-[#0000FE] mr-2" />
                Your Top Matches
              </h2>
              <button
                @click="currentStep = 0"
                class="text-[#0000FE] text-sm font-medium hover:underline flex items-center"
              >
                <Icon icon="mdi:filter" class="mr-1" /> Adjust Filters
              </button>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(match, index) in matches"
                :key="index"
                class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div class="relative">
                  <img
                    :src="match.photo"
                    :alt="match.name"
                    class="w-full h-48 object-cover"
                  />
                  <div
                    class="absolute top-2 right-2 bg-white/90 text-[#0000FE] text-xs px-2 py-1 rounded-full font-bold"
                  >
                    {{ match.matchScore }}% Match
                  </div>
                </div>

                <div class="p-4">
                  <h3 class="font-bold text-lg">{{ match.name }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ match.tribe }} from {{ match.country }}
                  </p>

                  <div class="mt-3 space-y-2">
                    <div class="flex items-center text-sm">
                      <Icon icon="mdi:translate" class="text-[#0000FE] mr-2" />
                      <span>Speaks: {{ match.languages.join(", ") }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <Icon icon="mdi:school" class="text-[#0000FE] mr-2" />
                      <span>Studies: {{ match.education }}</span>
                    </div>
                  </div>

                  <div class="mt-4 flex justify-between items-center">
                    <button
                      @click="viewProfile(match)"
                      class="text-[#0000FE] text-sm font-medium hover:underline"
                    >
                      View Profile →
                    </button>
                    <button
                      @click="selectForTrial(match)"
                      class="bg-[#0000FE] text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                    >
                      Select for Trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center">
              <Icon icon="mdi:chart-bar" class="text-[#0000FE] mr-2" />
              Matching Insights
            </h2>

            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-gray-50 p-4 rounded-md">
                <h3 class="font-bold text-sm mb-2">Cultural Alignment</h3>
                <div class="h-2 bg-gray-100 rounded-full">
                  <div
                    class="h-2 bg-[#0000FE] rounded-full"
                    style="width: 85%"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Higher than 72% of families
                </p>
              </div>

              <div class="bg-gray-50 p-4 rounded-md">
                <h3 class="font-bold text-sm mb-2">Language Match</h3>
                <div class="h-2 bg-gray-100 rounded-full">
                  <div
                    class="h-2 bg-[#0000FE] rounded-full"
                    style="width: 90%"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Excellent language compatibility
                </p>
              </div>

              <div class="bg-gray-50 p-4 rounded-md">
                <h3 class="font-bold text-sm mb-2">Childcare Style</h3>
                <div class="h-2 bg-gray-100 rounded-full">
                  <div
                    class="h-2 bg-[#0000FE] rounded-full"
                    style="width: 78%"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Matches your preferred approach
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Trial Period Setup -->
        <div
          v-if="currentStep === 2"
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 class="font-bold text-lg mb-6 flex items-center">
            <Icon icon="mdi:calendar-check" class="text-[#0000FE] mr-2" />
            Arrange Trial Period
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <div class="flex items-center space-x-4 mb-6">
                <img
                  :src="selectedCandidate.photo"
                  :alt="selectedCandidate.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 class="font-bold">{{ selectedCandidate.name }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ selectedCandidate.matchScore }}% Cultural Match
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Trial Duration</label
                  >
                  <select
                    v-model="trialDetails.duration"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Start Date</label
                  >
                  <input
                    type="date"
                    v-model="trialDetails.startDate"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0000FE] focus:border-[#0000FE]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-bold text-sm mb-2">Trial Expectations</h3>
              <div class="bg-gray-50 p-4 rounded-md mb-4">
                <p class="text-sm text-gray-600">
                  During the trial period, you'll have the opportunity to:
                </p>
                <ul
                  class="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2"
                >
                  <li>Assess cultural fit with your family</li>
                  <li>Observe childcare approach</li>
                  <li>Evaluate language communication</li>
                  <li>Determine daily routine compatibility</li>
                </ul>
              </div>

              <div class="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  v-model="trialDetails.agreedToTerms"
                  class="h-4 w-4 border-gray-300 rounded focus:ring-[#0000FE] text-[#0000FE]"
                />
                <label
                  for="agreeTerms"
                  class="ml-2 block text-sm text-gray-600"
                >
                  I agree to the
                  <a href="#" class="text-[#0000FE] hover:underline"
                    >trial period terms</a
                  >
                </label>
              </div>

              <button
                @click="confirmTrial"
                :disabled="!trialDetails.agreedToTerms"
                :class="{
                  'bg-[#0000FE] hover:bg-blue-700': trialDetails.agreedToTerms,
                  'bg-gray-300 cursor-not-allowed':
                    !trialDetails.agreedToTerms,
                }"
                class="w-full text-white py-2 rounded-md font-medium transition"
              >
                Confirm Trial Period
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["family-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const currentStep = ref(0);
const steps = ref(["Set Preferences", "View Matches", "Arrange Trial"]);
const currentAuPair = ref(null);

const preferences = ref({
  tribe: "",
  language: "",
  religion: "",
  childcareApproach: "",
  cuisines: [],
});

const tribes = ref([
  "Yoruba",
  "Igbo",
  "Hausa",
  "Akan",
  "Wolof",
  "Fula",
  "Mandinka",
  "Serer",
]);
const languages = ref([
  "Yoruba",
  "Igbo",
  "Hausa",
  "Wolof",
  "French",
  "Swahili",
  "English",
]);
const cuisines = ref([
  "West African",
  "North African",
  "East African",
  "Vegetarian",
  "Halal",
  "Traditional",
]);

const matches = ref([]);
const selectedCandidate = ref({});

const trialDetails = ref({
  duration: "7",
  startDate: "",
  agreedToTerms: false,
});

const toggleCuisine = (cuisine) => {
  const index = preferences.value.cuisines.indexOf(cuisine);
  if (index === -1) {
    preferences.value.cuisines.push(cuisine);
  } else {
    preferences.value.cuisines.splice(index, 1);
  }
};

const findMatches = () => {
  // Simulate API call
  matches.value = [
    {
      id: 1,
      name: "Amina Diallo",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      tribe: "Wolof",
      country: "Senegal",
      matchScore: 92,
      languages: ["Wolof", "French", "English"],
      education: "Early Childhood Education",
      childcareExperience: "3 years",
      religion: "Islam",
    },
    {
      id: 2,
      name: "Fatou Bâ",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      tribe: "Fula",
      country: "Mali",
      matchScore: 88,
      languages: ["Fula", "French", "Arabic"],
      education: "Child Psychology",
      childcareExperience: "5 years",
      religion: "Islam",
    },
    {
      id: 3,
      name: "Ngozi Okonkwo",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      tribe: "Igbo",
      country: "Nigeria",
      matchScore: 85,
      languages: ["Igbo", "English"],
      education: "Nursing",
      childcareExperience: "4 years",
      religion: "Christian",
    },
  ];
  currentStep.value = 1;
};

const viewProfile = (match) => {
  // In a real app, this would open a modal or navigate to profile page
  console.log("Viewing profile:", match);
};

const selectForTrial = (match) => {
  selectedCandidate.value = match;
  currentStep.value = 2;
};

const confirmTrial = () => {
  // In a real app, this would submit to backend
  console.log("Confirming trial:", trialDetails.value);
  // router.push('/family/au-pair');
};

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
