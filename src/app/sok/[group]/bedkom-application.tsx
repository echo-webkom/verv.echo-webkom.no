"use client";

import { ApplicationFormProps } from "./application-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { yearNames, studyNames } from "@/lib/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitApplication } from "./actions";
import { bedkomFormSchema } from "./schema";

export const BedkomApplication = ({ group, user }: ApplicationFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bedkomFormSchema>>({
    resolver: zodResolver(bedkomFormSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email,
      about: "",
      improvements: "",
      why: "",
      responsibility: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const mappedData = {
      ...data,
      reason:
        "KORT OM:\n" +
        data.about +
        "\n\n" +
        "HVORFOR:\n" +
        data.why +
        "\n\n" +
        "ANSVAR:\n" +
        data.responsibility +
        "\n\n" +
        ":\n" +
        data.improvements,
    };

    const resp = await submitApplication(group, mappedData);

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
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fortell litt om deg selv.</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hvorfor vil du være med i Bedkom?</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Har du noen tanker om hva du ønsker å ha ansvar for i Bedkom?
                (PR, sosialt, rekruttering, bedriftsplanlegging)
              </FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="improvements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hva ønsker du å oppnå/forbedre i Bedkom?</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <span>Send inn</span>
        </Button>
      </form>
    </Form>
  );
};