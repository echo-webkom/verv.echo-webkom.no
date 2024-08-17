"use server";

import { db } from "@/lib/db/drizzle";
import { userGroupMemberships, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { userFormSchema } from "./schemas";
import { auth } from "@/lib/auth/lucia";
import { getUserGroups } from "@/lib/db/queries";

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
    const { user: actionUser } = await auth();

    if (!actionUser) {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    const userGroups = await getUserGroups(actionUser.id);

    if (!userGroups.some((group) => group.id === "webkom")) {
      return {
        result: "error",
        message: "Unauthorized",
      };
    }

    const { groups } = userFormSchema.parse(data);

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
