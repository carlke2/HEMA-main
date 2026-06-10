<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <AppSidebar />
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <form @submit.prevent="submitForm">
        <div class="space-y-12">
          <div>
            <h2 class="text-2xl font-semibold leading-7 text-gray-900">
              Professional Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Details about your professional background.
            </p>
            <div
              class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="jobCategory"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Job Category</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    v-model="formData.jobCategory"
                    id="jobCategory"
                    name="jobCategory"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-2 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Construction & Infrastructure</option>
                    <option>Cleaning & Maintenance</option>
                    <option>Hospitality & Domestic Work</option>
                    <option>Transportation & Delivery</option>
                    <option>Factory & Industrial Work</option>
                    <option>Security & Safety Support</option>
                    <option>Home-Based Services</option>
                  </select>
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="experience"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Years of Experience</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="number"
                    v-model.number="formData.experience"
                    name="experience"
                    id="experience"
                    class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="educationLevel"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Highest Education Level</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.educationLevel"
                    name="educationLevel"
                    id="educationLevel"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="languagesSpoken"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Languages Spoken</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.languagesSpoken"
                    name="languagesSpoken"
                    id="languagesSpoken"
                    placeholder=" e.g., English, Swahili"
                    class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Document Uploads
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Upload required documents for verification.
            </p>
            <div
              class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="certifications"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Certifications</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'certifications')"
                    type="file"
                    name="certifications"
                    id="certifications"
                    multiple
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                  <p class="text-xs leading-5 text-gray-600">
                    Upload relevant certifications (PDF, JPG, PNG).
                  </p>
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="governmentIdUpload"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Government-Issued ID</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'governmentIdUpload')"
                    type="file"
                    name="governmentIdUpload"
                    id="governmentIdUpload"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                  <p class="text-xs leading-5 text-gray-600">
                    Upload a clear copy of your National ID or Passport.
                  </p>
                </div>
              </div>

              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="passportPhotoUpload"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Passport Photo</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'passportPhotoUpload')"
                    type="file"
                    name="passportPhotoUpload"
                    id="passportPhotoUpload"
                    accept="image/*"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                  <p class="text-xs leading-5 text-gray-600">
                    Upload a recent passport-sized photo.
                  </p>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="liveSelfie"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Live Selfie</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'liveSelfie')"
                    type="file"
                    name="liveSelfie"
                    id="liveSelfie"
                    accept="image/*"
                    capture="user"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                  <p class="text-xs leading-5 text-gray-600">
                    Take or upload a live selfie for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Emergency & Background
            </h2>
            <div
              class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="nextOfKinName"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Next of Kin Name</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.nextOfKinName"
                    name="nextOfKinName"
                    id="nextOfKinName"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="nextOfKinContact"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Next of Kin Contact</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.nextOfKinContact"
                    name="nextOfKinContact"
                    id="nextOfKinContact"
                    autocomplete="tel"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="crimeConviction"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Have you ever been convicted of a crime?</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    v-model="formData.crimeConviction"
                    id="crimeConviction"
                    name="crimeConviction"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 focus:ring-2 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="policeClearance"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Police Clearance Certificate</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'policeClearance')"
                    type="file"
                    name="policeClearance"
                    id="policeClearance"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                  <p class="text-xs leading-5 text-gray-600">
                    Upload a valid police clearance certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              References & Skills
            </h2>
            <div
              class="mt-10 space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="reference1"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Reference 1 Name & Contact</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.reference1"
                    name="reference1"
                    placeholder="optional"
                    id="reference1"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="reference2"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Reference 2 Name & Contact</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    v-model="formData.reference2"
                    name="reference2"
                    part="optional"
                    id="reference2"
                    class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400 focus:ring-2 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="prevEmployerLetter"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Previous Employer Reference Letter (Optional)</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'prevEmployerLetter')"
                    type="file"
                    name="prevEmployerLetter"
                    id="prevEmployerLetter"
                    class="block w-full px-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                </div>
              </div>
              <div
                class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              >
                <label
                  for="videoDemo"
                  class="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >Upload Video Demo (Optional)</label
                >
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    @change="handleFileUpload($event, 'videoDemo')"
                    type="file"
                    name="videoDemo"
                    id="videoDemo"
                    accept="video/*"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[#0000FE] hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex justify-center rounded-md bg-[#05FF88] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-[#05FF887D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0000FE]"
          >
            Submit Employee Verification
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["jobseeker-dashboard"],
});
import { ref } from "vue";

const emit = defineEmits(["submit-employee-data"]);

const formData = ref({
  jobCategory: "Construction & Infrastructure",
  experience: null,
  educationLevel: "",
  languagesSpoken: "",
  certifications: null,
  governmentIdUpload: null,
  passportPhotoUpload: null,
  liveSelfie: null,
  nextOfKinName: "",
  nextOfKinContact: "",
  crimeConviction: "no",
  policeClearance: null,
  reference1: "",
  reference2: "",
  prevEmployerLetter: null,
  videoDemo: null,
});

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0];
  if (file) {
    formData.value[fieldName] = file;
    // For multiple files on 'certifications', you might need an array:
    // if (fieldName === 'certifications') {
    //   formData.value.certifications = Array.from(event.target.files);
    // } else {
    //   formData.value[fieldName] = event.target.files[0];
    // }
  }
};

const takeSkillTest = () => {
  // Logic to redirect to or open a skill test
  alert("Redirecting to skill test...");
};

const submitForm = () => {
  // Create a FormData object to handle file uploads correctly
  const submissionData = new FormData();
  for (const key in formData.value) {
    if (
      formData.value[key] instanceof File ||
      (Array.isArray(formData.value[key]) &&
        formData.value[key][0] instanceof File)
    ) {
      // For multiple files (like certifications if implemented that way)
      if (Array.isArray(formData.value[key])) {
        formData.value[key].forEach((file) => submissionData.append(key, file));
      } else {
        submissionData.append(key, formData.value[key]);
      }
    } else {
      submissionData.append(key, formData.value[key]);
    }
  }
  emit("submit-employee-data", submissionData);
};
</script>
