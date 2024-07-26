"use server";

import { nanoid } from "nanoid";
import { z } from "zod";

import { db } from "@/server/db/drizzle";
import { fields as fieldsTable, forms as formsTable } from "@/server/db/schemas";
import { fieldTypes } from "@/server/db/schemas/fields";
import { authActionClient } from "@/server/lib/actions";
import { isMemberOfWorkspace } from "@/server/lib/is-member";

const CreateFormSchema = z.object({
  workspaceId: z.string(),
  title: z.string(),
  description: z.string(),
  expiresAt: z.date(),
  fields: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(fieldTypes),
      options: z.array(z.string()),
      required: z.boolean(),
    }),
  ),
});

export const createFormAction = authActionClient
  .schema(CreateFormSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { workspaceId, title, description, expiresAt, fields } = parsedInput;

    const isMember = await isMemberOfWorkspace(ctx.auth.user.id, workspaceId);
    if (!isMember) {
      return {
        ok: false,
        message: "Bruker er ikke medlem av arbeidsområdet",
      };
    }

    const formId = nanoid();

    await db.insert(formsTable).values({
      id: formId,
      workspaceId,
      title,
      description,
      expiresAt,
    });

    if (fields.length > 0) {
      await db.insert(fieldsTable).values(
        // Ugly hack to get the correct type, or else build fails
        fields.map((field: z.infer<typeof CreateFormSchema>["fields"][number], index) => {
          const sanitizedOptions = field.options.filter((option) => option !== "");

          return {
            id: nanoid(),
            formId,
            index,
            title: field.title,
            description: field.description,
            type: field.type,
            options: sanitizedOptions,
            required: field.required,
          };
        }),
      );
    }

    return {
      ok: true,
      data: {
        formId,
      },
    };
  });
