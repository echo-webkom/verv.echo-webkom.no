import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { db } from "../db/drizzle";

export const ensureAuth = cache(
  async (
    options = {
      redirectTo: "/",
    },
  ) => {
    const a = await auth();

    if (!a.user) {
      redirect(options.redirectTo);
    }

    return a;
  },
);

export const ensureMember = cache(
  async (
    workspaceId: string,
    options = {
      redirectTo: "/",
    },
  ) => {
    const a = await ensureAuth();

    if (!a.user) {
      redirect(options.redirectTo);
    }

    const workspace = await db.query.usersToWorkspaces.findFirst({
      where: (row, { eq, and }) => and(eq(row.userId, a.user.id), eq(row.workspaceId, workspaceId)),
    });

    if (!workspace) {
      redirect(options.redirectTo);
    }

    return a;
  },
);
