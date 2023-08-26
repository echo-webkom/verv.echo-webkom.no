"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Application } from "@/lib/db/schema";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const CopyIdButton = ({ application }: { application: Application }) => {
  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(application.id);
    toast({
      title: "Kopierte søknads-ID",
      description: "Søknads-IDen er nå kopiert til utklippstavlen",
    });
  };

  return (
    <DropdownMenuItem onClick={handleClick}>Kopier søknads-ID</DropdownMenuItem>
  );
};

const ViewDetailsButton = ({ application }: { application: Application }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Se detaljer
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Detaljer for {application.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <p>ID: {application.id}</p>
          <p>E-post: {application.email}</p>
          <p>Studieretning: {application.fieldOfStudy}</p>
          <p>Årstrinn: {application.yearOfStudy}</p>
          <p>Sendt inn: {application.createdAt.toLocaleString()}</p>
          <div>
            <p>Grunn:</p>
            <article className="p-2 rounded-lg bg-gray-100 border font-monodiv">
              {application.reason.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </article>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const columns: Array<ColumnDef<Application>> = [
  {
    accessorKey: "name",
    header: "Navn",
  },
  {
    accessorKey: "email",
    header: "E-post",
  },
  {
    accessorKey: "fieldOfStudy",
    header: "Studieretning",
  },
  {
    accessorKey: "yearOfStudy",
    header: "Årstrinn",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
            <CopyIdButton application={application} />
            <DropdownMenuSeparator />
            <ViewDetailsButton application={application} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
