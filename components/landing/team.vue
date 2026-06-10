<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our team
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          We’re a diverse team of migration experts, technologists, and human
          rights advocates working to ensure every worker’s journey is safe,
          transparent, and empowering.
        </p>
      </div>
      <ul
        role="list"
        class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
      >
        <li v-for="person in people" :key="person.name">
          <img
            class="mx-auto h-24 w-24 rounded-full"
            :src="person.imageUrl"
            alt=""
          />
          <h3
            class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900"
          >
            {{ person.name }}
          </h3>
          <p class="text-sm leading-6 text-gray-600">{{ person.role }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Sarah Williams",
    role: "Head of Operations",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "James Smith",
    role: "Lead Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Specialist",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Olivia Brown",
    role: "Software Engineer",
    imageUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Sophia Martinez",
    role: "Data Scientist",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-ef5a1b1c9f9e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },

  // More people...
];
</script>
