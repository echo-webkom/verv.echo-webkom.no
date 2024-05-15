import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from ".";

export const sessions = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.feide_id),
  expires_at: integer("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.user_id],
    references: [users.feide_id],
  }),
}));

export type Session = (typeof sessions)["$inferSelect"];
export type SessionInsert = (typeof sessions)["$inferInsert"];
