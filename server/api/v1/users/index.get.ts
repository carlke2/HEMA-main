import prisma, { UserType, Country } from "~/lib/prisma";

function getValidCountry(input: string): Country | undefined {
  return Object.values(Country).find(
    (country) => country.toLowerCase() === input.toLowerCase()
  );
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as {
    agencyId?: string;
    familyId?: string;
    country?: string;
    location?: string;
    skills?: string;
    userType?: string;
    verified?: string;
    search?: string;
    limit?: string;
    offset?: string;
  };
  const where: any = {};
  const profileFilters: any = {};
  try {
    const matchedCountry = query.country && getValidCountry(query.country);
    if (matchedCountry) {
      profileFilters.country = { equals: matchedCountry };
    }

    if (query.location) {
      profileFilters.location = {
        contains: query.location,
        mode: "insensitive",
      };
    }

    if (Object.keys(profileFilters).length > 0) {
      const userType = query.userType;
      if (userType === "aupair") {
        where.AuPairUserProfile = profileFilters;
      } else if (userType === "agencyUser") {
        where.agencyUserProfile = profileFilters;
      } else if (userType === "hostFamily") {
        where.HostFamilyUserProfile = profileFilters;
      } else if (userType === "jobSeeker") {
        where.jobSeekerProfile = profileFilters;
      } else if (!userType) {
        where.OR = [
          { AuPairUserProfile: profileFilters },
          { HostFamilyUserProfile: profileFilters },
          { agencyUserProfile: profileFilters },
          { jobSeekerProfile: profileFilters },
        ];
      }
    }

    // if (query.skills) {
    //   const skillsArray = query.skills
    //     .split(",")
    //     .map((s) => s.trim())
    //     .filter(Boolean);
    //   if (skillsArray.length) {
    //     where.skills = { hasSome: skillsArray };
    //   }
    // }
    if (
      query.userType &&
      Object.values(UserType).includes(query.userType as UserType)
    ) {
      where.userType = query.userType as UserType;
    }
    if (query.verified) {
      where.verified = query.verified === "true";
    }
    if (query.search) {
      where.OR = [
        { fullName: { contains: query.search, mode: "insensitive" } },
        { email: { contains: query.search, mode: "insensitive" } },
      ];
    }

    const limit = query.limit ? Math.min(Number(query.limit), 100) : 50;
    const offset = query.offset ? Number(query.offset) : 0;

    if (query.agencyId) {
      const users = await prisma.user.findMany({
        where: {
          ...where,
          userType: "agencyUser",
          agencyUserProfile: {
            agency: {
              uuid: query.agencyId,
            },
          },
        },
        select: {
          fullName: true,
          email: true,
          gender: true,
          verified: true,
          avatar: true,
          agencyUserProfile: true,
        },
      });

      return users;
    } else if (query.familyId) {
      const users = await prisma.user.findMany({
        where: {
          ...where,
          userType: "hostFamily",
          hostFamilyUserProfile: {
            family: {
              uuid: query.familyId,
            },
          },
        },
        select: {
          fullName: true,
          email: true,
          gender: true,
          verified: true,
          avatar: true,
          HostFamilyUserProfile: true,
        },
      });

      return users;
    }
    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        fullName: true,
        gender: true,
        phone: true,
        email: true,
        userType: true,
        verified: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        HostFamilyUserProfile: true,
        agencyUserProfile: true,
        AuPairUserProfile: true,
        jobSeekerProfile: true,
      },
    });

    return users;
  } catch (error) {
    return createError({
      statusCode: 500,
      message: "Internal server error",
      data: {
        status: 500,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
