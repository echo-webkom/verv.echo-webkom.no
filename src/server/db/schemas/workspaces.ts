import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { forms, usersToWorkspaces } from ".";

export const workspaces = sqliteTable("workspace", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  members: many(usersToWorkspaces),
  forms: many(forms),
}));

export type Workspace = InferSelectModel<typeof workspaces>;
export type WorkspaceInsert = InferInsertModel<typeof workspaces>;
