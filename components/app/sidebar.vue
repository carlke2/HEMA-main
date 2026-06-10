<template>
  <!-- Mobile menu button (only visible on mobile) -->
  <div class="lg:hidden fixed top-4 left-4 z-50">
    <button
      @click="toggleMobileMenu"
      class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>

  <!-- Overlay (only visible when mobile menu is open) -->
  <div
    v-if="isMobileMenuOpen"
    @click="closeMobileMenu"
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
  ></div>

  <!-- Sidebar -->
  <div
    ref="sidebar"
    class="fixed lg:relative flex h-screen w-3/4 lg:w-1/5 flex-col justify-between border-e border-gray-100 bg-white z-40 transition-all duration-300 ease-in-out"
    :class="{
      'left-0': isMobileMenuOpen,
      '-left-full': !isMobileMenuOpen,
      'lg:left-0': true,
    }"
  >
    <!-- Close button for mobile -->
    <div class="lg:hidden absolute top-4 right-4">
      <button
        @click="closeMobileMenu"
        class="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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

    <!-- Logo -->
    <div class="px-4 py-6">
      <div class="flex justify-left">
        <img
          src="/assets/images/logo-f.png"
          alt="Hema Logo"
          class="h-10 w-auto"
        />
      </div>

      <!-- Navigation -->
      <ul class="mt-6 space-y-1">
        <!-- Dashboard -->
        <li v-if="user.userType == 'jobSeeker'">
          <NuxtLink
            to="/app"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/dashboard',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/app/dashboard',
            }"
            @click="closeMobileMenu"
          >
            Dashboard
          </NuxtLink>
        </li>

        <!-- Job Matching -->
        <li v-if="user.userType == 'jobSeeker'">
          <NuxtLink
            to="/app/job-matching"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/job-matching',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/app/job-matching',
            }"
            @click="closeMobileMenu"
          >
            Job Matching
          </NuxtLink>
        </li>

        <!-- Document Verification -->
        <li v-if="user.userType == 'jobSeeker'">
          <NuxtLink
            to="/app/document-verification"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/app/document-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/app/document-verification',
            }"
            @click="closeMobileMenu"
          >
            Document Verification
          </NuxtLink>
        </li>

        <!-- Migration Support -->
        <li v-if="user.userType == 'jobSeeker'">
          <NuxtLink
            to="/app/migration-support"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/app/migration-support',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/app/migration-support',
            }"
            @click="closeMobileMenu"
          >
            Migration Support
          </NuxtLink>
        </li>

        <!-- Employer Management -->
        <li v-if="user.userType == 'jobSeeker'">
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium">Jobs</span>
              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <NuxtLink
                  to="/app/applied-jobs"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/app/applied-jobs',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/app/applied-jobs',
                  }"
                  @click="closeMobileMenu"
                >
                  Applied Jobs
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/app/contract"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/app/contract',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/app/contract',
                  }"
                  @click="closeMobileMenu"
                >
                  Contract
                </NuxtLink>
              </li>
            </ul>
          </details>
        </li>

        <!-- Employer-Dashboard -->
        <li v-if="user.userType == 'agencyUser'">
          <NuxtLink
            to="/agency"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/agency',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/agency',
            }"
            @click="closeMobileMenu"
          >
            Agency Dashboard
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'agencyUser'">
          <NuxtLink
            to="/agency/contracts"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/agency/contracts',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/agency/contracts',
            }"
            @click="closeMobileMenu"
          >
            Contracts
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'agencyUser'">
          <NuxtLink
            to="/agency/jobs-posted"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/agency/jobs-posted',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/agency/jobs-posted',
            }"
            @click="closeMobileMenu"
          >
            Jobs Posted
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'agencyUser'">
          <NuxtLink
            to="/agency/agency-users"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/agency/agency-users',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/agency/agency-users',
            }"
            @click="closeMobileMenu"
          >
            Agency Users
          </NuxtLink>
        </li>

        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin',
            }"
            @click="closeMobileMenu"
          >
            Admin
          </NuxtLink>
        </li>

        <li v-if="user.userType == 'Admin'">
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium">User Management</span>
              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <NuxtLink
                  to="/admin/job-seekers"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/admin/job-seekers',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/admin/job-seekers',
                  }"
                  @click="closeMobileMenu"
                >
                  Job Seekers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/admin/agencies"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/admin/agencies',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/admin/agencies',
                  }"
                  @click="closeMobileMenu"
                >
                  Agencies
                </NuxtLink>
              </li>
            </ul>
          </details>
        </li>

        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/jobs"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin/jobs',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/jobs',
            }"
            @click="closeMobileMenu"
          >
            Jobs
          </NuxtLink>
        </li>

        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/applications"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/applications',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/applications',
            }"
            @click="closeMobileMenu"
          >
            Applications
          </NuxtLink>
        </li>

        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/agency-verification"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            Agency Verification
          </NuxtLink>
        </li>

        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/au-pair"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            Au-pairs Admin Dashboard
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'Admin'">
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium">Au-Pairs User Management</span>
              <span
                class="shrink-0 transition duration-300 group-open:-rotate-180"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="mt-2 space-y-1 px-4">
              <li>
                <NuxtLink
                  to="/admin/au-pair/au-pairs"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/admin/job-seekers',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/admin/job-seekers',
                  }"
                  @click="closeMobileMenu"
                >
                  Au-Pairs
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/admin/au-pair/families"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/admin/agencies',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/admin/agencies',
                  }"
                  @click="closeMobileMenu"
                >
                  Families
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/admin/au-pair/trainings"
                  class="block rounded-lg px-4 py-2 text-sm font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700':
                      $route.path === '/admin/au-pair/trainings',
                    'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                      $route.path !== '/admin/au-pair/trainings',
                  }"
                  @click="closeMobileMenu"
                >
                  Trainings
                </NuxtLink>
              </li>
            </ul>
          </details>
        </li>
        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/au-pair/matches"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            Matches
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/au-pair/education"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            Education
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/au-pair/settings"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            settings
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/au-pair/support"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700':
                $route.path === '/admin/agency-verification',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/agency-verification',
            }"
            @click="closeMobileMenu"
          >
            Support
          </NuxtLink>
        </li>
        <!-- <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/messages"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin/messages',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/messages',
            }"
            @click="closeMobileMenu"
          >
            Messages
          </NuxtLink>
        </li> -->

        <!-- <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/reports"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin/reports',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/reports',
            }"
            @click="closeMobileMenu"
          >
            Reports
          </NuxtLink>
        </li> -->

        <!-- <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/settings"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin/settings',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/settings',
            }"
            @click="closeMobileMenu"
          >
            Settings
          </NuxtLink>
        </li> -->
        <li v-if="user.userType == 'Admin'">
          <NuxtLink
            to="/admin/files"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/admin/files',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/admin/files',
            }"
            @click="closeMobileMenu"
          >
            Files
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'jobSeeker'">
          <NuxtLink
            to="/app/files"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/app/files',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/app/files',
            }"
            @click="closeMobileMenu"
          >
            Files
          </NuxtLink>
        </li>
        <li v-if="user.userType == 'agencyUser'">
          <NuxtLink
            to="/agency/files"
            class="block rounded-lg px-4 py-2 text-sm font-medium"
            :class="{
              'bg-gray-100 text-gray-700': $route.path === '/agency/files',
              'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                $route.path !== '/agency/files',
            }"
            @click="closeMobileMenu"
          >
            Files
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- User Info with Settings Dropdown -->
    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <details class="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          <div class="flex items-center gap-2">
            <img
              v-if="!user.avatar"
              alt="abstract user"
              src="/assets/images/abstract-user.png"
              class="size-10 rounded-full object-cover"
            />
            <img
              v-else
              alt="User Profile"
              :src="user.avatar"
              class="size-10 rounded-full object-cover"
            />
            <div>
              <p class="text-xs text-black">
                <strong class="block font-medium">{{ user.fullName }}</strong>
                <span> {{ user.email }} </span>
              </p>
            </div>
          </div>
          <span class="shrink-0 transition duration-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <ul class="mt-2 space-y-1 px-4 pb-4">
          <li>
            <NuxtLink
              :to="
                user.userType === 'agencyUser'
                  ? '/agency/settings/profile'
                  : user.userType === 'jobSeeker'
                  ? '/app/settings/profile'
                  : '/admin/settings/profile'
              "
              class="block rounded-lg px-4 py-2 text-sm font-medium"
              :class="{
                'bg-gray-100 text-gray-700':
                  $route.path === '/app/settings/profile',
                'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                  $route.path !== '/app/settings/profile',
              }"
              @click="closeMobileMenu"
            >
              Profile
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="
                user.userType === 'agencyUser'
                  ? '/agency/settings/security'
                  : user.userType === 'jobSeeker'
                  ? '/app/settings/security'
                  : '/admin/settings/security'
              "
              class="block rounded-lg px-4 py-2 text-sm font-medium"
              :class="{
                'bg-gray-100 text-gray-700':
                  $route.path === '/app/settings/security',
                'text-gray-500 hover:bg-gray-100 hover:text-gray-700':
                  $route.path !== '/app/settings/security',
              }"
              @click="closeMobileMenu"
            >
              Security
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              @click="logout"
              class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              Logout
            </NuxtLink>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup>
const { clear, fetch, user } = useUserSession();
const router = useRouter();
const isMobileMenuOpen = ref(false);

fetch();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const logout = () => {
  clear().then(() => {
    router.push("/auth/sign-in");
  });
};
</script>
