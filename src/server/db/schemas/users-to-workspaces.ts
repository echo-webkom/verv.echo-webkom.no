import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users, workspaces } from ".";

export const usersToWorkspaces = sqliteTable("user_to_workspace", {
  user_id: text("user_id")
    .notNull()
    .references(() => users.feide_id, { onDelete: "cascade" }),
  workspace_id: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
});

export const usersToWorkspacesRelations = relations(usersToWorkspaces, ({ one }) => ({
  user: one(users, {
    fields: [usersToWorkspaces.user_id],
    references: [users.feide_id],
  }),
  workspace: one(workspaces, {
    fields: [usersToWorkspaces.workspace_id],
    references: [workspaces.id],
  }),
}));
