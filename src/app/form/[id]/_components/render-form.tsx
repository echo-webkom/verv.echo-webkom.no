"use client";

import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/cn";
import { Field, Form as IForm } from "@/server/db/schemas";
import { FormHeader } from "./form-header";

type FormProps = {
  form: IForm;
  fields: Array<Field>;
};

type FormValues = {
  [key: string]: string | string[];
};

export const RenderForm = ({ form: formInfo, fields }: FormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === fields.length;

  const form = useForm<FormValues>();

  const handleSubmit = form.handleSubmit(async (data) => {
    alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
  });

  const answers = form.watch();

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
                  <FieldRenderer index={index} field={field} />
                </div>
              );
            })}

            {isLastStep && (
              <div className="pb-12">
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-medium">Oppsummering</h2>
                  <p className="text-sm text-muted-foreground">
                    Her er det oppsummeringen av innholdet i skjemaet. Du kan se hva som blir sendt
                    til arbeidsområdet.
                  </p>
                </div>
                <div>
                  <ul>
                    {fields.map((field, i) => {
                      const answer = answers[field.id];
                      const answerStr = Array.isArray(answer)
                        ? // @ts-expect-error wtf
                          answers[field.id].join(", ")
                        : answers[field.id];

                      return (
                        <li
                          key={field.id}
                          className="flex items-center gap-2 border-b border-dashed py-1"
                        >
                          <div className="grid w-full grid-cols-2 gap-2">
                            <div className="line-clamp-1">
                              <span className="mr-3 text-muted-foreground">{i + 1}.</span>
                              <span className="text-ellipsis">
                                {field.title}
                                {field.required && <span className="ml-1 text-red-500">*</span>}
                              </span>
                            </div>
                            <div>
                              <span className="line-clamp-1 text-muted-foreground">
                                {answerStr}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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

type FieldRendererProps = {
  field: Field;
  index: number;
};

const FieldRenderer = ({ index, field }: FieldRendererProps) => {
  const form = useFormContext<FormValues>();

  const options = field.options ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{index + 1}.</span>
        <Label htmlFor={field.id} className="text-lg font-medium">
          {field.title}
        </Label>
      </div>

      {field.type === "text" && (
        <div>
          <Input id={field.id} {...form.register(field.id)} placeholder="Skriv her..." />
        </div>
      )}

      {field.type === "textarea" && (
        <div>
          <Textarea
            id={field.id}
            {...form.register(field.id, { value: "" })}
            placeholder="Skriv her..."
          />
        </div>
      )}

      {field.type === "checkbox" && (
        <div className="flex flex-col gap-2">
          {options.map((option, i) => (
            <div key={option} className="flex items-center gap-3">
              <input
                {...form.register(field.id, { value: [] })}
                type="checkbox"
                value={option}
                id={option}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}

      {field.type === "radio" && (
        <div className="flex flex-col gap-2">
          {options.map((option, i) => (
            <div key={option} className="flex items-center gap-3">
              <input
                {...form.register(field.id, { value: null })}
                type="radio"
                value={option}
                id={option}
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
