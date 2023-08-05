import { withValidation } from "@/lib/withValidation";
import { RoomRequest, RoomRequestSchema } from "@/schemas/roomSchema";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = withValidation<RoomRequest>(
  RoomRequestSchema,
  async ({ body }) => {
    try {
      const createdRoom = await db.room.create({
        data: body,
      });
      return NextResponse.json(createdRoom, { status: 201 });
    } catch (error) {
      return NextResponse.json(error, {
        status: 500,
      });
    }
  }
);
