import { InferSelectModel, relations } from "drizzle-orm";
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const accounts = sqliteTable(
  "account",
  {
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    accessToken: text(),
  },
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export type Account = InferSelectModel<typeof accounts>;
