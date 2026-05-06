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
        <header className="mx-auto mb-6 w-full max-w-sm">
            <div className="relative container mx-auto w-full px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Profile */}
                    <Link href={"/profile"} className="flex items-center gap-2">
                        <Avatar className="bg-muted size-7 p-1">
                            <AvatarImage src={"/images/user.png"} />
                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="">
                            <h4 className="line-clamp-1 h-5 max-w-35 overflow-hidden text-sm font-semibold">
                                {name}
                            </h4>
                            <p className="text-muted-foreground -mt-1 text-xs">
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
