import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { db } from "@/server/db/drizzle";
import { ensureAuth } from "@/server/lib/ensure";

export default async function Dashboard() {
  const { user } = await ensureAuth();

  const workspaces = await db.query.usersToWorkspaces
    .findMany({
      where: (row, { eq }) => eq(row.userId, user.id),
      with: {
        workspace: true,
      },
    })
    .then((rows) => rows.map((row) => row.workspace));

  return (
    <div className="container max-w-screen-sm p-8">
      <h1 className="mb-8 text-3xl font-semibold">Arbeidsområder</h1>

      <div>
        {workspaces.map((workspace) => (
          <Link key={workspace.id} href={`/workspaces/${workspace.id}`}>
            <div className="group mb-4 rounded-lg border-2 bg-gray-100 p-4">
              <h2 className="mb-2 text-lg font-bold group-hover:underline">{workspace.name}</h2>
              <p>{workspace.description}</p>
            </div>
          </Link>
        ))}

        <div>
          {workspaces.length === 0 && (
            <p className="text-center text-xl">Du har ingen arbeidsområder.</p>
          )}

          <div className="mx-auto mt-4 w-fit">
            <Button variant="link" asChild>
              <span>
                <Plus className="mr-2 h-4 w-4" />
                <Link href="/workspaces/create">Opprett arbeidsområde</Link>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
