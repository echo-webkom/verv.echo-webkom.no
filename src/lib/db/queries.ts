import { desc, eq, sql } from "drizzle-orm";
import { db } from "./drizzle";

export const selectAllUsers = db.query.users
  .findMany()
  .prepare("select-all-users");

export const selectUserById = db.query.users
  .findFirst({
    where: (user) => eq(user.id, sql.placeholder("id")),
    with: {
      groups: true,
    },
  })
  .prepare("select-user-by-id");

export const selectApplicationsByGroup = db.query.applications
  .findMany({
    where: (application) => eq(application.group, sql.placeholder("group")),
    orderBy: (application) => desc(application.createdAt),
  })
  .prepare("get-applications-by-group");
