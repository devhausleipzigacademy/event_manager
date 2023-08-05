import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/lib/db";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};
type EventType = "user.created" | "user.updated" | "*";

async function handler(req: NextRequest) {
  const payload = await req.json();
  const headerPayload = headers();

  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response("Error occured", {
      status: 400,
    });
  }

  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };

  const wh = new Webhook(process.env.WEBHOOK_SECRET as string);
  let evt: Event | null = null;

  try {
    evt = wh.verify(JSON.stringify(payload), svixHeaders) as Event;
  } catch (_) {
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;
    await db.user.upsert({
      where: { externalId: id as string },
      create: {
        externalId: id as string,
        attributes,
      },
      update: {
        attributes,
      },
    });
  }

  return NextResponse.json({});
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
