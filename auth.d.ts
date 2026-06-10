declare module "#auth-utils" {
  interface User {
    id: Int;
    fullName: string;
    email: string;
    verified: boolean;
    userType: string;
    avatar: string;
    agencyId?: string; // Optional, for agency users
  }
}
