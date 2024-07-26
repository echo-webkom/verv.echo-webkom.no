"use client";

import { addMonths } from "date-fns";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createFormAction } from "../_actions/create-form";
import { CreateFormSchemaValues } from "../_types/create-form";
import { AddFieldButton } from "./add-field-button";
import { CreateFieldField } from "./create-field-field";
import { DescriptionField } from "./description-field";
import { ExpiresAtField } from "./expires-at-field";
import { NameField } from "./name-field";

type CreateFormFormProps = {
  workspaceId: string;
};

export const CreateFormForm = ({ workspaceId }: CreateFormFormProps) => {
  const { executeAsync, isExecuting } = useAction(createFormAction);
  const form = useForm<CreateFormSchemaValues>({
    defaultValues: {
      title: "",
      description: "",
      expiresAt: addMonths(new Date(), 1).toISOString().slice(0, 16),
      fields: [],
    },
  });

  const {
    fields,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await executeAsync({
      workspaceId,
      title: data.title,
      description: data.description,
      expiresAt: new Date(data.expiresAt),
      fields: data.fields.map((field, i) => ({
        index: i,
        title: field.title,
        description: field.description,
        type: field.type,
        options: "options" in field ? field.options : [],
        required: field.required,
      })),
    });

    if (result?.data?.ok) {
      toast.success("Skjema opprettet");
      form.reset();
    } else {
      toast.error(result?.data?.message);
    }
  });

  const handleAddField = () => {
    appendField({
      title: `Spørsmål ${fields.length + 1}`,
      type: "text",
      description: "",
      required: false,
    });
  };

  const handleRemoveField = (index: number) => {
    removeField(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <NameField />

        <DescriptionField />

        <ExpiresAtField />

        {fields.map((field, index) => {
          return <CreateFieldField key={field.id} index={index} onRemove={handleRemoveField} />;
        })}

        <AddFieldButton onClick={handleAddField} />

        <div className="flex w-full justify-end border-t border-gray-200 py-4">
          <Button type="submit" disabled={isExecuting}>
            {isExecuting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isExecuting ? "Oppretter skjema..." : "Opprett skjema"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
