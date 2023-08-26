import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { InferSelectModel, relations } from "drizzle-orm";

export const yearEnum = pgEnum("year_enum", ["1", "2", "3", "4", "5"]);

export const studyEnum = pgEnum("study_enum", [
  "DTEK",
  "DSIK",
  "DVIT",
  "BINF",
  "IMO",
  "INF",
  "PROG",
  "DSC",
  "OTHER",
]);

export const groupEnum = pgEnum("group_enum", [
  "webkom",
  "tilde",
  "bedkom",
  "makerspace",
  "hyggkom",
  "gnist",
  "esc",
  "bar",
]);

export const roleEnum = pgEnum("role_enum", ["admin", "leader"]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roleEnum("role"),
});

export const usersRelations = relations(users, ({ many }) => ({
  groups: many(userGroups),
}));

export type User = InferSelectModel<typeof users>;
export type UserWithGroups = InferSelectModel<typeof users> & {
  groups: Array<UserGroup>;
};

export const userGroups = pgTable(
  "userGroup",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    group: groupEnum("group").notNull(),
  },
  (userGroup) => ({
    compoundKey: primaryKey(userGroup.userId, userGroup.group),
  })
);

export type UserGroup = InferSelectModel<typeof userGroups>;

export const userGroupsRelations = relations(userGroups, ({ one }) => ({
  user: one(users, {
    fields: [userGroups.userId],
    references: [users.id],
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    yearOfStudy: yearEnum("year").notNull(),
    fieldOfStudy: studyEnum("study").notNull(),
    reason: text("body").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    group: groupEnum("group").notNull(),
    ip: varchar("ip", { length: 255 }).notNull(),
  },
  (application) => ({
    groupEmailSemesterIndex: uniqueIndex("group_email_semester_index").on(
      application.group,
      application.email
    ),
  })
);

export type Application = InferSelectModel<typeof applications>;
