import { asc, desc, eq } from "drizzle-orm";

import { Group } from "../constants";
import { db } from "./drizzle";

export const selectAllUsers = () =>
  db.query.users.findMany({
    with: {
      memberships: true,
    },
    orderBy: (user) => desc(user.name),
  });

export type SelectApplicationByGroupQuery = Awaited<ReturnType<typeof selectApplicationsByGroup>>;

export const selectApplicationsByGroup = (group: Group) =>
  db.query.applications.findMany({
    where: (application) => eq(application.groupId, group),
    orderBy: (application) => asc(application.createdAt),
    with: {
      user: {
        with: {
          applications: {
            columns: {
              groupId: true,
            },
          },
        },
      },
    },
  });

export const selectApplicationsByUser = (userId: string) =>
  db.query.applications.findMany({
    where: (application) => eq(application.userId, userId),
    orderBy: (application) => desc(application.createdAt),
  });
