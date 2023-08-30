import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Group, groupNames } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";
import { applications } from "@/lib/db/schema";

const applicationCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications)
  .prepare("application-count");

export default async function Dashboard() {
  const user = await getUser();

  if (!user || (user?.groupsMemberships.length === 0 && !user?.isAdmin)) {
    return redirect("/");
  }

  const applicationCount = (await applicationCountStmt.execute())[0].count;

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
