import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/ui/select";
import { CreateFormSchemaValues } from "../_types/create-form";
import { useFieldContext } from "./field-context";

export const QuestionTypeField = () => {
  const form = useFormContext<CreateFormSchemaValues>();
  const { index } = useFieldContext();

  return (
    <FormField
      control={form.control}
      name={`fields.${index}.type`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select {...field} className="block w-full">
              <option value="text">Tekst</option>
              <option value="textarea">Tekstområde</option>
              <option value="checkbox">Avkryssningsboks</option>
              <option value="radio">Radioknapper</option>
              <option value="select">Rullegardin</option>
            </Select>
          </FormControl>
          <FormDescription>Velg hvilken type input som skal brukes for spørsmålet.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
