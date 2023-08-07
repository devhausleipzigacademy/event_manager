import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Link from "next/link";
import Button from "@/components/ui/forms/Button";

async function getData() {
  // Fetch data from your API here.
  const { userId } = auth();

  if (!userId) throw new Error("No user id");

  const rooms = db.room.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      address: true,
      city: true,
      postal: true,
    },
  });

  return rooms;
}

export default async function RoomsPage() {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h3 className="text-2xl text-neutral-700 mb-4">No Rooms found yet</h3>
        <Button type="button">
          <Link href="/booking-rooms/create">Create a new Room</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
