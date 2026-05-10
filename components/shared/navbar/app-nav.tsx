import React from "react";
import { LogoFull } from "../assets/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import NavUser from "./nav-user";
import NavSidebar from "./nav-sidebar";
import NavButton from "./nav-button";
import { AuthUser } from "@/types/auth-user";

const navList = {
  superadmin: [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Mio",
      href: "/dashboard/mio",
    },
    {
      name: "Doctor",
      href: "/dashboard/doctor",
    },
  ],
  rm: [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Report",
      href: "/dashboard/report",
    },
  ],
};

export default async function AppNav() {
  const user = await getAuthUser();

  if (!["superadmin", "rm"].includes(user?.role as string)) redirect("/login");

  const menu = navList[user?.role as "rm"];

  return (
    <header className="sticky top-0 container mx-auto px-6 py-3">
      <div className="flex items-center justify-between gap-5">
        {/* logo */}
        <div className="flex items-center gap-2">
          <NavSidebar menu={menu} />
          <LogoFull />
        </div>

        <nav className="flex items-center gap-2">
          <ul className="bg-background hidden items-center rounded-full p-1 md:flex">
            {menu.map(item => (
              <li key={item.href}>
                <NavButton {...item} />
              </li>
            ))}
          </ul>

          <NavUser user={user as AuthUser} />
        </nav>
      </div>
    </header>
  );
}
