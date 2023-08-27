"use server";

import { db } from "@/lib/db/drizzle";
import { userGroupMemberships, users } from "@/lib/db/schema";
import { getUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { userFormSchema } from "./schemas";

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
    const actionUser = await getUser();

    if (!actionUser?.isAdmin) {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    const { groups, isAdmin } = userFormSchema.parse(data);

    await db
      .update(users)
      .set({
        isAdmin,
      })
      .where(eq(users.id, userId));

    await db
      .delete(userGroupMemberships)
      .where(eq(userGroupMemberships.userId, userId));

    await db.insert(userGroupMemberships).values(
      groups.map((id) => ({
        id,
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
