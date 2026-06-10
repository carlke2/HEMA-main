import pkg from '@prisma/client'

const { PrismaClient, ...enums } = pkg

// Re-export PrismaClient and all enums for ESM compatibility
export { PrismaClient }
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
} = enums as any

// Singleton PrismaClient instance
let _prisma: InstanceType<typeof PrismaClient> | null = null

export function usePrisma() {
  if (!_prisma) {
    _prisma = new PrismaClient()
  }
  return _prisma
}

// Re-export Prisma namespace for types
export const Prisma = pkg.Prisma
