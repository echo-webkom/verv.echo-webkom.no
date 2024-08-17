import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { DefaultSession, User } from "next-auth";
import NextAuth from "next-auth";
import { db } from "./db/drizzle";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },

  providers: [
    {
      id: "feide",
      name: "Feide",
      type: "oauth",
      wellKnown: "https://auth.dataporten.no/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "email userinfo-name profile userid openid",
        },
      },
      clientId: process.env.FEIDE_CLIENT_ID,
      clientSecret: process.env.FEIDE_CLIENT_SECRET,

      profile: (
        profile: {
          sub: string;
          name: string;
          email: string;
          picture: string;
        } & User
      ) => ({
        ...profile,
        id: profile.sub,
      }),
    },
  ],
});
