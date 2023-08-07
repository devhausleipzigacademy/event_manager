import { withValidation } from "@/lib/withValidation";
import { RoomRequest, RoomRequestSchema } from "@/schemas/roomSchema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";

export const POST = withValidation<RoomRequest>(
  RoomRequestSchema,
  async ({ body, request }) => {
    const { userId } = getAuth(request);
    console.log(userId);
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
      const createdRoom = await db.room.create({
        data: { ...body, userId },
      });
      return NextResponse.json(createdRoom, { status: 201 });
    } catch (error) {
      return NextResponse.json(error, {
        status: 400,
      });
    }
  }
);

export const GET = async (request: NextRequest) => {
  const { userId } = getAuth(request);
  console.log(userId);
  return NextResponse.json({ message: "Hello, world!" });
};
