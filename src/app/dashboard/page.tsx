import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Group, groupNames } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { applications } from "@/lib/db/schema";
import { DividerVerticalIcon } from "@radix-ui/react-icons";

const applicationCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .prepare("application-count");

const webkomCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .where(eq(applications.groupId, "webkom"))
  .prepare("webkom-count");

const bedkomCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .where(eq(applications.groupId, "bedkom"))
  .prepare("webkom-count");

export default async function Dashboard() {
  const user = await getUser();

  if (!user || (user?.groupsMemberships.length === 0 && !user?.isAdmin)) {
    return redirect("/");
  }

  const applicationCount = (await applicationCountStmt.execute())[0].count;

  const webkomCount = (await webkomCountStmt.execute())[0].count;
  const bedkomCount = (await bedkomCountStmt.execute())[0].count;

  const isWebkomOrBedkomOrAdmin =
    user.isAdmin ||
    user.groupsMemberships.some(
      (group) => group.id === "webkom" || group.id === "bedkom"
    );

  const percentageWebkom =
    (webkomCount / (Number(webkomCount) + Number(bedkomCount))) * 100;

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Du er logget inn som {user.name}.</p>
      <p>
        Grupper du er medlem av er:{" "}
        <span className="font-medium">
          {user.groupsMemberships
            .map((group) => groupNames[group.id])
            .join(", ")}
        </span>
      </p>

      <p>Antall søkere: {applicationCount}</p>

      {user.isAdmin && (
        <Button asChild>
          <Link href="/dashboard/admin">Til admin dashboard</Link>
        </Button>
      )}

      {isWebkomOrBedkomOrAdmin && (
        <div className="py-4 flex flex-col gap-10">
          <div className="flex justify-between items-center">
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
            <div className="w-full h-4 rounded-full flex flex-row items-center overflow-hidden">
              <div
                className="bg-blue-400 h-full"
                style={{
                  width: `${percentageWebkom}%`,
                }}
              />
              <div
                className="bg-red-400 h-full"
                style={{
                  width: `${100 - percentageWebkom}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      <ul className="divide-y">
        {Object.entries(groupNames).map(([id, name]) => {
          const isMember =
            user.isAdmin ||
            user.groupsMemberships
              .map((group) => group.id)
              .includes(id as Group);

          return (
            <li className="flex flex-col py-3" key={id}>
              <a className="group" href={`/dashboard/${id}`}>
                <span className="mr-2">{isMember ? "✅" : "❌"}</span>
                <span className="group-hover:underline">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
