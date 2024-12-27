"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "HOME",
    href: "/",
  },
  {
    name: "JACKETS",
    href: "/products/jackets",
  },
  {
    name: "JEANS",
    href: "/products/jeans",
  },
  {
    name: "T-SHIRTS",
    href: "/products/tshirts",
  },
  {
    name: "HOODIES & MORE",
    href: "/products/hoodies",
  },
  {
    name: "SHOP ALL",
    href: "/products/all",
  },
];

export function NavbarNavigation() {

    const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            link.href === pathname
              ? "text-foreground border-b"
              : "text-muted-foreground hover:text-foreground border-b"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
