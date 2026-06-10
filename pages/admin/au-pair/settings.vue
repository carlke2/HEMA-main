<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col lg:flex-row overflow-hidden"
  >
    <AppSidebar />

    <main class="flex-1 p-6 pb-20 md:pb-6">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900 flex items-center">
          <icon name="mdi:cog" class="text-blue-600 mr-2" />
          System Settings
        </h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
          <icon name="mdi:content-save" class="mr-1" /> Save Changes
        </button>
      </div>

      <!-- Settings Tabs -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div class="flex border-b border-gray-200 overflow-x-auto">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="activeTab = tab.id"
            :class="{
              'text-blue-600 border-b-2 border-blue-600': activeTab === tab.id,
              'text-gray-700 hover:text-blue-600': activeTab !== tab.id
            }"
            class="px-4 py-3 font-medium text-sm focus:outline-none whitespace-nowrap"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="p-6">
          <div class="max-w-3xl space-y-6">
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">Platform Information</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Platform Name</label>
                  <input 
                    type="text" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    value="Hema CultureMatch"
                  >
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Admin Email</label>
                  <input 
                    type="email" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    value="admin@hemaculturematch.com"
                  >
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">Platform Logo</label>
                  <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center">
                      <icon name="mdi:image" class="text-2xl text-blue-600" />
                    </div>
                    <button class="text-blue-600 text-sm font-medium hover:underline">
                      Upload New Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">System Preferences</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Maintenance Mode</label>
                    <p class="text-xs text-gray-600">Temporarily disable public access to the platform</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">User Registration</label>
                    <p class="text-xs text-gray-600">Allow new users to register accounts</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Email Notifications</label>
                    <p class="text-xs text-gray-600">Send email notifications to users</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- User Management -->
        <div v-if="activeTab === 'users'" class="p-6">
          <div class="max-w-3xl space-y-6">
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">Admin Users</h3>
              <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h4 class="font-medium text-gray-900">Current Administrators</h4>
                  <button class="text-blue-600 text-sm font-medium hover:underline">
                    Add Admin
                  </button>
                </div>
                <div class="divide-y divide-gray-200">
                  <div v-for="(admin, index) in adminUsers" :key="index" class="p-4 flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                      <img :src="admin.photo" :alt="admin.name" class="w-10 h-10 rounded-full object-cover">
                      <div>
                        <div class="font-medium text-gray-900">{{ admin.name }}</div>
                        <div class="text-xs text-gray-600">{{ admin.email }}</div>
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button class="text-blue-600 hover:text-blue-800">
                        <icon name="mdi:pencil" />
                      </button>
                      <button class="text-red-600 hover:text-red-800">
                        <icon name="mdi:trash-can" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">User Permissions</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Profile Verification</label>
                    <p class="text-xs text-gray-600">Require admin approval for new profiles</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">Self-Matching</label>
                    <p class="text-xs text-gray-600">Allow users to initiate matches without admin</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Email Templates -->
        <div v-if="activeTab === 'email'" class="p-6">
          <div class="max-w-3xl space-y-6">
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">Email Configuration</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-700 mb-1">SMTP Host</label>
                  <input 
                    type="text" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    value="smtp.hemaculturematch.com"
                  >
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">SMTP Username</label>
                    <input 
                      type="text" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                      value="admin@hemaculturematch.com"
                    >
                  </div>
                  <div>
                    <label class="block text-sm text-gray-700 mb-1">SMTP Password</label>
                    <input 
                      type="password" 
                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="••••••••"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm text-gray-700 mb-1">From Email</label>
                  <input 
                    type="email" 
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" 
                    value="noreply@hemaculturematch.com"
                  >
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">Email Templates</h3>
              <div class="space-y-3">
                <div v-for="(template, index) in emailTemplates" :key="index" class="border border-gray-200 rounded-md p-3 hover:bg-blue-50 transition">
                  <div class="flex justify-between items-center mb-1">
                    <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
                    <button class="text-blue-600 text-sm font-medium hover:underline">
                      Edit Template
                    </button>
                  </div>
                  <p class="text-xs text-gray-600">Trigger: {{ template.trigger }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Backup & Restore -->
        <div v-if="activeTab === 'backup'" class="p-6">
          <div class="max-w-3xl space-y-6">
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">System Backup</h3>
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-3">
                  <div>
                    <div class="font-bold text-blue-600">Last Backup</div>
                    <div class="text-sm text-gray-600">Jul 15, 2023 at 02:00 AM</div>
                  </div>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Create Backup Now
                  </button>
                </div>
                <div class="text-xs text-gray-600">
                  <p class="mb-1">Next scheduled backup: Today at 02:00 AM</p>
                  <p>Backups are stored securely for 30 days</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="font-medium text-lg text-gray-900 mb-3">Restore From Backup</h3>
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="mb-3">
                  <label class="block text-sm text-gray-700 mb-1">Select Backup</label>
                  <select class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option>Jul 15, 2023 - Full System Backup</option>
                    <option>Jul 8, 2023 - Full System Backup</option>
                    <option>Jul 1, 2023 - Full System Backup</option>
                    <option>Jun 24, 2023 - Full System Backup</option>
                  </select>
                </div>
                <button class="w-full bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition">
                  Restore Selected Backup
                </button>
                <p class="text-xs text-gray-600 mt-2">Warning: Restoring will overwrite current data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activeTab = ref('general');

const tabs = ref([
  { id: 'general', label: 'General Settings' },
  { id: 'users', label: 'User Management' },
  { id: 'email', label: 'Email Templates' },
  { id: 'backup', label: 'Backup & Restore' },
  { id: 'api', label: 'API Settings' },
  { id: 'advanced', label: 'Advanced' }
]);

const adminUsers = ref([
  {
    name: "Admin User",
    email: "admin@hemaculturematch.com",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Support Manager",
    email: "support@hemaculturematch.com",
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Technical Admin",
    email: "tech@hemaculturematch.com",
    photo: "https://randomuser.me/api/portraits/men/22.jpg"
  }
]);

const emailTemplates = ref([
  {
    name: "Welcome Email",
    trigger: "New user registration"
  },
  {
    name: "Profile Verification",
    trigger: "Profile approved/rejected"
  },
  {
    name: "Match Notification",
    trigger: "New match created"
  },
  {
    name: "Password Reset",
    trigger: "User requests password reset"
  },
  {
    name: "Contract Reminder",
    trigger: "Contract nearing end date"
  }
]);
</script>