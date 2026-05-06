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
                    <SheetHeader className="border-b p-4">
                        <SheetTitle className="sr-only">
                            Exium Rx Generation
                        </SheetTitle>

                        <div className="flex items-center justify-center">
                            <LogoFull />
                        </div>
                    </SheetHeader>

                    {/* Body */}
                    <div className="flex flex-1 flex-col justify-between">
                        {/* Navigation */}
                        <nav className="overflow-y-auto p-4">
                            <ul className="space-y-2">
                                <li>
                                    <Link
                                        href="/"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full items-center px-6"
                                        >
                                            <Home className="size-3.5" /> Home
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Footer */}
                        <div className="border-t p-4">
                            <Button
                                className="w-full"
                                variant={"destructive"}
                                onClick={() => {
                                    startTransition(async () => {
                                        toast.promise(userLogout, {
                                            loading: "Logging out...",
                                            success: data => {
                                                if (!data.success) throw data;
                                                return data.message;
                                            },
                                            error: data => {
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
