import axios from "axios";
import { Room } from "@/schemas/roomSchema";

export const createRoom = async (room: Room & { images: Array<string> }) =>
  await axios.post("/api/room", room);

export const getRooms = async () => axios.get("/api/room");
