import { getServerSession as _getServerSession } from "next-auth/next";
import { authOptions } from "./auth-options";
import { selectUserById } from "./db/queries";

export const getSession = async () => {
  const session = await _getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session;
};

export const getUser = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await selectUserById.execute({
    id: session.user.id,
  });

  return user;
};
