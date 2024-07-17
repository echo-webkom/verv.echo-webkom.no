import { db } from "../db/drizzle";

export const isMemberOfWorksapce = async (userId: string, workspaceId: string) => {
  const members = await db.query.usersToWorkspaces.findMany({
    where: (row, { eq }) => eq(row.userId, userId) && eq(row.workspaceId, workspaceId),
  });

  return members.length > 0;
};
