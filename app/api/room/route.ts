import { withValidation } from "@/lib/withValidation";
import { RoomRequest, RoomRequestSchema } from "@/schemas/roomSchema";
import { NextResponse } from "next/server";

export const POST = withValidation<RoomRequest>(
  RoomRequestSchema,
  ({ body }) => {
    console.log(body);
    return NextResponse.json(body);
  }
);
