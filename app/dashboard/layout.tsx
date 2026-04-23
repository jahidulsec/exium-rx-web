import AppNav from "@/components/shared/navbar/app-nav";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh bg-linear-to-tl from-primary/25 to-background">
      <AppNav />
      <main className="min-h-svh">{children}</main>
    </div>
  );
}
