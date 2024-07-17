import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { db } from "@/server/db/drizzle";
import { ensureMember } from "@/server/lib/ensure";
import { InviteMemberButton } from "./_components/invite-member-button";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceMembers(props: Props) {
  await ensureMember(props.params.id);

  const members = await db.query.usersToWorkspaces.findMany({
    where: (row, { eq }) => eq(row.workspaceId, props.params.id),
    with: {
      user: true,
    },
  });

  return (
    <main>
      <h1 className="mb-4 text-3xl font-semibold">Medlemmer</h1>

      <div className="mb-8">
        <InviteMemberButton />
      </div>

      <ul>
        {members.map((member) => (
          <li key={member.user.id} className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-semibold">{member.user.name}</h2>
                <p className="text-sm text-gray-500">{member.user.email}</p>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="icon" className="transition-colors hover:text-red-500">
                <X size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
