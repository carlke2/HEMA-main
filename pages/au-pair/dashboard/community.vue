<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <AuPairHeader />
    <div class="flex">
      <AuPairSidebar />

      <main class="flex-1 p-6 pb-20 md:pb-6">
        <!-- Community Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold flex items-center text-gray-900">
            <icon name="mdi:account-group" class="text-[#0000FE] mr-2" />
            Country Circle
          </h1>
          <button
            class="bg-[#0000FE] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Community Members -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:account-multiple" class="text-[#0000FE] mr-2" />
              Members in {{ currentUserData.AuPairUserProfile.country }}
            </h2>

            <div class="space-y-4">
              <div
                class="flex items-center space-x-3"
                v-for="(member, index) in communityUsersData"
                :key="index"
              >
                <img
                  :src="member.photo"
                  :alt="member.name"
                  class="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 class="font-medium text-gray-900">{{ member.name }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ member.tribe }} • {{ member.city }}
                  </p>
                </div>
                <button
                  class="ml-auto text-[#0000FE] hover:text-gray-900 transition"
                >
                  <icon name="mdi:message-text" />
                </button>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-[#2C3E50] text-[#FAF9F6] py-2 rounded-md text-sm font-medium hover:bg-[#D35400] transition"
            >
              View All {{ communityUsersData.length }} Members
            </button>
          </div>

          <!-- Resources -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:book" class="text-[#0000FE] mr-2" />
              Shared Resources
            </h2>

            <div class="space-y-3">
              <div
                v-for="(resource, index) in sharedResources"
                :key="index"
                class="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-md transition"
              >
                <div class="bg-blue-50 text-[#0000FE] p-2 rounded-full">
                  <Icon :name="resource.icon" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">
                    {{ resource.name }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    Shared by {{ resource.sharedBy }}
                  </p>
                  <p class="text-xs text-[#0000FE] mt-1">{{ resource.date }}</p>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-[#2C3E50] text-[#FAF9F6] py-2 rounded-md text-sm font-medium hover:bg-[#D35400] transition"
            >
              View All Resources
            </button>
          </div>

          <!-- Discussion Forum -->
          <div
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition md:col-span-3"
          >
            <h2 class="font-bold text-lg mb-4 flex items-center text-gray-900">
              <icon name="mdi:forum" class="text-[#0000FE] mr-2" />
              Recent Discussions
            </h2>

            <div class="space-y-4">
              <div
                v-for="(thread, index) in discussionThreads"
                :key="index"
                class="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition"
              >
                <div class="flex items-start space-x-3">
                  <img
                    :src="thread.author.photo"
                    :alt="thread.author.name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <h3 class="font-bold text-gray-900">
                        {{ thread.title }}
                      </h3>
                      <span class="text-xs text-gray-600">{{
                        thread.date
                      }}</span>
                    </div>
                    <p class="text-sm text-gray-600 my-2">
                      {{ thread.preview }}
                    </p>
                    <div class="flex justify-between items-center">
                      <div
                        class="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <span class="flex items-center">
                          <icon name="mdi:message-reply" class="mr-1" />
                          {{ thread.replies }} replies
                        </span>
                        <span class="flex items-center">
                          <icon name="mdi:eye" class="mr-1" />
                          {{ thread.views }}
                        </span>
                      </div>
                      <button
                        class="text-[#0000FE] text-sm font-medium hover:underline"
                      >
                        Join Discussion →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="w-full mt-4 bg-[#2C3E50] text-[#FAF9F6] py-2 rounded-md font-medium hover:bg-[#D35400] transition"
            >
              Go to Full Forum
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["aupair-dashboard"],
});
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const { clear, fetch, user } = useUserSession();

// fetch aupair data
const { data: currentUserData, error: currentUserDataError } = await useFetch(
  `/api/v1/aupair/aupairs/${user.value.id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);
if (currentUserDataError.value) {
  push.error("Error fetching current user data.");
}
const currentUser = ref({});
watchEffect(() => {
  if (currentUserData.value) {
    currentUser.value = currentUserData.value;
  } else {
    currentUser.value = {};
  }
});

// Fetch users in same country
const { data: communityUsersData, error: communityUsersDataError } =
  await useFetch(
    `/api/v1/aupair/aupairs?country=${currentUser.value.AuPairUserProfile.country}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
if (communityUsersDataError.value) {
  push.error("Error fetching community members data.");
}
const communityUsers = ref({});
watchEffect(() => {
  if (communityUsersData.value) {
    const raw = communityUsersData.value;
    communityUsers.value = Array.isArray(raw) ? raw : (raw?.data ?? raw ?? {});
  } else {
    communityUsers.value = {};
  }
});

const communityMembers = ref([
  {
    name: "Fatou Diop",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    tribe: "Wolof",
    city: "Paris",
  },
  {
    name: "Aïssatou Sow",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    tribe: "Fula",
    city: "Lyon",
  },
  {
    name: "Mariama Diallo",
    photo: "https://randomuser.me/api/portraits/women/23.jpg",
    tribe: "Mandinka",
    city: "Marseille",
  },
  {
    name: "Khadija Bâ",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    tribe: "Serer",
    city: "Paris",
  },
]);

const upcomingEvents = ref([
  {
    title: "Wolof Language Exchange",
    date: "Jun 15",
    location: "Café de Flore, Paris",
    attendees: [
      {
        name: "Fatou",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        name: "Aïssatou",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Mariama",
        photo: "https://randomuser.me/api/portraits/women/23.jpg",
      },
      {
        name: "Khadija",
        photo: "https://randomuser.me/api/portraits/women/55.jpg",
      },
    ],
  },
  {
    title: "Senegalese Cooking Class",
    date: "Jun 22",
    location: "Online via Zoom",
    attendees: [
      {
        name: "Aïssatou",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Mariama",
        photo: "https://randomuser.me/api/portraits/women/23.jpg",
      },
    ],
  },
]);

const sharedResources = ref([
  {
    name: "French-Wolof Phrasebook",
    sharedBy: "Fatou D.",
    date: "2 days ago",
    icon: "mdi:translate",
  },
  {
    name: "Visa Renewal Guide",
    sharedBy: "Aïssatou S.",
    date: "1 week ago",
    icon: "mdi:passport",
  },
  {
    name: "Traditional Recipes PDF",
    sharedBy: "Mariama D.",
    date: "2 weeks ago",
    icon: "mdi:food",
  },
]);

const discussionThreads = ref([
  {
    title: "How do you handle homesickness?",
    preview:
      "Looking for advice on dealing with being away from home during holidays...",
    author: {
      name: "Amina D.",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    date: "3 hours ago",
    replies: 5,
    views: "24",
  },
  {
    title: "Childcare tips for toddlers",
    preview:
      "Sharing some traditional Wolof methods that have worked well with my host family...",
    author: {
      name: "Fatou D.",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    date: "1 day ago",
    replies: 8,
    views: "42",
  },
]);
</script>
