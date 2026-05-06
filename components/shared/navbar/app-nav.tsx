import React from "react";
import { LogoFull } from "../assets/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import NavUser from "./nav-user";

const navList = {
    superadmin: [
        {
            name: "Dashboard",
            href: "/dashboard",
            isActive: true,
        },
        {
            name: "Mio",
            href: "/dashboard/mio",
            isActive: false,
        },
        {
            name: "Doctor",
            isActive: false,
            href: "/dashboard/doctor",
        },
    ],
    rm: [
        {
            name: "Dashboard",
            href: "/dashboard",
            isActive: true,
        },
        {
            name: "Report",
            href: "/dashboard/report",
            isActive: false,
        },
    ],
};

export default async function AppNav() {
    const user = await getAuthUser();

    if (!["superadmin", "rm"].includes(user?.role as string))
        redirect("/login");

    return (
        <header className="sticky top-0 container mx-auto px-6 py-3">
            <div className="flex items-center justify-between gap-5">
                {/* logo */}
                <LogoFull />

                <nav className="flex items-center gap-2">
                    <ul className="bg-background flex items-center rounded-full p-1">
                        {navList[user?.role as "rm"].map(item => (
                            <li key={item.href}>
                                <Button
                                    asChild
                                    variant={
                                        item.isActive ? "default" : "ghost"
                                    }
                                >
                                    <Link href="#">{item.name}</Link>
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <NavUser />
                </nav>
            </div>
        </header>
    );
}
