import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// Re-export enums for ESM compatibility
export const {
  Country,
  AfricanTribes,
  Religion,
  UserType,
  FileType,
  ContractStatus,
  JobApplicationStatus,
  JobCategory,
  Currency,
  SalaryFrequency,
  AgencyRole,
  PaymentStatus,
  Gender,
  InterestStatus,
  Prisma,
} = pkg as any;
