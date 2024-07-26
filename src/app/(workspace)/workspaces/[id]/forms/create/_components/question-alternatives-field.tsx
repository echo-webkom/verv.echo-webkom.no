import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
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

export const QuestionAlternativesField = () => {
  const form = useFormContext<CreateFormSchemaValues>();
  const { index } = useFieldContext();

  return (
    <FormField
      control={form.control}
      name={`fields.${index}.options`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Alternativer</FormLabel>
          <FormControl>
            <Alternatives value={field.value} onValueChange={field.onChange} />
          </FormControl>
          <FormDescription>
            Alternativer som skal vises for spørsmålet. Skriv hvert alternativ på en ny linje.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

type AlternativesProps = {
  value?: Array<string>;
  onValueChange?: (value: Array<string>) => void;
};

const Alternatives = ({ value, onValueChange }: AlternativesProps) => {
  const [alternatives, setAlternatives] = useState<Array<string>>([""]);
  const lastIndex = useMemo(() => alternatives.length - 1, [alternatives]);

  const handleUpdateAlternative = (alternative: string, index: number) => {
    setAlternatives([
      ...alternatives.slice(0, index),
      alternative,
      ...alternatives.slice(index + 1),
    ]);
  };

  const handleRemoveAlternative = (index: number) => {
    setAlternatives(alternatives.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const lastAlternative = alternatives[lastIndex];

    if (lastAlternative !== "") {
      setAlternatives([...alternatives, ""]);
    }
  }, [alternatives, lastIndex]);

  useEffect(() => {
    onValueChange?.(alternatives);
  }, [alternatives, onValueChange]);

  return (
    <div className="flex flex-col gap-2">
      {alternatives.map((alternative, i) => (
        <div key={i} className="flex items-center">
          <span className="mr-2 text-muted-foreground">{i + 1}.</span>
          <Input
            className="mr-3"
            placeholder={`Alternativ ${i + 1}`}
            value={alternative}
            onChange={(e) => handleUpdateAlternative(e.target.value, i)}
          />
          {i !== lastIndex && (
            <Button type="button" onClick={() => handleRemoveAlternative(i)} variant="destructive">
              Slett
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
