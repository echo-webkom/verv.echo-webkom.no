import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const sessions = sqliteTable("session", {
  id: text().notNull().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id),
  expiresAt: integer().notNull(),
});
