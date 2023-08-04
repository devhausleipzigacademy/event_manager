import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import NavLink from "./Navlink";

async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="w-full flex items-center py-2 px-6 justify-between border-b shadow-sm bg-white">
      <Link
        href="/"
        className="text-xl text-primary  font-bold uppercase tracking-wider"
      >
        <h1>Eventos</h1>
      </Link>
      <ul className="flex items-center gap-4">
        {!user && (
          <>
            <li>
              <NavLink href="/sign-in">Sign in</NavLink>
            </li>
            <li>
              <NavLink href="/sign-up">Sign up</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink href="/">Dashboard</NavLink>
            </li>
            <li>
              <NavLink href="/events">Create Events</NavLink>
            </li>
            <li>
              <NavLink href="/booking-rooms">Booking Rooms</NavLink>
            </li>
            <li>
              <UserButton afterSignOutUrl="/sign-in" />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
