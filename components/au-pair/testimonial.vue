<template>
  <section class="px-6 md:px-16 py-16 bg-[#FAF9F6]">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-[#2C3E50]">Success Stories</h2>
      <p class="text-[#2C3E50]/80 max-w-2xl mx-auto text-sm md:text-base">
        Hear from families and au pairs who've experienced the Hema difference
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <!-- Family Testimonial -->
      <div
        class="bg-white p-8 rounded-lg shadow-sm border border-[#2C3E50]/10 hover:shadow-md transition relative"
      >
        <div
          class="absolute -top-4 -left-4 bg-[#2C3E50] text-[#F4D03F] w-12 h-12 rounded-full flex items-center justify-center shadow-md"
        >
          <icon name="mdi:home-heart" class="text-xl" />
        </div>
        <div class="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            alt="Family"
            class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#2C3E50]/10"
          />
          <div>
            <h4 class="font-bold text-[#2C3E50]">The Adebayo Family</h4>
            <p class="text-sm text-[#2C3E50]/80">London, UK</p>
          </div>
        </div>
        <p class="text-[#2C3E50]/90 italic">
          "Finding Amara through Hema was a blessing. Our children now speak
          Yoruba fluently and understand our traditions. She's become like
          family while pursuing her nursing degree. This is so much more than
          childcare."
        </p>
        <div class="flex mt-4">
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
        </div>
      </div>

      <!-- Au Pair Testimonial -->
      <div
        class="bg-white p-8 rounded-lg shadow-sm border border-[#2C3E50]/10 hover:shadow-md transition relative"
      >
        <div
          class="absolute -top-4 -left-4 bg-[#D35400] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
        >
          <icon name="mdi:account-supervisor" class="text-xl" />
        </div>
        <div class="flex items-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            alt="Au Pair"
            class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#2C3E50]/10"
          />
          <div>
            <h4 class="font-bold text-[#2C3E50]">Amina Diallo</h4>
            <p class="text-sm text-[#2C3E50]/80">
              Former Au Pair, Now Preschool Teacher
            </p>
          </div>
        </div>
        <p class="text-[#2C3E50]/90 italic">
          "Hema changed my life. The Johnson family treated me with respect
          while I earned my early childhood education certificate. Now I'm
          opening a bilingual preschool in Dakar with other Hema alumni. This
          platform is creating real opportunities."
        </p>
        <div class="flex mt-4">
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
          <icon name="mdi:star" class="text-[#F4D03F]" />
        </div>
      </div>
    </div>
  </section>
</template>