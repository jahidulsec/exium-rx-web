import { Footer } from "@/components/shared/footer/footer";
import MioNav from "@/components/shared/navbar/mio-nav";
import React from "react";

export default function MioLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative min-h-svh max-h-svh overflow-y-auto bg-linear-to-t from-primary/30 to-background">
      <MioNav />
      <main className="max-w-sm mx-auto">{children}</main>
      <Footer className="mx-auto container max-w-sm text-center" />
    </div>
  );
}
