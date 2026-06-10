<template>
  <div class="bg-white py-24 sm:py-32">
    <div
      class="mx-auto grid max-w-6xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3"
    >
      <div class="max-w-2xl">
        <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Meet our Team
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
          elementum enim vitae ullamcorper suspendisse.
        </p>
      </div>
      <ul
        role="list"
        class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
      >
        <li v-for="person in people" :key="person.name">
          <div class="flex items-center gap-x-6">
            <img class="h-16 w-16 rounded-full" :src="person.imageUrl" alt="" />
            <div>
              <h3
                class="text-base font-semibold leading-7 tracking-tight text-gray-900"
              >
                {{ person.name }}
              </h3>
              <p class="text-sm font-semibold leading-6 text-indigo-600">
                {{ person.role }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const people = [
  {
    name: "Easter Pefuli",
    role: "Founder & CEO",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQEDZ80V62trVg/profile-displayphoto-shrink_100_100/B4DZavYXMOHAAg-/0/1746699123025?e=1757548800&v=beta&t=VQaOXiaNtyCEbFfT4lpVNmEPWDnOZq8NDm-CmN6MQ5w",
  },
  {
    name: "Samuel Momanyi",
    role: "General Manager",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQGQoALINugDaA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720251623477?e=1757548800&v=beta&t=zWB8IrsIECQXXhkJAfTwb2lkQQrRTThmqiFAdaR4oLw",
  },
  {
    name: "Harriet Kemunto",
    role: "Customer Success Specilist",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQEO9a-C3sBXAw/profile-displayphoto-scale_100_100/B4DZfzaLsxGYAc-/0/1752135418724?e=1757548800&v=beta&t=1DIp6SVsbYZyNBSs_zOe6rnWFwrrlCDxZ2Pn5_uLmEc",
  },
  {
    name: "Collins Tinega",
    role: "Technical Lead",
    imageUrl:
      "https://scontent.fnbo12-1.fna.fbcdn.net/v/t39.30808-6/472204329_1663743494181141_5585363694498963501_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=ci6gsUbrP7QQ7kNvwHV7luB&_nc_oc=AdnVeVslmgFK12CYKVNFvyBqbdQmEThjI6LkSRRsnIn8-Nev_UHF6Xl8x49oOc9-_24&_nc_zt=23&_nc_ht=scontent.fnbo12-1.fna&_nc_gid=1OIGAG65uYACwVA1yHMjBQ&oh=00_AfT2pWy3PyXIBoezUTKhkbNeKpekaONb0tED1U-Oq2ZVTg&oe=68756094",
  },
  {
    name: "Fredrick Omondi",
    role: "Backend Engineer",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4D03AQEhLS94c4SIlA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1655277467800?e=1757548800&v=beta&t=dcCtdCYafJ5j6ZGGONVaIQGL2GOiSlOeI8kLF3zG8jM",
  },
  {
    name: "Deborah Nyasetia",
    role: "UI/UX Designer",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E03AQGGqS6-n3YkWw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1649367849669?e=1757548800&v=beta&t=mPdG3qU6kcd-bA-OVx4bTfxYaPpIAdqaaSfM_yVIpgo",
  },
  {
    name: "Wayne Gift",
    role: "Frontend Engineer",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQHMktgR1HHvlg/profile-displayphoto-shrink_200_200/B4DZeZco3PGgAY-/0/1750626112114?e=1757548800&v=beta&t=eykugBU_TjfrKw2QjYbxzqnQdpYeo5_odPJiEqPXLEk",
  },

  {
    name: "Maurine James",
    role: "Legal Advisor",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQEDEmGvjHX_qg/profile-displayphoto-shrink_200_200/B4DZOqi5SDHoAY-/0/1733733095635?e=1757548800&v=beta&t=ZWwKoxO3nSo2XOioVRlm78h-Md2ZN0yAx6VrSJ86Hiw",
  },
];
</script>
