import { AuthUser } from "./auth/lucia";
import { Group } from "./constants";

export const isMemberOf = (user: AuthUser, groups: Array<Group>) => {
  return groups.some((group) => user.groups.includes(group));
};

export const isWebkom = (user: AuthUser) => {
  return isMemberOf(user, ["webkom"]);
};
