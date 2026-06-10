<template>
  <div class="bg-[#D6CBBE] py-4 overflow-hidden text-sm font-semibold text-[#3B2F2F] px-6 relative">
    <div class="marquee-track flex w-max animate-marquee space-x-12">
      <!-- First Set of Items -->
      <div class="flex items-center space-x-12">
        <span class="flex items-center">
          <icon name="mdi:check-decagram" class="mr-2" /> Verified Profiles
        </span>
        <span class="flex items-center">
          <icon name="mdi:handshake" class="mr-2" /> Cultural Matching
        </span>
        <span class="flex items-center">
          <icon name="mdi:shield-lock" class="mr-2" /> Secure Messaging
        </span>
        <span class="flex items-center">
          <icon name="mdi:passport" class="mr-2" /> Visa & Contract Tools
        </span>
        <span class="flex items-center">
          <icon name="mdi:heart-pulse" class="mr-2" /> Health & Wellness
        </span>
        <span class="flex items-center">
          <icon name="mdi:lifebuoy" class="mr-2" /> Emergency Support
        </span>
        <span class="flex items-center">
          <icon name="mdi:account-group" class="mr-2" /> Buddy System
        </span>
      </div>

      <!-- Second Set of Items (for seamless loop) -->
      <div class="flex items-center space-x-12">
        <span class="flex items-center">
          <icon name="mdi:check-decagram" class="mr-2" /> Verified Profiles
        </span>
        <span class="flex items-center">
          <icon name="mdi:handshake" class="mr-2" /> Cultural Matching
        </span>
        <span class="flex items-center">
          <icon name="mdi:shield-lock" class="mr-2" /> Secure Messaging
        </span>
        <span class="flex items-center">
          <icon name="mdi:passport" class="mr-2" /> Visa & Contract Tools
        </span>
        <span class="flex items-center">
          <icon name="mdi:heart-pulse" class="mr-2" /> Health & Wellness
        </span>
        <span class="flex items-center">
          <icon name="mdi:lifebuoy" class="mr-2" /> Emergency Support
        </span>
        <span class="flex items-center">
          <icon name="mdi:account-group" class="mr-2" /> Buddy System
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
  will-change: transform;
}
</style>
