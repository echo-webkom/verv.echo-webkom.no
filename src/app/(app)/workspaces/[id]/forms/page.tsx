import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ensureMember } from "@/server/lib/ensure";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkspaceForms(props: Props) {
  await ensureMember(props.params.id);

  return (
    <div className="flex max-w-screen-md flex-col gap-8">
      <h1 className="text-3xl font-semibold">Skjemaer</h1>

      <div>
        <Button variant="secondary" className="hover:underline" asChild>
          <Link className="gap-2" href={`/workspaces/${props.params.id}/forms/create`}>
            <Plus className="h-4 w-4" />
            Opprett skjema
          </Link>
        </Button>
      </div>
    </div>
  );
}
