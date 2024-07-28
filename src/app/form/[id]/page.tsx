import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { db } from "@/server/db/drizzle";
import { RenderForm } from "./_components/render-form";

type Props = {
  params: {
    id: string;
  };
};

const getData = cache(async ({ params }: Props) => {
  const { id } = params;

  const form = await db.query.forms.findFirst({
    where: (row, { eq }) => eq(row.id, id),
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
});

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { form } = await getData({ params });

  return {
    title: form.title,
  };
};

export default async function FormPage({ params }: Props) {
  const { form } = await getData({ params });

  return (
    <div>
      <RenderForm form={form} fields={form.fields} />
    </div>
  );
}
