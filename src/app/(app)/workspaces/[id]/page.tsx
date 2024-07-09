import { cache } from "react";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { db } from "@/server/db/drizzle";

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

  return {
    workspace,
  };
});

export default async function Workspace(props: Props) {
  const { workspace } = await getData(props);

  return (
    <div className="container mx-auto">
      <h1>{workspace.name}</h1>
      <Markdown>{workspace.description}</Markdown>
    </div>
  );
}
