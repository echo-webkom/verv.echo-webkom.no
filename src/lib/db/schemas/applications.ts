import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { groupEnum, studyEnum, yearEnum } from "./enums";
import { users } from "./users";

export const applications = sqliteTable(
  "application",
  {
    id: text("id").notNull().primaryKey().$defaultFn(nanoid),
    name: text("name").notNull(),
    email: text("email").notNull(),
    yearOfStudy: text("year", { enum: yearEnum }).notNull(),
    fieldOfStudy: text("study", { enum: studyEnum }).notNull(),
    reason: text("body").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    groupId: text("group_id", { enum: groupEnum }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (application) => ({
    groupEmailSemesterIndex: uniqueIndex("group_email_index").on(
      application.groupId,
      application.email,
    ),
  }),
);

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));

export type Application = InferSelectModel<typeof applications>;
