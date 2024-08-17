"use server";

import { z } from "zod";
import { formSchema } from "./schema";
import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { APPLICATION_DEADLINE, Group } from "@/lib/constants";
import { LibsqlError } from "@libsql/client";
import { auth } from "@/lib/auth/lucia";

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

  if (new Date() > APPLICATION_DEADLINE) {
    return {
      result: "error",
      message: "Søknadsfristen har gått ut",
    };
  }

  const { user } = await auth();

  if (!user) {
    return {
      result: "error",
      message: "Du må logge inn for å søke",
    };
  }

  try {
    await db.insert(applications).values({
      ...parsedForm.data,
      groupId: group,
      userId: user.id,
    });
  } catch (error) {
    if (error instanceof LibsqlError) {
      // Duplicate key error
      if (error.code === "2627") {
        return {
          result: "error",
          message: "Du kan ikke søke flere ganger",
        };
      }
    }

    // Unknown error
    console.error(error);

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
