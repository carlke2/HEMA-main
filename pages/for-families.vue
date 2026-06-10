<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- HEADER -->
    <AuPairNav />

    <!-- HERO SECTION -->
    <section
      class="relative h-screen bg-gradient-to-r from-blue-800 to-blue-600"
    >
      <div
        class="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-12 sm:pb-16 grid lg:grid-cols-2 items-center gap-8 sm:gap-10"
      >
        <!-- LEFT -->
        <div class="text-white">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-emerald-200 text-sm mb-6">
            <span>Home</span>
            <span>›</span>
            <span class="font-medium">For Families</span>
          </div>

          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6"
          >
        
          Find Care That Feels Like Family
          </h1>

          <p
            class="text-emerald-100 max-w-xl mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed"
          >
          Connect with vetted, compassionate au pairs who share your values and understand your culture
          </p>

          <div class="flex flex-wrap gap-3 sm:gap-4">
            <NuxtLink
              to="/au-pair/auth/sign-up"
              class="inline-block bg-emerald-500 text-white font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-emerald-400 transition text-sm sm:text-base"
            >
              Find your Au-pair
            </NuxtLink>

            <a
              href="#how-it-works"
              class="inline-block border border-white/80 text-white font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-white/10 transition text-sm sm:text-base"
            >
              How It Works
            </a>
          </div>
        </div>

        <!-- RIGHT (egg image) -->
        <div class="flex justify-center lg:justify-end">
          <div
            class="relative w-64 h-[299px] sm:w-80 sm:h-[373px] md:w-96 md:h-[448px] lg:w-[480px] lg:h-[560px] shadow-2xl overflow-hidden"
            style="
              border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
              transform: rotate(-90deg);
            "
          >
            <img
              src="@/assets/images/fam-care.jpeg"
              alt="Family care"
              class="absolute inset-0"
              style="transform: rotate(90deg) scale(1.3); object-fit: cover; object-position: center; width: 100%; height: 100%;"
            />
            <!-- outer glow -->
            <div
              class="absolute inset-0 pointer-events-none"
              style="
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                box-shadow: 0 0 0 14px rgba(255, 255, 255, 0.15);
              "
            ></div>
          </div>
        </div>
      </div>
    </section>
    <!-- VALUE PROPS -->
    <section id="how-it-works" class="bg-[#FFF8F1] py-12 sm:py-16 lg:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <!-- Title -->
        <div class="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
            More Than Childcare
          </h2>

          <div class="mt-3 flex justify-center">
            <span
              class="h-[3px] w-16 sm:w-24 bg-emerald-400 rounded-full"
            ></span>
          </div>
        </div>

        <!-- Cards -->
        <div class="flex justify-center">
          <div
            class="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto w-full"
          >
            <!-- CARD 1 -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[-3deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
            >
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">🗺️</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
                Cultural Connection
              </h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Find caregivers who share your<br/> language, traditions, and values.<br/>
                Your children grow up connected<br/> to their heritage while building<br/>
                bridges across cultures.
              </p>
            </div>

            <!-- CARD 2 -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
            >
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">⏰</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
                Flexibility
              </h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Unlike traditional daycare, your<br/> au pair adapts to your family's<br/>
                schedule. Evening care, weekend<br/> support, travel companionship –<br/>
                it's all possible.
              </p>
            </div>

            <!-- CARD 3 -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[-2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
            >
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">💰</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
                Affordable
              </h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Full-time, live-in care at a fraction of traditional nanny
                costs. Transparent pricing with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MATCHING PROCESS -->
    <section class="bg-white py-20">
      <div class="max-w-6xl mx-auto px-6 lg:px-10">
        <!-- Top Title -->
        <div class="text-center mb-14">
          <h2 class="text-3xl sm:text-4xl font-bold text-blue-700">
            Your Perfect Match Awaits
          </h2>

          <div class="mt-3 flex justify-center">
            <span class="h-[3px] w-24 bg-emerald-400 rounded-full"></span>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <!-- LEFT CONTENT -->
          <div>
            <h3 class="text-2xl font-semibold text-blue-700 mb-10">
              How We Match You
            </h3>

            <div class="space-y-10">
              <!-- STEP 1 -->
              <div class="flex gap-5">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-md flex-shrink-0"
                >
                  1
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">
                    Tell Us Your Needs
                  </h4>

                  <p class="text-gray-600 text-sm leading-relaxed mt-1">
                    Share your family's values, routines, and what matters most
                    in a caregiver. We consider language preferences, cultural
                    background, childcare philosophy, and schedule requirements.
                  </p>
                </div>
              </div>

              <!-- STEP 2 -->
              <div class="flex gap-5">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-md flex-shrink-0"
                >
                  2
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">
                    Review Carefully Selected Profiles
                  </h4>

                  <p class="text-gray-600 text-sm leading-relaxed mt-1">
                    We present 3–5 au pair candidates who align with your
                    family. Each profile includes detailed background,
                    experience, video introduction, and reference checks.
                  </p>
                </div>
              </div>

              <!-- STEP 3 -->
              <div class="flex gap-5">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-md flex-shrink-0"
                >
                  3
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900">
                    Connect and Decide Together
                  </h4>

                  <p class="text-gray-600 text-sm leading-relaxed mt-1">
                    Video interview your top choices with our guidance. When
                    both sides feel it's right, we arrange logistics to welcome
                    your au pair home.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT IMAGE -->
          <div class="flex justify-center lg:justify-end">
            <div
              class="relative w-64 h-[307px] sm:w-80 sm:h-[384px] md:w-[420px] md:h-[432px] shadow-2xl overflow-hidden"
              style="border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform: rotate(-90deg);"
            >
              <img
                src="@/assets/images/fam-care.jpeg"
                alt="Family reviewing profiles"
                class="absolute inset-0"
                style="transform: rotate(90deg) scale(1.3); object-fit: cover; object-position: center; width: 100%; height: 100%;"
                loading="lazy"
              />
              <!-- glow border -->
              <div
                class="absolute inset-0 pointer-events-none"
                style="
                  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                  box-shadow: 0 0 0 14px rgba(255, 255, 255, 0.15);
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CULTURAL DIMENSIONS -->
    <section class="bg-emerald-50 py-20">
    <div class="max-w-6xl mx-auto px-6 lg:px-10">

      <!-- Title -->
      <div class="text-center mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold text-blue-700">
          Complete Support for Your Family
        </h2>

        <div class="mt-3 flex justify-center">
          <span class="h-[3px] w-24 bg-emerald-400 rounded-full"></span>
        </div>
      </div>

      <!-- GRID -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <!-- Card -->
        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Full Background Checks</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Criminal history, employment verification, reference interviews, and childcare credentials thoroughly vetted.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Cultural Training</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Your au pair receives comprehensive orientation on cultural sensitivity, communication, and family dynamics.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Legal Documentation</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            We handle all visa paperwork, work permits, and legal requirements so you can focus on welcoming your new family member.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Ongoing Support</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Local coordinators check in regularly, mediate concerns, and ensure both family and au pair thrive.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Emergency Backup</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            If your au pair is sick or needs time off, we arrange temporary coverage to keep your family supported.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div class="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
              <path d="M9 12.75 11.25 15 15 9.75m6 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Family Matching Service</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            If a placement isn’t working, we facilitate a respectful re-match at no additional cost.
          </p>
        </div>

      </div>
    </div>
  </section>
    <!-- PRICING TABLE -->
    <section class="py-20 bg-[#FBF7F2]">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] mb-3">
            Transparent, Fair Pricing
          </h2>
          <div class="h-1 w-24 bg-[#05FF88] mx-auto"></div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table class="w-full">
            <thead>
              <tr>
                <th class="bg-[#0000FE] text-white text-left px-6 py-4 font-semibold rounded-tl-2xl">
                  Service Type
                </th>
                <th class="bg-[#0000FE] text-white text-left px-6 py-4 font-semibold">
                  Monthly Cost
                </th>
                <th class="bg-[#DDF2E7] text-[#059669] text-left px-6 py-4 font-semibold rounded-tr-2xl">
                  What's Included
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white">
                <td class="px-6 py-5 text-gray-900 ">
                  Hema Nurture 
                </td>
                <td class="px-6 py-5 text-gray-700">
                  Ksh 25,000 - Ksh 35,000
                </td>
                <td class="px-6 py-5 text-gray-700">
                  Premium Childcare 
                </td>
              </tr>
              <tr class="bg-[#F9FAFB]">
                <td class="px-6 py-5 text-gray-900 ">
                  Hema Nurture +
                </td>
                <td class="px-6 py-5 text-gray-700">
                  Ksh 40,000 - Ksh 50,000
                </td>
                <td class="px-6 py-5 text-gray-700">
                  Premium special needs childcare
                </td>
              </tr>
              <tr class="bg-white">
                <td class="px-6 py-5 text-gray-900 font-medium">
                <strong> Placement Fee </strong>
                </td>
                <td class="px-6 py-5 text-gray-700">
                 <strong>Ksh 40,000</strong> 
                </td>
                <td class="px-6 py-5 text-gray-700">
                  <strong>One time payment</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-8 flex items-center justify-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p class="text-[#0000FE] font-medium">
            No hidden fees, no surprises
          </p>
        </div>
      </div>
    </section>

    <!-- Your Peace of Mind Matters Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] mb-3">
            Your Peace of <span class="relative inline-block">Mind<span class="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-[#05FF88]" style="width: 60px;"></span></span> Matters
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <!-- Card 1: Background Verification -->
          <div class="bg-[#FBF7F2] rounded-2xl p-8 shadow-md">
            <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              Background Verification
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              Every au pair undergoes criminal background checks, employment verification, childcare reference interviews, and health screenings before entering our program.
            </p>
            <a href="#" class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline">
              See Our Vetting Process
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Card 2: Home Assessments -->
          <div class="bg-[#FBF7F2] rounded-2xl p-8 shadow-md">
            <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              Home Assessments
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              We conduct home safety reviews to ensure your space meets standards for hosting an au pair, protecting both your family and theirs.
            </p>
            <a href="#" class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline">
              Preparation Checklist
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Card 3: 24/7 Crisis Support -->
          <div class="bg-[#FBF7F2] rounded-2xl p-8 shadow-md">
            <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              24/7 Crisis Support
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              Access emergency assistance anytime through our hotline. Local coordinators respond immediately to urgent situations affecting your family or au pair.
            </p>
            <a href="#" class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline">
              Emergency Resources
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Card 4: Insurance Coverage -->
          <div class="bg-[#FBF7F2] rounded-2xl p-8 shadow-md">
            <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              Insurance Coverage
            </h3>
            <p class="text-gray-700 mb-6 leading-relaxed">
              Comprehensive health and liability insurance protects your family, your au pair, and your home throughout the program duration.
            </p>
            <a href="#" class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline">
              Coverage Details
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Real Families, Real Stories Slider -->
    <section class="py-20 bg-blue-50" data-cursor-element-id="cursor-el-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- Title -->
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
            Real Families, Real Stories
          </h2>
          <div class="w-12 sm:w-16 h-1 bg-emerald-400 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        <!-- Slider Container -->
        <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <!-- Slides Wrapper -->
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Slide 1 -->
            <div
              class="min-w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
            >
              <!-- Image Section -->
              <div class="w-full h-64 md:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0"
                  alt="Family playing together"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Text Section -->
              <div class="p-6 sm:p-8 lg:p-12">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                      O
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-base sm:text-lg">The Okonkwo Family</p>
                    <p class="text-sm sm:text-base text-gray-600">Lagos, Nigeria → Host Family in Berlin</p>
                  </div>
                </div>
                <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-4 sm:mb-6">
                  "Finding Amara through Hema was life-changing. Not only does she provide wonderful care for our twin boys, but she's teaching them Igbo and sharing our cultural traditions. She's become part of our family. The peace of mind knowing our children are with someone who truly understands our values is priceless."
                </p>
                <div class="flex items-center gap-3">
                  <div class="text-yellow-400 text-sm sm:text-base">★★★★★</div>
                  <div class="inline-block bg-[#DDF2E7] text-[#059669] px-4 py-2 rounded-full text-sm font-medium">
                    Key Benefit: Cultural Continuity
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2 -->
            <div
              class="min-w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
            >
              <!-- Image Section -->
              <div class="w-full h-64 md:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Family with au pair"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Text Section -->
              <div class="p-6 sm:p-8 lg:p-12">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                      M
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-base sm:text-lg">The Martinez Family</p>
                    <p class="text-sm sm:text-base text-gray-600">Barcelona, Spain → Host Family in Amsterdam</p>
                  </div>
                </div>
                <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-4 sm:mb-6">
                  "Our au pair Sofia has been incredible. She speaks Spanish with our children, helping them maintain their language skills while learning Dutch. The cultural exchange has enriched our entire family. Hema made the matching process so smooth and personal."
                </p>
                <div class="flex items-center gap-3">
                  <div class="text-yellow-400 text-sm sm:text-base">★★★★★</div>
                  <div class="inline-block bg-[#DDF2E7] text-[#059669] px-4 py-2 rounded-full text-sm font-medium">
                    Key Benefit: Language Preservation
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 3 -->
            <div
              class="min-w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
            >
              <!-- Image Section -->
              <div class="w-full h-64 md:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
                  alt="Happy family"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Text Section -->
              <div class="p-6 sm:p-8 lg:p-12">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                      K
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-base sm:text-lg">The Kim Family</p>
                    <p class="text-sm sm:text-base text-gray-600">Seoul, South Korea → Host Family in Paris</p>
                  </div>
                </div>
                <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-4 sm:mb-6">
                  "We were nervous about finding the right match, but Hema exceeded our expectations. Our au pair Yuna has brought so much joy to our home. She teaches our daughter Korean traditions and language, creating a beautiful cultural bridge. The ongoing support from Hema gives us complete peace of mind."
                </p>
                <div class="flex items-center gap-3">
                  <div class="text-yellow-400 text-sm sm:text-base">★★★★★</div>
                  <div class="inline-block bg-[#DDF2E7] text-[#059669] px-4 py-2 rounded-full text-sm font-medium">
                    Key Benefit: Cultural Bridge
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 4 -->
            <div
              class="min-w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
            >
              <!-- Image Section -->
              <div class="w-full h-64 md:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                  alt="Family time"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Text Section -->
              <div class="p-6 sm:p-8 lg:p-12">
                <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                      A
                    </div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-base sm:text-lg">The Anderson Family</p>
                    <p class="text-sm sm:text-base text-gray-600">Stockholm, Sweden → Host Family in London</p>
                  </div>
                </div>
                <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-4 sm:mb-6">
                  "Hema's personalized approach to matching is what sets them apart. Our au pair Emma has become like a big sister to our children. She brings Swedish culture into our home through cooking, stories, and traditions. The whole experience has been transformative for our family."
                </p>
                <div class="flex items-center gap-3">
                  <div class="text-yellow-400 text-sm sm:text-base">★★★★★</div>
                  <div class="inline-block bg-[#DDF2E7] text-[#059669] px-4 py-2 rounded-full text-sm font-medium">
                    Key Benefit: Family Integration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dots Navigation -->
        <div class="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          <button
            v-for="(slide, index) in familyStories"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300 focus:outline-none"
            :aria-label="`Go to slide ${index + 1}`"
          >
            <span
              class="block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-blue-600 w-8 sm:w-10' : 'bg-gray-300 hover:bg-gray-400'"
            ></span>
          </button>
        </div>
      </div>
    </section>

    <!-- Frequently Asked Questions Section -->
    <section class="py-20 bg-[#FBF7F2]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] mb-3">
            Frequently <span class="relative inline-block">Asked<span class="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 bg-[#05FF88]" style="width: 70px;"></span></span> Questions
          </h2>
        </div>

        <div class="space-y-0 bg-white rounded-2xl shadow-md overflow-hidden">
          <template v-for="(faq, index) in faqs" :key="index">
            <div class="border-b border-gray-200 last:border-b-0">
              <button
                @click="toggleFaq(index)"
                class="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <span class="text-gray-900 font-medium pr-4">{{ faq.question }}</span>
                <svg
                  class="w-6 h-6 text-[#0000FE] flex-shrink-0 transition-transform duration-200"
                  :class="{ 'rotate-45': openFaqs[index] }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <div
                v-show="openFaqs[index]"
                class="px-6 pb-5 text-gray-700 leading-relaxed"
              >
                {{ faq.answer }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Start Your Journey Today CTA Section -->
    <section class="py-16 bg-gradient-to-b from-blue-600 to-blue-400 text-white">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Start Your Journey Today
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Let Hema be what your family's needs
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <NuxtLink
            to="/au-pair/auth/sign-up"
            class="inline-block bg-[#05FF88] hover:bg-green-400 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey
          </NuxtLink>
          <button class="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            Download Family Guide
          </button>
        </div>

        
      </div>
    </section>

    <!-- FOOTER -->
    <LandingFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from "@iconify/vue";

// FAQ state
const openFaqs = ref({})

const toggleFaq = (index) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

// Slider functionality for Real Families, Real Stories
const currentSlide = ref(0);
const familyStories = [1, 2, 3, 4]; // 4 slides

const goToSlide = (index) => {
  currentSlide.value = index;
};

// FAQ data
const faqs = [
  {
    question: 'How long does the matching process take?',
    answer: 'The typical matching process takes 2-4 weeks from when you complete your family profile. This includes our review of your needs, candidate selection, and scheduling interviews. We can expedite the process if you have urgent needs.'
  },
  {
    question: 'What if we\'re not compatible with our au pair?',
    answer: 'We have a comprehensive rematching process in place. If a placement isn\'t working out, our team will work with both parties to find a better fit. We facilitate respectful transitions and ensure continuity of care for your family.'
  },
  {
    question: 'What are our responsibilities as a host family?',
    answer: 'As a host family, you provide room and board, a weekly stipend, and a supportive environment. You also ensure your au pair has time for language classes and cultural activities. We provide detailed guidance on all responsibilities during the matching process.'
  },
  {
    question: 'Can we host multiple au pairs or extend beyond one year?',
    answer: 'Yes! Many families choose to extend their au pair\'s stay, and some families host multiple au pairs for different needs or time periods. We can discuss options that work best for your family situation.'
  },
  {
    question: 'What happens in case of emergency or if our au pair needs to return home?',
    answer: 'We have 24/7 emergency support and can arrange temporary coverage if needed. If an au pair needs to return home permanently, we activate our rematching process to find you a new au pair as quickly as possible.'
  }
]
</script>

<style>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

html {
  scroll-behavior: smooth;
}
</style>
