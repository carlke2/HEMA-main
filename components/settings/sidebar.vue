<template>
  <!-- Mobile menu button -->
  <div class="lg:hidden fixed top-4 left-4 z-50">
    <button
      @click="isMobileMenuOpen = !isMobileMenuOpen"
      class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <!-- Overlay -->
  <div
    v-if="isMobileMenuOpen"
    @click="isMobileMenuOpen = false"
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
  ></div>

  <!-- Sidebar -->
  <div
    class="fixed lg:relative flex h-screen w-3/4 lg:w-1/3 flex-col justify-between border-e border-gray-100 bg-white z-40 transition-all duration-300 ease-in-out"
    :class="{
      'left-0': isMobileMenuOpen,
      '-left-full': !isMobileMenuOpen,
      'lg:left-0': true
    }"
  >
    <!-- Close button -->
    <div class="lg:hidden absolute top-4 right-4">
      <button
        @click="isMobileMenuOpen = false"
        class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Logo -->
    <div class="px-4 py-6">
      <div class="flex justify-left">
        <img src="/assets/images/logo-f.png" alt="Hema Logo" class="h-10 w-auto" />
      </div>

      <!-- Navigation -->
      <ul class="mt-6 space-y-1">
        <!-- Profile Overview -->
        <li>
          <NuxtLink
            to="/app/settings/profile"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/settings/profile',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700': $route.path !== '/app/settings/profile',
            }"
          >
            My Profile
          </NuxtLink>
        </li>

        <!-- Document Upload -->
        <li>
          <NuxtLink
            to="/app/settings/documents"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/settings/documents',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700': $route.path !== '/app/settings/documents',
            }"
          >
            My Documents
          </NuxtLink>
        </li>

        <!-- Job Preferences -->
        <li>
          <NuxtLink
            to="/app/settings/preferences"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/settings/preferences',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700': $route.path !== '/app/settings/preferences',
            }"
          >
            Job Preferences
          </NuxtLink>
        </li>

        <!-- Support -->
        <li>
          <NuxtLink
            to="/app/settings/support"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/settings/support',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700': $route.path !== '/app/settings/support',
            }"
          >
            Help & Support
          </NuxtLink>
        </li>

        <!-- Logout -->
        <li>
          <NuxtLink
            to="/logout"
            class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Logout
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- User Info -->
    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <NuxtLink to="/app/settings/profile" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
        <img
          alt="User Profile"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          class="size-10 rounded-full object-cover"
        />
        <div>
          <p class="text-xs text-black">
            <strong class="block font-medium">Wayne G.</strong>
            <span>wayne@hema.org</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
};
</script>
