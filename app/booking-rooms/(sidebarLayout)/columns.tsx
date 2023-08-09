"use client";

import Button from "@/components/ui/forms/Button";
import { Room } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export const columns: ColumnDef<
  Pick<Room, "address" | "city" | "description" | "name" | "postal" | "id">
>[] = [
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
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const room = row.original;

      const { mutateAsync: mutateDelete } = useMutation({
        mutationFn: () => axios.delete(`/api/room/${room.id}`),
        onSuccess: () => {
          toast.success("Room created successfully");
        },
        onError: (err) => {
          console.log(err);
          toast.error("something went wrong, try again later");
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger id="actions" asChild>
            <Button>
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-4 w-[250px] rounded-md bg-white shadow-md flex flex-col gap-3">
            <DropdownMenuItem className="px-6 w-full py-2 cursor-pointer   hover:bg-primary hover:text-white">
              <Link href={`/booking-rooms/${room.id}`}>Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="px-6 w-full py-2 cursor-pointer hover:bg-primary hover:text-white">
              <Link href={room.id}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-6 w-full py-2 cursor-pointer   hover:bg-primary hover:text-white"
              onClick={async () => await mutateDelete()}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
