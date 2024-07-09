"use client";

import { addMonths } from "date-fns";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateFormSchemaValues } from "../_types/create-form";

type CreateFormFormProps = {
  workspaceId: string;
};

export const CreateFormForm = ({ workspaceId }: CreateFormFormProps) => {
  const form = useForm<CreateFormSchemaValues>({
    defaultValues: {
      title: "",
      description: "",
      expiresAt: addMonths(new Date(), 1).toISOString().slice(0, 16),
      fields: [],
    },
  });

  const handleAddField = () => {
    form.setValue("fields", [
      ...form.getValues().fields,
      {
        title: "",
        description: "",
        type: "text",
        required: false,
      },
    ]);
  };

  const fields = form.getValues().fields;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navn på skjema..." {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivelse</FormLabel>
              <FormControl>
                <Textarea placeholder="Beskrivelse av skjema..." {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Utløper</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" onClick={handleAddField}>
          Legg til spørsmål
        </Button>

        {fields.map((field, index) => {
          return (
            <div className="rounded-lg border-2 p-4" key={index}>
              <FormField
                control={form.control}
                name={`fields.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spørsmål {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Spørsmål..." value={field.value.title} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}
      </form>
    </Form>
  );
};
