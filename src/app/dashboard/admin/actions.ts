"use server";

import { db } from "@/lib/db/drizzle";
import { groupEnum, userGroups, users } from "@/lib/db/schema";
import { getUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Response =
  | {
      result: "success";
    }
  | {
      result: "error";
      message: string;
    };

const userFormSchema = z.object({
  groups: z.enum(groupEnum.enumValues).array(),
  role: z.enum(["admin", "leader"]).nullable(),
});

export const updateUserAction = async (
  userId: string,
  data: z.infer<typeof userFormSchema>
): Promise<Response> => {
  try {
    const actionUser = await getUser();

    if (actionUser?.role !== "admin") {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    const { groups, role } = userFormSchema.parse(data);

    await db
      .update(users)
      .set({
        role,
      })
      .where(eq(users.id, userId));

    await db.delete(userGroups).where(eq(userGroups.userId, userId));

    groups.forEach(async (group) => {
      await db.insert(userGroups).values({
        userId,
        group,
      });
    });

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
