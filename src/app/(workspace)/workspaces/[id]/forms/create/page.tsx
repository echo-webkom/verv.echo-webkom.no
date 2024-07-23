import { ensureMember } from "@/server/lib/ensure";
import { CreateFormForm } from "./_components/create-form-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function CreateWorkspaceForm(props: Props) {
  await ensureMember(props.params.id);

  return (
    <div className="pb-32">
      <h1 className="mb-6 text-3xl font-semibold">Opprett skjema</h1>

      <CreateFormForm workspaceId={props.params.id} />
    </div>
  );
}
