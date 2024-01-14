"use client";

import { Database } from "@/types/supabase.types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

import { z } from "zod";

export interface tableProps {
  columns: Database["public"]["Tables"]["project"]["Row"][];
}

export const columns: ColumnDef<
  Database["public"]["Tables"]["project"]["Row"]
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "dsds",
    header: "sdsd At",
  },
];
