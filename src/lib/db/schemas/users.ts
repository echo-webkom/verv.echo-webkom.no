import { relations, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { applications } from "./applications";
import { memberships } from "./memberships";

export const users = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(nanoid),
  name: text("name"),
  email: text("email").unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
  applications: many(applications),
}));

export type User = InferSelectModel<typeof users>;
