<template>
  <div class="min-h-screen bg-white text-black px-6 pt-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-semibold leading-tight">
        Empowering safer, smarter <br class="hidden sm:inline" />
        migration for <span class="text-[#0000FE]">job seekers</span> and
        <span class="text-[#0000FE]">employers</span>
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <!-- Job Seekers Card -->
      <div
        class="bg-[#DBE2E84D] p-6 rounded-3xl shadow-sm flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="font-semibold text-xl">Job Seekers</span>
          </div>
          <h2 class="text-xl font-semibold mb-2">
            Find verified jobs <br />
            and prepare to migrate with confidence
          </h2>

          <div class="space-y-3 mb-4">
            <button
              class="w-full text-left text-sm bg-white border rounded-xl px-4 py-2"
            >
              <strong>Upload your CV</strong><br />
              <span class="text-gray-500">PDF or DOC format</span>
            </button>

            <button
              class="w-full text-left text-sm bg-white border rounded-xl px-4 py-2"
            >
              <strong>Verify your documents</strong><br />
              <span class="text-gray-500">Passport, ID, training certs</span>
            </button>

            <div class="relative">
              <input
                type="text"
                placeholder="Type a job you're seeking..."
                class="w-full border rounded-xl px-10 py-2 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <span class="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <!-- <div class="flex justify-center">
          <img src="" alt="Job seeker icon" class="w-24 h-auto" />
        </div> -->

        <div class="mt-4">
          <NuxtLink
            to="/job-seekers"
            class="text-sm text-[#0000FE] hover:underline inline-flex items-center"
          >
            Learn more
          </NuxtLink>
        </div>
      </div>

      <!-- Employers Card -->
      <div
        class="bg-[#DBE2E84D] p-6 rounded-3xl shadow-sm flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="font-semibold text-xl">Employers</span>
          </div>
          <h2 class="text-xl font-semibold mb-2">
            Hire ethically & efficiently <br />
            with real-time worker insights
          </h2>
        </div>

        <div class="flex justify-center py-6">
          <div
            class="bg-white border rounded-xl px-4 py-3 w-full max-w-md shadow-md text-xs"
          >
            New applicants from Kenya, Nepal & Ghana. <br />
            70% meet your required skills.<br />
            <div class="mt-2 h-2 bg-blue-200 rounded-full relative">
              <div
                class="absolute h-full bg-blue-500 w-3/4 rounded-full animate-pulse"
              ></div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <NuxtLink
            to="/employers"
            class="text-sm text-[#0000FE] hover:underline inline-flex items-center"
          >
            Learn more
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
