"use client";

import { addMonths } from "date-fns";
import { X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Select } from "@/components/ui/select";
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const handleAddField = () => {
    append({
      title: "Spørsmål",
      type: "text",
      description: "",
      required: false,
    });
  };

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {fields.map((_field, index) => {
          const type = form.watch(`fields.${index}.type`);
          const showAlternativesField = ["checkbox", "radio", "select"].includes(type);

          return (
            <div className="relative rounded-lg border-2 p-4" key={index}>
              <button
                type="button"
                className="absolute right-2 top-2 text-red-300 transition-colors hover:text-red-500"
                onClick={() => remove(index)}
              >
                <X size={24} />
              </button>
              <div>
                <FormField
                  control={form.control}
                  name={`fields.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spørsmål {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Spørsmål..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Tittel på spørsmålet som skal vises i skjemaet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`fields.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beskrivelse</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Beskrivelse av spørsmål..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Beskrivelse av spørsmålet som skal vises under tittelen. Ikke påkrevd.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`fields.${index}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select {...field} className="block w-full">
                          <option value="text">Tekst</option>
                          <option value="textarea">Tekstområde</option>
                          <option value="checkbox">Avkryssningsboks</option>
                          <option value="radio">Radioknapper</option>
                          <option value="select">Rullegardin</option>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Velg hvilken type input som skal brukes for spørsmålet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showAlternativesField && (
                  <FormField
                    control={form.control}
                    name={`fields.${index}.options`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternativer</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Alternativer..." {...field} className="h-24" />
                        </FormControl>
                        <FormDescription>
                          Alternativer som skal vises for spørsmålet. Skriv hvert alternativ på en
                          ny linje.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name={`fields.${index}.required`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-4 p-4">
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          <FormLabel>Påkrev</FormLabel>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Om spørsmålet er påkrevd for å sende inn skjemaet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          );
        })}

        <div>
          <Button type="button" onClick={handleAddField}>
            Legg til spørsmål
          </Button>
        </div>

        <div>
          <Button type="submit">Opprett skjema</Button>
        </div>
      </form>
    </Form>
  );
};
