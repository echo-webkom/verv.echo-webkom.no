"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { InviteMemberFormValues, InviteMemberSchema } from "../_types/invite-member";

export const InviteMemberButton = () => {
  const form = useForm<InviteMemberFormValues>({
    resolver: zodResolver(InviteMemberSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Inviter medlem</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inviter nytt medlem</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input placeholder="E-post til medlem..." {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Inviter</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
