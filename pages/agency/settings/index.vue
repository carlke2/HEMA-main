<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />
    <main class="w-full p-4 lg:p-6 overflow-auto h-screen text-black">
      Settings Page
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["agency-dashboard"],
});
</script>
