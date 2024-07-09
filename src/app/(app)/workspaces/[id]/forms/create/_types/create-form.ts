import { isDate } from "date-fns";
import { z } from "zod";

export const TextFieldSchema = z.object({
  title: z.string().min(3),
  description: z.string().nullable(),
  type: z.union([z.literal("text"), z.literal("textarea")]),
  required: z.boolean(),
});

export const OptionFieldSchema = z.object({
  title: z.string().min(3),
  description: z.string().nullable(),
  type: z.union([z.literal("radio"), z.literal("checkbox"), z.literal("select")]),
  required: z.boolean(),
  options: z.array(z.string()).nonempty(),
});

export const CreateFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  expiresAt: z.string().refine((value) => isDate(value)),
  fields: z.array(z.union([TextFieldSchema, OptionFieldSchema])).nonempty(),
});

export type CreateFormSchemaValues = z.infer<typeof CreateFormSchema>;
