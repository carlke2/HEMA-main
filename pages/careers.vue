<template>
  <div class="bg-gray-900 min-h-screen">
    <landing-nav />

    <!-- Hero -->
    <section class="text-center pt-32 pb-20 px-6 bg-[#0000FE]">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
        Work with the Hema Team
      </h1>
      <p class="text-lg text-indigo-100 max-w-2xl mx-auto">
        We’re growing our internal team! Join us in building meaningful digital
        experiences for workers and agencies across the globe.
      </p>
    </section>

    <section>
      <Team />
    </section>
    <!-- Join Our Team Section -->
    <section id="join-team" class="bg-white py-16 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We're always looking for passionate people to join our team. While we
          don't have open positions right now, we'd love to hear from you!
        </p>
        <button
          @click="showNoPositions"
          class="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
        >
          Join Our Team
        </button>

        <!-- No Positions Modal -->
        <div
          v-if="showNoPositionsModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div class="bg-white p-8 rounded-lg max-w-md mx-4">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              No Open Positions
            </h3>
            <p class="text-gray-600 mb-6">
              We currently don't have any open roles, but we're always excited
              to connect with talented individuals. Send your resume to
              careers@hema.com and we'll reach out when opportunities match your
              skills.
            </p>
            <button
              @click="closeModal"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div
      v-if="selectedJob"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/15"
      @click.self="selectedJob = null"
    >
      <div class="bg-white max-w-xl w-full p-6 rounded-xl shadow-xl relative">
        <button
          @click="selectedJob = null"
          class="absolute top-3 right-4 text-black hover:text-black text-lg"
        >
          ✖
        </button>

        <h3 class="text-2xl font-bold mb-2 text-black">
          {{ selectedJob.title }}
        </h3>
        <p class="text-sm text-gray-800 mb-1">
          Location: {{ selectedJob.location }}
        </p>
        <p class="text-gray-900 text-sm mb-4">{{ selectedJob.description }}</p>

        <form @submit.prevent="submitApplication">
          <div class="space-y-4 text-gray-500">
            <input
              v-model="applicant.name"
              type="text"
              required
              placeholder="Your Name"
              class="w-full px-3 py-2 border border-gray-500 rounded-md text-sm"
            />
            <input
              v-model="applicant.email"
              type="email"
              required
              placeholder="Your Email"
              class="w-full px-3 py-2 border border-gray-500 rounded-md text-sm"
            />
            <textarea
              v-model="applicant.message"
              rows="4"
              placeholder="Brief message or experience..."
              class="w-full px-3 py-2 border border-gray-500 rounded-md text-sm"
            ></textarea>
          </div>
          <button
            type="submit"
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>

    <landing-footer />
  </div>
</template>

<script setup>
import { ref } from "vue";

const showNoPositionsModal = ref(false);

const showNoPositions = () => {
  showNoPositionsModal.value = true;
};

const closeModal = () => {
  showNoPositionsModal.value = false;
};

const selectedJob = ref(null);
const applicant = ref({ name: "", email: "", message: "" });

const openModal = (job) => {
  selectedJob.value = job;
};

const submitApplication = () => {
  console.log(
    "Submitting application:",
    applicant.value,
    "for job:",
    selectedJob.value
  );
  alert(`Application submitted for ${selectedJob.value.title}`);
  applicant.value = { name: "", email: "", message: "" };
  selectedJob.value = null;
};
</script>

<style scoped>
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;

  -webkit-box-orient: vertical;
}
</style>
