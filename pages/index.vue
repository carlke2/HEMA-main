<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- HEADER -->
    <AuPairNav />

    <main>
      <!-- HERO SECTION -->
      <section
        class="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <!-- Background Image -->
        <img
          src="/assets/images/herr.jpg"
          class="absolute inset-0 w-full h-full object-cover"
          alt="Hero background"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40" />

        <!-- Content Wrapper -->
        <div class="relative z-10 px-4 w-full max-w-3xl text-center">
          <!-- CARD -->
          <div
            class="bg-blue-600/90 text-white rounded-3xl px-8 py-12 shadow-2xl"
          >
            <h1 class="text-3xl md:text-5xl font-bold leading-tight">
              Where care becomes<br />
              connection
            </h1>

            <p class="mt-4 text-sm md:text-base text-blue-100">
              From shared roots, we grow futures
            </p>
          </div>

          <!-- BUTTON (OUTSIDE CARD) -->
          <div class="mt-8 flex justify-center">
            <NuxtLink
              to="/au-pair/auth/sign-up"
              class="relative inline-block px-9 py-3 text-sm font-semibold rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition-all duration-300 focus:outline-none glow-button"
            >
              Begin Your Journey
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- SPECIALIZED SUPPORT SECTION -->
      <section class="bg-gray-50 py-20">
        <div class="max-w-6xl mx-auto px-6">
          <!-- Tag -->
          <div class="flex justify-center mb-6">
            <span class="inline-block bg-blue-100  text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              ❤ INCLUSIVE CARE
            </span>
          </div>

          <!-- Main Heading -->
          <h2 class="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Specialized Support for Every Child's <br/> Journey
          </h2>

          <!-- Description Paragraph -->
          <p class="text-center text-gray-700 text-base md:text-lg max-w-4xl mx-auto mb-12 leading-relaxed">
            We understand that every child is unique. Hema provides specialized care and support for families with children who have autism, ADHD, developmental differences, or mobility-related needs. Our au pairs receive dedicated training and ongoing guidance to ensure every child receives the understanding and care they deserve.
          </p>

          <!-- Cards Grid -->
          <div class="grid md:grid-cols-3 gap-8">
            <!-- Card 1: Specialized Training Programs -->
            <div class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="flex justify-start mb-4">
                <div class="bg-blue-100 rounded-xl p-3">
                  <Icon
                    icon="mdi:school-outline"
                    class="w-12 h-12 text-blue-600"
                  />
                </div>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-4 text-left">
                Specialized Training Programs
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed text-left">
                Our au pairs complete comprehensive training in supporting neurodiverse and physically challenged children, including communication strategies, sensory awareness, and behavioral support techniques.
              </p>
            </div>

            <!-- Card 2: Careful, Thoughtful Matching -->
            <div class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="flex justify-start mb-4">
                <div class="bg-blue-100 rounded-xl p-3">
                  <Icon
                    icon="mdi:handshake-outline"
                    class="w-12 h-12 text-blue-600"
                  />
                </div>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-4 text-left">
                Careful, Thoughtful Matching
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed text-left">
                We take time to understand your child's unique needs, household dynamics, and communication preferences to match you with an au pair who has the right experience, temperament, and dedication.
              </p>
            </div>

            <!-- Card 3: Ongoing Expert Guidance -->
            <div class="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="flex justify-start mb-4">
                <div class="bg-blue-100 rounded-xl p-3">
                  <Icon
                    icon="mdi:headset"
                    class="w-12 h-12 text-blue-600"
                  />
                </div>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-4 text-left">
                Ongoing Expert Guidance
              </h3>
              <p class="text-gray-700 text-sm leading-relaxed text-left">
                Both families and au pairs receive continuous support from our specialized care team, including resource access, consultation services, and adaptive care strategies as your child's needs evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section class="bg-[#FBF7F2] py-20">
        <div
          class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12"
        >
          <!-- IMAGE -->
          <div class="flex-shrink-0">
            <div
              class="w-72 h-[346px] md:w-96 md:h-[461px] overflow-hidden shadow-lg lg:mr-16 relative"
              style="
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                transform: rotate(-90deg);
              "
              role="img"
              aria-label="Community care"
            >
              <div
                class="absolute"
                style="
                  width: 346px;
                  height: 288px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(90deg);
                  background-image: url('https://images.unsplash.com/photo-1745335126374-0daeefe4428f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                  background-size: 100% 100%;
                  background-position: center;
                  background-repeat: no-repeat;
                "
              ></div>
              <div
                class="absolute hidden md:block"
                style="
                  width: 461px;
                  height: 384px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%) rotate(90deg);
                  background-image: url('https://images.unsplash.com/photo-1745335126374-0daeefe4428f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                  background-size: 100% 100%;
                  background-position: center;
                  background-repeat: no-repeat;
                "
              ></div>
            </div>
          </div>

          <!-- TEXT PILL -->
          <div
            class="bg-[#DDF2E7] text-slate-700 rounded-3xl px-8 py-10 max-w-xl shadow-sm"
          >
            <p class="text-base md:text-lg leading-relaxed">
              <span class="font-semibold">Hema</span> stands strong, a bridge
              across continents.<br />
              We cultivate safety, dignity, and opportunity, honoring <br />
              every unique journey.
            </p>
          </div>
        </div>
      </section>

      <!-- BENEFITS -->
      <section class="relative py-24 overflow-hidden">
        <!-- Background -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#EAF6F5] via-[#F4FAFA] to-[#EAF6F5]"
        />

        <div class="relative max-w-6xl mx-auto px-6">
          <!-- Title -->
          <h2
            class="text-center text-3xl md:text-4xl font-semibold text-blue-600 mb-20"
          >
            Voices of Our Growing Family
          </h2>

          <!-- Grid -->
          <div class="grid gap-12 md:grid-cols-3 items-start">
            <!-- Card 1 -->
            <div
              class="group bg-white/80 backdrop-blur-md p-8 shadow-xl rounded-tl-[32px] rounded-br-[32px] rotate-[-2deg] hover:rotate-0 hover:scale-[1.04] transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 rounded-full ring-2 ring-emerald-400 overflow-hidden"
                >
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Amara Okonkwo</p>
                  <p class="text-xs text-slate-500">Host Parent, Lagos</p>
                </div>
              </div>
              <p class="text-sm italic text-slate-600 leading-relaxed text-center">
                “Hema connected us with an <br />
                incredible au pair who <br />understands our traditions. Our
                <br />children are thriving, and we <br />
                gained a family member.”
              </p>
            </div>

            <!-- Card 2 -->
            <div
              class="group bg-white/80 backdrop-blur-md p-8 shadow-xl rounded-tl-[40px] rounded-br-[40px] rotate-[1.5deg] mt-6 hover:rotate-0 hover:scale-[1.04] transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 rounded-full ring-2 ring-emerald-400 overflow-hidden"
                >
                  <img
                    src="https://i.pravatar.cc/100?img=32"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Thandiwe Moyo</p>
                  <p class="text-xs text-slate-500">Au Pair, Nairobi</p>
                </div>
              </div>
              <p class="text-sm italic text-slate-600 leading-relaxed text-center">
                “I've learned so much while <br />
                staying true to who I am. The <br />
                family I work with treats me with <br />
                respect, and I'm building <br />
                lifelong memories.”
              </p>
            </div>

            <!-- Card 3 -->
            <div
              class="group bg-white/80 backdrop-blur-md p-8 shadow-xl rounded-tl-[28px] rounded-br-[28px] rotate-[-1deg] hover:rotate-0 hover:scale-[1.04] transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 rounded-full ring-2 ring-emerald-400 overflow-hidden"
                >
                  <img
                    src="https://i.pravatar.cc/100?img=45"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Kwame Mensah</p>
                  <p class="text-xs text-slate-500">Host Parent, Accra</p>
                </div>
              </div>
              <p class="text-sm italic text-slate-600 leading-relaxed text-center">
                “Hema’s thorough vetting gave <br />
                me peace of mind. Our au pair <br />
                is wonderful, and my son has a <br />
                fantastic cultural connection.”
              </p>
            </div>
          </div>

          <!-- Bottom Card -->
          <!-- <div class="mt-16 max-w-md">
            <div
              class="group bg-white/80 backdrop-blur-md p-8 shadow-xl rounded-[36px] rotate-[2deg] hover:rotate-0 hover:scale-[1.05] transition-all duration-300"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-12 h-12 rounded-full ring-2 ring-emerald-400 overflow-hidden"
                >
                  <img
                    src="https://i.pravatar.cc/100?img=20"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">Nia Jobe</p>
                  <p class="text-xs text-slate-500">Au Pair, Cape Town</p>
                </div>
              </div>
              <p class="text-sm italic text-slate-600 leading-relaxed text-center">
                “The support from Hema is <br />
                incredible. I feel safe and <br />
                valued, and my journey abroad <br />
                has been more enriching than <br />
                I ever imagined.”
              </p>
            </div>
          </div> -->
        </div>
      </section>

      <!-- EDUCATION -->
      <section
        class="relative py-24 md:py-32 flex items-center justify-center overflow-hidden"
      >
        <!-- Background Image -->
        <div
          class="absolute inset-0 bg-cover bg-center"
          style="
            background-image: url('https://images.unsplash.com/photo-1671916135053-dd4da7ada787?q=80&w=1038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          "
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40" />

        <!-- Content Wrapper -->
        <div class="relative z-10 px-4 w-full max-w-4xl text-center">
          <!-- CARD -->
          <div
            class="bg-white/70 text-black rounded-3xl px-8 py-12 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
          >
            <h1 class="text-xl md:text-3xl font-bold leading-tight">
              Together, we rise – <br />
              growing a world where care knows no <br />
              borders.
            </h1>
          </div>

          <!-- BUTTON (OUTSIDE CARD) -->
          <div class="mt-8 flex justify-center">
            <button
              class="relative px-9 py-3 text-sm font-semibold rounded-full bg-blue-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:shadow-[0_0_45px_rgba(16,185,129,0.9)] hover:bg-blue-400 transition-all duration-300 focus:outline-none"
            >
              Join The Hema Community
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <LandingFooter />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style>
html {
  scroll-behavior: smooth;
}

.glow-button {
  animation: glow-on-off 2s ease-in-out infinite;
}

.glow-button:hover {
  animation: none;
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4), 0 0 90px rgba(16, 185, 129, 0.3);
}

@keyframes glow-on-off {
  0%, 100% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3), 0 0 60px rgba(16, 185, 129, 0.2);
  }
  50% {
    box-shadow: 0 0 5px rgba(16, 185, 129, 0.2), 0 0 10px rgba(16, 185, 129, 0.1), 0 0 15px rgba(16, 185, 129, 0.05);
  }
}
</style>
