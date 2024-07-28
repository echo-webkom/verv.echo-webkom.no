"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/server/db/drizzle";
import { workspaces } from "@/server/db/schemas";
import { authActionClient } from "@/server/lib/actions";

export const updateNameAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { id, name } = parsedInput;

    await db.update(workspaces).set({ name }).where(eq(workspaces.id, id));

    return {
      ok: true,
    };
  });
