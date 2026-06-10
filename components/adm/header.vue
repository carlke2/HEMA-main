<template>
  <header
    class="bg-white border-b border-[#D6CBBE] px-6 py-4 flex justify-between items-center"
  >
    <div class="flex items-center space-x-2">
      <div class="font-bold text-xl flex items-center space-x-1">
        <span class="text-[#3B2F2F]">H</span>
        <span class="text-[#A47551]">A</span>
      </div>
      <span class="text-sm font-medium text-[#6E5841] hidden md:inline"
        >Admin Dashboard</span
      >
    </div>

    <div class="flex items-center space-x-4">
      <button class="text-[#6E5841] hover:text-[#A47551] relative">
        <icon name="mdi:bell-outline" class="text-xl" />
        <span
          class="absolute -top-1 -right-1 bg-[#A47551] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
          >3</span
        >
      </button>
      <div class="relative">
        <button
          @click="showProfileMenu = !showProfileMenu"
          class="flex items-center space-x-2"
        >
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            alt="Admin"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span class="text-sm font-medium hidden md:inline">Admin User</span>
        </button>
        <transition name="fade">
          <div
            v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-[#D6CBBE] z-10 py-1"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-[#6E5841] hover:bg-[#F3E9DC]"
              >Admin Profile</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-[#6E5841] hover:bg-[#F3E9DC]"
              >System Settings</a
            >
            <button
              @click="signOut"
              class="w-full text-left px-4 py-2 text-sm text-[#6E5841] hover:bg-[#F3E9DC]"
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

const showProfileMenu = ref(false);
const handleAction = (action) => {
  console.log("Action:", action.action);
  // Implement action logic here
};

const signOut = () => {
  console.log("Admin signing out");
  // router.push('/admin/login');
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
