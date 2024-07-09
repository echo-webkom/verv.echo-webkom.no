import { z } from "zod";

export const CreateWorkspaceFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});

export type CreateWorkspaceFormValues = z.infer<typeof CreateWorkspaceFormSchema>;
