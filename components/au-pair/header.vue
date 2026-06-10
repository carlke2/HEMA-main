<template>
  <header
    class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10"
  >
    <div class="flex items-center space-x-2">
      <a
        href="/dashboard"
        class="font-bold text-xl flex items-center space-x-1"
      >
        <img
          src="/assets/images/logo-f.png"
          alt="Logo"
          class="w-auto h-10 object-cover"
        />
      </a>
    </div>

    <div class="flex items-center space-x-4">
      <button class="text-gray-700 hover:text-[#0000FE] transition">
        <icon name="mdi:bell-outline" class="text-xl" />
      </button>
      <div class="relative">
        <button
          @click="showProfileMenu = !showProfileMenu"
          class="flex items-center space-x-2 group"
        >
          <img
            :src="
              user.avatar ||
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
            "
            alt="Profile"
            class="w-8 h-8 rounded-full object-cover border-2 border-gray-200 group-hover:border-[#0000FE] transition"
          />
          <span
            class="text-sm font-medium hidden md:inline text-gray-700 group-hover:text-[#0000FE] transition"
            >{{ user.fullName }}</span
          >
        </button>
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 py-1"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >Profile</router-link
            >
            <router-link
              to="/settings"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >Settings</router-link
            >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-[#0000FE] hover:bg-blue-50 transition"
            >
              Sign Out
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const { clear, fetch, user } = useUserSession();

const showProfileMenu = ref(false);

const logout = async () => {
  showProfileMenu.value = false;
  await clear();
  await navigateTo("/au-pair/auth/sign-in");
};
</script>
