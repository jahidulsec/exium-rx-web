import React from "react";
import { LogoFull } from "../assets/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navList = [
  {
    name: "Dashboard",
    href: "#",
    isActive: true,
  },
  {
    name: "Mio",
    href: "#",
    isActive: false,
  },
  {
    name: "Doctor",
    isActive: false,
    href: "#",
  },
];

export default function AppNav() {
  return (
    <header className="container px-6 mx-auto py-3 sticky top-0">
      <div className="flex justify-between items-center gap-5">
        {/* logo */}
        <LogoFull />

        <nav>
          <ul className="flex items-center bg-background rounded-full p-1">
            {navList.map((item) => (
              <li key={item.href}>
                <Button asChild variant={item.isActive ? 'default' : 'ghost'}>
                  <Link href="#">{item.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
