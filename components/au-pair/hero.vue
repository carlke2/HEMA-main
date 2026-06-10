<template>
  <section
    class="min-h-screen px-6 md:px-16 py-12 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-[#FAF9F6]"
  >
    <!-- Text Content -->
    <div class="order-2 md:order-1">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2C3E50]">
        Care that preserves <span class="underline decoration-[#D35400]">culture,</span> 
        <br class="hidden sm:block" />
        <span class="relative inline-block mt-2">
          Caregiving that <span class="text-[#D35400]">builds futures.</span>
          <span
            class="absolute -inset-1 bg-[#F4D03F]/30 rounded-full -z-10 transform scale-110 rotate-1"
          ></span>
        </span>
      </h1>
      
      <p class="mt-4 text-[#2C3E50]/90 max-w-lg text-sm sm:text-base">
        The Pan-African au pair service connecting families with
        culturally-aligned caregivers while supporting the au pair's academic
        and professional journey.
      </p>
      
      <div class="mt-8 flex flex-wrap items-center gap-4">
        <button
          class="bg-[#2C3E50] text-[#FAF9F6] px-6 py-3 rounded-md font-medium hover:bg-[#D35400] transition text-sm sm:text-base"
        >
          Find Your Match
        </button>
        <button class="flex items-center gap-2 group transition">
          <span
            class="w-10 h-10 border-2 border-[#2C3E50] rounded-full flex items-center justify-center group-hover:border-[#D35400] group-hover:text-[#D35400] transition"
          >
            <icon name="mdi:play" class="text-lg ml-1" />
          </span>
          <span class="text-sm sm:text-base font-medium text-[#2C3E50] group-hover:text-[#D35400] transition">How It Works</span>
        </button>
      </div>
      
      <div class="mt-10 text-2xl text-[#D35400]">
        <icon name="mdi:swirl" class="w-10 h-10 sm:w-12 sm:h-12" />
      </div>
    </div>

    <!-- Image Gallery - Now without horizontal scroll -->
    <div class="order-1 md:order-2 w-full">
      <div class="flex justify-center md:justify-end space-x-4 md:space-x-6">
        <!-- Image 1 -->
        <div class="relative group">
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Host Family"
              class="rounded-md w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-[320px] sm:h-[380px] md:h-[450px] object-cover shadow-lg border-4 border-[#2C3E50] bg-white"
            />
            <div
              class="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10"
            >
              <div
                class="bg-[#839192] w-full h-full absolute rounded-md scale-90 transform"
              ></div>
            </div>
          </div>
          <p class="text-center mt-3 font-medium text-xs sm:text-sm text-[#2C3E50]">Host Families</p>
        </div>

        <!-- Image 2 -->
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Au Pair"
            class="rounded-md w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-[320px] sm:h-[380px] md:h-[450px] object-cover shadow-lg border-4 border-[#F4D03F]"
          />
          <p class="text-center mt-3 font-medium text-xs sm:text-sm text-[#2C3E50]">Verified Au Pairs</p>
        </div>

        <!-- Image 3 - Hidden on smallest screens -->
        <div class="relative hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Cultural Bond"
            class="rounded-md w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] h-[320px] sm:h-[380px] md:h-[450px] object-cover shadow-lg border-4 border-[#D35400]"
          />
          <p class="text-center mt-3 font-medium text-xs sm:text-sm text-[#2C3E50]">Cultural Exchange</p>
          <div class="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
            <div
              class="bg-[#D35400] text-[#FAF9F6] text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold rotate-[20deg]"
            >
              OUR FEATURES →
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>