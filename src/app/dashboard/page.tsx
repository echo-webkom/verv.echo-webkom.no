import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Group, groupNames } from "@/lib/constants";
import { db } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";
import { applications } from "@/lib/db/schemas";
import { auth } from "@/lib/auth/lucia";
import { isWebkom } from "@/lib/is-member-of";
import { WebkomVsBedkom } from "./_components/webkom-vs-bedkom";

const applicationCountStmt = db
  .select({
    count: sql<number>`count(*)`,
  })
  .from(applications);

export default async function Dashboard() {
  const user = await auth();

  if (!user || !user.groups.length) {
    return redirect("/logg-inn");
  }

  const applicationCount = await applicationCountStmt
    .execute()
    .then((res) => res[0].count);

  return (
    <main className="space-y-4 max-w-2xl w-full mx-auto px-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Antall søkere: {applicationCount}</p>

      <WebkomVsBedkom />

      {isWebkom(user) && (
        <Button className="w-full" asChild>
          <Link href="/dashboard/admin">Til admin dashboard</Link>
        </Button>
      )}

      <ul className="divide-y">
        {Object.entries(groupNames).map(([id, name]) => {
          const isMember = user.groups.includes(id as Group) || isWebkom(user);

          if (!isMember) {
            return null;
          }

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
