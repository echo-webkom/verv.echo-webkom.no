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

export const ExpiresAtField = () => {
  const form = useFormContext<CreateFormSchemaValues>();

  return (
    <FormField
      control={form.control}
      name="expiresAt"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Utløper</FormLabel>
          <FormControl>
            <Input type="datetime-local" {...field} />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
