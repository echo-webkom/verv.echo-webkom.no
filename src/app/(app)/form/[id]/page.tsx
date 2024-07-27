import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/server/db/drizzle";
import { Field } from "@/server/db/schemas";

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

export default async function Form({ params }: Props) {
  const { form } = await getData({ params });

  return (
    <div className="container flex max-w-[1000px] flex-col gap-6 py-12">
      <h1 className="text-3xl font-semibold">{form.title}</h1>
      <div className="text-lg text-muted-foreground">
        {form.description?.split("\n").map((line, i) => (
          <p className="py-2" key={i}>
            {line}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-14 rounded-lg border-2 border-gray-200 bg-gray-100 p-8">
        {form.fields.map((field) => (
          <FieldRenderer key={field.id} field={field} />
        ))}

        <div className="flex w-full justify-end border-t border-gray-200 py-4">
          <Button type="submit">Send inn</Button>
        </div>
      </div>
    </div>
  );
}

const FieldRenderer = ({ field }: { field: Field }) => {
  const options = field.options ?? [];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">{field.title}</h2>

      {field.type === "text" && (
        <div>
          <Input placeholder="Skriv her..." />
        </div>
      )}

      {field.type === "textarea" && (
        <div>
          <Textarea placeholder="Skriv her..." />
        </div>
      )}

      {field.type === "checkbox" && (
        <div>
          {options.map((option) => (
            <div key={option}>
              <Input type="checkbox" value={option} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}

      {field.type === "radio" && (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div className="flex items-center gap-3" key={option}>
              <input type="radio" value={option} id={option} name={field.id} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}

      {field.type === "select" && (
        <div>
          <select>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      )}
      <p className="text-sm text-muted-foreground">{field.description}</p>
    </div>
  );
};
