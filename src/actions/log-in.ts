"use server";

import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export const login = async () => {
  const { session } = await auth();

  if (session) {
    return {
      error: "Already logged in",
    };
  }

  return redirect("/auth/feide");
};
