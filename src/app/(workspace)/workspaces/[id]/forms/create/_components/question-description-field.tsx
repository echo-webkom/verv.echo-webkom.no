import { index } from "drizzle-orm/pg-core";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CreateFormSchemaValues } from "../_types/create-form";
import { useFieldContext } from "./field-context";

export const QuestionDescriptionField = () => {
  const form = useFormContext<CreateFormSchemaValues>();
  const { index } = useFieldContext();
  return (
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
  );
};
