<template>
  <div class="fixed bottom-4 right-4 hidden md:block">
    <div class="sticky bottom-0 z-30 w-fit">
      <!-- Chat Box (shown when AI is active) -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div v-if="aiOpen" class="ml-4 mb-3">
          <div
            class="w-80 h-96 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
          >
            <!-- Chat Header -->
            <div
              class="bg-[#05FF88] p-3 text-black font-semibold flex justify-between items-center"
            >
              <img
                  src="/assets/images/logo-f.png"
                  class="w-auto h-8"
                />
               
              <button
                @click="aiOpen = false"
                class="text-black hover:text-gray-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Chat Messages -->
            <div
              ref="messagesContainer"
              class="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-2 text-black text-sm"
              style="scrollbar-width: thin"
            >
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`"
              >
                <div
                  :class="`max-w-xs p-3 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-[#05FF88] text-black'
                      : 'bg-white border border-gray-400'
                  }`"
                >
                  {{ message.text }}
                </div>
              </div>
              <div v-if="loading" class="flex justify-start">
                <div
                  class="bg-white border border-gray-400 p-3 rounded-xl max-w-xs"
                >
                  <div class="flex space-x-2">
                    <div
                      class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    ></div>
                    <div
                      class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style="animation-delay: 0.2s"
                    ></div>
                    <div
                      class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style="animation-delay: 0.4s"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="p-3 border-t border-gray-200 bg-white text-black">
              <form @submit.prevent="sendMessage" class="flex space-x-2">
                <input
                  v-model="userInput"
                  type="text"
                  placeholder="Ask about Hema..."
                  class="flex-1 px-3 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#05FF88] focus:border-transparent"
                />
                <button
                  type="submit"
                  class="px-4 py-2 bg-[#05FF88] text-black rounded-xl hover:bg-[#05FF887D] transition-colors"
                  :disabled="loading"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </transition>

      <!-- Social Icons (shown when main button is open) -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div v-if="open && !aiOpen" class="ml-4 flex flex-col gap-y-3 mb-3">
          <!-- WhatsApp -->
          <a
            href="https://api.whatsapp.com/send/?phone=+254700640011&text=Hi&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            title="WhatsApp"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.785"
              />
            </svg>
          </a>

          <!-- Email -->
          <a
            href="mailto:easter@theplaygroup.net"
            class="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            title="Email"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>

          <!-- AI Chat -->
          <button
            @click="openAiChat"
            class="w-12 h-12 bg-[#0000FE] hover:bg-[#0000FE7D] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
            title="AI Assistant"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </button>
        </div>
      </transition>

      <!-- Toggle Button -->
      <button
        @click="toggleChat"
        class="w-14 h-14 bg-[#05FF88] hover:bg-[#05FF887D] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#05FF882D]"
        :title="open ? 'Close chat' : 'Open chat'"
      >
        <svg
          v-if="!open"
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <svg
          v-else
          class="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";

const open = ref(false);
const aiOpen = ref(false);
const userInput = ref("");
const loading = ref(false);
const messages = ref([
  {
    text: "Hello! I'm Hema's AI assistant. How can I help you today?",
    sender: "ai",
  },
]);
const messagesContainer = ref(null);

const toggleChat = () => {
  open.value = !open.value;
  // Close AI chat when main button is closed
  if (!open.value) {
    aiOpen.value = false;
  }
};

const openAiChat = () => {
  aiOpen.value = true;
  // Close the social icons when AI chat opens
  open.value = false;
};

const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  // Add user message
  messages.value.push({
    text: userInput.value,
    sender: "user",
  });

  const userQuestion = userInput.value;
  userInput.value = "";
  loading.value = true;

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  try {
    // Here you would call your DeepSeek API
    // This is a mock response - replace with actual API call
    const response = await mockDeepSeekApiCall(userQuestion);

    // Add AI response
    messages.value.push({
      text: response,
      sender: "ai",
    });
  } catch (error) {
    messages.value.push({
      text: "Sorry, I'm having trouble connecting. Please try again later.",
      sender: "ai",
    });
  } finally {
    loading.value = false;
    await nextTick();
    scrollToBottom();
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Mock API call - replace with actual DeepSeek API integration
const mockDeepSeekApiCall = (question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is a simple mock - you would replace with real API logic
      const lowerQuestion = question.toLowerCase();
      if (lowerQuestion.includes("hema") || lowerQuestion.includes("about")) {
        resolve(
          "Hema is a leading healthcare provider specializing in innovative solutions. We offer a range of services designed to improve patient outcomes."
        );
      } else if (
        lowerQuestion.includes("service") ||
        lowerQuestion.includes("offer")
      ) {
        resolve(
          "Hema provides comprehensive healthcare services including diagnostics, treatment plans, and personalized care programs."
        );
      } else if (
        lowerQuestion.includes("contact") ||
        lowerQuestion.includes("reach")
      ) {
        resolve(
          "You can contact Hema through our website, email at info@hema.com, or by phone at +1234567890."
        );
      } else {
        resolve(
          "I'm here to help with information about Hema. Could you please clarify your question?"
        );
      }
    }, 1000);
  });
};

// Auto-scroll when messages change
watch(
  messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>

<style scoped>
/* Smooth scrolling for messages */
.overflow-y-auto {
  scroll-behavior: smooth;
}
</style>
