"use client";

import { Room } from "@/schemas/roomSchema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "postal",
    header: "Postal",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
