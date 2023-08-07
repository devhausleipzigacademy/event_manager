import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

async function getData(roomId: string) {
  // Fetch data from your API here.
  const { userId } = auth();

  if (!userId) throw new Error("No user id");

  const room = db.room.findFirst({
    where: {
      id: roomId,
      userId: userId,
    },
  });

  return room;
}

async function Details({ params }: { params: { id: string } }) {
  const room = await getData(params.id);
  return (
    <div className="container m-auto mt-8">
      <h1 className="text-neutral-700 text-2xl font-bold">Details Page</h1>
      <hr className="divide-neutral-500 my-4" />
      <div className="flex gap-4 mb-4">
        {room?.images.map((image, idx) => (
          <img
            key={idx}
            className="w-[250px] aspect-square object-cover rounded-md"
            src={`https://bzoavekhwzlowuatxojx.supabase.co/storage/v1/object/public/rooms/${image}`}
          />
        ))}
      </div>
      <h3 className=" text-2xl font-semibold text-neutral-700">{room?.name}</h3>
      <div className="flex">
        <small className="text-neutral-500 my-4">
          {room?.address} {room?.postal} {room?.city}
        </small>
      </div>
      <p className="max-w-[550px] text-neutral-600 overflow-hidden">
        {room?.description}
      </p>
    </div>
  );
}

export default Details;
