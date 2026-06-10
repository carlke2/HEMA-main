<template>
       <!-- Sidebar Navigation -->
      <aside
        class="w-64 bg-white border-r border-[#D6CBBE] h-screen sticky top-0 hidden md:block"
      >
        <nav class="p-4 space-y-1">
          <router-link
            to="/adm"
            class="flex items-center space-x-3 px-4 py-3 bg-[#F3E9DC] text-[#A47551] rounded-md font-medium"
          >
            <icon name="mdi:view-dashboard" />
            <span>Dashboard</span>
          </router-link>

          <router-link
            to="/adm/au-pairs"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:account-supervisor" />
            <span>Au Pairs</span>
          </router-link>

          <router-link
            to="/adm/families"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:home-heart" />
            <span>Families</span>
          </router-link>

          <router-link
            to="/adm/matches"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:handshake" />
            <span>Matches</span>
          </router-link>

          <router-link
            to="/adm/education"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:school" />
            <span>Education Programs</span>
          </router-link>

          <router-link
            to="/adm/support"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:face-agent" />
            <span>Cultural Support</span>
          </router-link>

          <router-link
            to="/adm/reports"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:chart-box" />
            <span>Reports</span>
          </router-link>

          <router-link
            to="/adm/settings"
            class="flex items-center space-x-3 px-4 py-3 text-[#6E5841] hover:bg-[#F3E9DC] hover:text-[#A47551] rounded-md"
          >
            <icon name="mdi:cog" />
            <span>Settings</span>
          </router-link>
        </nav>

        <!-- Cultural Motif -->
        <div class="absolute bottom-4 left-0 right-0 text-center">
          <icon name="mdi:swirl" class="text-[#A47551] mx-auto w-10 h-10" />
        </div>
      </aside>

      <!-- Mobile Bottom Navigation -->
      <div
        class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6CBBE] flex justify-around py-3 z-20"
      >
        <router-link
          to="/adm"
          class="flex flex-col items-center text-[#A47551]"
        >
          <icon name="mdi:view-dashboard" class="text-xl" />
          <span class="text-xs mt-1">Home</span>
        </router-link>
        <router-link
          to="/adm/au-pairs"
          class="flex flex-col items-center text-[#6E5841]"
        >
          <icon name="mdi:account-supervisor" class="text-xl" />
          <span class="text-xs mt-1">Au Pairs</span>
        </router-link>
        <router-link
          to="/adm/families"
          class="flex flex-col items-center text-[#6E5841]"
        >
          <icon name="mdi:home-heart" class="text-xl" />
          <span class="text-xs mt-1">Families</span>
        </router-link>
        <router-link
          to="/adm/settings"
          class="flex flex-col items-center text-[#6E5841]"
        >
          <icon name="mdi:cog" class="text-xl" />
          <span class="text-xs mt-1">Settings</span>
        </router-link>
      </div>
</template>