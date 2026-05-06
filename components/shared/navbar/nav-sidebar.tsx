"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import NavButton from "./nav-button";

export default function NavSidebar({
  menu,
}: {
  menu: { href: string; name: string }[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button onClick={() => setOpen(true)}>
        <Menu /> <span className="sr-only">Menu</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Exium Rx Generation</SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="p-4">
            <nav className="">
              <ul className="flex flex-col gap-4 w-full">
                {menu.map(item => (
                  <li key={item.href}>
                    <NavButton className="w-full border" {...item} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
