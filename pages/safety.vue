<template>
  <div class="min-h-screen bg-white">
    <AuPairNav />

    <!-- S1: Hero Section - Safety Is Our Foundation -->
    <section id="s1" class="relative bg-[#0000FE] min-h-screen flex flex-col justify-center pt-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <!-- Breadcrumb -->
        <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav class="text-white text-sm text-center">
            <span>Home</span>
            <span class="mx-2">></span>
            <span>Safety</span>
          </nav>
        </div>

        <!-- Hero Content -->
        <div class="text-center flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
          <!-- Icon with circles - Stickman with concentric circles -->
          <div class="flex justify-center mb-8">
            <div class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <!-- Outer dashed circle (largest) -->
              <div class="absolute w-full h-full rounded-full border-2 border-dashed border-white opacity-50"></div>
              
              <!-- Middle dashed circle -->
              <div class="absolute w-3/4 h-3/4 rounded-full border-2 border-dashed border-white opacity-75"></div>
              
              <!-- Inner solid blue circle with stickman -->
              <div class="relative w-1/2 h-1/2 rounded-full bg-[#0000FE] border-4 border-white flex items-center justify-center shadow-lg">
                <!-- Stickman icon - white stick figure -->
                <svg class="w-20 h-20 md:w-24 md:h-24 text-white" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <!-- Head (circle) -->
                  <circle cx="12" cy="7" r="3.5"/>
                  <!-- Body (vertical line) -->
                  <line x1="12" y1="10.5" x2="12" y2="17"/>
                  <!-- Left Arm -->
                  <line x1="12" y1="13" x2="7" y2="11"/>
                  <!-- Right Arm -->
                  <line x1="12" y1="13" x2="17" y2="11"/>
                  <!-- Left Leg -->
                  <line x1="12" y1="17" x2="8" y2="21"/>
                  <!-- Right Leg -->
                  <line x1="12" y1="17" x2="16" y2="21"/>
                </svg>
              </div>
            </div>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Safety Is Our Foundation
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-8">
            Comprehensive protection for au pairs and families at every step
          </p>
          <button class="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-[#04e675] transition-colors">
            Download Safety Guide
          </button>
        </div>
      </div>
    </section>

    <!-- S2: Built on Trust, Maintained by Care -->
    <section id="s2" class="py-16 md:py-24 bg-[#FBF7F2] -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-6">
          Built on Trust, Maintained by Care
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
          At Hema, safety isn't an afterthought—it's the bedrock of everything we do. From our rigorous verification processes to our 24/7 support network, we've built multiple layers of protection to ensure au pairs and families feel secure, supported, and valued throughout their journey together.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Prevention Card -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-16 h-16 rounded-full bg-[#0000FE]/10 flex items-center justify-center mb-6 mx-auto">
              <Icon name="mdi:shield-outline" class="text-4xl text-[#0000FE]" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Prevention</h3>
            <p class="text-gray-600">
              We prevent issues before they arise<br/> through comprehensive screening,<br/> thorough training, and clear<br/> expectations set from day one.
            </p>
          </div>

          <!-- Protection Card -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-16 h-16 rounded-full bg-[#0000FE]/10 flex items-center justify-center mb-6 mx-auto">
              <Icon name="mdi:lock-outline" class="text-4xl text-[#0000FE]" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Protection</h3>
            <p class="text-gray-600">
              Multiple safeguards including verified<br/> identities, background checks, legal<br/> contracts, and insurance coverage<br/> protect everyone involved.
            </p>
          </div>

          <!-- Support Card -->
          <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center">
            <div class="w-16 h-16 rounded-full bg-[#0000FE]/10 flex items-center justify-center mb-6 mx-auto">
              <Icon name="mdi:handshake-outline" class="text-4xl text-[#0000FE]" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Support</h3>
            <p class="text-gray-600">
              Our dedicated team provides 24/7<br/> assistance, conflict resolution,<br/> emergency resources, and ongoing<br/> guidance whenever you need it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- S3: Rigorous Screening for Peace of Mind -->
    <section id="s3" class="py-16 md:py-24 bg-white -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-6">
          Rigorous Screening for Peace of Mind
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
          Every person in our network undergoes a comprehensive six-stage verification process. Click each stage to learn more about our thorough approach.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Stage 1 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              1
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Identity Verification</h3>
            <p class="text-gray-600">Government-issued ID confirmation and photo verification</p>
          </div>

          <!-- Stage 2 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              2
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Background Check</h3>
            <p class="text-gray-600">Comprehensive employment and personal history review</p>
          </div>

          <!-- Stage 3 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              3
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Reference Verification</h3>
            <p class="text-gray-600">Direct contact with previous employers and families</p>
          </div>

          <!-- Stage 4 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              4
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Criminal Record Check</h3>
            <p class="text-gray-600">International database screening and local police clearance</p>
          </div>

          <!-- Stage 5 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              5
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Health Screening</h3>
            <p class="text-gray-600">Medical clearance and vaccination verification</p>
          </div>

          <!-- Stage 6 -->
          <div class="bg-[#FBF7F2] rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
              6
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Interview Assessment</h3>
            <p class="text-gray-600">In-depth evaluation of values, motivations, and compatibility</p>
          </div>
        </div>
      </div>
    </section>

    <!-- S4: How We Protect Your Family -->
    <section id="s4" class="py-16 md:py-24 bg-gray-100 -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-12">
          How We Protect Your Family
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Family Image -->
          <div class="flex justify-center lg:justify-start">
            <div
              class="relative w-64 h-[299px] sm:w-80 sm:h-[373px] md:w-96 md:h-[448px] lg:w-[480px] lg:h-[560px] shadow-2xl overflow-hidden"
              style="
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                transform: rotate(-90deg);
              "
            >
              <img
                src="@/assets/images/fam-care.jpeg"
                alt="Family protection"
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

          <!-- Right: Protection Cards -->
          <div class="space-y-6">
            <!-- Card 1 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:file-check" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Background Screened Au Pairs</h3>
                <p class="text-gray-600">Criminal record checks, reference verification, and behavioral assessments ensure trustworthy caregivers.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:school" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Trained Caregivers</h3>
                <p class="text-gray-600">All au pairs complete mandatory childcare training, first aid certification, and safety protocols before placement.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:account-check" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Reference Verified</h3>
                <p class="text-gray-600">We personally contact previous families and employers to verify experience, reliability, and character.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:heart-pulse" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Health Cleared</h3>
                <p class="text-gray-600">Medical examinations and vaccination records ensure au pairs meet health standards for working with children.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S5: How We Protect Our Au Pairs -->
    <section id="s5" class="py-16 md:py-24 bg-[#F0F9F4] -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-12">
          How We Protect Our Au Pairs
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Protection Cards -->
          <div class="space-y-6 order-2 lg:order-1">
            <!-- Card 1 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#05FF88] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:star" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Verified Host Families</h3>
                <p class="text-gray-600">Every family undergoes the same rigorous screening as au pairs, including home visits and criminal background checks.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#05FF88] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:home" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Safe Housing Standards</h3>
                <p class="text-gray-600">Private rooms, secure locks, safe neighborhoods, and emergency exits verified through home inspections.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#05FF88] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:file-document-edit" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Legal Work Status</h3>
                <p class="text-gray-600">We handle all visa paperwork and ensure your work arrangement meets all legal requirements in the host country.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#05FF88] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:scale-balance" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Fair Treatment Protocols</h3>
                <p class="text-gray-600">Clear contracts outline work hours, responsibilities, time off, and stipend to prevent exploitation.</p>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="bg-white rounded-xl p-6 flex gap-4">
              <div class="w-16 h-16 rounded-full bg-[#05FF88] flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:phone" class="text-3xl text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Emergency Contacts</h3>
                <p class="text-gray-600">24/7 hotline access, local coordinator support, and immediate assistance if you feel unsafe.</p>
              </div>
            </div>
          </div>

          <!-- Right: Au Pair Image -->
          <div class="flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              class="relative w-64 h-[299px] sm:w-80 sm:h-[373px] md:w-96 md:h-[448px] lg:w-[480px] lg:h-[560px] shadow-2xl overflow-hidden"
              style="
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                transform: rotate(-90deg);
              "
            >
              <img
                src="@/assets/images/fam-care.jpeg"
                alt="Au pair protection"
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
      </div>
    </section>

    <!-- S7: Help When You Need It -->
    <section id="s7" class="py-16 md:py-24 bg-white -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-6">
          Help When You Need It
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
          Our comprehensive support network ensures you're never alone. From emergency hotlines to local coordinators, we've built a safety net that's always there when you need it.
        </p>

        <!-- Network Diagram -->
        <div class="relative max-w-4xl mx-auto min-h-[400px] md:min-h-[600px] flex items-center justify-center">
          <!-- Central "You" Node -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-[#0000FE] flex items-center justify-center shadow-lg">
              <span class="text-white text-base md:text-xl lg:text-2xl font-bold">You</span>
            </div>
          </div>

          <!-- Support Nodes in a circle pattern -->
          <div class="relative w-full h-full z-10">
            <!-- Top Center - 24/7 Hotline -->
            <div class="absolute -top-45 md:-top-20 lg:-top-70 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF88] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:phone" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">24/7 Hotline</span>
              </div>
            </div>

            <!-- Top Right - Local Coordinators -->
            <div class="absolute -top-27 md:top-[20%] lg:-top-40 right-[20%] md:right-[20%] lg:right-48 transform translate-x-1/2 -translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF88] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:map-marker" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">Local Coordinators</span>
              </div>
            </div>

            <!-- Bottom Right - Legal Support -->
            <div class="absolute -bottom-27 md:bottom-[20%] lg:-bottom-40 right-[20%] md:right-[20%] lg:right-48 transform translate-x-1/2 translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF88] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:gavel" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">Legal Support</span>
              </div>
            </div>

            <!-- Bottom Center - Medical Resources -->
            <div class="absolute -bottom-45 md:-bottom-20 lg:-bottom-70 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF88] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:medical-bag" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">Medical Resources</span>
              </div>
            </div>

            <!-- Bottom Left - Cultural Mediators -->
            <div class="absolute -bottom-27 md:bottom-[20%] lg:-bottom-40 left-[20%] md:left-[20%] lg:left-48 transform -translate-x-1/2 translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF88] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:account-group" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">Cultural Mediators</span>
              </div>
            </div>

            <!-- Top Left - Emergency Housing -->
            <div class="absolute -top-27 md:top-[20%] lg:-top-40 left-[20%] md:left-[20%] lg:left-48 transform -translate-x-1/2 -translate-y-1/2">
              <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white border-2 md:border-4 border-[#05FF884D] flex flex-col items-center justify-center shadow-md">
                <Icon name="mdi:shield" class="text-lg md:text-2xl lg:text-3xl text-green-600 mb-0.5 md:mb-1" />
                <span class="text-green-600 text-[10px] md:text-xs font-semibold text-center px-0.5 md:px-1 leading-tight">Emergency Housing</span>
              </div>
            </div>
          </div>

          <!-- Connecting Lines -->
          <svg class="absolute inset-0 w-full h-full z-0" style="pointer-events: none; overflow: visible;">
            <!-- Line to Top Center -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="50%" y2="8%" />
            <!-- Line to Top Right -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="75%" y2="25%" />
            <!-- Line to Bottom Right -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="75%" y2="75%" />
            <!-- Line to Bottom Center -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="50%" y2="92%" />
            <!-- Line to Bottom Left -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="25%" y2="75%" />
            <!-- Line to Top Left -->
            <line stroke="#87CEEB" stroke-width="2" x1="50%" y1="50%" x2="25%" y2="25%" />
          </svg>
        </div>
      </div>
    </section>

    <!-- S6: Comprehensive Coverage -->
    <section id="s6" class="py-16 md:py-24 bg-[#FBF7F2] -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-12">
          Comprehensive Coverage
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Insurance Protection Card -->
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-[#0000FE] mb-6">Insurance Protection</h3>
            <ul class="space-y-4 mb-6">
              <li>
                <strong class="text-gray-900">Health Insurance:</strong>
                <span class="text-gray-600"> Comprehensive medical coverage including doctor visits, hospital stays, and prescriptions</span>
              </li>
              <li>
                <strong class="text-gray-900">Accident Insurance:</strong>
                <span class="text-gray-600"> Coverage for work-related injuries and accidents in the home</span>
              </li>
              <li>
                <strong class="text-gray-900">Liability Insurance:</strong>
                <span class="text-gray-600"> Protection against property damage or injury claims</span>
              </li>
              <li>
                <strong class="text-gray-900">Travel Insurance:</strong>
                <span class="text-gray-600"> Coverage during journey to/from host country</span>
              </li>
            </ul>
            <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
              Download Policy Details →
            </a>
          </div>

          <!-- Legal Support Card -->
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-[#0000FE] mb-6">Legal Support</h3>
            <ul class="space-y-4 mb-6">
              <li>
                <strong class="text-gray-900">Visa Assistance:</strong>
                <span class="text-gray-600"> Complete handling of work permit applications and renewals</span>
              </li>
              <li>
                <strong class="text-gray-900">Contract Review:</strong>
                <span class="text-gray-600"> Legal verification of all agreements before signing</span>
              </li>
              <li>
                <strong class="text-gray-900">Dispute Resolution:</strong>
                <span class="text-gray-600"> Mediation services for conflicts between parties</span>
              </li>
              <li>
                <strong class="text-gray-900">Rights Advocacy:</strong>
                <span class="text-gray-600"> Legal representation if your rights are violated</span>
              </li>
            </ul>
            <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
              Access Legal Resources →
            </a>
          </div>
        </div>
      </div>
    </section>

  

    <!-- S10: Know the Signs, Stay Safe -->
    <section id="s10" class="py-16 md:py-24 bg-white -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-6">
          Know the Signs, Stay Safe
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
          Education is a powerful tool for safety. Learn to recognize warning signs and access resources that can help you navigate challenging situations.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left: Red Flags -->
          <div>
            <h3 class="text-2xl font-bold text-red-600 mb-6">Red Flags to Watch For</h3>
            <div class="space-y-3">
              <div
                v-for="(flag, index) in redFlags"
                :key="index"
                class="bg-red-50 border border-red-200 rounded-lg overflow-hidden"
              >
                <button
                  @click="toggleRedFlag(index)"
                  class="w-full p-4 flex items-center justify-between hover:bg-red-100 transition-colors cursor-pointer text-left"
                >
                  <span class="text-gray-900 font-medium">{{ flag.title }}</span>
                  <Icon
                    name="mdi:plus"
                    class="text-red-600 text-xl transition-transform duration-200 flex-shrink-0"
                    :class="{ 'rotate-45': openRedFlags[index] }"
                  />
                </button>
                <transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-96 opacity-100"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="max-h-96 opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="openRedFlags[index]" class="px-4 pb-4">
                    <p class="text-gray-700 text-sm leading-relaxed">{{ flag.description }}</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Right: Additional Resources -->
          <div>
            <h3 class="text-2xl font-bold text-[#0000FE] mb-6">Additional Resources</h3>
            <div class="space-y-4">
              <!-- Safety Handbook -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:file-document" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Safety Handbook</h4>
                    <p class="text-gray-600 text-sm mb-3">Comprehensive guide covering all aspects of personal safety, emergency procedures, and your rights.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      Download PDF →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Emergency Contacts -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:phone" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Emergency Contacts</h4>
                    <p class="text-gray-600 text-sm mb-3">24/7 hotline numbers, local coordinator contacts, and country-specific emergency services.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      View Contacts →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Report a Concern -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:alert" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Report a Concern</h4>
                    <p class="text-gray-600 text-sm mb-3">Confidential reporting system for safety issues, contract violations, or uncomfortable situations.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      Submit Report →
                    </a>
                  </div>
                </div>
              </div>

              <!-- External Organizations -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-full bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:earth" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">External Organizations</h4>
                    <p class="text-gray-600 text-sm mb-3">Links to international au pair associations, labor rights groups, and embassy resources.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      Browse Resources →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Safety Training Videos -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:play-circle" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Safety Training Videos</h4>
                    <p class="text-gray-600 text-sm mb-3">Video tutorials on recognizing red flags, self-defense basics, and emergency response.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      Watch Videos →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Safety FAQs -->
              <div class="bg-[#FBF7F2] rounded-xl p-6">
                <div class="flex gap-4 mb-4">
                  <div class="w-12 h-12 rounded-lg bg-[#0000FE] flex items-center justify-center flex-shrink-0">
                    <Icon name="mdi:help-circle" class="text-2xl text-white" />
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">Safety FAQs</h4>
                    <p class="text-gray-600 text-sm mb-3">Answers to common questions about safety protocols, insurance, and what to do in emergencies.</p>
                    <a href="#" class="text-[#0000FE] font-semibold hover:underline inline-flex items-center">
                      Read FAQs →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S9: If Something Goes Wrong -->
    <section id="s9" class="py-16 md:py-24 bg-gray-100 -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0000FE] text-center mb-6">
          If Something Goes Wrong
        </h2>
        <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
          We take every concern seriously. Here's exactly what happens when you reach out for help, and how we work to resolve issues quickly and fairly.
        </p>

        <div class="max-w-4xl mx-auto space-y-6">
          <!-- Step 1 -->
          <div class="bg-white rounded-xl p-6 flex gap-6">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
              1
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Contact Your Coordinator</h3>
              <p class="text-gray-600">Reach out to your assigned coordinator via phone, email, or our app. For emergencies, call our 24/7 hotline immediately. You can report issues anonymously if preferred.</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="bg-white rounded-xl p-6 flex gap-6">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
              2
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Document the Issue</h3>
              <p class="text-gray-600">We'll guide you through documenting the situation with dates, times, witnesses, and any evidence. This helps us understand the full context and take appropriate action.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="bg-white rounded-xl p-6 flex gap-6">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
              3
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Investigation Process</h3>
              <p class="text-gray-600">Our team investigates within 48 hours, interviewing all parties involved, reviewing contracts, and consulting legal/safety experts as needed.</p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="bg-white rounded-xl p-6 flex gap-6">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
              4
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Resolution Options</h3>
              <p class="text-gray-600">Depending on findings, we may facilitate mediation, arrange re-matching with a new family/au pair, involve legal authorities, or provide emergency relocation if safety is at risk.</p>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="bg-white rounded-xl p-6 flex gap-6">
            <div class="w-12 h-12 rounded-full bg-[#0000FE] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
              5
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Follow-up Support</h3>
              <p class="text-gray-600">After resolution, we continue monitoring the situation with weekly check-ins for the first month, ongoing counseling support, and assistance with any continued needs.</p>
            </div>
          </div>
        </div>

        <!-- Privacy Banner -->
        <div class="max-w-4xl mx-auto mt-8">
          <div class="bg-[#05FF88] rounded-xl p-6 flex gap-4">
            <Icon name="mdi:lock" class="text-3xl text-gray-700 flex-shrink-0" />
            <p class="text-gray-700">
              <strong>Your privacy is protected.</strong> All reports are kept confidential and we have strict non-retaliation policies. You will never face consequences for reporting genuine concerns about safety or fairness.
            </p>
          </div>
        </div>
      </div>
    </section>


   

    <!-- S13: Final Report Form -->
    <section id="s13" class="py-16 md:py-24 bg-gray-100 -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Final Report Form -->
        <div class="max-w-2xl mx-auto">
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <h3 class="text-2xl font-bold text-[#0000FE] mb-6 text-center">Submit Confidential Report</h3>
            <form class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (optional if anonymous)
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000FE] focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000FE] focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Type of Concern <span class="text-red-500">*</span>
                </label>
                <select
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000FE] focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="safety">Safety Issue</option>
                  <option value="contract">Contract Violation</option>
                  <option value="harassment">Harassment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Describe the Situation <span class="text-red-500">*</span>
                </label>
                <textarea
                  rows="6"
                  placeholder="Please provide as much detail as possible, including dates, times, and any witnesses."
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0000FE] focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full bg-[#0000FE] text-white py-3 rounded-full font-semibold hover:bg-[#0000cc] transition-colors"
              >
                Submit Report
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>


    <!-- S11: Report Form and Safety Stories -->
    <section id="s11" class="py-16 md:py-24 bg-[#FBF7F2] -mt-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       

        <!-- Safety Stories -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-[#0000FE] text-center mb-6">
            Safety Stories
          </h2>
          <p class="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-12">
            Real experiences from au pairs and families about how Hema's safety measures supported them during challenging moments.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Story 1 -->
            <div class="bg-white rounded-xl p-6 shadow-sm transform rotate-[-3deg] transition-all duration-300 hover:rotate-0 hover:scale-105">
              <div class="flex items-center gap-4 mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Eshe Kamau"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 class="font-bold text-gray-900">Eshe Kamau</h4>
                  <p class="text-sm text-gray-600">Au Pair, Berlin</p>
                </div>
              </div>
              <p class="text-gray-700 italic mb-4 leading-relaxed">
                "When my host family started asking me to work far beyond my agreed hours, I didn't know what to do. I called my coordinator, and within two days, they had mediated a solution. The family apologized, we reset boundaries, and my last six months there were wonderful. I'm so grateful I spoke up and that Hema took me seriously."
              </p>
              <div class="mt-4">
                <span class="inline-block bg-blue-100 text-[#0000FE] px-4 py-1.5 rounded-full text-sm font-semibold">
                  Contract Protection
                </span>
              </div>
            </div>

            <!-- Story 2 -->
            <div class="bg-white rounded-xl p-6 shadow-sm transform rotate-[2deg] transition-all duration-300 hover:rotate-0 hover:scale-105">
              <div class="flex items-center gap-4 mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Kofi Mensah"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 class="font-bold text-gray-900">Kofi Mensah</h4>
                  <p class="text-sm text-gray-600">Host Parent, Accra</p>
                </div>
              </div>
              <p class="text-gray-700 italic mb-4 leading-relaxed">
                "Our au pair had a medical emergency in her third month with us. Hema's insurance covered everything immediately—no delays, no hassle. Their emergency coordinator stayed in contact with us throughout her hospital stay and recovery. The level of care and professionalism gave us such peace of mind during a scary situation."
              </p>
              <div class="mt-4">
                <span class="inline-block bg-blue-100 text-[#0000FE] px-4 py-1.5 rounded-full text-sm font-semibold">
                  Medical Support
                </span>
              </div>
            </div>

            <!-- Story 3 -->
            <div class="bg-white rounded-xl p-6 shadow-sm transform rotate-[-2deg] transition-all duration-300 hover:rotate-0 hover:scale-105">
              <div class="flex items-center gap-4 mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Amara Nwosu"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 class="font-bold text-gray-900">Amara Nwosu</h4>
                  <p class="text-sm text-gray-600">Au Pair, London</p>
                </div>
              </div>
              <p class="text-gray-700 italic mb-4 leading-relaxed">
                "I arrived to discover the 'private room' was actually a curtained corner of the living room. I felt devastated and trapped. Hema's emergency housing kicked in within hours—they put me in a safe hotel that night. Within a week, I was matched with an amazing new family with a proper room. They saved my entire experience."
              </p>
              <div class="mt-4">
                <span class="inline-block bg-blue-100 text-[#0000FE] px-4 py-1.5 rounded-full text-sm font-semibold">
                  Emergency Response
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

   
    <!-- Safety Message Section -->
    <section class="py-16 md:py-24 bg-white -mt-1">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-[#0000FE] mb-4">
          Your safety is not negotiable. It's why we exist.
        </h2>
        <p class="text-lg text-gray-600 italic mb-8">— The Hema Team</p>
        <div class="flex flex-wrap justify-center gap-4">
          <button class="px-6 py-3 border-2 border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-colors">
            Report a Concern
          </button>
          <button class="px-6 py-3 bg-[#0000FE] text-white rounded-full font-semibold hover:bg-[#0000cc] transition-colors">
            Contact Safety Team
          </button>
          <button class="px-6 py-3 bg-[#05FF88] text-white rounded-full font-semibold hover:bg-[#04e675] transition-colors">
            Download Resources
          </button>
        </div>
      </div>
    </section>
  </div>

  <LandingFooter />
</template>

<script setup>
import { ref } from 'vue'

// Red Flags Accordion State
const openRedFlags = ref({})

const toggleRedFlag = (index) => {
  openRedFlags.value[index] = !openRedFlags.value[index]
}

// Red Flags Data
const redFlags = [
  {
    title: 'Demands for Money or Gifts',
    description: 'Legitimate au pair programs never require upfront payments, fees, or gifts from families or au pairs. If someone asks for money before placement, requests expensive gifts, or demands payment for "processing fees," this is a major red flag. Report this immediately.'
  },
  {
    title: 'Unclear Job Descriptions',
    description: 'Your contract should clearly outline your duties, hours, schedule, and compensation. Vague descriptions like "helping around the house" or "flexible hours" without specifics can lead to exploitation. Always get everything in writing before committing.'
  },
  {
    title: 'Isolation from Support Network',
    description: 'Warning signs include being discouraged from contacting your coordinator, prevented from meeting other au pairs, having your phone or internet access restricted, or being told not to share your location with family. You should always have access to support.'
  },
  {
    title: 'Excessive Work Hours',
    description: 'Au pair programs have legal limits on working hours (typically 30-40 hours per week). If you\'re asked to work significantly more, work during your agreed time off, or be "on call" 24/7, this violates your contract and potentially labor laws. Document and report.'
  },
  {
    title: 'Inappropriate Behavior',
    description: 'Any form of harassment, discrimination, unwanted physical contact, verbal abuse, or inappropriate comments about your appearance, culture, or personal life is unacceptable. Trust your instincts—if something feels wrong, it likely is. Contact support immediately.'
  },
  {
    title: 'Unsafe Living Conditions',
    description: 'You should have a private, lockable room with basic amenities. Red flags include shared rooms without privacy, lack of heating/cooling, unsafe electrical systems, pest infestations, or being asked to sleep in common areas. Your safety and comfort are non-negotiable.'
  }
]
</script>

<style scoped>
@media (min-width: 768px) {
  section#s7 svg line {
    stroke-width: 3;
  }
}
</style>
