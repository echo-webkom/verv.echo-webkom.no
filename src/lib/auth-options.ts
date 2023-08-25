import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { AuthOptions, DefaultSession, User } from "next-auth";
import { db } from "./db/drizzle";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),

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
      idToken: true,

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
};
