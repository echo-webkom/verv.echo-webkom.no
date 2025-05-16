import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { groupEnum, studyEnum, yearEnum } from "./enums";
import { users } from "./users";

export const applications = sqliteTable(
  "application",
  {
    id: text().notNull().primaryKey().$defaultFn(nanoid),
    name: text().notNull(),
    email: text().notNull(),
    yearOfStudy: text({ enum: yearEnum }).notNull(),
    fieldOfStudy: text({ enum: studyEnum }).notNull(),
    reason: text().notNull(),
    userId: text()
      .notNull()
      .references(() => users.id),
    groupId: text({ enum: groupEnum }).notNull(),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [uniqueIndex("group_email_index").on(t.groupId, t.email)],
);

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));

export type Application = InferSelectModel<typeof applications>;
