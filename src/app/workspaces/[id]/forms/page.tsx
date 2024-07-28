import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { db } from "@/server/db/drizzle";
import { ensureMember } from "@/server/lib/ensure";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceForms(props: Props) {
  await ensureMember(props.params.id);

  const forms = await db.query.forms.findMany({
    where: (row, { eq }) => eq(row.workspaceId, props.params.id),
    with: {
      fields: true,
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Skjemaer</h1>

      <div>
        <Button variant="secondary" className="hover:underline" asChild>
          <Link className="gap-2" href={`/workspaces/${props.params.id}/forms/create`}>
            <Plus className="h-4 w-4" />
            Opprett skjema
          </Link>
        </Button>
      </div>

      <ul>
        {forms.map((form) => (
          <li key={form.id} className="border-b p-4">
            <Link className="group" href={`/workspaces/${props.params.id}/forms/${form.id}`}>
              <h2 className="text-lg font-semibold group-hover:underline">{form.title}</h2>
              <p className="text-sm text-gray-500">{form.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
