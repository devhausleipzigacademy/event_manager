"use client";

import axios from "axios";

async function Test() {
  try {
    const { data } = await axios.get("/api/room");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  return <div>hai</div>;
}

export default Test;
