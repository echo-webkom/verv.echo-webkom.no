import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { workspaces } from ".";
import { now } from "../utils";
import { fields } from "./fields";

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

export const formsRelations = relations(forms, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [forms.workspaceId],
    references: [workspaces.id],
  }),
  fields: many(fields),
}));

export type Form = InferSelectModel<typeof forms>;
export type FormInsert = InferInsertModel<typeof forms>;
