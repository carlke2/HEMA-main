<template>
  <div class="min-h-screen bg-gray-100 flex overflow-hidden">
    <AppSidebar />
    <main class="w-full p-6 overflow-auto h-screen text-black">
      <SettingsHeader />
      <div class="space-y-12">
        <h2 class="text-2xl font-semibold leading-7 text-gray-900">
          Profile Settings
        </h2>
        <p class="max-w-2xl text-sm leading-6 text-gray-800">
          Manage your profile information, preferences, and account settings.
        </p>
      </div>
      <!-- Profile Form -->
      <div class="mt-8">
        <!-- Add your profile form components here -->
      </div>
      Profile
    </main>
  </div>
</template>
<script setup>
definePageMeta({
  middleware: ["admin-dashboard"],
});
</script>
