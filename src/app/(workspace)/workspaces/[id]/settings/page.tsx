import { notFound } from "next/navigation";

import { db } from "@/server/db/drizzle";
import { ensureMember } from "@/server/lib/ensure";
import { ChangeDescriptionField } from "./_components/change-description-field";
import { ChangeNameField } from "./_components/change-name-field";
import { DeleteWorkspaceField } from "./_components/delete-workspace-field";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceSettings(props: Props) {
  await ensureMember(props.params.id);

  const workspace = await db.query.workspaces.findFirst({
    where: (row, { eq }) => eq(row.id, props.params.id),
  });
  if (!workspace) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Innstillinger</h1>

      <ChangeNameField workspaceId={workspace.id} initialName={workspace.name} />
      <ChangeDescriptionField
        workspaceId={workspace.id}
        initialDescription={workspace.description}
      />
      <DeleteWorkspaceField />
    </div>
  );
}
