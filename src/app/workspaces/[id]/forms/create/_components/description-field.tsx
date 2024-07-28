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

export const DescriptionField = () => {
  const form = useFormContext<CreateFormSchemaValues>();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Beskrivelse</FormLabel>
          <FormControl>
            <Textarea placeholder="Beskrivelse av skjema..." {...field} />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
