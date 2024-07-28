"use client";

import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { Field, Form as IForm } from "@/server/db/schemas";
import { FormHeader } from "./form-header";

type FormProps = {
  form: IForm;
  fields: Array<Field>;
};

export const RenderForm = ({ form: formInfo, fields }: FormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === fields.length;

  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="flex flex-col">
      <FormHeader title={formInfo.title} description={formInfo.description} />

      <div className="mx-auto flex w-full max-w-screen-md flex-col px-6 pt-16">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {fields.map((field, index) => {
              const isCurrentStep = currentStep === index;

              return (
                <div
                  key={field.id}
                  className={cn("flex flex-col gap-4 pb-6", { hidden: !isCurrentStep })}
                >
                  <FieldRenderer field={field} />
                </div>
              );
            })}

            {isLastStep && (
              <div className="pb-12">
                <h2 className="mb-2 text-lg font-medium">Oppsummering</h2>
                <p className="text-sm text-muted-foreground">
                  Her er det oppsummeringen av innholdet i skjemaet. Du kan se hva som blir sendt
                  til arbeidsområdet.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-4">
              {!isFirstStep && (
                <Button size="sm" type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                  Forrige
                </Button>
              )}
              {!isLastStep && (
                <Button size="sm" type="button" onClick={() => setCurrentStep(currentStep + 1)}>
                  Neste
                </Button>
              )}
              {isLastStep && (
                <Button size="sm" type="submit">
                  Send inn
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

const FieldRenderer = ({ field }: { field: Field }) => {
  const form = useFormContext();

  const options = field.options ?? [];

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium">{field.title}</h2>

      {field.type === "text" && (
        <div>
          <Input {...form.register(field.id)} placeholder="Skriv her..." />
        </div>
      )}

      {field.type === "textarea" && (
        <div>
          <Textarea {...form.register(field.id)} placeholder="Skriv her..." />
        </div>
      )}

      {field.type === "checkbox" && (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-3">
              <input
                {...form.register(`${field.id}.${option}`)}
                type="checkbox"
                value={option}
                id={option}
                name={field.id}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}

      {field.type === "radio" && (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div key={option} className="flex items-center gap-3">
              <input
                {...form.register(`${field.id}.${option}`)}
                type="radio"
                value={option}
                id={option}
                name={field.id}
              />
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
