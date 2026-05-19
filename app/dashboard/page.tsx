import { ExcelUploadButton } from "@/components/shared/button/excel-upload";
import {
  Section,
  SectionCard,
  SectionContent,
  SectionHeader,
} from "@/components/shared/section/section";
import {
  PageTitle,
  SectionHeading,
} from "@/components/shared/typography/heading";
import RMAdminHomeView from "@/components/views/rm/home";
import { getAuthUser } from "@/lib/dal";
import { createDoctors } from "@/features/doctor/actions/doctor";
import { SearchParams } from "@/types/search-params";
import { RxMonthlyLineChart } from "@/features/rx/components/monthly-line-chart";
import { Suspense } from "react";
import { SectionLoader } from "@/components/shared/skeleton/section";
import { getRxQuantityStats } from "@/features/rx/libs/chart";
import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import Link from "next/link";
import { LibraryBig, Stethoscope, User2 } from "lucide-react";

const navList = [
  {
    icon: User2,
    name: "User",
    href: "/dashboard/user",
  },
  {
    icon: Stethoscope,
    name: "Doctor",
    href: "/dashboard/doctor",
  },
  {
    icon: LibraryBig,
    name: "Report",
    href: "/dashboard/report",
  },
];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getAuthUser();

  if (user?.role === "rm")
    return <RMAdminHomeView user={user} searchParams={searchParams} />;

  return (
    <div className="mt-8 flex flex-col gap-8">
      {/* header */}
      <Section className="flex flex-col gap-0">
        <PageTitle>
          Hi, <span className="text-secondary">{user?.name}</span>{" "}
        </PageTitle>
        <p className="text-muted-foreground">Checkout recent activities</p>
      </Section>

      <Section>
        <div className="flex gap-3 flex-wrap">
          {navList.map(item => (
            <Link
              href={item.href}
              className="bg-muted/35 min-w-[18rem] flex-1 rounded-4xl p-4 shadow-sm"
              key={item.href}
            >
              <div className="bg-primary text-primary-foreground mb-1 w-fit rounded-xl p-2 [&_svg]:size-4">
                <item.icon />
              </div>
              <h3 className="font-semibold">{item.name}</h3>
            </Link>
          ))}
        </div>
      </Section>

      {/* chart */}
      <Section>
        <Suspense fallback={<SectionLoader />}>
          <ChartSection />
        </Suspense>
      </Section>
    </div>
  );
}

const ChartSection = async () => {
  const res = await getRxQuantityStats();

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <RxMonthlyLineChart data={res?.data ?? []} />
    </ErrorBoundary>
  );
};
