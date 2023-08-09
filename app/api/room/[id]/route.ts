import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { userId } = getAuth(request);
  const { id } = params;
  const deletedRoom = await db.room.delete({
    where: {
      id,
      userId: userId as string,
    },
  });
  return NextResponse.json(deletedRoom);
};
