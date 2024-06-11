import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users, workspaces } from ".";

export const usersToWorkspaces = sqliteTable("user_to_workspace", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
});

export const usersToWorkspacesRelations = relations(usersToWorkspaces, ({ one }) => ({
  user: one(users, {
    fields: [usersToWorkspaces.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [usersToWorkspaces.workspaceId],
    references: [workspaces.id],
  }),
}));
