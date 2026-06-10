<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- HEADER -->
    <AuPairNav />

    <!-- HERO SECTION -->
    <section
      class="relative h-screen bg-gradient-to-r from-emerald-700 to-emerald-500"
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
            <span class="font-medium">For Au Pairs</span>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Your Journey to Growth <br />
            Begins Here
          </h1>

          <p class="text-emerald-100 max-w-xl mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed">
            Experience new cultures, build meaningful connections, and create
            lasting memories while earning and learning.
          </p>

          <div class="flex flex-wrap gap-3 sm:gap-4">
            <NuxtLink
              to="/au-pair/auth/sign-up"
              class="inline-block bg-white text-emerald-700 font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-emerald-50 transition text-sm sm:text-base"
            >
              Start Your Application
            </NuxtLink>

            <a
              href="#how-it-works"
              class="inline-block border border-white/80 text-white font-semibold px-5 py-2.5 sm:px-7 sm:py-3 rounded-full hover:bg-white/10 transition text-sm sm:text-base"
            >
              See Requirements
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
              alt="Hero"
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
    <section class="bg-[#FFF8F1] py-12 sm:py-16 lg:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <!-- Title -->
        <div class="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
            More Than Childcare
          </h2>

          <div class="mt-3 flex justify-center">
            <span class="h-[3px] w-16 sm:w-24 bg-emerald-400 rounded-full"></span>
          </div>
        </div>

        <!-- Cards -->
        <div class="flex justify-center">
          <div class="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto w-full">
            <!-- CARD 1 -->
            <div class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[-3deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl">
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">🗺️</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Cultural Connection</h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Find caregivers who share your language, traditions, and values. Your children grow up connected to their heritage while building bridges across cultures.
              </p>
            </div>

            <!-- CARD 2 -->
            <div class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl">
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">⏰</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">
                Flexibility
              </h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Unlike traditional daycare, your au pair adapts to your family's schedule. Evening care, weekend support, travel companionship – it's all possible.
              </p>
            </div>

            <!-- CARD 3 -->
            <div class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center transform rotate-[-2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl">
              <div
                class="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow-md"
              >
                <span class="text-xl sm:text-2xl">💰</span>
              </div>

              <h3 class="font-semibold text-gray-900 mb-3 text-base sm:text-lg">Affordable</h3>

              <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                Full-time, live-in care at a fraction of traditional nanny costs. Transparent pricing with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how-it-works" class="bg-white py-12 sm:py-16 lg:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- Title -->
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700">
            How It Works
          </h2>

          <div class="mt-3 flex justify-center">
            <span
              class="h-[3px] w-16 sm:w-24 bg-emerald-400 rounded-full"
            ></span>
          </div>
        </div>

        <div class="relative">
          <!-- Vertical timeline line -->
          <div
            class="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-emerald-300 -translate-x-1/2"
          ></div>

          <!-- Timeline dots for desktop -->
          <div
            class="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full h-full"
          >
            <!-- Dot 1 -->
            <div class="absolute top-[12%] left-1/2 -translate-x-1/2 z-10">
              <div class="relative w-5 h-5">
                <!-- Pulsing outer ring -->
                <div
                  class="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring"
                ></div>
                <!-- Main dot -->
                <div
                  class="absolute inset-0 w-5 h-5 bg-emerald-400 rounded-full border-4 border-white shadow-lg"
                ></div>
              </div>
            </div>
            <!-- Dot 2 -->
            <div class="absolute top-[37%] left-1/2 -translate-x-1/2 z-10">
              <div class="relative w-5 h-5">
                <!-- Pulsing outer ring -->
                <div
                  class="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring animation-delay-500"
                ></div>
                <!-- Main dot -->
                <div
                  class="absolute inset-0 w-5 h-5 bg-emerald-400 rounded-full border-4 border-white shadow-lg"
                ></div>
              </div>
            </div>
            <!-- Dot 3 -->
            <div class="absolute top-[62%] left-1/2 -translate-x-1/2 z-10">
              <div class="relative w-5 h-5">
                <!-- Pulsing outer ring -->
                <div
                  class="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring animation-delay-1000"
                ></div>
                <!-- Main dot -->
                <div
                  class="absolute inset-0 w-5 h-5 bg-emerald-400 rounded-full border-4 border-white shadow-lg"
                ></div>
              </div>
            </div>
            <!-- Dot 4 -->
            <div class="absolute top-[87%] left-1/2 -translate-x-1/2 z-10">
              <div class="relative w-5 h-5">
                <!-- Pulsing outer ring -->
                <div
                  class="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring animation-delay-1500"
                ></div>
                <!-- Main dot -->
                <div
                  class="absolute inset-0 w-5 h-5 bg-emerald-400 rounded-full border-4 border-white shadow-lg"
                ></div>
              </div>
            </div>
          </div>

          <div class="space-y-12 sm:space-y-16 lg:space-y-24">
            <!-- STEP 1 -->
            <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              <!-- image -->
              <div
                class="flex justify-center lg:justify-end order-2 lg:order-1"
              >
                <div
                  class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- card -->
              <div class="relative order-1 lg:order-2">
                <!-- Mobile dot -->
                <div
                  class="absolute left-[-18px] sm:left-[-22px] top-8 sm:top-10 w-4 h-4 bg-white border-4 border-emerald-400 rounded-full lg:hidden z-10"
                ></div>

                <div
                  class="bg-[#FFF8F1] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
                >
                  <div
                    class="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md mb-3 sm:mb-4 text-sm sm:text-base"
                  >
                    1
                  </div>

                  <h3
                    class="font-semibold text-gray-900 mb-2 text-base sm:text-lg"
                  >
                    Create Your Profile
                  </h3>

                  <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Share your story, skills, and what you're looking for in a
                    host family. Our detailed application helps us understand
                    your unique strengths and match you perfectly.
                  </p>
                </div>
              </div>
            </div>

            <!-- STEP 2 -->
            <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              <!-- card -->
              <div class="relative order-1 lg:order-1">
                <!-- Mobile dot -->
                <div
                  class="absolute right-[-18px] sm:right-[-22px] top-8 sm:top-10 w-4 h-4 bg-white border-4 border-emerald-400 rounded-full lg:hidden z-10"
                ></div>

                <div
                  class="bg-[#FFF8F1] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
                >
                  <div
                    class="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md mb-3 sm:mb-4 text-sm sm:text-base"
                  >
                    2
                  </div>

                  <h3
                    class="font-semibold text-gray-900 mb-2 text-base sm:text-lg"
                  >
                    Complete Training
                  </h3>

                  <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Participate in comprehensive orientation covering childcare
                    best practices, cultural sensitivity, safety protocols, and
                    communication skills.
                  </p>
                </div>
              </div>

              <!-- image -->
              <div
                class="flex justify-center lg:justify-start order-2 lg:order-2"
              >
                <div
                  class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=600&q=80"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- STEP 3 -->
            <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              <!-- image -->
              <div
                class="flex justify-center lg:justify-end order-2 lg:order-1"
              >
                <div
                  class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- card -->
              <div class="relative order-1 lg:order-2">
                <!-- Mobile dot -->
                <div
                  class="absolute left-[-18px] sm:left-[-22px] top-8 sm:top-10 w-4 h-4 bg-white border-4 border-emerald-400 rounded-full lg:hidden z-10"
                ></div>

                <div
                  class="bg-[#FFF8F1] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
                >
                  <div
                    class="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md mb-3 sm:mb-4 text-sm sm:text-base"
                  >
                    3
                  </div>

                  <h3
                    class="font-semibold text-gray-900 mb-2 text-base sm:text-lg"
                  >
                    Match with Family
                  </h3>

                  <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    We carefully connect you with a family that shares your
                    values and expectations. Video interviews ensure
                    compatibility before commitment.
                  </p>
                </div>
              </div>
            </div>

            <!-- STEP 4 -->
            <div
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              <!-- card -->
              <div class="relative order-1 lg:order-1">
                <!-- Mobile dot -->
                <div
                  class="absolute right-[-18px] sm:right-[-22px] top-8 sm:top-10 w-4 h-4 bg-white border-4 border-emerald-400 rounded-full lg:hidden z-10"
                ></div>

                <div
                  class="bg-[#FFF8F1] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8"
                >
                  <div
                    class="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-md mb-3 sm:mb-4 text-sm sm:text-base"
                  >
                    4
                  </div>

                  <h3
                    class="font-semibold text-gray-900 mb-2 text-base sm:text-lg"
                  >
                    Begin Your Journey
                  </h3>

                  <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Travel to your host country with logistics arranged, receive
                    ongoing support, and start building relationships that last
                    a lifetime.
                  </p>
                </div>
              </div>

              <!-- image -->
              <div
                class="flex justify-center lg:justify-start order-2 lg:order-2"
              >
                <div
                  class="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION PATHWAYS -->
    <section class="bg-[#E8F9FB] py-12 sm:py-16 lg:py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <!-- Title -->
        <div class="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-600">
            What We're Looking For
          </h2>
          <div class="mt-3 sm:mt-4 flex justify-center">
            <span class="h-1 w-12 sm:w-16 rounded-full bg-emerald-400"></span>
          </div>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <!-- Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <!-- Card -->
            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">Age 18–30</p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Young adults ready for cultural exchange
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    High School Diploma
                  </p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Completed secondary education required
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    Clean Background Check
                  </p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Safety is our top priority for families
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">Valid Passport</p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Ready for international travel
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    Childcare Experience
                  </p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    200+ hours caring for children
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    English Proficiency
                  </p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Conversational level or higher
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    Cultural Sensitivity
                  </p>
                  <p class="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Open mind and respectful attitude
                  </p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div
                  class="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md"
                >
                  ✓
                </div>
                <div>
                  <p class="font-semibold text-slate-800 text-sm sm:text-base">
                    12-Month Commitment
                  </p>
                  <p class="text-xs sm:text-sm text-orange-500 font-medium mt-1 leading-relaxed">
                    Full year program for deep connection
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Image -->
          <div class="flex justify-center lg:justify-end">
            <div
              class="relative w-64 h-[307px] sm:w-80 sm:h-[384px] md:w-96 md:h-[461px] overflow-hidden shadow-xl"
              style="
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                transform: rotate(-90deg);
              "
            >
              <img
                src="@/assets/images/fam-care.jpeg"
                alt="Studying au pair"
                class="absolute inset-0"
                style="transform: rotate(90deg) scale(1.3); object-fit: cover; object-position: center; width: 100%; height: 100%;"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="bg-[#FEF8F1] py-12 sm:py-16 lg:py-24">
      <!-- Title -->
      <div class="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">Hear from Our Au Pairs</h2>
        <div class="w-12 sm:w-16 h-1 bg-green-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>

      <!-- Cards -->
      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
      >
        <!-- Card 1 -->
        <div
          class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform rotate-[-3deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
        >
          <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-green-500 object-cover"
            />
            <div>
              <p class="font-semibold text-gray-900 text-sm sm:text-base">Thandiwe Moyo</p>
              <p class="text-xs sm:text-sm text-gray-500">Au Pair in Berlin</p>
              <div class="text-yellow-400 text-xs sm:text-sm">★★★★★</div>
            </div>
          </div>

          <p class="text-gray-600 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            "My year with Hema transformed me. I learned German, gained
            confidence, and found a second family. The children I cared for
            still video call me weekly. This experience opened doors I never
            imagined."
          </p>

          <a href="#" class="text-blue-600 font-medium hover:underline text-sm sm:text-base">
            Read Full Story →
          </a>
        </div>

        <!-- Card 2 -->
        <div
          class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform rotate-[2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
        >
          <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-green-500 object-cover"
            />
            <div>
              <p class="font-semibold text-gray-900 text-sm sm:text-base">Nia Jobe</p>
              <p class="text-xs sm:text-sm text-gray-500">Au Pair in Amsterdam</p>
              <div class="text-yellow-400 text-xs sm:text-sm">★★★★★</div>
            </div>
          </div>

          <p class="text-gray-600 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            "The support from Hema was incredible. When I felt homesick, my
            coordinator checked in weekly. The host family treated me like their
            own daughter. I'm now pursuing early childhood education."
          </p>

          <a href="#" class="text-blue-600 font-medium hover:underline text-sm sm:text-base">
            Read Full Story →
          </a>
        </div>

        <!-- Card 3 -->
        <div
          class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg transform rotate-[-2deg] transition-all duration-300 ease-out hover:rotate-0 hover:scale-105 hover:shadow-2xl"
        >
          <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <img
              src="https://randomuser.me/api/portraits/women/22.jpg"
              class="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-green-500 object-cover"
            />
            <div>
              <p class="font-semibold text-gray-900 text-sm sm:text-base">Zara Mensah</p>
              <p class="text-xs sm:text-sm text-gray-500">Au Pair in Paris</p>
              <div class="text-yellow-400 text-xs sm:text-sm">★★★★★</div>
            </div>
          </div>

          <p class="text-gray-600 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
            "Being an au pair with Hema gave me the courage to dream bigger. I
            saved money, improved my French, and discovered my passion for
            teaching. The friendships I made are lifelong."
          </p>

          <a href="#" class="text-blue-600 font-medium hover:underline text-sm sm:text-base">
            Read Full Story →
          </a>
        </div>
      </div>
    </section>

    <section class="bg-white py-12 sm:py-16 lg:py-24">
      <!-- Title -->
      <div class="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
          Your Safety is Our Priority
        </h2>
        <div class="w-12 sm:w-16 h-1 bg-green-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
      </div>

      <div
        class="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
      >
        <!-- Left: Safety Cards -->
        <div class="space-y-4 sm:space-y-6">
          <!-- Card -->
          <div
            class="bg-[#FFF7ED] rounded-2xl p-5 sm:p-6 flex gap-3 sm:gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
            >
              🎧
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1 text-sm sm:text-base">24/7 Support</h4>
              <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Access emergency assistance anytime through our dedicated
                hotline and local coordinators who speak your language.
              </p>
            </div>
          </div>

          <div
            class="bg-[#FFF7ED] rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
            >
              🛡️
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">
                Verified Families
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Every host family undergoes rigorous background checks, home
                visits, and reference verification before matching.
              </p>
            </div>
          </div>

          <div
            class="bg-[#FFF7ED] rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
            >
              ⚖️
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">Legal Assistance</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We handle all visa paperwork and provide legal guidance to
                ensure your rights are protected throughout your stay.
              </p>
            </div>
          </div>

          <div
            class="bg-[#FFF7ED] rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            <div
              class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md"
            >
              🚑
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-1">
                Emergency Resources
              </h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                Comprehensive insurance coverage, emergency housing options, and
                crisis intervention services when you need them.
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Image + Overlay -->
        <div class="relative">
          <!-- Image -->
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            class="rounded-2xl sm:rounded-3xl shadow-xl w-full object-cover"
          />

          <!-- Image Label -->
          <div
            class="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg"
          >
            Au pair on video call with coordinator, reassuring conversation
          </div>

          <!-- Stats Card -->
          <div
            class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 text-center space-y-3 sm:space-y-4 w-48 sm:w-56"
          >
            <div>
              <p class="text-2xl sm:text-3xl font-bold text-blue-600">99%</p>
              <p class="text-xs sm:text-sm text-gray-600">Satisfaction Rate</p>
            </div>

            <div class="border-t pt-3 sm:pt-4">
              <p class="text-2xl sm:text-3xl font-bold text-blue-600">100%</p>
              <p class="text-sm text-gray-600">Verified Families</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FFF9F2] py-12 sm:py-16 lg:py-20">
      <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <!-- Title -->
        <div class="text-center mb-10 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-blue-600">
            Frequently Asked Questions
          </h2>
          <div class="w-16 sm:w-20 h-1 bg-green-500 mx-auto mt-3 rounded"></div>
        </div>

        <!-- FAQ Items -->
        <div class="divide-y divide-gray-200">
          <div v-for="(item, index) in faqs" :key="index" class="py-4 sm:py-6">
            <button
              @click="toggle(index)"
              class="flex w-full items-center justify-between text-left gap-4"
            >
              <span class="text-base sm:text-lg font-medium text-gray-900">
                {{ item.question }}
              </span>

              <!-- Plus / Minus -->
              <span
                class="text-blue-600 text-xl sm:text-2xl font-light transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-45': openIndex === index }"
              >
                +
              </span>
            </button>

            <!-- Answer -->
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-40 opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-40 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <p
                v-if="openIndex === index"
                class="mt-3 sm:mt-4 text-gray-600 leading-relaxed text-sm sm:text-base"
              >
                {{ item.answer }}
              </p>
            </transition>
          </div>
        </div>
      </div>
    </section>
    <!-- CTA SECTION -->
    <section id="apply" class="py-20 bg-white text-black">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p class="text-xl text-gray-700 mb-8">
            Join hundreds of au pairs building bright futures across the globe
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/au-pair/auth/sign-up"
              class="bg-[#05FF88] hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              Begin Application
            </a>
            <!-- <a
              href="/contact"
              class="bg-transparent underline text-black font-semibold px-8 py-3 rounded-lg border border-white/20 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Schedule a call
            </a> -->
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <LandingFooter />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const openIndex = ref(null);

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "How long is the au pair program?",
    answer:
      "The au pair program typically lasts between 6 and 12 months, with possible extensions depending on the country and visa rules.",
  },
  {
    question: "What is the monthly stipend?",
    answer:
      "Au pairs receive a monthly stipend that varies by country and host family, covering personal expenses.",
  },
  {
    question: "Can I choose my host family?",
    answer:
      "Yes, you can review host family profiles and communicate with them before making a mutual decision.",
  },
  {
    question: "What if I have problems with my host family?",
    answer:
      "If issues arise, your program coordinator will support you and help resolve the situation or arrange a rematch if needed.",
  },
  {
    question: "Do I need previous childcare experience?",
    answer:
      "Some experience is recommended, but requirements vary depending on the program and host family.",
  },
];
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

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.9);
    opacity: 0;
  }
}

.animate-pulse-ring {
  animation: pulse-ring 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-500 {
  animation-delay: 0.25s;
}

.animation-delay-1000 {
  animation-delay: 0.5s;
}

.animation-delay-1500 {
  animation-delay: 0.75s;
}

html {
  scroll-behavior: smooth;
}
</style>
