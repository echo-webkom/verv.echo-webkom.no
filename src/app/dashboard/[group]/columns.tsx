"use client";

import { Application } from "@/lib/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: Array<ColumnDef<Application>> = [
  {
    accessorKey: "email",
    header: "E-post",
  },
  {
    accessorKey: "name",
    header: "Navn",
  },
  {
    accessorKey: "fieldOfStudy",
    header: "Studieretning",
  },
  {
    accessorKey: "yearOfStudy",
    header: "Årstrinn",
  },
];
