import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { businessDetails } from "@/lib/data";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { DashbaordSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashbaord",
  description: "Admin Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user || user.email !== businessDetails.adminEmail){
    return redirect("/")
  }


  return (

          <DashbaordSidebar user={user}>
            {children}
          </DashbaordSidebar>

  );
}
