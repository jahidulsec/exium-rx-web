import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoFull } from "../assets/logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getAuthUser } from "@/lib/dal";
import MioNavMenu from "./mio-nav-menu";
import Link from "next/link";

export default async function MioNav() {
  const user = await getAuthUser();

  const name = user?.name ?? "";
  const username = user?.userId ?? "";
  const role = user?.role ?? "";

  return (
    <header className="max-w-sm mx-auto w-full mb-6">
      <div className="container mx-auto py-4 px-4 w-full relative">
        <div className="flex justify-between items-center">
          {/* Profile */}
          <Link href={'/profile'} className="flex items-center gap-2">
            <Avatar className="p-1 bg-muted size-7">
              <AvatarImage src={"/images/user.png"} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="">
              <h4 className="text-sm line-clamp-1 max-w-35 font-semibold h-5 overflow-hidden">
                {name}
              </h4>
              <p className="-mt-1 text-xs text-muted-foreground">
                {role} ({username})
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-1.5">
            <LogoFull width={110} />

            {/* Right Menu */}
            <MioNavMenu />
          </div>
        </div>

        {/* Center Logo (absolute center) */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <LogoFull width={90} />
        </div> */}
      </div>
    </header>
  );
}
