"use client";

import { Button } from "@/components/button";
import { FormControl } from "@/components/form-control";
import { FormHint } from "@/components/form-hint";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Select } from "@/components/select";
import { TextArea } from "@/components/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { fieldOfStudy, yearOfStudy } from "@/lib/variables";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Navn må være minst 2 tegn"),
  email: z.string().min(1, "E-post er påkrevd").email("Ugyldig e-post"),
  yearOfStudy: z.nativeEnum(yearOfStudy, {
    errorMap: () => ({
      message: "Velg et årstrinn",
    }),
  }),
  fieldOfStudy: z.nativeEnum(fieldOfStudy, {
    errorMap: () => ({
      message: "Velg en studieretning",
    }),
  }),
  reason: z.string().min(10, "Begrunnelsen din er for kort. Minst 10 tegn"),
});

export const Form = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const onSubmit = form.handleSubmit(async (data) => {
    const resp = await fetch("/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      console.error(await resp.text());
      return;
    }

    toast({
      title: "Søknad sendt",
      description: "Vi tar kontakt med deg så fort vi kan",
    });

    form.reset();
  });

  const onReset = () => form.reset();

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormControl>
        <Label htmlFor="name">Fullt navn</Label>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          placeholder="Foo Bar"
          {...form.register("name")}
        />
        <FormHint>Hva heter du?</FormHint>
        {form.formState.errors.name && (
          <FormHint error>{form.formState.errors.name.message}</FormHint>
        )}
      </FormControl>

      <FormControl>
        <Label htmlFor="email">E-post</Label>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="foo@bar.no"
          {...form.register("email")}
        />
        <FormHint>For å kunne kontakte deg</FormHint>
        {form.formState.errors.email && (
          <FormHint error>{form.formState.errors.email.message}</FormHint>
        )}
      </FormControl>

      <FormControl>
        <Label htmlFor="yearOfStudy">Årstrinn</Label>
        <Select
          id="yearOfStudy"
          defaultValue="DEFAULT"
          {...form.register("yearOfStudy")}
        >
          <option value="DEFAULT" disabled>
            Velg årstrinn
          </option>
          {Object.entries(yearOfStudy).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <FormHint>Hvilket år du er på</FormHint>
        {form.formState.errors.yearOfStudy && (
          <FormHint error>{form.formState.errors.yearOfStudy.message}</FormHint>
        )}
      </FormControl>

      <FormControl>
        <Label htmlFor="fieldOfStudy">Studieretning</Label>
        <Select
          id="fieldOfStudy"
          defaultValue="DEFAULT"
          {...form.register("fieldOfStudy")}
        >
          <option value="DEFAULT" disabled>
            Velg årstrinn
          </option>
          {Object.entries(fieldOfStudy).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </Select>
        <FormHint>Hvilken studie du går på</FormHint>
        {form.formState.errors.fieldOfStudy && (
          <FormHint error>
            {form.formState.errors.fieldOfStudy.message}
          </FormHint>
        )}
      </FormControl>

      <FormControl>
        <Label htmlFor="reason">Hvorfor vil du bli med i Webkom?</Label>
        <TextArea
          id="reason"
          rows={5}
          autoComplete="off"
          placeholder="Fordi det er sykt kult!"
          {...form.register("reason")}
        />
        {form.formState.errors.reason && (
          <FormHint error>{form.formState.errors.reason.message}</FormHint>
        )}
      </FormControl>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit">Send inn</Button>
        <Button
          type="button"
          onClick={onReset}
          className="bg-red-200 hover:bg-red-200"
        >
          Nullstill
        </Button>
      </div>
    </form>
  );
};
