import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { db } from "@/server/db/drizzle";
import { requireAuth } from "@/server/lib/require";

export default async function Dashboard() {
  const { user } = await requireAuth();

  const workspaces = await db.query.usersToWorkspaces
    .findMany({
      where: (row, { eq }) => eq(row.userId, user.id),
      with: {
        workspace: true,
      },
    })
    .then((rows) => rows.map((row) => row.workspace));

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
        <p className="mb-4">Velg en av dine arbeidsområder for å fortsette.</p>
      </div>

      <div className="p-8">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="mb-4 rounded bg-gray-100 p-4">
            <h2 className="mb-2 text-lg font-bold">{workspace.name}</h2>
            <p>{workspace.description}</p>
          </div>
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
