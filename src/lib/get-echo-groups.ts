import { Group } from "./constants";
import { groupEnum } from "./db/schemas";

const url = process.env.GROUPS_API_URL;

const isValidGroup = (group: string): group is Group => {
  return groupEnum.includes(group as Group);
};

export const getEchoGroups = async (feideId: string) => {
  if (!url) {
    return [];
  }

  const fetchUrl = new URL(url);
  fetchUrl.searchParams.set("feideId", feideId);

  const response = await fetch(fetchUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ADMIN_KEY}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  const groups = (await response.json()) as Array<string>;

  const filteredGroups = groups.filter(isValidGroup);

  return filteredGroups;
};
