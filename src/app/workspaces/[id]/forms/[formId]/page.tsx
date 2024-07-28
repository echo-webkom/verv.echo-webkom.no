import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { db } from "@/server/db/drizzle";
import { CopyLink } from "./_components/copy-link";

type Props = {
  params: {
    id: string;
    formId: string;
  };
};

const getData = async ({ params }: Props) => {
  const { id, formId } = params;

  const form = await db.query.forms.findFirst({
    where: (row, { eq, and }) => and(eq(row.workspaceId, id), eq(row.id, formId)),
    with: {
      fields: true,
      workspace: true,
    },
  });

  if (!form) {
    return notFound();
  }

  return {
    form,
  };
};

export default async function Form({ params }: Props) {
  const { form } = await getData({ params });

  return (
    <div className="container flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">{form.title}</h1>
      <CopyLink formId={form.id} />

      <div className="bg-gray-100 p-8">
        <p>{form.description}</p>
      </div>
    </div>
  );
}
