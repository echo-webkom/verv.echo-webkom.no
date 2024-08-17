"use server";

import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { userFormSchema } from "./schemas";
import { auth } from "@/lib/auth/lucia";
import { memberships } from "@/lib/db/schemas";
import { isWebkom } from "@/lib/is-member-of";

type Response =
  | {
      result: "success";
    }
  | {
      result: "error";
      message: string;
    };

export const updateUserAction = async (
  userId: string,
  data: z.infer<typeof userFormSchema>
): Promise<Response> => {
  try {
    const actionUser = await auth();

    if (!actionUser) {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    if (!isWebkom(actionUser)) {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    const { groups } = userFormSchema.parse(data);

    await db.delete(memberships).where(eq(memberships.userId, userId));

    await db.insert(memberships).values(
      groups.map((groupId) => ({
        groupId,
        userId,
      }))
    );

    revalidatePath("/dashboard/admin");

    return {
      result: "success",
    };
  } catch (error) {
    return {
      result: "error",
      message: "Something went wrong",
    };
  }
};
