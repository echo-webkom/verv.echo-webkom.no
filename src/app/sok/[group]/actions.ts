"use server";

import { z } from "zod";
import { formSchema } from "./schema";
import { Group } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schema";
import { PostgresError } from "postgres";
import { revalidatePath } from "next/cache";

type Result =
  | {
      result: "success";
    }
  | {
      result: "error";
      message: string;
    };

export const submitApplication = async (
  group: Group,
  data: z.infer<typeof formSchema>
): Promise<Result> => {
  const parsedForm = formSchema.safeParse(data);

  if (!parsedForm.success) {
    return {
      result: "error",
      message: "Ugyldig data",
    };
  }

  if (new Date() > new Date("2023-09-04")) {
    return {
      result: "error",
      message: "Søknadsfristen har gått ut",
    };
  }

  try {
    await db.insert(applications).values({
      ...parsedForm.data,
      group,
      ip: "noip",
    });
  } catch (error) {
    if (error instanceof PostgresError) {
      if (error.code === "23505") {
        return {
          result: "error",
          message: "Du kan ikke søke flere ganger",
        };
      }

      // Unknown error
      console.error(error);
    }

    return {
      result: "error",
      message: "En ukjent feil oppstod",
    };
  }

  revalidatePath(`/dashboard/${group}`);

  return {
    result: "success",
  };
};
