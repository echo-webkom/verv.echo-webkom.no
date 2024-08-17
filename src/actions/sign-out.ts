"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth, lucia } from "@/lib/auth/lucia";

export const signOutAction = async (redirectTo?: string) => {
  const user = await auth();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(user.session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect(redirectTo ?? "/");
};
