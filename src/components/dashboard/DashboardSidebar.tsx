"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeftCircle, ImageIcon, LayoutDashboard, ListOrdered, LogOut, Package, Settings, User } from "lucide-react";
import { businessDetails } from "@/lib/data";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";

export function DashbaordSidebar({ children, user }: { children: React.ReactNode, user: KindeUser<Record<string, any>> }) {
  const pathname = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: (
        <Package className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Products",
      href: "/dashboard/products",
      icon: (
        <ListOrdered className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Banner Pictures",
      href: "/dashboard/banner",
      icon: (
        <ImageIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const name = user.given_name
  const img = user.picture

  return (
    <div
      className={cn(
        " rounded-md flex flex-col md:flex-row bg-background w-full flex-1 m-auto overflow-hidden",
        "max-h-screen"
      )}
    >
      
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 min-h-screen">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className={cn(
                    link.href === pathname
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}/>
              ))}
            </div>
          </div>
          <div>
          <SidebarLink
              link={{
                label: name!,
                href: "#",
                icon: (
                  <Image
                    src={img!}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          <SidebarLink
              link={{
                label: "Logout",
                href: "/api/auth/logout",
                icon: (
                  <LogOut className="h-7 w-7 flex-shrink-0 rounded-full text-destructive"/>
                ),
              }}
            />
            
          </div>
        </SidebarBody>
      </Sidebar>


      <div className="flex-1 my-5 px-1 sm:px-6 lg:px-8 mx-auto overflow-y-scroll max-w-xs md:max-w-full">{children}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {businessDetails.name}
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 itˀems-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
