import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/shared/section/section";
import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Filter } from "lucide-react";
import { Suspense } from "react";
import { getDoctors } from "@/features/doctor/libs/doctor";
import { AuthUser } from "@/types/auth-user";
import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { SectionLoader } from "@/components/shared/skeleton/section";
import DoctorCard from "@/features/doctor/components/mio/card";
import PagePagination from "@/components/shared/pagination/pagination";
import { SearchParams } from "@/types/search-params";

export default async function MioHomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getAuthUser();

  if (!user) redirect("/login");

  if (user.role !== "mio") redirect("/dashboard");

  return (
    <div className="flex flex-col gap-6">
      <Section>
        <p className="text-2xl">Hello, {user.name}</p>
      </Section>

      <Section>
        <Card className="bg-muted/35 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Exium Rx Generation</CardTitle>
            <CardDescription>
              Overview of listed doctors with RX entries
            </CardDescription>
            <CardAction>
              <Button>
                <Filter />
                <span className="sr-only">Filter</span>
              </Button>
            </CardAction>
          </CardHeader>
          <Suspense fallback={<SectionLoader />}>
            <RxContainer searchParams={searchParams} user={user} />
          </Suspense>
        </Card>
      </Section>
    </div>
  );
}

const RxContainer = async ({
  user,
  searchParams,
}: {
  user: AuthUser;
  searchParams: SearchParams;
}) => {
  const { page, search } = await searchParams;

  const size = 5;

  const { data, message, success, count } = await getDoctors({
    page: Number(page) || 1,
    size,
    search: search?.toString(),
    sapAreaCode: user.areaCode,
  });

  return (
    <ErrorBoundary message={!success ? message : undefined}>
      <CardContent className="flex flex-col gap-3">
        {data?.map((item) => (
          <DoctorCard doctor={item} key={item.dr_child_id} user={user} />
        ))}
        <PagePagination limit={size} count={count} />
      </CardContent>
    </ErrorBoundary>
  );
};
