import { z } from "zod";

export const addQuestionSchema = z.object({
  label: z.string().min(1, "Spørsmålet må ha en tittel."),
  description: z.string().optional(),
  required: z.boolean(),
  placeholder: z.string().optional(),
  type: z.enum(["input", "textarea"], {
    errorMap: () => ({
      message: "Du må velge en gyldig type.",
    }),
  }),
});
