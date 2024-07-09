import { ensureMember } from "@/server/lib/ensure";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceMembers(props: Props) {
  await ensureMember(props.params.id);

  return (
    <div>
      <h1 className="text-3xl font-semibold">Medlemmer</h1>
    </div>
  );
}
