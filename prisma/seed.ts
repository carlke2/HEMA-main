import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = "Password123!";
const SALT_ROUNDS = 10;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Sample data for Au Pairs (30)
const AU_PAIR_NAMES = [
  "Harriet Wanjiku",
  "Wayne Gift",
  "Kipchoge Kip",
  "Faith Muthoni",
  "James Omondi",
  "Mary Akinyi",
  "Peter Kamau",
  "Grace Wambui",
  "David Otieno",
  "Lucy Njeri",
  "Joseph Mwangi",
  "Sarah Adhiambo",
  "Michael Ochieng",
  "Elizabeth Achieng",
  "Daniel Kipruto",
  "Ruth Chebet",
  "Samuel Kibet",
  "Joy Kemunto",
  "John Kariuki",
  "Anne Wanjiru",
  "Robert Mutua",
  "Catherine Nyambura",
  "Patrick Odhiambo",
  "Margaret Atieno",
  "Charles Ouma",
  "Jane Akoth",
  "George Owino",
  "Dorothy Anyango",
  "Thomas Okoth",
  "Rebecca Awuor",
];

const LOCATIONS = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Kakamega",
  "Nyeri",
  "Meru",
  "Lamu",
  "Nanyuki",
  "Machakos",
];

const COUNTRIES = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "United_Kingdom",
  "United_States",
  "Canada",
  "Germany",
  "France",
  "South_Africa",
  "Nigeria",
] as const;

type CountryEnum = (typeof COUNTRIES)[number];
type TribeEnum = (typeof TRIBES)[number];
type ReligionEnum = (typeof RELIGIONS)[number];
type GenderEnum = (typeof GENDERS)[number];

const TRIBES = [
  "Luhya",
  "Kikuyu",
  "Luo",
  "Kalenjin",
  "Kamba",
  "Gusii_Abagusii",
  "Meru",
  "Maasai",
  "Turkana",
  "Samburu",
  "Embu",
  "Mijikenda",
  "Taita",
  "Swahili",
  "Baganda_Ganda_Buganda",
] as const;

const RELIGIONS = [
  "Christian",
  "Muslim",
  "Seventh_Day_Adventist",
  "Presbyterian",
] as const;

const GENDERS = ["Male", "Female"] as const;

// Sample data for Families (10)
const FAMILY_NAMES = [
  "The Johnson Family",
  "The Williams Family",
  "The O'Brien Family",
  "The Patel Family",
  "The Müller Family",
  "The Kim Family",
  "The Hassan Family",
  "The Anderson Family",
  "The Okonkwo Family",
  "The Schmidt Family",
];

const FAMILY_LOCATIONS = [
  "London, UK",
  "Manchester, UK",
  "Dubai, UAE",
  "Berlin, Germany",
  "Nairobi, Kenya",
  "Cape Town, South Africa",
  "Toronto, Canada",
  "Sydney, Australia",
  "Dublin, Ireland",
  "Amsterdam, Netherlands",
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickCountry(): CountryEnum {
  return pick(COUNTRIES);
}

function pickTribe(): TribeEnum {
  return pick(TRIBES);
}

function pickReligion(): ReligionEnum {
  return pick(RELIGIONS);
}

function pickGender(): GenderEnum {
  return pick(GENDERS);
}

async function main() {
  const hashed = await hashPassword(DEFAULT_PASSWORD);

  console.log("Seeding database...");
  console.log("Default password for all seeded users:", DEFAULT_PASSWORD);

  // 0. Remove previously seeded data (idempotent seed)
  const seedEmails = [
    ...Array.from({ length: 30 }, (_, i) => `aupair${i + 1}@hema.example.com`),
    ...Array.from({ length: 10 }, (_, i) => `family${i + 1}@hema.example.com`),
  ];
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: seedEmails } },
    include: { HostFamilyUserProfile: true, AuPairUserProfile: true },
  });
  const familyIdsToDelete = existingUsers
    .map((u) => u.HostFamilyUserProfile?.familyId)
    .filter((id): id is string => Boolean(id));
  await prisma.hostFamilyUserProfile.deleteMany({ where: { userId: { in: existingUsers.map((u) => u.id) } } });
  await prisma.auPairUserProfile.deleteMany({ where: { userId: { in: existingUsers.map((u) => u.id) } } });
  await prisma.user.deleteMany({ where: { email: { in: seedEmails } } });
  if (familyIdsToDelete.length > 0) {
    await prisma.hostFamily.deleteMany({ where: { uuid: { in: familyIdsToDelete } } });
  }
  console.log("Cleaned previous seed data (if any).");

  // 1. Create 10 Host Families (each with a family record + one user + profile)
  const familyUuids: string[] = [];
  for (let i = 0; i < 10; i++) {
    const country = i < 4 ? "United_Kingdom" : pickCountry();
    const tribe = pickTribe();
    const religion = pickReligion();
    const family = await prisma.hostFamily.create({
      data: {
        name: FAMILY_NAMES[i],
        country,
        tribe,
        religion,
        location: FAMILY_LOCATIONS[i],
        verified: i % 3 === 0,
        email: `family${i + 1}@hema.example.com`,
        description: `We are ${FAMILY_NAMES[i]}, looking for a caring au pair.`,
      },
    });
    familyUuids.push(family.uuid);

    const familyUser = await prisma.user.create({
      data: {
        fullName: FAMILY_NAMES[i].replace(" Family", "").replace("The ", ""),
        email: `family${i + 1}@hema.example.com`,
        password: hashed,
        userType: "hostFamily",
        gender: pickGender(),
        verified: family.verified,
        phone: `+2547000000${String(i + 1).padStart(2, "0")}`,
      },
    });

    await prisma.hostFamilyUserProfile.create({
      data: {
        userId: familyUser.id,
        familyId: family.uuid,
        country: country,
        location: family.location,
      },
    });
  }
  console.log("Created 10 families with their users and profiles.");

  // 2. Create 30 Au Pairs (user + AuPairUserProfile)
  for (let i = 0; i < 30; i++) {
    const country = pickCountry();
    const tribe = pickTribe();
    const religion = pickReligion();
    const gender = pickGender();
    const location = pick(LOCATIONS);
    const email = `aupair${i + 1}@hema.example.com`;
    const phone = `+2547${String(10000000 + i).slice(-8)}`;

    const user = await prisma.user.create({
      data: {
        fullName: AU_PAIR_NAMES[i],
        email,
        password: hashed,
        userType: "aupair",
        gender,
        verified: i % 4 === 0,
        phone,
      },
    });

    await prisma.auPairUserProfile.create({
      data: {
        userId: user.id,
        country: country,
        location: `${location}, Kenya`,
        tribe: tribe,
        religion: religion,
        education: i % 2 === 0 ? "Secondary" : "Some tertiary",
        skills: ["Childcare", "Cooking", "English"].slice(0, 2 + (i % 2)),
      },
    });
  }
  console.log("Created 30 au pairs with their profiles.");

  // Au-pair trainings (admin assigns these to au-pairs)
  const firstAid = await prisma.training.create({
    data: {
      title: "First Aid & Emergency Response",
      description: "Essential first aid and emergency response skills for childcare settings.",
      sortOrder: 1,
      steps: {
        create: [
          { title: "Introduction to first aid", description: "When and how to call for help, basic safety.", sortOrder: 1 },
          { title: "CPR and choking", description: "Infant and child CPR and choking response.", sortOrder: 2 },
          { title: "Cuts, burns, and bruises", description: "Minor injury handling and when to seek medical care.", sortOrder: 3 },
          { title: "Allergic reactions", description: "Recognising and responding to allergic reactions.", sortOrder: 4 },
        ],
      },
    },
  });
  const childcare = await prisma.training.create({
    data: {
      title: "Childcare & Safety Basics",
      description: "Childcare safety and household safety for au pairs.",
      sortOrder: 2,
      steps: {
        create: [
          { title: "Safe environment", description: "Making the home safe for children.", sortOrder: 1 },
          { title: "Supervision and boundaries", description: "Age-appropriate supervision and boundaries.", sortOrder: 2 },
          { title: "Emergency contacts", description: "Keeping and using emergency contact information.", sortOrder: 3 },
        ],
      },
    },
  });
  const codeOfConduct = await prisma.training.create({
    data: {
      title: "Code of Conduct & Cultural Exchange",
      description: "Platform rules and cultural exchange guidelines.",
      sortOrder: 3,
      steps: {
        create: [
          { title: "Read the code of conduct", description: "Review and acknowledge the platform code of conduct.", sortOrder: 1 },
          { title: "Cultural exchange guidelines", description: "Communication with host families and boundaries.", sortOrder: 2 },
        ],
      },
    },
  });
  console.log("Created trainings: First Aid, Childcare Basics, Code of Conduct.");

  console.log("Seed completed successfully.");
  console.log("You can log in with any seeded account using password:", DEFAULT_PASSWORD);
  console.log("Au pairs: aupair1@hema.example.com ... aupair30@hema.example.com");
  console.log("Families: family1@hema.example.com ... family10@hema.example.com");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
