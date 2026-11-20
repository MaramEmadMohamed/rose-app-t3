import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { SERVER_API_URL } from "@/lib/constants/server-api";
import {
  InvalidCredentialsError,
  LoginServiceError,
} from "@/lib/auth/auth-errors";

import type { LoginResponse } from "@/types/auth";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE_SECONDS,
  },

  pages: { signIn: "/login", error: "/login" },

  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        let response: Response;

        try {
          response = await fetch(`${SERVER_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });
        } catch {
          throw new LoginServiceError();
        }

        if (response.status >= 400 && response.status < 500) {
          throw new InvalidCredentialsError();
        }
        if (!response.ok) throw new LoginServiceError();

        const { payload }: LoginResponse = await response.json();
        const { user, token } = payload;

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          username: user.username,
          role: user.role,
          accessToken: token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.username = token.username;
      session.user.role = token.role;

      return session;
    },
  },
});
