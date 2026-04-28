"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Home, Menu } from "lucide-react";
import React from "react";
import { LogoFull } from "../assets/logo";
import Link from "next/link";
import { toast } from "sonner";
import { userLogout } from "@/features/auth/actions/login";

export default function MioNavMenu() {
  const [open, setOpen] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  return (
    <>
      <Button
        size="icon-sm"
        variant="outline"
        className="border-primary bg-primary/20 rounded-2xl"
        onClick={() => setOpen(true)}
      >
        <Menu />
        <span className="sr-only">Menu</span>
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col p-0">
          {/* Header */}
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="sr-only">Exium Rx Generation</SheetTitle>

            <div className="flex justify-center items-center">
              <LogoFull />
            </div>
          </SheetHeader>

          {/* Body */}
          <div className="flex flex-col flex-1 justify-between">
            {/* Navigation */}
            <nav className="p-4 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full px-6 items-center"
                    >
                      <Home className="size-3.5" /> Home
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={() => {
                  startTransition(async () => {
                    toast.promise(userLogout, {
                      loading: "Logging out...",
                      success: (data) => {
                        if (!data.success) throw data;
                        return data.message;
                      },
                      error: (data) => {
                        return data.message;
                      },
                    });
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
