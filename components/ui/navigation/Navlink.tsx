"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { cn } from "@/lib/utils";

interface NavlinkProps {
  href: string;
  children: React.ReactNode;
}

function Navlink({ href, children }: NavlinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "uppercase text-sm hover:text-primary-dark cursor-pointer",
        `/${pathname.split("/")[1]}` === href
          ? "text-neutral-700"
          : "text-neutral-500"
      )}
    >
      {children}
    </Link>
  );
}

export default Navlink;
