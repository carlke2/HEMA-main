<template>
  <!-- Sidebar Navigation -->
  <aside
    class="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:block"
  >
    <nav class="p-4 space-y-1">
      <router-link
        to="/au-pair/family"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]': $route.path === '/au-pair/family',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family',
        }"
      >
        <icon name="mdi:view-dashboard" />
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/au-pair/family/au-pair"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/au-pair',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/au-pair',
        }"
      >
        <icon name="mdi:account-supervisor" />
        <span>My Au Pair</span>
      </router-link>

      <router-link
        to="/au-pair/family/browse-au-pairs"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/browse-au-pairs',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/browse-au-pairs',
        }"
      >
        <icon name="mdi:account-group" />
        <span>Browse Au Pairs</span>
      </router-link>

      <router-link
        to="/au-pair/family/matching"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/matching',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/matching',
        }"
      >
        <icon name="mdi:card-search" />
        <span>Matching Tool</span>
      </router-link>

      <router-link
        to="/au-pair/family/connections"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/connections',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/connections',
        }"
      >
        <icon name="mdi:handshake-outline" />
        <span>My connections</span>
      </router-link>

      <router-link
        to="/au-pair/family/applications"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/applications',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/applications',
        }"
      >
        <icon name="mdi:file-document-multiple" />
        <span>Applications</span>
      </router-link>

      <router-link
        to="/au-pair/family/contract"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/contract',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/contract',
        }"
      >
        <icon name="mdi:file-document" />
        <span>Contract & Docs</span>
      </router-link>

      <router-link
        to="/au-pair/family/support"
        class="flex items-center space-x-3 px-4 py-3 rounded-md font-medium"
        :class="{
          'bg-blue-50 text-[#0000FE]':
            $route.path === '/au-pair/family/support',
          'text-gray-700 hover:bg-blue-50 hover:text-[#0000FE]':
            $route.path !== '/au-pair/family/support',
        }"
      >
        <icon name="mdi:face-agent" />
        <span>Cultural Support</span>
      </router-link>
    </nav>

    <!-- Cultural Motif -->
    <div class="absolute bottom-4 left-0 right-0 text-center">
      <icon name="mdi:swirl" class="text-[#0000FE] mx-auto w-10 h-10" />
    </div>
  </aside>

  <!-- Mobile Bottom Navigation -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-20"
  >
    <router-link
      to="/au-pair/family"
      class="flex flex-col items-center text-[#0000FE]"
    >
      <icon name="mdi:view-dashboard" class="text-xl" />
      <span class="text-xs mt-1">Home</span>
    </router-link>
    <router-link
      to="/au-pair/family/au-pair"
      class="flex flex-col items-center text-gray-700"
    >
      <icon name="mdi:account-supervisor" class="text-xl" />
      <span class="text-xs mt-1">Au Pair</span>
    </router-link>
    <router-link
      to="/au-pair/family/browse-au-pairs"
      class="flex flex-col items-center text-gray-700"
    >
      <icon name="mdi:account-group" class="text-xl" />
      <span class="text-xs mt-1">Browse</span>
    </router-link>
    <router-link
      to="/au-pair/family/matching"
      class="flex flex-col items-center text-gray-700"
    >
      <icon name="mdi:card-search" class="text-xl" />
      <span class="text-xs mt-1">Match</span>
    </router-link>
    <router-link
      to="/au-pair/family/support"
      class="flex flex-col items-center text-gray-700"
    >
      <icon name="mdi:face-agent" class="text-xl" />
      <span class="text-xs mt-1">Support</span>
    </router-link>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
</script>
