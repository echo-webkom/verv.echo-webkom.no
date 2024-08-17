import {
  text,
  primaryKey,
  integer,
  uniqueIndex,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { nanoid } from "nanoid";

export const yearEnum = ["1", "2", "3", "4", "5"] as const;

export const studyEnum = [
  "DTEK",
  "DSIK",
  "DVIT",
  "BINF",
  "IMO",
  "INF",
  "PROG",
  "DSC",
  "OTHER",
] as const;

export const groupEnum = [
  "webkom",
  "tilde",
  "bedkom",
  "makerspace",
  "hyggkom",
  "gnist",
  "esc",
  "programmerbar",
] as const;

export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  groupsMemberships: many(userGroupMemberships),
  applications: many(applications),
}));

export type User = InferSelectModel<typeof users>;

export const accounts = sqliteTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    accessToken: text("access_token"),
  },
  (account) => ({
    pk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const userGroupMemberships = sqliteTable(
  "user_group_membership",
  {
    id: text("id", { enum: groupEnum }).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (ugm) => ({
    compoundKey: primaryKey({ columns: [ugm.userId, ugm.id] }),
  })
);

export const userGroupMembershipsRelations = relations(
  userGroupMemberships,
  ({ one }) => ({
    user: one(users, {
      fields: [userGroupMemberships.userId],
      references: [users.id],
    }),
  })
);

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
      application.email
    ),
  })
);

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));

export type Application = InferSelectModel<typeof applications>;
