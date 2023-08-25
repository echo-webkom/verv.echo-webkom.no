"use client";

import { User } from "@/lib/db/schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: Array<ColumnDef<User>> = [
  {
    accessorKey: "name",
    header: "Navn",
  },
  {
    accessorKey: "email",
    header: "E-post",
  },
  {
    accessorKey: "role",
    header: "Rolle",
  },
];
