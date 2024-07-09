"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";

import { db } from "@/server/db/drizzle";
import { usersToWorkspaces, workspaces } from "@/server/db/schemas";
import { authActionClient } from "@/server/lib/actions";
import { CreateWorkspaceFormSchema } from "../_types/create-workspace";

export const createWorkspaceAction = authActionClient
  .schema(CreateWorkspaceFormSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { name, description } = parsedInput;

    const workspaceId = nanoid();

    await db.insert(workspaces).values({
      id: workspaceId,
      name: name.trim(),
      description: description.trim(),
    });

    await db.insert(usersToWorkspaces).values({
      userId: ctx.auth.user.id,
      workspaceId,
    });

    redirect(`/workspaces/${workspaceId}`);
  });
