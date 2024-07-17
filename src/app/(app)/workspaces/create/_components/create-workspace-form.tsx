"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
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
import { createWorkspaceAction } from "../_actions/create-workspace";
import { CreateWorkspaceFormSchema, CreateWorkspaceFormValues } from "../_types/create-workspace";

export const CreateWorkspaceForm = () => {
  const { executeAsync, isExecuting } = useAction(createWorkspaceAction);

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(CreateWorkspaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await executeAsync(values);

    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Navn på arbeidsområde" {...field} />
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
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormDescription>
                Beskrivelse av arbeidsområdet. Dette kan være en kort beskrivelse av hva
                arbeidsområdet handler om og hva som er hensikten med det.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button type="submit" disabled={isExecuting}>
            {isExecuting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isExecuting ? "Oppretter arbeidsområde..." : "Opprett arbeidsområde"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
