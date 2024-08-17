import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Group, groupNames } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { eq, sql } from "drizzle-orm";
import { applications } from "@/lib/db/schemas";
import { auth } from "@/lib/auth/lucia";
import { isMemberOf, isWebkom } from "@/lib/is-member-of";

const applicationCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications);

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

export default async function Dashboard() {
  const user = await auth();

  if (!user || !user.groups.length) {
    return redirect("/logg-inn");
  }

  const [applicationCount, webkomCount, bedkomCount] = await Promise.all([
    applicationCountStmt.execute(),
    webkomCountStmt.execute(),
    bedkomCountStmt.execute(),
  ]).then((res) => res.map((r) => r[0].count));

  const isWebkomOrBedkom = isMemberOf(user, ["webkom", "bedkom"]);

  const percentageWebkom =
    (webkomCount / (Number(webkomCount) + Number(bedkomCount))) * 100;

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Du er logget inn som {user.name}.</p>
      <p>
        Grupper du er medlem av er:{" "}
        <span className="font-medium">
          {user.groups.map((group) => groupNames[group]).join(", ")}
        </span>
      </p>

      <p>Antall søkere: {applicationCount}</p>

      {isWebkom(user) && (
        <Button asChild>
          <Link href="/dashboard/admin">Til admin dashboard</Link>
        </Button>
      )}

      {isWebkomOrBedkom && (
        <div className="py-4 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div className="w-full text-center">
              <h2 className="font-bold">Webkom</h2>
              <p className="text-6xl">{webkomCount}</p>
            </div>

            <div className="text-lg">vs.</div>

            <div className="w-full text-center">
              <h2 className="font-bold">Gnist</h2>
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
          const isMember = user.groups.includes(id as Group) || isWebkom(user);

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
