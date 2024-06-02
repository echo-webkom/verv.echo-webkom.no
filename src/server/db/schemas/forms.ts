import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { workspaces } from ".";
import { now } from "../utils";

export const forms = sqliteTable("form", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(now),
});

export const formsRelations = relations(forms, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [forms.workspaceId],
    references: [workspaces.id],
  }),
}));

export type Form = (typeof forms)["$inferSelect"];
export type FormInsert = (typeof forms)["$inferInsert"];
