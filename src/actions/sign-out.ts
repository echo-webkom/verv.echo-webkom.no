"use server";

import { auth, lucia } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOutAction = async (redirectTo?: string) => {
  const { session } = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect(redirectTo ?? "/");
};
