import { cache } from "react";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { db } from "@/server/db/drizzle";
import { ensureMember } from "@/server/lib/ensure";

type Props = {
  params: {
    id: string;
  };
};

const getData = cache(async ({ params }: Props) => {
  const { id } = params;

  const workspace = await db.query.workspaces.findFirst({
    where: (row, { eq }) => eq(row.id, id),
  });

  if (!workspace) {
    notFound();
  }

  await ensureMember(id);

  return {
    workspace,
  };
});

export default async function Workspace(props: Props) {
  const { workspace } = await getData(props);

  return (
    <div className="flex items-center gap-10">
      <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-100">
        <h1 className="text-4xl font-medium">{workspace.name[0]}</h1>
      </div>
      <div>
        <h1 className="mb-4 text-4xl font-medium">{workspace.name}</h1>
        <Markdown>{workspace.description}</Markdown>
      </div>
    </div>
  );
}
