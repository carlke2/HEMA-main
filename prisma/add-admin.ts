import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Password123!", 10);
  
  // Create an Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@hema.example.com" },
    update: {},
    create: {
      fullName: "Super Admin",
      email: "admin@hema.example.com",
      password: hashedPassword,
      userType: "Admin",
      verified: true,
      phone: "+254700000000",
      gender: "Male"
    }
  });

  // Create an Agency
  const agencyRecord = await prisma.agency.upsert({
    where: { 
      name_country: { name: "Global Care Agency", country: "United_Kingdom" } 
    },
    update: {},
    create: {
      name: "Global Care Agency",
      description: "We are a trusted recruitment agency.",
      verified: true,
      country: "United_Kingdom",
      location: "London"
    }
  });

  // Create an Agency user
  const agencyUser = await prisma.user.upsert({
    where: { email: "agency@hema.example.com" },
    update: {},
    create: {
      fullName: "Global Care Agency Admin",
      email: "agency@hema.example.com",
      password: hashedPassword,
      userType: "agencyUser",
      verified: true,
      phone: "+254700000099",
      gender: "Female"
    }
  });

  // Link user to agency profile
  await prisma.agencyUserProfile.upsert({
    where: { userId: agencyUser.id },
    update: {},
    create: {
      agencyId: agencyRecord.uuid,
      userType: "Support",
      userId: agencyUser.id,
      country: "United_Kingdom",
      location: "London",
    }
  });

  console.log("✅ Admin and Agency users created successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
