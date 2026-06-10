<template>
  <LandingNav />
  <section class="bg-white pt-12">
    <div
      class="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center text-black"
    >
      <div>
        <h1 class="text-4xl md:text-5xl font-semibold mb-4">
          Find your next <span class="text-[#0000FE]">job</span><br />
          with Hema
        </h1>
        <p class="text-gray-600 mb-6">
          Create a free profile, browse thousands of jobs, and connect with
          trusted employers looking for your skills.
        </p>
        <NuxtLink
          to="/au-pair/auth/sign-up"
          class="bg-[#05FF88] text-black px-6 py-3 rounded-md hover:bg-[#05FF887D] transition font-semibold"
        >
          Create Your Profile
        </NuxtLink>
      </div>
      <div class="rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1635350736475-c8cef4b21906?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Job seeker looking at a phone"
          class="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
  <section class="bg-[#DBE2E8] py-16 text-black">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-10 mb-12 items-start">
        <div>
          <h2 class="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
            Explore opportunities<br />
            in your field
          </h2>
          <p class="text-gray-600 text-base">
            From housekeeping to driving, security to childcare, find the job
            that's right for you.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row sm:justify-end gap-8">
          <div class="text-left">
            <p class="text-3xl font-semibold text-gray-900">1K+</p>
            <p class="text-sm text-gray-600">New jobs posted weekly</p>
          </div>
          <div class="text-left">
            <p class="text-3xl font-semibold text-gray-900">Top Employers</p>
            <p class="text-sm text-gray-600">Hiring across the Gulf</p>
          </div>
        </div>
      </div>

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
              <p class="text-sm text-gray-600">{{ category.jobs }} available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-white py-4 pt-16">
    <div class="max-w-6xl mx-auto px-4 text-black">
      <div class="grid md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Person smiling and working"
            class="rounded-2xl object-cover w-full"
          />
        </div>

        <div>
          <h2 class="text-3xl md:text-4xl font-semibold mb-4">
            Connect directly with employers
          </h2>
          <p class="text-gray-700 text-base mb-4">
            Hema puts you in control. Create a professional profile, get
            verified to build trust, and receive job offers directly from
            families and businesses. No more searching, let opportunities find
            you.
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
                d="M9 12l2 2 4-4m-1 8a7 7 0 110-14 7 7 0 010 14z"
              />
            </svg>
            <div>
              <p class="text-sm font-semibold text-gray-800">
                Hema Verification Badge
              </p>
              <p class="text-sm text-gray-600">
                Stand out with a profile that shows you're background-checked
                and ready to work.
              </p>
            </div>
          </div>
          <NuxtLink
            to="/au-pair/auth/sign-up"
            class="bg-[#05FF88] text-black font-semibold px-6 py-2 rounded-lg hover:bg-[#05FF887D] transition inline-flex items-center justify-center"
          >
            Browse Jobs
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-[#DBE2E8] py-16">
    <div class="max-w-6xl mx-auto px-4 text-black">
      <h3 class="text-2xl font-semibold text-black mb-2">
        Hear from workers <span class="text-[#0000FE]">like you</span>
      </h3>
      <p class="text-gray-600 mb-8">
        Thousands of professionals have found great jobs through Hema. Read
        their stories.
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
    <div
      class="grid md:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto px-4 text-black pt-16"
    >
      <div class="space-y-8">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Find the right job, faster</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Get matched with jobs that fit your skills</li>
              <li>
                Filter by location, salary, and job type (full-time, part-time)
              </li>
              <li>Receive alerts for new job postings</li>
            </ul>
          </div>
        </div>

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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Build your professional identity</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Showcase your experience and qualifications</li>
              <li>Get verified to increase trust with employers</li>
              <li>Collect reviews from previous employers</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="space-y-8">
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
                d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Connect with serious employers</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Communicate safely through our platform</li>
              <li>Schedule interviews and manage offers in one place</li>
              <li>Access resources on contracts and fair pay</li>
            </ul>
          </div>
        </div>

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
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-semibold mb-1">Secure and timely payments</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600">
              <li>Get paid on time, every time through Hema</li>
              <li>Clear record of all payments and work hours</li>
              <li>Support for any payment-related issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-[#DBE2E8] text-black rounded-2xl flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10 max-w-6xl mx-auto px-4"
    >
      <div class="max-w-md text-center lg:text-left lg:mr-8">
        <h4 class="uppercase text-sm font-semibold opacity-80 mb-2">
          Ready to get started?
        </h4>
        <h2 class="text-2xl md:text-3xl font-semibold mb-4 leading-snug">
          Your next job is waiting for you
        </h2>
        <p class="mb-6 lg:mb-4 text-sm">
          Join thousands of professionals who use Hema to find work with top
          employers. Your free profile takes just minutes to create.
        </p>
        <NuxtLink
          to="/au-pair/auth/sign-up"
          class="bg-[#05FF88] text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition inline-flex items-center justify-center"
        >
          Create Your Profile Now
        </NuxtLink>
      </div>

      <div class="mt-8 lg:mt-0 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Happy worker"
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
    jobs: "1,250+",
  },
  {
    icon: "https://img.icons8.com/color/48/driver.png",
    title: "Drivers & Transport",
    jobs: "750+",
  },
  {
    icon: "https://img.icons8.com/color/48/lock-2.png",
    title: "Security Services",
    jobs: "680+",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/1702/1702342.png",
    title: "Childcare & Nannies",
    jobs: "950+",
  },
  {
    icon: "https://img.icons8.com/color/48/wrench.png",
    title: "Plumbers & Electricians",
    jobs: "420+",
  },
  {
    icon: "https://img.icons8.com/color/48/customer-support.png",
    title: "Admin & Assistants",
    jobs: "810+",
  },
];
const articles = [
  {
    title: "How I found a full-time driving job in one week with Hema.",
    name: "James K.",
  },
  {
    title:
      "Hema’s verification badge helped me get more interviews and a higher salary.",
    name: "Grace M.",
  },
  {
    title:
      "The platform is so easy to use. I got a great housekeeping job near my home.",
    name: "Esther A.",
  },
];
</script>
