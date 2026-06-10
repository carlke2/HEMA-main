<template>
  <header
    class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center"
  >
    <div class="flex items-center space-x-2">
      <div class="font-bold text-xl flex items-center space-x-1">
       <img src="/assets/images/logo-f.png" alt="Family" class="w-auto h-10" />
       </div>
    </div>

    <div class="flex items-center space-x-4">
      <button class="text-gray-700 hover:text-[#0000FE]">
        <Icon name="mdi:bell-outline" class="text-xl text-gray-900" />
      </button>
      <div class="relative">
        <button
          @click="showProfileMenu = !showProfileMenu"
          class="flex items-center space-x-2"
        >
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Family"
            class="w-8 h-8 rounded-full object-cover"
          />
          <img
            v-else
            src="/assets/images/abstract-user.png"
            alt="Family"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span class="text-sm font-medium hidden md:inline">{{
            user.fullName || "Name not found"
          }}</span>
        </button>
        <transition name="fade">
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 py-1"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >Family Profile</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >Settings</a
            >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
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

const family = ref({
  name: "The Johnson Family",
  photo:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  location: "London, UK",
  tribe: "Yoruba",
  languages: ["English", "Yoruba"],
});

const logout = async () => {
  showProfileMenu.value = false;
  await clear();
  await navigateTo("/auth/sign-in");
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
