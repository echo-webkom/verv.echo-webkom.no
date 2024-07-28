import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateFormSchemaValues } from "../_types/create-form";
import { useFieldContext } from "./field-context";

export const QuestionTitleField = () => {
  const form = useFormContext<CreateFormSchemaValues>();
  const { index } = useFieldContext();

  return (
    <FormField
      control={form.control}
      name={`fields.${index}.title`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Spørsmål {index + 1}</FormLabel>
          <FormControl>
            <Input placeholder="Spørsmål..." {...field} />
          </FormControl>
          <FormDescription>Tittel på spørsmålet som skal vises i skjemaet.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
