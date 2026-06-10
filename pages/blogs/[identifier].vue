<template>
  <div>
    <div v-if="loading" class="status-message">
      <p>Loading post...</p>
    </div>

    <div v-else-if="error" class="status-message error-message">
      <p>Could not load the blog post.</p>
      <p class="error-details">{{ error }}</p>
    </div>

    <article v-else-if="blog">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
        <div class="mx-auto max-w-6xl">
          <header class="mb-4 lg:mb-6 not-format">
            <address class="flex items-center mb-6 not-italic">
              <div
                class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
              >
                <img
                  class="mr-4 w-16 h-16 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Jese Leos"
                />
                <div v-if="blog.author">
                  <p
                    href="#"
                    rel="author"
                    class="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {{ blog.author }}
                  </p>
                  <!-- <p class="text-base text-gray-500 dark:text-gray-400">
                Graphic Designer, educator & CEO Flowbite
              </p> -->
                  <p class="text-base text-gray-500 dark:text-gray-400">
                    <time pubdate>{{
                      new Date(blog.createdAt).toLocaleDateString()
                    }}</time>
                  </p>
                </div>
              </div>
            </address>
            <h1
              class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
            >
              {{ blog.title }}
            </h1>
          </header>
          <client-only>
            <editor-content :editor="editor" />
          </client-only>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

const blog = ref(null);
const loading = ref(true);
const error = ref(null);

// The Tiptap editor instance, configured to be read-only.
const editor = useEditor({
  editable: false,
  content: "",
  extensions: [
    StarterKit,
    Underline,
    Image,
    Link.configure({
      openOnClick: true, // It's helpful for links to be clickable in read-only mode
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
});

// Function to fetch the blog data from the API
const fetchBlog = async () => {
  loading.value = true;
  error.value = null;
  blog.value = null;

  try {
    const route = useRoute();
    const identifier = route.params.identifier;

    const response = await fetch(`/api/v1/blogs/${identifier}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Blog post not found.");
      }
      throw new Error(
        `API error: ${response.statusText} (Status: ${response.status})`
      );
    }

    const data = await response.json();
    blog.value = data;

    // Once data is fetched, set the editor's content
    if (editor.value && data.content) {
      editor.value.commands.setContent(data.content);
    }
  } catch (err) {
    error.value = err.message;
    push.error("Failed to fetch blog");
    console.error("Failed to fetch blog:", err);
  } finally {
    loading.value = false;
  }
};

// Fetch the blog when the component is first mounted
onMounted(() => {
  fetchBlog();
});
</script>

<style scoped>
.status-message {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.error-message {
  color: #ef4444;
}

.error-details {
  font-size: 0.875rem;
  color: #9ca3af;
}

.blog-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: #111827;
}

.blog-meta {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 2rem;
}
</style>
