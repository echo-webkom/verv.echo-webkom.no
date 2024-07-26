import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateFormSchemaValues } from "../_types/create-form";

export const NameField = () => {
  const form = useFormContext<CreateFormSchemaValues>();

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Navn</FormLabel>
          <FormControl>
            <Input placeholder="Navn på skjema..." {...field} />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
