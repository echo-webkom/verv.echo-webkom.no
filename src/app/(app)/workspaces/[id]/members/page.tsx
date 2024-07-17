import { db } from "@/server/db/drizzle";
import { ensureMember } from "@/server/lib/ensure";
import { InviteMemberButton } from "./_components/invite-member-button";
import { RemoveMemberButton } from "./_components/remove-member-button";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceMembers({ params }: Props) {
  await ensureMember(params.id);

  const members = await db.query.usersToWorkspaces.findMany({
    where: (row, { eq }) => eq(row.workspaceId, params.id),
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
            <RemoveMemberButton workspaceId={params.id} userId={member.user.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
