"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { AuthUser } from "@/lib/auth/lucia";
import { Group, studyNames, yearNames } from "@/lib/constants";
import { Question } from "@/lib/db/schemas";
import { createFormSchema } from "../_lib/schema";
import { submitApplicationAction } from "../actions";

export type ApplicationFormProps = {
  group: Group;
  user: AuthUser;
  questions: Array<Question>;
};

export const ApplicationForm = ({ group, user, questions }: ApplicationFormProps) => {
  const { toast } = useToast();
  const formSchema = createFormSchema(questions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Fields like `year`, `study` and `questions` are by default `undefined`,
    // so we don't need to explicitly set them here.
    defaultValues: {
      name: user.name ?? "",
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const resp = await submitApplicationAction(group, data);

    if (resp.result === "success") {
      form.reset();

      toast({
        title: "Søknad sendt!",
        description: "Vi vil kontakte deg om intervju.",
      });
    }

    if (resp.result === "error") {
      toast({
        title: "Noe gikk galt",
        description: resp.message,
        variant: "destructive",
      });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input placeholder="Ola Nordmann" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-post</FormLabel>
              <FormControl>
                <Input placeholder="ola.nordmann@echo.uib.no" {...field} />
              </FormControl>
              <FormDescription>
                Vi vil bruke denne til å kontakte deg om intervju. Du kan endre e-post om du ikke
                ønsker å bruke din UiB e-post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Årstrinn</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg ditt årstrinn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(yearNames).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="study"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Studieretning</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg din studieretning" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(studyNames).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {questions.map((question) => (
          <FormField
            key={question.id}
            control={form.control}
            name={`questions.${question.id}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.label}</FormLabel>
                <FormControl>
                  {question.type === "input" ? (
                    <Input
                      placeholder={question.placeholder ?? "Svar her"}
                      type="text"
                      {...field}
                    />
                  ) : (
                    <Textarea
                      rows={6}
                      placeholder={question.placeholder ?? "Svar her"}
                      {...field}
                    />
                  )}
                </FormControl>
                {question.description && <FormDescription>{question.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">
          <span>Send inn</span>
        </Button>
      </form>
    </Form>
  );
};
