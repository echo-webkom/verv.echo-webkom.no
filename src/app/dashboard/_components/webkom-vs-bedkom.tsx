import { eq, sql } from "drizzle-orm";

import { auth } from "@/lib/auth/lucia";
import { db } from "@/lib/db/drizzle";
import { applications } from "@/lib/db/schemas";
import { isMemberOf } from "@/lib/is-member-of";

const webkomCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .where(eq(applications.groupId, "webkom"));

const bedkomCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .where(eq(applications.groupId, "bedkom"));

export const WebkomVsBedkom = async () => {
  const user = await auth();

  if (!user) {
    return null;
  }

  const isWebkomOrBedkom = isMemberOf(user, ["webkom", "bedkom"]);

  if (!isWebkomOrBedkom) {
    return null;
  }

  const [webkomCount, bedkomCount] = await Promise.all([
    webkomCountStmt.execute(),
    bedkomCountStmt.execute(),
  ]).then((res) => res.map((r) => r[0].count));

  const percentageWebkom = (webkomCount / (Number(webkomCount) + Number(bedkomCount))) * 100;

  return (
    <div className="flex flex-col gap-10 py-4">
      <div className="flex items-center justify-between">
        <div className="w-full text-center">
          <h2 className="font-bold">Webkom</h2>
          <p className="text-6xl">{webkomCount}</p>
        </div>

        <div className="text-lg">vs.</div>

        <div className="w-full text-center">
          <h2 className="font-bold">Bedkom</h2>
          <p className="text-6xl">{bedkomCount}</p>
        </div>
      </div>

      <div>
        <div className="flex h-4 w-full flex-row items-center overflow-hidden rounded-full">
          <div
            className="h-full bg-blue-400"
            style={{
              width: `${percentageWebkom}%`,
            }}
          />
          <div
            className="h-full bg-red-400"
            style={{
              width: `${100 - percentageWebkom}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
