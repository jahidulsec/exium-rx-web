import { Footer } from "@/components/shared/footer/footer";
import MioNav from "@/components/shared/navbar/mio-nav";
import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import React from "react";

export default async function MioLayout({ children }: React.PropsWithChildren) {
    const authUser = await getAuthUser();

    if (!authUser) redirect("/login");

    return (
        <div className="from-primary/30 to-background relative max-h-svh min-h-dvh overflow-y-auto bg-linear-to-t">
            <MioNav />
            <main className="mx-auto min-h-[calc(100svh-200px)] max-w-sm">
                {children}
            </main>
            <Footer className="container mx-auto max-w-sm text-center" />
        </div>
    );
}
