import { Footer } from "@/components/shared/footer/footer";
import AppNav from "@/components/shared/navbar/app-nav";
import { RxProvider } from "@/providers/rx-provider";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <RxProvider>
      <div className="from-primary/25 to-background @container min-h-svh bg-linear-to-tl">
        <AppNav />
        <main className="min-h-[calc(100svh-170px)]">{children}</main>
        <Footer />
      </div>
    </RxProvider>
  );
}
