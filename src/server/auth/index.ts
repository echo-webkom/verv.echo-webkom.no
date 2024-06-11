import { cache } from "react";
import { cookies } from "next/headers";

import { lucia } from "./lucia";

/**
 * Get the current user from the session cookie
 *
 * @example
 * ```tsx
 * import { auth } from "@/server/auth";
 *
 * export default function Profile() {
 *  const user = auth();
 *
 *   ...
 * ```
 */
export const auth = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      session: null,
      user: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  /**
   * Next.js throws when you attempt to set cookie when rendering page
   **/
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result;
});
