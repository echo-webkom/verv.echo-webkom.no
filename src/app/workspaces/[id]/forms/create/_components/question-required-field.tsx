import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateFormSchemaValues } from "../_types/create-form";
import { useFieldContext } from "./field-context";

export const QuestionRequiredField = () => {
  const form = useFormContext<CreateFormSchemaValues>();
  const { index } = useFieldContext();

  return (
    <FormField
      control={form.control}
      name={`fields.${index}.required`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center gap-4 rounded-lg border-2 p-4">
              <Checkbox id="required" checked={field.value} onCheckedChange={field.onChange} />
              <FormLabel htmlFor="required" className="w-full">
                Påkrev
              </FormLabel>
            </div>
          </FormControl>
          <FormDescription>Om spørsmålet er påkrevd for å sende inn skjemaet.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
