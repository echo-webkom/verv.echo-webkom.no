"use server";

import { revalidatePath } from "next/cache";
import { LibsqlError } from "@libsql/client";
import { z } from "zod";

import { auth } from "@/lib/auth/lucia";
import { APPLICATION_DEADLINE, Group } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schemas";
import { isMemberOf } from "@/lib/is-member-of";
import { createFormSchema } from "./_lib/schema";

type Result =
  | {
      result: "success";
    }
  | {
      result: "error";
      message: string;
    };

export const submitApplicationAction = async (
  group: Group,
  data: z.infer<ReturnType<typeof createFormSchema>>,
): Promise<Result> => {
  const user = await auth();

  if (!user) {
    return {
      result: "error",
      message: "Du må logge inn for å søke",
    };
  }

  if (!isMemberOf(user, [group, "webkom"])) {
    return {
      result: "error",
      message: "Du er ikke medlem av gruppen",
    };
  }

  const questions = await db.query.questions.findMany({
    where: (row, { eq }) => eq(row.groupId, group),
  });

  const formSchema = createFormSchema(questions);
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

  const mapped = {
    name: parsedForm.data.name,
    email: parsedForm.data.email,
    year: parsedForm.data.year,
    study: parsedForm.data.study,
    body: Object.entries(parsedForm.data.questions)
      .map(([id, answer]) => {
        const title = questions.find((q) => q.id === id)?.label;
        const ans = answer ?? "Ikke besvart";

        return `${title}: ${ans}`;
      })
      .join("\n\n"),
  };

  try {
    await db.insert(applications).values({
      ...mapped,
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
