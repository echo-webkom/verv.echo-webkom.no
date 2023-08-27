import { groupEnum } from "@/lib/db/schema";
import { z } from "zod";

export const userFormSchema = z.object({
  groups: z.enum(groupEnum.enumValues).array(),
  isAdmin: z.boolean(),
});
