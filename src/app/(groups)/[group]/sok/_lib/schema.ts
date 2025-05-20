import { z } from "zod";

import { Question, studyEnum, yearEnum } from "@/lib/db/schemas";

export const createFormSchema = (questions: Array<Question>) => {
  const dynamicFields: Record<string, z.ZodString | z.ZodOptional<z.ZodString>> = {};

  for (const question of questions) {
    let field;

    if (question.required) {
      field = z.string().min(1, `${question.label} er påkrevd.`);
    } else {
      field = z.string().optional();
    }

    dynamicFields[question.id] = field;
  }

  return z.object({
    name: z
      .string()
      .min(2, "Navnet ditt må være minst 2 tegn.")
      .max(255, "Navnet ditt kan ikke være lengre enn 255 tegn."),
    email: z.string().min(1, "E-post er påkrevd.").email("Må være en gyldig e-postadresse."),
    year: z.enum(yearEnum, {
      errorMap: () => ({
        message: "Du må velge et gyldig årstrinn.",
      }),
    }),
    study: z.enum(studyEnum, {
      errorMap: () => ({
        message: "Du må velge en gyldig studieretning.",
      }),
    }),
    questions: z.object(dynamicFields),
  });
};
