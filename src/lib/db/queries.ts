import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./drizzle";
import { Group } from "../constants";

export const selectAllUsers = () =>
  db.query.users.findMany({
    with: {
      groupsMemberships: true,
    },
    orderBy: (user) => desc(user.name),
  });

export const selectUserById = db.query.users.findFirst({
  where: (user) => eq(user.id, sql.placeholder("id")),
  with: {
    groupsMemberships: true,
  },
});

export const getUserGroups = (userId: string) =>
  db.query.userGroupMemberships.findMany({
    where: (userGroupMembership) => eq(userGroupMembership.userId, userId),
  });

export const selectApplicationsByGroup = (group: Group) =>
  db.query.applications.findMany({
    where: (application) => eq(application.groupId, group),
    orderBy: (application) => asc(application.createdAt),
  });

export const selectApplicationsByUser = (userId: string) =>
  db.query.applications.findMany({
    where: (application) => eq(application.userId, userId),
    orderBy: (application) => desc(application.createdAt),
  });
