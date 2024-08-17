import { relations } from "drizzle-orm";
import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { groupEnum } from "./enums";
import { users } from "./users";

export const memberships = sqliteTable(
  "membership",
  {
    groupId: text("group_id", { enum: groupEnum }).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (ugm) => ({
    pk: primaryKey({ columns: [ugm.userId, ugm.groupId] }),
  })
);

export const userGroupMembershipsRelations = relations(
  memberships,
  ({ one }) => ({
    user: one(users, {
      fields: [memberships.userId],
      references: [users.id],
    }),
  })
);
