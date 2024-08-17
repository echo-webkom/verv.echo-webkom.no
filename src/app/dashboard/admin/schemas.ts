import { z } from "zod";

import { groupEnum } from "@/lib/db/schemas";

export const userFormSchema = z.object({
  groups: z.enum(groupEnum).array(),
});
