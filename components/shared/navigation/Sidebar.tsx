"use client";
import React from "react";
import Link from "next/link";
import { type } from "os";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Link = {
  href: string;
  name: string;
};

type SidebarProps = {
  links: Link[];
};

function Sidebar({ links = [] }: SidebarProps) {
  const pathName = usePathname();

  return (
    <aside className="py-10 px-2 h-full w-[200px] border-r">
      <ul className="flex flex-col items-center gap-6">
        {links.map((link, idx) => (
          <li
            key={idx}
            className={clsx(
              "text-xs text-center cursor-pointer",
              pathName === link.href
                ? "text-white bg-primary-dark px-4 py-2 rounded-full shadow"
                : "text-neutral-500 hover:text-primary-dark"
            )}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
