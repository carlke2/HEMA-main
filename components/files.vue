<template>
  <main class="flex-1 p-6 overflow-auto">
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">File Management</h1>
        <p class="mt-2 text-gray-600">
          Upload and manage your important documents
        </p>
      </div>

      <!-- Upload Section -->
      <div class="mb-10">
        <form @submit.prevent="uploadFile" class="space-y-4">
          <div
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center',
              dragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300',
            ]"
          >
            <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              class="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <div class="flex flex-col items-center justify-center space-y-3">
              <icon name="mdi:cloud-upload" class="h-10 w-10 text-indigo-500" />
              <p class="text-sm text-gray-600">
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Click to upload
                </button>
                or drag and drop
              </p>
              <p class="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>

          <div
            v-if="selectedFile"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div class="flex items-center space-x-2">
              <icon name="mdi:file-document" class="h-5 w-5 text-gray-500" />
              <span class="text-sm font-medium">{{ selectedFile.name }}</span>
              <span class="text-xs text-gray-500">{{
                formatFileSize(selectedFile.size)
              }}</span>
            </div>
            <button
              type="button"
              @click="removeFile"
              class="text-red-500 hover:text-red-700"
            >
              <icon name="mdi:close" class="h-5 w-5" />
            </button>
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="!selectedFile || isUploading"
              :class="[
                'px-4 py-2 rounded-md text-white font-medium',
                selectedFile && !isUploading
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-indigo-400 cursor-not-allowed',
              ]"
            >
              <span v-if="!isUploading">Upload File</span>
              <span v-else class="flex items-center">
                <icon name="mdi:loading" class="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </span>
            </button>
          </div>
        </form>
      </div>

      <!-- Files List -->
      <div>
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Your Files</h2>

        <div v-if="isLoading" class="flex justify-center py-8">
          <Icon
            name="mdi:loading"
            class="h-6 w-6 animate-spin text-indigo-500"
          />
        </div>

        <div
          v-else-if="files.length === 0"
          class="text-center py-8 text-gray-500"
        >
          No files uploaded yet.
        </div>

        <div
          v-else
          class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Uploaded
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Size
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="file in files" :key="file.id">
                <td
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
                >
                  <div class="flex items-center">
                    <Icon
                      name="mdi:file-document"
                      class="h-5 w-5 flex-shrink-0 text-gray-400 mr-2"
                    />
                    {{ file.fileName }}
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ file.fileType }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ formatDate(file.uploadedAt) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ file.fileSize ? formatFileSize(file.fileSize) : "N/A" }}
                </td>
                <td
                  class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium"
                >
                  <div class="flex space-x-3 justify-end">
                    <button
                      @click="getFileUrl(file.fileUrl)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </button>
                    <button
                      @click="deleteFile(file.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const { user } = useUserSession();
const config = useRuntimeConfig();
const fileInput = ref(null);
const selectedFile = ref(null);
const dragOver = ref(false);
const files = ref([]);
const isLoading = ref(true);
const isUploading = ref(false);

// Fetch User's Files
const { data: userFilesData, error: userFilesDataError } = useFetch(
  "/api/v1/files",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      userId: user.value.id,
    },
  }
);
if (userFilesDataError.value) {
  push.error(userFilesDataError.value);
}
watchEffect(() => {
  if (userFilesData.value && Array.isArray(userFilesData.value)) {
    files.value = userFilesData.value;
    isLoading.value = false;
  } else {
    files.value = [];
  }
});

// Handle file selection
const handleFileSelect = (e) => {
  if (e.target.files.length) {
    selectedFile.value = e.target.files[0];
  }
};

// Handle file drop
const handleDrop = (e) => {
  dragOver.value = false;
  if (e.dataTransfer.files.length) {
    selectedFile.value = e.dataTransfer.files[0];
  }
};

// Remove selected file
const removeFile = () => {
  selectedFile.value = null;
  fileInput.value.value = "";
};

// Upload file
async function uploadFile() {
  if (!selectedFile.value) return;

  try {
    isUploading.value = true;

    const formData = new FormData();
    formData.append("file", selectedFile.value);
    formData.append("userId", user.value?.id); // Replace with actual user ID
    formData.append("fileType", "Other");

    const { data, error } = await useFetch("/api/v1/files", {
      method: "POST",
      body: formData,
    });

    if (error.value) {
      throw error.value;
    }

    push.success("File uploaded successfully");
    files.value.unshift(data.value.data);
    removeFile();
  } catch (error) {
    console.error("Upload error:", error);
    push.error(error.data?.message || "Failed to upload file");
  } finally {
    isUploading.value = false;
  }
}

// Delete file
const deleteFile = async (fileId) => {
  if (!confirm("Are you sure you want to delete this file?")) return;

  try {
    await useFetch(`/api/files/${fileId}`, {
      method: "DELETE",
    });
    files.value = files.value.filter((f) => f.id !== fileId);
    useToast().success("File deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    useToast().error("Failed to delete file");
  }
};

// Helper functions
async function getFileUrl(path) {
  if (!path) {
    push.error("No file path provided");
    return "";
  }
  const { data, error } = await useFetch("/api/v1/s3/get-presigned-url", {
    method: "POST",
    body: { fileUrl: path, expiresIn: 5 },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (error.value) {
    push.error("Failed to fetch file URL");
    return "";
  }
  setTimeout(() => {
    push.info("File URL will expire in 5 minutes");
  }, 40 * 60 * 1000);
  await navigateTo(data.value?.data.presignedUrl, {
    external: true,
    open: {
      target: "_blank",
    },
  });
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
