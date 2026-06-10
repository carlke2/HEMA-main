<template>
  <div class="w-full px-8 lg:pt-6 pt-12">
    <div class="w-full flex justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-900">Blogs</h1>
      <NuxtLink
        to="/admin/blogs/create"
        class="flex items-center py-2 bg-primaryColor text-white rounded-md px-4"
      >
        <icon name="ic:round-plus" class="h-5 w-5 mr-1.5" />
        <span>Create Blog</span>
      </NuxtLink>
    </div>
    <div class="mt-8">
      <div class="flex flex-col gap-4">
        <div
          v-if="loading"
          class="flex items-center justify-center h-32 bg-gray-100 rounded-md animate-pulse"
        >
          <div
            class="w-4 h-4 bg-gray-300 rounded-full animate-bounce mr-2"
          ></div>
          <div
            class="w-4 h-4 bg-gray-300 rounded-full animate-bounce mr-2"
          ></div>
          <div
            class="w-4 h-4 bg-gray-300 rounded-full animate-bounce mr-2"
          ></div>
        </div>
        <div v-else-if="!loading && blogs.length === 0">
          <div
            class="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50"
          >
            <div
              class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center"
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-muted"
              >
                <img
                  class="h-full w-full"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdGV4dCI+PHBhdGggZD0iTTE1IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3WiIvPjxwYXRoIGQ9Ik0xNCAydjRhMiAyIDAgMCAwIDIgMmg0Ii8+PHBhdGggZD0iTTEwIDlIOCIvPjxwYXRoIGQ9Ik0xNiAxM0g4Ii8+PHBhdGggZD0iTTE2IDE3SDgiLz48L3N2Zz4="
                />
              </div>
              <h2 class="mt-6 text-xl font-semibold">No posts created</h2>
              <p
                class="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground"
              >
                You don&apos;t have any posts yet. Start creating content.
              </p>
              <NuxtLink
                to="/admin/blogs/create"
                class="border border-input hover:border-primaryColor hover:text-primaryColor text-sm py-2 px-4 flex flex-row items-center gap-1 rounded"
              >
                <div
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </div>
                New Post
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-else-if="!loading && blogs.length > 0"
          class="grid grid-cols-4 gap-4"
        >
          <RouterLink
            v-for="blog in blogs"
            :key="blog.id"
            :to="`/admin/blogs/create?id=${blog.identifier}`"
            class="flex flex-col gap-2 bg-white/50 p-2 rounded-md shadow-md cursor-pointer justify-center"
          >
            <img
              class="h-32 w-auto object-cover"
              :src="blog.thumbnail"
              alt="Blog Thumbnail"
            />
            <div class="flex flex-col mt-auto">
              <h2 class="text-lg capitalize">{{ blog.title }}</h2>
              <h5>{{ blog.type }}</h5>
              <div class="flex flex-wrap">
                <p
                  class="text-xs bg-primaryColor text-white px-2 py-1 rounded-full mr-2 mt-2"
                  v-for="tag in blog.tags"
                >
                  {{ tag }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Blogs | Byzara",
  meta: [
    {
      name: "description",
      content: "Byzara Blogs",
    },
  ],
});

let loading = ref(false);
let blogs = ref<any>([]);
loading.value = true;

let getBlogs = async () => {
  let { data, error } = await useFetch("/api/blogs/all");
  loading.value = false;
  if (data.value) {
    blogs.value = data.value;
    console.log(blogs.value);
  }
  if (error.value) {
    console.error(error.value);
  }
};

getBlogs();
</script>
