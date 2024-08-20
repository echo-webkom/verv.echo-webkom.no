import { z } from "zod";

import { studyEnum, yearEnum } from "@/lib/db/schemas";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Navnet ditt må være minst 2 tegn.")
    .max(255, "Navnet ditt kan ikke være lengre enn 255 tegn."),
  email: z.string().min(1, "E-post er påkrevd.").email("Må være en gyldig e-postadresse."),
  yearOfStudy: z.enum(yearEnum, {
    errorMap: () => ({
      message: "Du må velge et gyldig årstrinn.",
    }),
  }),
  fieldOfStudy: z.enum(studyEnum, {
    errorMap: () => ({
      message: "Du må velge en gyldig studieretning.",
    }),
  }),
  reason: z
    .string()
    .min(10, "Søknaden din må innholde minst 10 tegn")
    .max(10000, "Søknaden din kan ikke være lengre enn 10000 tegn."),
});

export const webkomFormSchema = formSchema
  .omit({
    reason: true,
  })
  .extend({
    about: z
      .string()
      .min(3, "Du må skrive mer enn 3 tegn.")
      .max(1000, "Du kan ikke skrive mer enn 1000 tegn."),
    sideProject: z
      .string()
      .min(3, "Du må skrive mer enn 3 tegn.")
      .max(1000, "Du kan ikke skrive mer enn 1000 tegn."),
    master: z
      .string()
      .min(3, "Du må skrive mer enn 3 tegn.")
      .max(1000, "Du kan ikke skrive mer enn 1000 tegn."),
    experience: z
      .string()
      .min(3, "Du må skrive mer enn 3 tegn.")
      .max(1000, "Du kan ikke skrive mer enn 1000 tegn."),
  });
