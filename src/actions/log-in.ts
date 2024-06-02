"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { lucia } from "@/server/auth/lucia";

export const login = async () => {
  const { session } = await auth();

  if (session) {
    return {
      error: "Already logged in",
    };
  }

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  return redirect("/auth/feide");
};
