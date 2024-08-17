import { groupEnum } from "@/lib/db/schemas";
import { z } from "zod";

export const userFormSchema = z.object({
  groups: z.enum(groupEnum).array(),
});
