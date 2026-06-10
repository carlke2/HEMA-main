<template>
  <LandingNav />
  <section class="bg-white pt-12">
    <!-- Hero -->
    <div
      class="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center text-black"
    >
      <div>
        <h1 class="text-4xl md:text-5xl font-semibold mb-4">
          Find <span class="text-[#0000Fe]">reliable workers</span><br />
          faster with Hema
        </h1>
        <p class="text-gray-600 mb-6">
          Post jobs, review verified profiles, and hire trusted professionals
          for your home or business needs.
        </p>
        <NuxtLink
          to="/au-pair/auth/sign-up"
          class="bg-[#05FF88] text-black px-6 py-3 rounded-md hover:bg-[#05FF887D] transition"
        >
          Post a Job
        </NuxtLink>
        <!-- Trusted logos -->
        <!-- <div class="mt-8">
            <p class="text-gray-500 text-sm mb-4">TRUSTED BY</p>
            <div class="flex flex-wrap gap-6 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                class="h-6"
                alt="Microsoft"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                class="h-6"
                alt="Airbnb"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Automattic_Logo.svg"
                class="h-6"
                alt="Automattic"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Bissell_logo.svg"
                class="h-6"
                alt="Bissell"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/47/Cloudflare_Logo.svg"
                class="h-6"
                alt="Cloudflare"
              />
            </div>
          </div> -->
      </div>
      <!-- Image -->
      <div class="rounded-lg overflow-hidden">
        <img
          src="https://images.pexels.com/photos/955388/pexels-photo-955388.jpeg"
          alt="Tablet Image"
          class="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
  <!-- Feature section -->
  <section class="bg-[#DBE2E8] py-16 text-black">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Top Section -->
      <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
        <!-- Left: Heading and description -->
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
            Access trusted talent<br />
            for your needs
          </h2>
          <p class="text-gray-600 text-base">
            Housekeepers. Drivers. Security personnel. Nannies.<br />
            Connect with professionals you can trust through Hema.
          </p>
        </div>

        <!-- Right: Stats -->
        <div class="flex flex-col sm:flex-row sm:justify-end gap-8">
          <div class="text-left">
            <p class="text-3xl font-semibold text-gray-900">
              4.8 <span class="text-yellow-500">★★★★★</span>
            </p>
            <p class="text-sm text-gray-600">
              Average rating from thousands of employers
            </p>
          </div>
          <div class="text-left">
            <p class="text-3xl font-semibold text-gray-900">5K+</p>
            <p class="text-sm text-gray-600">
              Verified professionals ready for hire
            </p>
          </div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
        >
          <div class="flex items-center space-x-4">
            <img :src="category.icon" :alt="category.title" class="w-10 h-10" />
            <div>
              <h3 class="text-lg font-semibold mb-1">{{ category.title }}</h3>
              <p class="text-sm text-gray-600">{{ category.jobs }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-white py-4 pt-16">
    <div class="max-w-6xl mx-auto px-4 text-black">
      <!-- Top block -->
      <div class="grid md:grid-cols-2 gap-10 items-center mb-20">
        <!-- Image -->
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1723914019579-b6d43116603c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Domestic worker"
            class="rounded-2xl object-cover w-full"
          />
        </div>

        <!-- Content -->
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold mb-4">
            Post today, hire tomorrow
          </h2>
          <p class="text-gray-700 text-base mb-4">
            Whether you're seeking a nanny, housekeeper, driver, or caregiver,
            Hema makes it fast and easy to connect with verified, ready-to-work
            professionals. Post a job today and receive proposals immediately.
          </p>
          <div class="flex items-start space-x-3 mb-6">
            <svg
              class="w-6 h-6 text-green-600 mt-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p class="text-sm font-semibold text-gray-800">
                Hema Match Guarantee
              </p>
              <p class="text-sm text-gray-600">
                Every worker is background-checked and trained
              </p>
            </div>
          </div>
          <button
            class="bg-[#05FF88] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#05FF887D] transition"
          >
            Post a job
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- Bottom block -->
  <section class="bg-[#DBE2E8] py-16">
    <div class="max-w-6xl mx-auto px-4 text-black">
      <h3 class="text-2xl font-semibold text-black mb-2">
        Trusted by top <span class="text-[#0000FE]">employers</span>
      </h3>
      <p class="text-gray-600 mb-8">
        Hundreds of families and businesses rely on Hema to hire with
        confidence. Here's what they’re saying.
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, index) in articles"
          :key="index"
          class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h4 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h4>
          <span class="text-[#0000FE] text-xl">→</span>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-white pb-16">
    <!-- Top Benefits -->
    <div
      class="grid md:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto px-4 text-black pt-16"
    >
      <!-- Left -->
      <div class="space-y-8">
        <!-- Item -->
        <div class="flex items-start space-x-4">
          <div>
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Discover trusted help quickly</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Post a job and receive proposals from verified workers</li>
              <li>View background checks and work experience</li>
              <li>Invite up to 30 workers per job post</li>
              <li>Filter by location, language, or skills</li>
            </ul>
          </div>
        </div>

        <!-- Item -->
        <div class="flex items-start space-x-4">
          <div>
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c1.656 0 3-1.343 3-3s-1.344-3-3-3-3 1.343-3 3 1.344 3 3 3zM6.5 21h11a4.5 4.5 0 00-9 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Safe, simple payments</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Payments handled securely via Hema</li>
              <li>Flexible billing for hourly or full-time work</li>
              <li>Transparent fees</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="space-y-8">
        <!-- Item -->
        <div class="flex items-start space-x-4">
          <div>
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8h2a2 2 0 012 2v10H3V10a2 2 0 012-2h2m10 0V6a4 4 0 00-8 0v2m8 0H9"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Track hiring with ease</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Chat, voice or video call with candidates</li>
              <li>Organize interviews and statuses</li>
              <li>Collaborate with your hiring team</li>
            </ul>
          </div>
        </div>

        <!-- Item -->
        <div class="flex items-start space-x-4">
          <div>
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 13v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6M15 10l-3-3-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Support at every step</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Hema advisors available 24/7</li>
              <li>Assistance with onboarding, contracts, and questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Catalog -->
    <div
      class="bg-[#DBE2E8] text-black rounded-2xl flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10 max-w-6xl mx-auto px-4"
    >
      <!-- Left -->
      <div class="max-w-md">
        <h4 class="uppercase text-sm font-semibold opacity-80 mb-2">
          CANDIDATE CATALOG
        </h4>
        <h2 class="text-2xl md:text-3xl font-semibold mb-4 leading-snug">
          Take the first step toward<br />
          hiring smarter
        </h2>
        <p class="mb-4 text-sm">
          Browse and select verified domestic workers from our catalog.
        </p>
        <button
          class="bg-[#05FF88] text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Browse candidates
        </button>
      </div>

      <!-- Right -->

      <div class="mt-8 lg:mt-0 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
          alt="Happy employer"
          class="rounded-2xl w-full max-w-sm lg:max-w-xs object-cover"
        />
      </div>
    </div>
  </section>
  <Stickychat />
  <LandingFooter />
</template>

<script setup>
import Stickychat from "~/components/stickychat.vue";

const categories = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/619/619153.png",
    title: "Housekeeping & Cleaning",
    jobs: "1,000+ listings weekly",
  },
  {
    icon: "https://img.icons8.com/color/48/driver.png",
    title: "Drivers & Transport",
    jobs: "500+ listings weekly",
  },
  {
    icon: "https://img.icons8.com/color/48/lock-2.png",
    title: "Security Services",
    jobs: "600+ listings weekly",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/1702/1702342.png",
    title: "Childcare & Nannies",
    jobs: "800+ listings weekly",
  },
  {
    icon: "https://img.icons8.com/color/48/wrench.png",
    title: "Plumbers & Electricians",
    jobs: "400+ listings weekly",
  },
  {
    icon: "https://img.icons8.com/color/48/customer-support.png",
    title: "Admin & Assistants",
    jobs: "700+ listings weekly",
  },
];
const articles = [
  {
    title: "How Hema helped Mary hire a trusted live-in nanny in 3 days",
  },
  {
    title:
      "Why Nairobi Home Services relies on Hema for vetting domestic staff",
  },
  {
    title:
      "From overwhelmed to organized: John’s experience hiring a full-time housekeeper",
  },
];
</script>
