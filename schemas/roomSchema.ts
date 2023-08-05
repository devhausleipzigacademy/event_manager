import * as z from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(3).max(255),
  postal: z.string().min(5).max(5),
  address: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  description: z.string().min(50).max(1000),
});

export const RoomRequestSchema = createRoomSchema.extend({
  images: z.array(z.string()).optional(),
});

export type Room = z.infer<typeof createRoomSchema>;
export type RoomRequest = z.infer<typeof RoomRequestSchema>;
