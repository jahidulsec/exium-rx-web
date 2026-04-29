import { Footer } from "@/components/shared/footer/footer";
import MioNav from "@/components/shared/navbar/mio-nav";
import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import React from "react";

export default async function MioLayout({ children }: React.PropsWithChildren) {
  const authUser = await getAuthUser();

  if (!authUser) redirect("/login");

  return (
    <div className="relative min-h-dvh max-h-svh overflow-y-auto bg-linear-to-t from-primary/30 to-background">
      <MioNav />
      <main className="max-w-sm min-h-[calc(100svh-200px)] mx-auto">
        {children}
      </main>
      <Footer className="mx-auto container max-w-sm text-center" />
    </div>
  );
}
