import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

import { sessions, usersToWorkspaces } from ".";

export const users = sqliteTable(
  "user",
  {
    id: text("id").notNull().primaryKey(),
    feideId: text("feide_id").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
  },
  (t) => ({
    feideIdx: uniqueIndex("feide_idx").on(t.feideId),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  workspaces: many(usersToWorkspaces),
}));

export type User = InferSelectModel<typeof users>;
export type UserInsert = InferInsertModel<typeof users>;
