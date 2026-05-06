import AppNav from "@/components/shared/navbar/app-nav";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="from-primary/25 to-background min-h-svh bg-linear-to-tl">
            <AppNav />
            <main className="min-h-svh">{children}</main>
        </div>
    );
}
