"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/server/db/drizzle";
import { workspaces } from "@/server/db/schemas";
import { authActionClient } from "@/server/lib/actions";

export const updateDescriptionAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
      description: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { id, description } = parsedInput;

    await db.update(workspaces).set({ description }).where(eq(workspaces.id, id));

    return {
      ok: true,
    };
  });
