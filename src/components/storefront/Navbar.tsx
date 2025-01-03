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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { businessDetails } from "@/lib/data";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userEmail = user ? user.email : "";
  return (
    <div className="flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0" variant="ghost" size="icon">
            <Menu className="w-8 h-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <nav className="flex flex-col gap-6 text-lg font-medium  h-full justify-between">
            <div className="flex flex-col gap-6 text-lg font-medium mt-16 text-muted-foreground hover:text-foreground">
              <NavbarNavigation />
            </div>

            {user ? (
              userEmail === businessDetails.adminEmail ? (
                <Button size={"sm"} className="mr-2 hidden md:block">
                  <Link href={"/dashboard"} className="hidden md:block">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <div className="flex gap-2 items-center">
                  <UserDropdown
                    email={userEmail as string}
                    name={user.given_name as string}
                    userImage={
                      user.picture ??
                      `https://avatar.vercel.sh/${user.given_name}`
                    }
                  />
                  <div className="flex flex-col">
                    <p className="">{user.given_name}</p>  
                    <p className="text-muted-foreground  text-sm">{user.email}</p>                    

                  </div>
                </div>
              )
            ) : (
              <LoginLink>LOGIN</LoginLink>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div>
        <Link href={"/"}>
          <Image src={"/logo_long.png"} alt={""} width={128} height={36} />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        {user ?
        <Link href={`/profile/${user.id}`}>
      <Button className="shrink-0 hidden md:flex" variant="ghost" size="icon">
        <User className=" h-4 w-4 md:h-6 md:w-6" />
      </Button>
        </Link> :
        <LoginLink>
          <Button variant={"outline"} className="flex items-center">
            <User className=" h-4 w-4 md:h-6 md:w-6" />
            <p>

          LOGIN
            </p>
          </Button>
          </LoginLink>
        }
      <Link href={"/products/all"}>
      <Button className="shrink-0" variant="ghost" size="icon">
        <Search className="h-4 w-4 md:h-6 md:w-6" />
      </Button>
      </Link>
      {
        user &&
        
      <Button className="shrink-0" variant="ghost" size="icon">
        <ShoppingBag className="h-4 w-4 md:h-6 md:w-6" />
      </Button>
      }
      </div>
    </div>
  );
}
