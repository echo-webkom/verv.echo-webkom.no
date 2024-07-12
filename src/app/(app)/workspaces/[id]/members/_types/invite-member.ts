import { z } from "zod";

export const InviteMemberSchema = z.object({
  email: z.string().email(),
});

export type InviteMemberFormValues = z.infer<typeof InviteMemberSchema>;
