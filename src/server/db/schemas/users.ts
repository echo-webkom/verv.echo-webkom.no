import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { sessions, usersToWorkspaces } from ".";

export const users = sqliteTable("user", {
  feide_id: text("feide_id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  workspaces: many(usersToWorkspaces),
}));

export type User = (typeof users)["$inferSelect"];
export type UserInsert = (typeof users)["$inferInsert"];
