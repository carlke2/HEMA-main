<template>
  <nav>
    <header class="absolute inset-x-0 top-0 z-50 bg-[#FFF8F1]">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1 items-center">
          <NuxtLink to="/" class="-m-1.5 p-1.5 flex items-center">
            <span class="sr-only">Hema</span>
            <img
              class="h-14 w-auto"
              src="/assets/images/logos/Logo-01.jpg"
              alt="Hema logo"
            />
          </NuxtLink>
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Icon
              name="flowbite:bars-outline"
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-center lg:gap-x-8">
          <NuxtLink
            to="/for-au-pairs"
            class="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            For Au Pairs
          </NuxtLink>
          <NuxtLink
            to="/for-families"
            class="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            For Families
          </NuxtLink>
          <NuxtLink
            to="/how-it-works"
            class="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            How It Works
          </NuxtLink>
          <NuxtLink
            to="/safety"
            class="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            Safety
          </NuxtLink>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
          <a
            href="/au-pair/auth/sign-in"
            class="text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            Log In
          </a>
          <a
            href="/au-pair/auth/sign-up"
            class="rounded-full bg-[#05FF88] px-4 py-2 text-sm font-semibold text-white hover:bg-[#04e677] transition-colors"
          >
            Sign Up
          </a>
        </div>
      </nav>

      <Dialog
        as="div"
        class="lg:hidden"
        @close="mobileMenuOpen = false"
        :open="mobileMenuOpen"
      >
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Hema</span>
              <img
                class="h-16 w-auto"
                src="/assets/images/logos/Logo-01.jpg"
                alt="Hema logo"
              />
            </NuxtLink>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <Icon
                name="material-symbols:close-rounded"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink
                  to="/for-au-pairs"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  @click="mobileMenuOpen = false"
                >
                  For Au Pairs
                </NuxtLink>
                <NuxtLink
                  to="/for-families"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  @click="mobileMenuOpen = false"
                >
                  For Families
                </NuxtLink>
                <NuxtLink
                  to="/how-it-works"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  @click="mobileMenuOpen = false"
                >
                  How It Works
                </NuxtLink>
                <NuxtLink
                  to="/safety"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  @click="mobileMenuOpen = false"
                >
                  Safety
                </NuxtLink>
              </div>
              <div class="py-6 space-y-2">
                <a
                  href="/au-pair/auth/sign-in"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log In
                </a>
                <a
                  href="/au-pair/auth/sign-up"
                  class="-mx-3 block rounded-full px-3 py-2.5 text-base font-semibold leading-7 bg-[#05FF88] text-white hover:bg-[#04e677]"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      mobileMenuOpen: false,
      navigation: [],
    };
  },
  methods: {
    // Add your component methods here
  },
};
</script>
