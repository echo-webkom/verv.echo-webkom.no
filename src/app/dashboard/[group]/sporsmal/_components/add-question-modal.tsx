"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Group } from "@/lib/constants";
import { addQuestionSchema } from "../_lib/add-question-schema";
import { addQuestionAction } from "../actions";

type AddQuestionModalProps = {
  group: Group;
};

export const AddQuestionModal = ({ group }: AddQuestionModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof addQuestionSchema>>({
    resolver: zodResolver(addQuestionSchema),
    defaultValues: {
      required: false,
      description: "",
      label: "",
      placeholder: "Ditt svar her...",
      type: "input",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const { result, message } = await addQuestionAction(group, data);
    if (result === "error") {
      toast({
        title: "Noe gikk galt",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Spørsmål opprettet",
        description: message,
        variant: "default",
      });
      setIsOpen(false);
      router.refresh();
    }
  });

  return (
    <>
      <Button className="w-full" onClick={() => setIsOpen(true)}>
        Legg til spørsmål
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lag spørsmål</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spørsmål</FormLabel>
                    <FormControl>
                      <Input placeholder="Ditt spørsmål" {...field} />
                    </FormControl>
                    <FormDescription>Spørsmålet vises til brukeren.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Årstrinn</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Spørsmålstype" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="input">Liten tekstboks</SelectItem>
                          <SelectItem value="textarea">Stor tekstboks</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beskrivelse</FormLabel>
                    <FormControl>
                      <Input placeholder="Beskrivelse" {...field} />
                    </FormControl>
                    <FormDescription>
                      Beskrivelsen vises under spørsmålet og kan brukes til å gi mer informasjon om
                      hva som menes med spørsmålet. Ikke påkrevd.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeholder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placeholder</FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription>
                      Placeholderen vises i tekstfeltet og kan brukes til å gi et eksempel på hva
                      som menes med spørsmålet. Ikke påkrevd.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="required"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Er spørsmålet påkrevd?</FormLabel>
                    </div>
                    <FormDescription>
                      Hvis dette er aktivert, må brukeren svare på spørsmålet før de kan sende inn
                      skjemaet.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <Button type="submit">Lagre</Button>

                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Avbryt
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
