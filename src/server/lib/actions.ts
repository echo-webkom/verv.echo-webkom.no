import { createSafeActionClient } from "next-safe-action";

import { auth } from "../auth";

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const a = await auth();

  if (!a.user) {
    throw new Error("Not authenticated");
  }

  return next({
    ctx: { auth: a },
  });
});
