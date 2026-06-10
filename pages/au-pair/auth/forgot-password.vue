<template>
  <section class="min-h-screen bg-[#F9F5F0] text-[#3B2F2F] font-sans py-12 px-6 md:px-16">
    <!-- Header Logo -->
    <div class="flex justify-center mb-8">
      <div class="flex items-center space-x-2">
        <div class="font-bold text-2xl flex items-center space-x-1">
          <span class="text-[#3B2F2F]">H</span>
          <span class="text-[#A47551]">A</span>
        </div>
        <span class="text-lg font-medium text-[#6E5841]">Hema CultureMatch</span>
      </div>
    </div>

    <!-- Password Reset Card -->
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-[#D6CBBE]">
      <div class="text-center mb-6">
        <div class="bg-[#F3E9DC] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <icon name="mdi:lock-reset" class="text-[#A47551] text-2xl" />
        </div>
        <h2 class="text-2xl font-bold mb-2">Reset Your Password</h2>
        <p class="text-sm text-[#6E5841]">
          Enter your email to receive a link to reset your password
        </p>
      </div>
      
      <!-- Email Form -->
      <form @submit.prevent="handleResetRequest" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-[#6E5841] mb-1">Email Address</label>
          <input 
            type="email" 
            v-model="email"
            placeholder="your@email.com"
            class="w-full px-4 py-2 border border-[#D6CBBE] rounded-md focus:ring-[#A47551] focus:border-[#A47551]" 
            required
          />
        </div>

        <div class="pt-2">
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#A47551] text-white py-2 rounded-md font-medium hover:bg-[#8C6243] transition flex items-center justify-center"
          >
            <Icon v-if="isLoading" name="mdi:loading" class="animate-spin mr-2" />
            <span v-else>Send Reset Link</span>
          </button>
        </div>
      </form>

      <!-- Back to Login -->
      <div class="mt-6 text-center">
        <a 
          href="/signin" 
          class="text-sm text-[#A47551] font-medium hover:underline flex items-center justify-center"
        >
          <icon name="mdi:arrow-left" class="mr-1" />
          Back to Sign In
        </a>
      </div>
    </div>

    <!-- Cultural Motif & Status Message -->
    <div class="text-center mt-8">
      <transition name="fade">
        <div 
          v-if="message"
          class="max-w-md mx-auto px-4 py-2 rounded-md mb-4"
          :class="{
            'bg-[#E8F5E9] text-[#2E7D32]': message.type === 'success',
            'bg-[#FFEBEE] text-[#C62828]': message.type === 'error'
          }"
        >
          {{ message.text }}
        </div>
      </transition>
      <icon name="mdi:swirl" class="w-12 h-12 mx-auto text-[#A47551]" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const email = ref('');
const isLoading = ref(false);
const message = ref(null);

const handleResetRequest = async () => {
  isLoading.value = true;
  message.value = null;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success state
    message.value = {
      type: 'success',
      text: `Reset link sent to ${email.value}. Check your inbox.`
    };
    email.value = '';
  } catch (error) {
    message.value = {
      type: 'error',
      text: 'No account found with this email. Try again.'
    };
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>