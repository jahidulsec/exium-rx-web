import { Footer } from "@/components/shared/footer/footer";
import AppNav from "@/components/shared/navbar/app-nav";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="from-primary/25 to-background max-h-dvh min-h-dvh overflow-y-auto bg-linear-to-tl @container">
      <AppNav />
      <main className="min-h-[calc(100svh-150px)]">{children}</main>
      <Footer />
    </div>
  );
}
