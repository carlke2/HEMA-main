<template>
  <LandingNav />
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <h2
          class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
        >
          From the blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Insights on ethical recruitment, worker safety, and workforce growth.
        </p>

        <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          <article
            v-for="post in blogs"
            :key="post.id"
            class="relative isolate flex flex-col gap-8 lg:flex-row"
          >
            <div
              class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
            >
              <img
                :src="post.thumbnail"
                alt=""
                class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
              />
            </div>

            <div>
              <div class="flex items-center gap-x-4 text-xs">
                <time :datetime="post.createdAt" class="text-gray-500">{{
                  post.createdAt
                }}</time>
                <div>
                  <a
                    v-for="tag in post.tags"
                    href="#"
                    class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {{ tag }}
                  </a>
                </div>
              </div>

              <div class="group relative max-w-xl">
                <h3
                  class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                >
                  <a :href="'/blogs/' + post.identifier">
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </a>
                </h3>
                <p class="mt-5 text-sm leading-6 text-gray-600">
                  {{ post.description }}
                </p>
              </div>

              <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                <div class="relative flex items-center gap-x-4">
                  <div class="text-sm leading-6">
                    <p class="font-semibold text-gray-900"></p>
                    <p class="text-gray-600">
                      {{ post.authorName || "Easter Pefuli" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <LandingFooter />
</template>

<script setup>
useHead({
  title: "Blogs | Hema",
  meta: [
    {
      name: "description",
      content: "Hema Blogs",
    },
  ],
});
// Fetch Job Seeker's shortlisted jobs Data
const { data: blogsData, error: blogsDataError } = useFetch("/api/v1/blogs", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
if (blogsDataError.value) {
  push.error(blogsDataError.value);
}
const blogs = ref([]);
watchEffect(() => {
  if (blogsData.value && Array.isArray(blogsData.value)) {
    blogs.value = blogsData.value;
  } else {
    blogs.value = [];
  }
});
let loading = ref(false);
</script>
