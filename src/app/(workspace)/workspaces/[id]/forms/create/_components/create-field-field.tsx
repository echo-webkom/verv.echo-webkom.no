import { X } from "lucide-react";
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
import { FieldContextProvider } from "./field-context";
import { QuestionDescriptionField } from "./question-description-field";
import { QuestionRequiredField } from "./question-required-field";
import { QuestionTitleField } from "./question-title-field";
import { QuestionTypeField } from "./question-type-field";

type CreateFieldFieldProps = {
  index: number;
  onRemove: (index: number) => void;
};

export const CreateFieldField = ({ index, onRemove }: CreateFieldFieldProps) => {
  const form = useFormContext<CreateFormSchemaValues>();

  const type = form.watch(`fields.${index}.type`);
  const showAlternativesField = ["checkbox", "radio", "select"].includes(type);

  return (
    <FieldContextProvider value={{ index }}>
      <div className="relative rounded-lg border-2 p-4">
        <button
          type="button"
          className="absolute right-2 top-2 text-red-300 transition-colors hover:text-red-500"
          onClick={() => onRemove?.(index)}
        >
          <X size={16} />
        </button>

        <div className="space-y-6">
          <QuestionTitleField />

          <QuestionDescriptionField />

          <QuestionTypeField />

          {showAlternativesField && (
            <FormField
              control={form.control}
              name={`fields.${index}.options`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternativer</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Alternativer..." {...field} className="h-24" />
                  </FormControl>
                  <FormDescription>
                    Alternativer som skal vises for spørsmålet. Skriv hvert alternativ på en ny
                    linje.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <QuestionRequiredField />
        </div>
      </div>
    </FieldContextProvider>
  );
};
