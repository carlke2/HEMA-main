<template>
  <!-- Sidebar Navigation -->
  <aside
    class="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 hidden md:block"
  >
    <nav class="p-4 space-y-1">
      <router-link
        to="/au-pair/dashboard"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard',
        }"
      >
        <icon name="mdi:view-dashboard" />
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/profile"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/profile',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/profile',
        }"
      >
        <icon name="mdi:account-edit" />
        <span>My Profile</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/onboarding"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/onboarding',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/onboarding',
        }"
      >
        <icon name="mdi:clipboard-check" />
        <span>Verification steps</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/education"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/education',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/education',
        }"
      >
        <icon name="mdi:school" />
        <span>Education Path</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/interested-families"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/interested-families',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/interested-families',
        }"
      >
        <icon name="mdi:heart-outline" />
        <span>Families interested</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/contracts"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/contracts',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/contracts',
        }"
      >
        <icon name="mdi:home-search" />
        <span>Contracts</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/family"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/family',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/family',
        }"
      >
        <icon name="mdi:home-heart" />
        <span>My Host Family</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/notifications"
        class="flex items-center space-x-3 px-4 py-3 transition relative"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/notifications',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/notifications',
        }"
      >
        <icon name="mdi:bell-outline" />
        <span>Notifications</span>
        <span
          v-if="unreadNotificationCount > 0"
          class="min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center rounded-full text-xs font-bold bg-red-500 text-white"
        >
          {{ unreadNotificationCount > 99 ? "99+" : unreadNotificationCount }}
        </span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/community"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/community',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/community',
        }"
      >
        <icon name="mdi:account-group" />
        <span>Country Circle</span>
      </router-link>

      <router-link
        to="/au-pair/dashboard/culture"
        class="flex items-center space-x-3 px-4 py-3 transition"
        :class="{
          'bg-[#0000FE] text-white rounded-md font-medium':
            $route.path === '/au-pair/dashboard/culture',
          'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md':
            $route.path !== '/au-pair/dashboard/culture',
        }"
      >
        <icon name="mdi:face-agent" />
        <span>Cultural Support</span>
      </router-link>
    </nav>

    <!-- Cultural Motif -->
    <div class="absolute bottom-4 left-0 right-0 text-center">
      <icon name="mdi:swirl" class="text-green-600 mx-auto w-10 h-10" />
    </div>
  </aside>

  <!-- Mobile Bottom Navigation -->
  <div
    class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-20"
  >
    <router-link
      to="/au-pair/dashboard"
      class="flex flex-col items-center transition"
      :class="
        $route.path === '/au-pair/dashboard'
          ? 'text-[#0000FE]'
          : 'text-gray-700'
      "
    >
      <icon name="mdi:view-dashboard" class="text-xl" />
      <span class="text-xs mt-1">Home</span>
    </router-link>
    <router-link
      to="/au-pair/dashboard/education"
      class="flex flex-col items-center transition"
      :class="
        $route.path === '/au-pair/dashboard/education'
          ? 'text-[#0000FE]'
          : 'text-gray-700'
      "
    >
      <icon name="mdi:school" class="text-xl" />
      <span class="text-xs mt-1">Education</span>
    </router-link>
    <router-link
      to="/au-pair/dashboard/family"
      class="flex flex-col items-center transition"
      :class="
        $route.path === '/au-pair/dashboard/family'
          ? 'text-[#0000FE]'
          : 'text-gray-700'
      "
    >
      <icon name="mdi:home-heart" class="text-xl" />
      <span class="text-xs mt-1">Family</span>
    </router-link>
    <router-link
      to="/au-pair/dashboard/community"
      class="flex flex-col items-center transition"
      :class="
        $route.path === '/au-pair/dashboard/community'
          ? 'text-[#0000FE]'
          : 'text-gray-700'
      "
    >
      <icon name="mdi:account-group" class="text-xl" />
      <span class="text-xs mt-1">Community</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const unreadNotificationCount = ref(0);

async function fetchUnreadCount() {
  try {
    const data = await $fetch<{ unreadCount?: number }>("/api/v1/aupair/notifications?countOnly=true");
    unreadNotificationCount.value = data?.unreadCount ?? 0;
  } catch {
    unreadNotificationCount.value = 0;
  }
}

onMounted(fetchUnreadCount);
</script>
