"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/server/db/drizzle";
import { usersToWorkspaces } from "@/server/db/schemas";
import { authActionClient } from "@/server/lib/actions";
import { isMemberOfWorkspace } from "@/server/lib/is-member";

const RemoveMemberActionSchema = z.object({
  userId: z.string(),
  workspaceId: z.string(),
});

export const removeMemberAction = authActionClient
  .schema(RemoveMemberActionSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { userId } = parsedInput;

    if (userId === ctx.auth.user.id) {
      return {
        ok: false,
        message: "Bruker kan ikke fjerne seg selv",
      };
    }

    const userIsMember = await isMemberOfWorkspace(ctx.auth.user.id, parsedInput.workspaceId);

    if (!userIsMember) {
      return {
        ok: false,
        message: "Bruker er ikke medlem av arbeidsområdet",
      };
    }

    const isMember = await isMemberOfWorkspace(userId, parsedInput.workspaceId);

    if (!isMember) {
      return {
        ok: false,
        message: "Bruker er ikke medlem av arbeidsområdet",
      };
    }

    await db.delete(usersToWorkspaces).where(and(eq(usersToWorkspaces.userId, userId)));

    return {
      ok: true,
    };
  });
