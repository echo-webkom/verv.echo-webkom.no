import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./drizzle";

export const selectAllUsers = db.query.users
  .findMany({
    with: {
      groupsMemberships: true,
    },
    orderBy: (user) => desc(user.name),
  })
  .prepare("select-all-users");

export type UserWithGroups = Awaited<
  ReturnType<(typeof selectAllUsers)["execute"]>
>[number];

export const selectUserById = db.query.users
  .findFirst({
    where: (user) => eq(user.id, sql.placeholder("id")),
    with: {
      groupsMemberships: true,
    },
  })
  .prepare("select-user-by-id");

export const selectApplicationsByGroup = db.query.applications
  .findMany({
    where: (application) => eq(application.groupId, sql.placeholder("group")),
    orderBy: (application) => asc(application.createdAt),
  })
  .prepare("get-applications-by-group");

export const selectApplicationsByUser = db.query.applications
  .findMany({
    where: (application) => eq(application.userId, sql.placeholder("userId")),
    orderBy: (application) => desc(application.createdAt),
  })
  .prepare("get-applications-by-user");
