import { JSONContent } from "@tiptap/react";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { groupEnum } from "./enums";
import { memberships } from "./memberships";
import { questions } from "./questions";

export const groups = sqliteTable("group", {
  id: text({ enum: groupEnum }).notNull().primaryKey(),
  description: text({ mode: "json" }).$type<JSONContent>(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  members: many(memberships),
  questions: many(questions),
}));
