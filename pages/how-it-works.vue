<template>
  <LandingNav />
  <div class="min-h-screen bg-[#FBF7F2]">
    <!-- Hero Section -->
    <section class="pt-28 md:pt-32 pb-12 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0000FE] mb-4">
          Your Journey, Step by Step
        </h1>
        <p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Whether you're an au pair or a family, we guide you every step of the way
        </p>
        
        <!-- User Type Selection Tabs -->
        <div class="flex justify-center items-center gap-8 mb-6">
          <button
            @click="selectedTab = 'au-pairs'"
            :class="[
              'text-lg font-medium transition-colors pb-2',
              selectedTab === 'au-pairs' 
                ? 'text-[#0000FE] border-b-2 border-[#0000FE]' 
                : 'text-gray-700 hover:text-[#0000FE]'
            ]"
          >
            For Au Pairs
          </button>
          <button
            @click="selectedTab = 'families'"
            :class="[
              'text-lg font-medium transition-colors pb-2',
              selectedTab === 'families' 
                ? 'text-[#0000FE] border-b-2 border-[#0000FE]' 
                : 'text-gray-700 hover:text-[#0000FE]'
            ]"
          >
            For Families
          </button>
        </div>

        <!-- OR Separator -->
        <div class="flex items-center justify-center my-8">
          <div class="w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
            <span class="text-gray-600 font-medium text-sm">OR</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="pb-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <template v-for="(step, index) in currentSteps" :key="index">
          <div class="mb-16">
            <div class="grid md:grid-cols-2 gap-4 md:gap-5 items-center">
              <!-- Text Content -->
              <div :class="step.textPosition === 'left' ? 'order-2 md:order-1' : 'order-2 md:order-2'">
                <div class="flex flex-col items-start">
                  <!-- Step Number Circle -->
                  <div class="mb-4">
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#0000FE] bg-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,254,0.3)]">
                      <span class="text-[#0000FE] text-3xl md:text-4xl font-bold">{{ step.number }}</span>
                    </div>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      {{ step.title }}
                    </h2>
                    
                    <!-- Time Estimate Badge -->
                    <div class="inline-flex items-center gap-2 bg-[#DDF2E7] text-[#059669] px-4 py-1.5 rounded-full mb-4">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-sm font-medium">{{ step.duration }}</span>
                    </div>
                    
                    <p class="text-gray-700 text-lg leading-relaxed mb-4">
                      {{ step.description }}
                    </p>
                    
                    <a href="#" class="inline-flex items-center gap-2 text-[#0000FE] font-medium hover:underline">
                      What You Need
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Image -->
              <div :class="step.textPosition === 'left' ? 'order-1 md:order-2 flex justify-center md:justify-end' : 'order-1 md:order-1 flex justify-center md:justify-start'">
                <div
                  class="relative w-[294px] h-[344px] md:w-[368px] md:h-[429px] overflow-hidden shadow-xl"
                  style="border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform: rotate(-90deg);"
                >
                  <img
                    :src="step.image"
                    :alt="step.imageAlt"
                    class="absolute inset-0"
                    style="transform: rotate(90deg) scale(1.3); object-fit: cover; object-position: center; width: 100%; height: 100%;"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- We're With You Always Section -->
    <section class="py-20 px-6 bg-[#FBF7F2]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] text-center mb-16">
          We're With You Always
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Before Arrival -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Before Arrival</h3>
            <div class="h-1 w-full bg-[#059669] mb-6"></div>
            
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Visa and legal document assistance</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <p class="text-gray-700">Comprehensive training programs</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <p class="text-gray-700">Family-au pair matching support</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.502a1 1 0 00-.789 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <p class="text-gray-700">Travel planning and logistics</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Pre-departure orientation</p>
              </div>
            </div>
          </div>

          <!-- During Placement -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">During Placement</h3>
            <div class="h-1 w-full bg-[#059669] mb-6"></div>
            
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <p class="text-gray-700">24/7 emergency hotline access</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <p class="text-gray-700">Local coordinator check-ins</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Mediation and conflict resolution</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Mental health and wellness resources</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Au pair community events</p>
              </div>
            </div>
          </div>

          <!-- After Completion -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">After Completion</h3>
            <div class="h-1 w-full bg-[#059669] mb-6"></div>
            
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Program completion certificate</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <p class="text-gray-700">Career development resources</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <p class="text-gray-700">Alumni network access</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">References and recommendations</p>
              </div>
              
              <div class="bg-white rounded-lg p-4 shadow-sm flex items-start gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#DDF2E7] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#059669]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-gray-700">Program extension options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Planning Your Journey Section -->
    <section class="py-20 px-6 bg-gradient-to-b from-blue-50 to-blue-100">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] text-center mb-12">
          Planning Your Journey
        </h2>
        
        <!-- FAQ Cards Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- FAQ 1: Timeline -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('timeline')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">How long does the process take?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.timeline }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.timeline"
              class="px-6 pb-6"
            >
              <p class="text-gray-700 mb-4">
                The typical timeline from application to placement is 3-6 months, though this varies based on individual circumstances:
              </p>
              
              <ul class="space-y-2 text-gray-700 mb-4">
                <li class="flex items-start gap-2">
                  <span class="text-[#0000FE] font-bold">•</span>
                  <span><strong>Au Pairs:</strong> Profile creation (1-2 weeks), training & screening (2-3 weeks), matching (2-4 weeks), interviews (1-3 weeks), visa processing (4-8 weeks)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-[#0000FE] font-bold">•</span>
                  <span><strong>Families:</strong> Profile creation (1-2 weeks), needs assessment (1 week), candidate review (2-4 weeks), interviews (1-3 weeks), preparation (4-8 weeks)</span>
                </li>
              </ul>
              
              <p class="text-gray-700">
                We can expedite certain steps if you have urgent needs or specific timelines.
              </p>
            </div>
          </div>
          
          <!-- FAQ 1: Documents -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('documents')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">What documents do I need?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.documents }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.documents"
              class="px-6 pb-6"
            >
              <p class="text-gray-700">
                You'll need a valid passport, birth certificate, medical clearance, background check, educational certificates, and proof of childcare experience. We provide a complete checklist and assistance with document preparation.
              </p>
            </div>
          </div>
          
          <!-- FAQ 2: Change Match -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('change')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">Can I change my match?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.change }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.change"
              class="px-6 pb-6"
            >
              <p class="text-gray-700">
                Yes, we understand that sometimes matches don't work out. We have a rematching process in place. Our team will work with you to find a better fit, ensuring both parties are comfortable with the transition. There may be additional fees for rematching.
              </p>
            </div>
          </div>
          
          <!-- FAQ 3: Training -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('training')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">What training is provided?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.training }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.training"
              class="px-6 pb-6"
            >
              <p class="text-gray-700">
                Our comprehensive training covers childcare best practices, safety protocols, cultural sensitivity, communication skills, first aid, and emergency procedures. Training is conducted both online and in-person before placement.
              </p>
            </div>
          </div>
          
          <!-- FAQ 4: Vetting -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('vetting')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">How are families/au pairs vetted?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.vetting }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.vetting"
              class="px-6 pb-6"
            >
              <p class="text-gray-700">
                All au pairs undergo comprehensive background checks, reference verification, medical screening, and skills assessment. Families are verified through home visits, background checks, and reference validation. We maintain strict standards to ensure safety and compatibility for all participants.
              </p>
            </div>
          </div>
          
          <!-- FAQ 6: Costs -->
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <button
              @click="toggleAccordion('costs')"
              class="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.314 1.711c.562.613 1.242.977 2.15 1.161V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.314-1.711c-.562-.613-1.242-.977-2.15-1.161V5z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-lg font-semibold text-gray-900">What are the costs involved?</h4>
              </div>
              <svg
                class="w-5 h-5 text-[#0000FE] transition-transform duration-200 flex-shrink-0"
                :class="{ 'rotate-180': openAccordions.costs }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openAccordions.costs"
              class="px-6 pb-6"
            >
              <p class="text-gray-700">
                Costs vary by program and location. For au pairs, there are application fees, training costs, and visa processing fees. For families, there are placement fees and ongoing program support costs. Contact us for a detailed breakdown tailored to your situation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Your Journey Timeline Section -->
    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] text-center mb-16">
          Your Journey Timeline
        </h2>
        
        <!-- Timeline -->
        <div class="relative">
          <!-- Timeline Line -->
          <div class="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-emerald-500"></div>
          
          <!-- Timeline Steps -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            <!-- Step 1: Application -->
            <div class="text-center flex flex-col items-center">
              <h3 class="font-bold text-gray-900 mb-2">Application</h3>
              <div class="w-16 h-16 border-2 border-[#0000FE] rounded-full flex items-center justify-center mx-auto bg-white relative">
                <svg class="w-8 h-8 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <p class="text-sm text-gray-600 mt-2">Month 1</p>
            </div>
            
            <!-- Step 2: Screening -->
            <div class="text-center flex flex-col items-center">
              <h3 class="font-bold text-gray-900 mb-2">Screening</h3>
              <div class="w-16 h-16 border-2 border-[#0000FE] rounded-full flex items-center justify-center mx-auto bg-white relative">
                <svg class="w-8 h-8 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-sm text-gray-600 mt-2">Month 2</p>
            </div>
            
            <!-- Step 3: Match Made -->
            <div class="text-center flex flex-col items-center">
              <h3 class="font-bold text-gray-900 mb-2">Match Made</h3>
              <div class="w-16 h-16 border-2 border-[#0000FE] rounded-full flex items-center justify-center mx-auto bg-white relative">
                <svg class="w-8 h-8 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <p class="text-sm text-gray-600 mt-2">Month 3</p>
            </div>
            
            <!-- Step 4: Arrival -->
            <div class="text-center flex flex-col items-center">
              <h3 class="font-bold text-gray-900 mb-2">Arrival</h3>
              <div class="w-16 h-16 border-2 border-[#0000FE] rounded-full flex items-center justify-center mx-auto bg-white relative">
                <svg class="w-8 h-8 text-[#0000FE]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.502a1 1 0 00-.789 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <p class="text-sm text-gray-600 mt-2">Month 6</p>
            </div>
          </div>
        </div>
        
       
        
      </div>
    </section>

    <!-- Built on Trust & Results Metrics Section -->
    <section class="py-20 px-6 bg-[#FBF7F2]">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-[#0000FE] text-center mb-16">
          Built on Trust & Results
        </h2>
        
        <div class="grid md:grid-cols-4 gap-6">
          <!-- Metric 1 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="w-16 h-16 bg-[#DDF2E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-[#0000FE] mb-2">500+</div>
            <p class="text-gray-600">Successful Placements</p>
          </div>
          
          <!-- Metric 2 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="w-16 h-16 bg-[#DDF2E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-[#0000FE] mb-2">4.9/5</div>
            <p class="text-gray-600">Average Rating</p>
          </div>
          
          <!-- Metric 3 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="w-16 h-16 bg-[#DDF2E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-[#0000FE] mb-2">30+</div>
            <p class="text-gray-600">Countries Served</p>
          </div>
          
          <!-- Metric 4 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div class="w-16 h-16 bg-[#DDF2E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-4xl font-bold text-[#0000FE] mb-2">95%</div>
            <p class="text-gray-600">Match Success Rate</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="grid md:grid-cols-2">
      <!-- Left: For Au Pairs -->
      <div class="bg-gradient-to-br from-emerald-600 to-emerald-500 px-8 py-16 md:py-20 text-white">
        <div class="max-w-md mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p class="text-lg mb-8 text-emerald-50">
            Start your au pair application and begin your journey to cultural exchange and personal growth
          </p>
          <NuxtLink
            to="/au-pair/auth/sign-up"
            class="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Apply as Au Pair
          </NuxtLink>
        </div>
      </div>
      
      <!-- Right: For Families -->
      <div class="bg-gradient-to-br from-blue-600 to-blue-500 px-8 py-16 md:py-20 text-white">
        <div class="max-w-md mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Need Childcare?</h2>
          <p class="text-lg mb-8 text-blue-50">
            Create your family profile and connect with caring, qualified au pairs from across Africa
          </p>
          <NuxtLink
            to="/au-pair/auth/sign-up"
            class="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Find an Au Pair
          </NuxtLink>
        </div>
      </div>
    </section>

    <Stickychat />
    <LandingFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedTab = ref('au-pairs')

// Accordion state - all closed by default
const openAccordions = ref({
  timeline: false,
  documents: false,
  training: false,
  costs: false,
  change: false,
  vetting: false
})

const toggleAccordion = (key) => {
  openAccordions.value[key] = !openAccordions.value[key]
}

// Au Pairs Steps
const auPairSteps = [
  {
    number: 1,
    title: 'Create Your Profile',
    duration: '1-2 weeks',
    description: 'Share your story, skills, and what you\'re looking for in a host family. Our detailed application helps us understand your unique strengths and match you perfectly.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Woman creating profile on laptop',
    textPosition: 'left'
  },
  {
    number: 2,
    title: 'Complete Training & Screening',
    duration: '2-3 weeks',
    description: 'Participate in our comprehensive orientation covering childcare best practices, cultural sensitivity, safety protocols, and communication skills.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Training session with group of people',
    textPosition: 'right'
  },
  {
    number: 3,
    title: 'Review Family Matches',
    duration: '2-4 weeks',
    description: 'Browse profiles of families that align with your preferences. Review their location, family structure, expectations, and what they\'re looking for in an au pair.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Woman reviewing profiles on laptop',
    textPosition: 'left'
  },
  {
    number: 4,
    title: 'Interview & Select',
    duration: '1-3 weeks',
    description: 'We carefully connect you with a family that shares your values, interests, and expectations. Video interviews ensure compatibility before commitment.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Woman on video call interview',
    textPosition: 'right'
  },
  {
    number: 5,
    title: 'Prepare for Departure',
    duration: '4-8 weeks',
    description: 'Travel to your host country with all logistics arranged, receive ongoing support, and start building relationships that last a lifetime.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Family saying goodbye before departure',
    textPosition: 'left'
  }
]

// Families Steps
const familySteps = [
  {
    number: 1,
    title: 'Create Family Profile',
    duration: '1-2 weeks',
    description: 'Tell us about your family, your values, and what you\'re looking for in an au pair. Share photos and details about your home, neighborhood, and lifestyle.',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Family taking selfie together',
    textPosition: 'left'
  },
  {
    number: 2,
    title: 'Define Your Needs',
    duration: '1 week',
    description: 'Clarify your childcare needs, schedule expectations, and what qualities are most important in your au pair. Our team helps you set realistic expectations.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Couple looking at laptop together',
    textPosition: 'right'
  },
  {
    number: 3,
    title: 'Review Au Pair Profiles',
    duration: '2-4 weeks',
    description: 'Browse vetted au pair candidates who match your criteria. Review their experience, interests, and introduction letters to find potential matches.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Family reviewing profiles on tablet',
    textPosition: 'left'
  },
  {
    number: 4,
    title: 'Interview Candidates',
    duration: '1-3 weeks',
    description: 'Conduct video interviews with your top choices. Get to know them, let your children meet them virtually, and ensure it\'s the right fit for everyone.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Family on video call interview',
    textPosition: 'right'
  },
  {
    number: 5,
    title: 'Welcome Your Au Pair',
    duration: '4-8 weeks',
    description: 'Prepare for arrival, handle visa paperwork with our support, and welcome your new au pair into your home and family with confidence.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0',
    imageAlt: 'Family welcoming au pair at airport',
    textPosition: 'left'
  }
]

// Computed property to get current steps based on selected tab
const currentSteps = computed(() => {
  return selectedTab.value === 'families' ? familySteps : auPairSteps
})
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
