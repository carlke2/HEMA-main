<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 lg:px-8">
      <h2 class="text-center text-3xl font-semibold leading-8 text-gray-900">
        Our Partners
      </h2>

      <div class="mt-16 overflow-hidden">
        <div class="animate-infinite-scroll flex">
          <div class="flex w-1/2 items-center justify-around">
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/zuri.svg"
              alt="Zuri"
              loading="lazy"
            />
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/play.png"
              alt="Play Communications"
              loading="lazy"
            />

            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/zuri.svg"
              alt="Zuri"
              loading="lazy"
            />
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/play.png"
              alt="Play Communications"
              loading="lazy"
            />
          </div>

          <div
            class="flex w-1/2 items-center justify-around"
            aria-hidden="true"
          >
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/zuri.svg"
              alt="Zuri"
              loading="lazy"
            />
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/play.png"
              alt="Play Communications"
              loading="lazy"
            />

            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/zuri.svg"
              alt="Zuri"
              loading="lazy"
            />
            <img
              class="max-h-12 w-auto object-contain"
              src="/assets/images/partners/play.png"
              alt="Play Communications"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes infinite-scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* Moves the strip to the left by the width of one full set of logos */
    transform: translateX(-50%);
  }
}

.animate-infinite-scroll {
  /* Applies the animation */
  animation: infinite-scroll 40s linear infinite;

  /* Makes the container twice as wide as the screen to fit both sets of logos */
  display: flex;
  width: 200%;
}

.animate-infinite-scroll:hover {
  /* Pauses the animation on hover */
  animation-play-state: paused;
}
</style>
