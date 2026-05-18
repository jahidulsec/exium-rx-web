import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { BackButton } from "@/components/shared/button/button";
import PagePagination from "@/components/shared/pagination/pagination";
import { Section, SectionHeader } from "@/components/shared/section/section";
import { SectionLoader } from "@/components/shared/skeleton/section";
import { SectionHeading } from "@/components/shared/typography/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDoctor } from "@/features/doctor/libs/doctor";
import MioDoctorRxDataTable from "@/features/rx/components/mio/table";
import { getDoctorRxs } from "@/features/rx/libs/rx";
import { Params } from "@/types/search-params";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function MioDoctorDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <Section className="flex flex-col gap-6">
        <SectionHeader>
          <SectionHeading>
            <BackButton href="/" />
            Doctor RX Entries
          </SectionHeading>
        </SectionHeader>

        <Card className="bg-muted/35 gap-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Doctor&apos;s Information</CardTitle>
          </CardHeader>
          <Separator />
          <Suspense fallback={<SectionLoader />}>
            <DoctorDetails id={id?.toString() ?? ""} />
          </Suspense>
        </Card>
      </Section>

      <Section>
        <Card className="bg-muted/35 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Last 24 Hours Entries</CardTitle>
          </CardHeader>
          <Suspense fallback={<SectionLoader />}>
            <DoctorRxList id={id?.toString() ?? ""} />
          </Suspense>
        </Card>
      </Section>
    </div>
  );
}

const DoctorDetails = async ({ id }: { id: string }) => {
  const res = await getDoctor(id);

  if (!res.success || !res.data) return notFound();

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <CardContent className="flex w-full flex-wrap gap-x-3 gap-y-2">
        <h3 className="w-full text-lg font-semibold">{res.data?.full_name}</h3>
        <p>
          Degrees: <strong>{res.data?.degrees} </strong>
        </p>
        <p>
          Specialty: <strong>{res.data?.speciality} </strong>
        </p>
        <p className="w-full">
          Chamber: <strong>{res.data?.chamber} </strong>
        </p>
      </CardContent>
    </ErrorBoundary>
  );
};

const DoctorRxList = async ({ id }: { id: string }) => {
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);

  const res = await getDoctorRxs({
    page: 1,
    size: 20,
    doctor_id: Number(id),
    start: prevDate,
    end: prevDate,
    sort: 'asc'
  });

  return (
    <ErrorBoundary message={!res.success ? res.message : undefined}>
      <CardContent className="flex flex-col gap-3">
        <MioDoctorRxDataTable data={res.data ?? []} />
        <PagePagination count={res.count} />
      </CardContent>
    </ErrorBoundary>
  );
};
