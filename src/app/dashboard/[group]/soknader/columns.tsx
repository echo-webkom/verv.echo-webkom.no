"use client";

import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { groupNames } from "@/lib/constants";
import { SelectApplicationByGroupQuery } from "@/lib/db/queries";
import { Application } from "@/lib/db/schemas";

const CopyIdButton = ({ application }: { application: Application }) => {
  const { toast } = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(application.id);
    toast({
      title: "Kopierte søknads-ID",
      description: "Søknads-IDen er nå kopiert til utklippstavlen",
    });
  };

  return <DropdownMenuItem onClick={handleClick}>Kopier søknads-ID</DropdownMenuItem>;
};

const ViewDetailsButton = ({ application }: { application: Application }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Se detaljer</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detaljer for {application.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <p>ID: {application.id}</p>
          <p>E-post: {application.email}</p>
          <p>Studieretning: {application.study}</p>
          <p>Årstrinn: {application.year}</p>
          <p>Sendt inn: {application.createdAt.toLocaleString()}</p>
          <div>
            <p>Grunn:</p>
            <article className="font-monodiv max-h-52 overflow-y-auto rounded-lg border bg-gray-100 p-2">
              {application.body.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </article>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const columns: Array<ColumnDef<SelectApplicationByGroupQuery[number]>> = [
  {
    accessorKey: "name",
    header: "Navn",
  },
  {
    accessorKey: "email",
    header: "E-post",
  },
  {
    accessorKey: "study",
    header: "Studieretning",
  },
  {
    accessorKey: "year",
    header: "Årstrinn",
  },
  {
    id: "groups",
    header: "Søkt hos",
    cell: ({ row }) => {
      const currentRow = row.original;

      const listStr = currentRow.user.applications
        .map((application) => groupNames[application.groupId])
        .join(", ");

      return <p>{listStr}</p>;
    },
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
