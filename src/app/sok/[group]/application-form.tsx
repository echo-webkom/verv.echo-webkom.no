"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Group, groupNames, studyNames, yearNames } from "@/lib/constants";
import { useTransition } from "react";
import { LoaderIcon } from "lucide-react";
import { submitApplication } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { formSchema } from "./schema";
import { User } from "@/lib/db/schema";

type ApplicationFormProps = {
  group: Group;
  user: User;
};

export const ApplicationForm = ({ group, user }: ApplicationFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email,
      reason: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const resp = await submitApplication(group, data);

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
                Vi vil bruke denne til å kontakte deg om intervju. Du kan endre
                e-post om du ikke ønsker å bruke din UiB e-post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Årstrinn</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          name="fieldOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Studieretning</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hvorfor vil du søke?</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder={`Jeg ønsker et verv i ${groupNames[group]} fordi...`}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Fortell oss litt om deg selv, hvorfor du vil være med i{" "}
                {groupNames[group]} og hva du kan bidra med.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />}
          <span>Send inn</span>
        </Button>
      </form>
    </Form>
  );
};
