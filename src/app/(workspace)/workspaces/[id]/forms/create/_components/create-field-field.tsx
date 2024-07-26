import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
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
import { cn } from "@/lib/cn";
import { CreateFormSchemaValues } from "../_types/create-form";
import { FieldContextProvider } from "./field-context";
import { QuestionAlternativesField } from "./question-alternatives-field";
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
  const [isExpanded, setIsExpanded] = useState(true);

  const type = form.watch(`fields.${index}.type`);
  const showAlternativesField = ["checkbox", "radio", "select"].includes(type);

  return (
    <FieldContextProvider value={{ index }}>
      <div className="relative rounded-lg border-2 p-4">
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <button
            className="text-blue-300 transition-colors hover:text-blue-500"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronUp
              size={16}
              className={cn("transition-transform", { "rotate-180": !isExpanded })}
            />
          </button>
          <button
            className="text-red-300 transition-colors hover:text-red-500"
            type="button"
            onClick={() => onRemove?.(index)}
          >
            <X size={16} />
          </button>
        </div>

        {!isExpanded && (
          <button
            type="button"
            className="text-sm text-muted-foreground hover:underline"
            onClick={() => setIsExpanded(true)}
          >
            {form.watch(`fields.${index}.title`)}
          </button>
        )}

        {isExpanded && (
          <div className="space-y-6">
            <QuestionTitleField />

            <QuestionDescriptionField />

            <QuestionTypeField />

            {showAlternativesField && <QuestionAlternativesField />}

            <QuestionRequiredField />
          </div>
        )}
      </div>
    </FieldContextProvider>
  );
};
