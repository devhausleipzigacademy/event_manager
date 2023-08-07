import axios from "axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Room } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import Test from "./test";

async function getData(): Promise<Room[]> {
  // Fetch data from your API here.
  const { userId } = auth();

  return [
    {
      name: "Room 1",
      address: "Address 1",
      postal: "Postal 1",
      city: "City 1",
      description: "Description 1",
      images: [],
      id: "1",
      userId: "1",
    },
  ];
}

export default async function RoomsPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Test />
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
