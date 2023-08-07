import Sidebar from "@/components/ui/navigation/Sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { href: "/booking-rooms", name: "Booking Rooms" },
    { href: "/booking-rooms/create", name: "Create Room" },
  ];
  return (
    <div className="flex gap-6 h-full">
      <Sidebar links={navLinks} />
      <div className="container m-auto mt-6">{children}</div>
    </div>
  );
}

export default Layout;
