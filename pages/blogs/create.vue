<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ListItem } from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";

const title = ref("");
const description = ref("");
const thumbnail = ref("");
const type = ref("");
const tags = ref("");
const editor = ref(null);

const addImage = () => {
  const url = window.prompt("URL");
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
};

const setLink = () => {
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);
  if (url === null) return;
  if (url === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url })
    .run();
};

const postBlog = async () => {
  if (!editor.value) {
    // push.error('Editor is not initialized.');
    return;
  }

  const content = editor.value.getHTML();
  if (!title.value.trim() || !content.trim()) {
    // push.error('Title and content are required.');
    return;
  }

  const blogData = {
    title: title.value,
    description: description.value,
    thumbnail: thumbnail.value,
    type: type.value,
    tags: tags.value.split(",").map((tag) => tag.trim()),
    content: content,
  };

  try {
    const response = await $fetch("/api/v1/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (response.success) {
      push.success("Blog posted successfully!");
      title.value = "";
      description.value = "";
      thumbnail.value = "";
      type.value = "";
      tags.value = "";
      editor.value.commands.clearContent();
    } else {
      throw new Error("Failed to post blog.");
    }
  } catch (error) {
    push.error("Failed to post blog");
    console.error(
      `An error occurred: ${error.message || "Check console for details."}`
    );
  }
};

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle, ListItem] }),
      TextStyle.configure({ types: [ListItem] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      Superscript,
      Subscript,
      Link.configure({ openOnClick: true, defaultProtocol: "https" }),
      StarterKit,
    ],
    content: `
      <h2>Hi there,</h2>
      <p>this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p>
      <ul><li>That’s a bullet list with one …</li><li>… or two list items.</li></ul>
      <p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p>
      <blockquote>Wow, that’s amazing. Good work, boy! 👏<br />— Mom</blockquote>
    `,
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <header class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">
          Create a New Blog Post
        </h1>
        <p class="mt-2 text-lg text-gray-600">
          Share your thoughts, ideas, and stories with the world.
        </p>
      </header>

      <form
        @submit.prevent="postBlog"
        class="space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1">
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Blog Title</label
            >
            <input
              v-model="title"
              type="text"
              name="title"
              id="title"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="A Catchy and Descriptive Title"
            />
          </div>
          <div class="col-span-1">
            <label for="type" class="block text-sm font-medium text-gray-700"
              >Category</label
            >
            <input
              v-model="type"
              type="text"
              name="type"
              id="type"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Tutorial, News, Review"
            />
          </div>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Short Description</label
          >
          <textarea
            v-model="description"
            id="description"
            name="description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="A brief summary for SEO and previews."
          ></textarea>
        </div>

        <div>
          <label for="thumbnail" class="block text-sm font-medium text-gray-700"
            >Thumbnail URL</label
          >
          <input
            v-model="thumbnail"
            type="text"
            name="thumbnail"
            id="thumbnail"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="https://example.com/your-image.jpg"
          />
        </div>

        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700"
            >Tags (comma-separated)</label
          >
          <input
            v-model="tags"
            type="text"
            name="tags"
            id="tags"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="vue, nuxt, tiptap, javascript"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Content</label
          >
          <div
            v-if="editor"
            class="tiptap-toolbar bg-gray-100 p-2 rounded-t-md flex flex-wrap items-center gap-2"
          >
            <div class="toolbar-group flex items-center gap-1">
              <button
                @click="editor.chain().focus().undo().run()"
                title="Undo"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:arrow-uturn-left" />
              </button>
              <button
                @click="editor.chain().focus().redo().run()"
                title="Redo"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:arrow-uturn-right" />
              </button>
              <button
                @click="editor.chain().focus().unsetAllMarks().run()"
                title="Clear Formatting"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="gridicons:clear-formatting" />
              </button>
            </div>
            <div class="toolbar-group flex items-center gap-1">
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 1 }),
                }"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="gridicons:heading-h1" />
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 2 }),
                }"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="gridicons:heading-h2" />
              </button>
              <button
                @click="
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                  'is-active': editor.isActive('heading', { level: 3 }),
                }"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="gridicons:heading-h3" />
              </button>
            </div>
            <div class="toolbar-group flex items-center gap-1">
              <button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                title="Bold"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:bold" />
              </button>
              <button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                title="Italic"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:italic" />
              </button>
              <button
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('underline') }"
                title="Underline"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:underline" />
              </button>
              <button
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
                title="Strikethrough"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:strikethrough" />
              </button>
            </div>
            <div class="toolbar-group flex items-center gap-1">
              <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                title="Bullet List"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="heroicons:list-bullet" />
              </button>
              <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                title="Ordered List"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="mdi:format-list-numbered" />
              </button>
            </div>
            <div class="toolbar-group flex items-center gap-1">
              <button
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }"
                title="Code Block"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="lucide:file-code" />
              </button>
              <button
                @click="setLink"
                title="Add Link"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="mdi:link" />
              </button>
              <button
                @click="addImage"
                title="Add Image"
                class="p-2 rounded hover:bg-gray-200"
              >
                <Icon name="gridicons:add-image" />
              </button>
            </div>
          </div>
          <div
            class="editor-container border border-gray-300 rounded-b-md p-4 focus-within:ring-2 focus-within:ring-indigo-500"
          >
            <editor-content :editor="editor" />
          </div>
        </div>

        <div class="flex justify-end pt-6">
          <button
            type="submit"
            class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.tiptap-toolbar .is-active {
  background-color: #e0e7ff; /* A light indigo for active buttons */
  color: #4f46e5; /* Indigo text for active buttons */
}

.editor-container .ProseMirror {
  min-height: 300px;
  outline: none;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  font-weight: 600;
  margin-bottom: 0.5em;
}

.ProseMirror p {
  margin-bottom: 1em;
}

.ProseMirror ul,
.ProseMirror ol {
  margin-left: 1.5rem;
  margin-bottom: 1em;
}

.ProseMirror pre {
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: #374151;
  font-family: "Courier New", Courier, monospace;
}

.ProseMirror blockquote {
  border-left: 3px solid #d1d5db;
  margin-left: 1rem;
  padding-left: 1rem;
  font-style: italic;
}
</style>

<style scoped>
/* Custom styles for form inputs */
input[type="text"],
textarea {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

input[type="text"]::placeholder,
textarea::placeholder {
  color: #9ca3af; /* gray-400 */
}

/* Custom styles for the Tiptap editor content */
.ProseMirror {
  color: #111827; /* gray-900 */
}
</style>
