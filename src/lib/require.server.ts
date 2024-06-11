import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export const requireAuth = async (
  options = {
    redirectTo: "/",
  },
) => {
  const a = await auth();

  if (!a.user) {
    redirect(options.redirectTo);
  }

  return a;
};
