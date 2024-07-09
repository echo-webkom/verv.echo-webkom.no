import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { OAuth2RequestError } from "arctic";
import { nanoid } from "nanoid";

import { feide, getFeideUser } from "@/server/auth/feide";
import { lucia } from "@/server/auth/lucia";
import { db } from "@/server/db/drizzle";
import { users } from "@/server/db/schemas";

export const GET = async (req: NextRequest) => {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  const storedState = cookies().get("oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await feide.validateAuthorizationCode(code);

    const feideUser = await getFeideUser(tokens.accessToken);

    // Replace this with your own DB client.
    const existingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.feideId, feideUser.id),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = nanoid();

    await db.insert(users).values({
      email: feideUser.email,
      feideId: feideUser.id,
      id: userId,
      name: feideUser.name,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.error(e);

    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
};
