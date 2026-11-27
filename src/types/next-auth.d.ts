import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username?: string;
    role?: string;
    accessToken?: string;
  }
  interface Session {
    accessToken?: string;
    user: { id: string; username?: string; role?: string } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    username?: string;
    role?: string;
    accessToken?: string;
  }
}