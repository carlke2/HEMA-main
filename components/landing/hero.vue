<template>
  <section class="hero">
    <div class="relative isolate">
      <!-- Background Grid SVG -->
      <svg
        class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>

      <!-- Blurred Gradient Background -->
      <div
        class="pointer-events-none absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          class="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#0000FE] to-[#05FF88] opacity-30"
          style="
            clip-path: polygon(
              63.1% 29.5%,
              100% 17.1%,
              76.6% 3%,
              48.4% 0%,
              44.6% 4.7%,
              54.5% 25.3%,
              59.8% 49%,
              55.2% 57.8%,
              44.4% 57.2%,
              27.8% 47.9%,
              35.1% 81.5%,
              0% 97.7%,
              39.2% 100%,
              35.2% 81.4%,
              97.2% 52.8%,
              63.1% 29.5%
            );
          "
        />
      </div>

      <!-- Main Content -->
      <div class="overflow-hidden relative z-10">
        <div
          class="mx-auto max-w-6xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-22"
        >
          <div
            class="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center"
          >
            <div class="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1
                class="text-4xl tracking-tight text-gray-900 sm:text-6xl font-semibold"
              >
                Building
                <span class="text-[#0000FE]">
                  trust, dignity,
                  <span class="text-black">and</span> opportunities
                </span>
                for migrant workers.
              </h1>
              <p
                class="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none"
              >
                Hema connects job seekers from Africa and Asia with vetted
                employers in the Gulf. Our platform promotes ethical
                recruitment, transparent salary systems, and emergency
                support—empowering workers with skills, knowledge, and real-time
                help at every step of their migration journey.
              </p>

              <!-- Updated Buttons -->
              <div class="mt-8 flex flex-wrap gap-4">
                <a
                  href="/job-seekers"
                  class="inline-flex items-center justify-center rounded-xl bg-[#05FF88] px-6 py-3 text-black text-base font-semibold shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Find Jobs
                </a>

                <a
                  href="/employers"
                  class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  Hire Workers
                </a>
              </div>
            </div>

            <!-- Image Grid -->
            <div
              class="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-5 lg:pl-0"
            >
              <div
                class="ml-auto w-40 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
              >
                <div class="relative">
                  <img
                    src="assets/images/security.jpeg"
                    alt=""
                    class="aspect-[2/3] w-40 rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>

              <div
                class="mr-auto w-40 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36"
              >
                <div class="relative">
                  <img
                    src="/assets/images/concept.jpeg"
                    alt=""
                    class="aspect-[2/3] w-40 rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
                <div class="relative">
                  <img
                    src="/assets/images/knife.jpeg"
                    alt=""
                    class="aspect-[2/3] w-40 rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>

              <div class="w-40 flex-none space-y-8 pt-32 sm:pt-0">
                <div class="relative">
                  <img
                    src="/assets/images/bodyguard.jpeg"
                    alt=""
                    class="aspect-[2/3] w-40 rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
                <div class="relative">
                  <img
                    src="/assets/images/washing-clothes.jpeg"
                    alt=""
                    class="aspect-[2/3] w-40 rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div
                    class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No JS needed unless you want programmatic routing
</script>
