import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { workspaces } from "./workspaces";

export const invitations = sqliteTable("invitation", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull(),
  workspaceId: text("workspace_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const invitationsRelations = relations(invitations, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [invitations.workspaceId],
    references: [workspaces.id],
  }),
}));

export type Invitation = InferSelectModel<typeof invitations>;
export type InvitationInsert = InferInsertModel<typeof invitations>;
