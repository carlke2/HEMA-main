<template>
  <div class="mx-auto mt-32 max-w-6xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2
            class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
          >
            Our values
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            At Hema, our values guide every decision we make—from how we protect
            workers, to how we collaborate with employers and partners across
            borders.
          </p>
        </div>
        <dl
          class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <div v-for="value in values" :key="value.name">
            <dt class="font-semibold text-gray-900">{{ value.name }}</dt>
            <dd class="mt-1 text-gray-600">{{ value.description }}</dd>
          </div>
        </dl>
      </div>

</template>

<script setup lang="ts">

const values = [
  {
    name: "Trust & Safety",
    description:
      "We prioritize the well-being of every worker through verified employers, transparent processes, and real-time support systems.",
  },
  {
    name: "Dignity in Work",
    description:
      "We believe every individual deserves to work with respect, fair treatment, and opportunities to grow.",
  },
  {
    name: "Transparency",
    description:
      "From job offers to salary remittances, we ensure accountability and openness at every stage of the migration journey.",
  },
  {
    name: "Empowerment",
    description:
      "We equip job seekers with skills, resources, and support to make informed decisions and succeed abroad.",
  },
  {
    name: "Collaboration",
    description:
      "We work hand-in-hand with governments, NGOs, and employers to build a better system for ethical migration.",
  },
  {
    name: "Innovation for Impact",
    description:
      "We harness technology to solve real-world problems and improve the lives of workers and their families.",
  },
];
</script>