import { ensureMember } from "@/server/lib/ensure";
import { InviteMemberButton } from "./_components/invite-member-button";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceMembers(props: Props) {
  await ensureMember(props.params.id);

  return (
    <main>
      <h1 className="mb-4 text-3xl font-semibold">Medlemmer</h1>

      <InviteMemberButton />
    </main>
  );
}
