<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <AppSidebar />
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <!-- Hero Section -->

      <div class="space-y-12">
        <h2 class="text-2xl font-semibold leading-7 text-gray-900">
          Migration Support for Employees
        </h2>
        <p class="max-w-2xl text-sm leading-6 text-gray-800">
          Moving abroad for work? We're here to help you every step of the way —
          from document prep to settling into your new home.
        </p>
      </div>

      <!-- Services Section -->
      <section class="py-8 mb-12">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl font-semibold mb-8 text-gray-800">
            Our Services
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Pre-Departure Guidance
              </h3>
              <p class="text-gray-800">
                Step-by-step help on job matching, visa application, and medical
                requirements.
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Legal & Visa Support
              </h3>
              <p class="text-gray-800">
                Assistance with work permits, contract reviews, and embassy
                requirements.
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Travel & Orientation
              </h3>
              <p class="text-gray-800">
                Airport transfer coordination, host-country orientation, and
                cultural briefings.
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Host Country Support
              </h3>
              <p class="text-gray-800">
                Help with accommodation, emergency contact registration, and
                reporting channels.
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Wellness & Helpline
              </h3>
              <p class="text-gray-800">
                Access to a 24/7 helpline, mental health support, and guidance
                if challenges arise.
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 class="text-xl font-semibold mb-3 text-[#0000FE]">
                Job Placement & Contracts
              </h3>
              <p class="text-gray-800">
                Assistance securing roles abroad, contract negotiation support,
                and employer vetting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-8 mb-12">
        <div>
          <div class="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
            <h2
              class="text-2xl font-semibold leading-10 tracking-tight text-gray-900"
            >
              Frequently asked questions
            </h2>
            <p class="mt-6 max-w-2xl text-base leading-7 text-gray-600">
              Have a different question and can’t find the answer you’re looking
              for? Reach out to our support team by
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                sending us an email</a
              >
              and we’ll get back to you as soon as we can.
            </p>
            <div class="mt-20">
              <dl
                class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10"
              >
                <div v-for="faq in faqs" :key="faq.id">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    {{ faq.question }}
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">
                    {{ faq.answer }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="py-12 px-6 bg-white rounded-xl shadow">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-2xl font-semibold mb-4 text-gray-800">
            Need Help with Your Move?
          </h2>
          <p class="mb-6 text-gray-800 max-w-2xl mx-auto">
            Reach out to our Migration Support Team — we're here to assist you
            throughout the process.
          </p>
          <a
            href="/contact"
            class="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["jobseeker-dashboard"],
});
const faqs = [
  {
    id: 1,
    question: "What is Hema and how does it work?",
    answer:
      "Hema is a platform that connects verified service providers with employers. Employees can create a profile, upload verification documents, and apply for jobs across various sectors.",
  },
  {
    id: 2,
    question: "How do I get verified on Hema?",
    answer:
      "To get verified, fill out the verification form under your profile settings, upload required documents like your ID, selfie, certificates, and references. Your application will be reviewed within 24–72 hours.",
  },
  {
    id: 3,
    question: "What kind of jobs can I find on Hema?",
    answer:
      "You can find jobs in categories like domestic work, caregiving, hospitality, construction, beauty services, and more—based on your experience and skill set.",
  },
  {
    id: 4,
    question: "Can I apply for jobs outside Kenya through Hema?",
    answer:
      "Yes, Hema provides migration support for overseas job placements, including visa guidance, travel support, and post-arrival assistance in the host country.",
  },
  {
    id: 5,
    question: "What happens if my verification is rejected?",
    answer:
      "If your verification is rejected, you'll receive a notification with a reason. You can then edit your form and resubmit the correct or missing documents.",
  },
  {
    id: 6,
    question: "Is there any cost to use Hema as an employee?",
    answer:
      "Signing up and creating a profile on Hema is free. However, some services like migration support or advanced skill tests may come with a small fee, which will be clearly communicated.",
  },
];
</script>
