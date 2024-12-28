import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogsIcon, Menu, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavbarNavigation } from "./NavbarNavigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0" variant="outline" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
            <nav className="flex flex-col gap-6 text-lg font-medium  h-full justify-between">
                <div className="flex flex-col gap-6 text-lg font-medium mt-16 text-muted-foreground hover:text-foreground">
                <NavbarNavigation/>
                </div>
                <LoginLink>
                    LOGIN
                </LoginLink>
                
            </nav>
        </SheetContent>
      </Sheet>
      <div>
        <Link href={"/"}>
          <Image src={"/logo_long.png"} alt={""} width={128} height={36} />
        </Link>
      </div>
      <div className="flex items-center space-x-2 md:space-x-8">
        <User className="hidden md:block h-4 w-4 md:h-6 md:w-6" />
        <Search className="h-4 w-4 md:h-6 md:w-6"/>
        <ShoppingBag className="h-4 w-4 md:h-6 md:w-6"/>
      </div>
    </div>
  );
}
