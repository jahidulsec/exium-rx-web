import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { BackButton } from "@/components/shared/button/button";
import Combobox from "@/components/shared/combobox/combobox";
import { DatePickerWithRange } from "@/components/shared/date-picker/date-range-picker";
import { SelectStatus } from "@/components/shared/filter/status";
import { SearchForm } from "@/components/shared/inputs/search";
import PagePagination from "@/components/shared/pagination/pagination";
import {
  Section,
  SectionCard,
  SectionContent,
  SectionFilter,
  SectionFilterGroup,
} from "@/components/shared/section/section";
import { TableSkeleton } from "@/components/shared/skeleton/table";
import { PageHeading } from "@/components/shared/typography/heading";
import { getDoctors } from "@/features/doctor/libs/doctor";
import ExportButton from "@/features/rx/components/admin/export-button";
import DoctorRxTable from "@/features/rx/components/table";
import { getDoctorRxs } from "@/features/rx/libs/rx";
import { getAuthUser } from "@/lib/dal";
import { doctor } from "@/lib/generated/prisma";
import { AuthUser } from "@/types/auth-user";
import { SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default async function AdminReportPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getAuthUser();

  return (
    <div className="mt-8 flex flex-col gap-8">
      <Section>
        <div className="flex items-center gap-3">
          <BackButton />
          <PageHeading>Report</PageHeading>
        </div>
      </Section>

      <Section>
        <SectionCard>
          <SectionFilter>
            <div className="flex items-center gap-2">
              <DatePickerWithRange />
              <SelectStatus />
            </div>
            <SectionFilterGroup>
              <SearchForm />
              <ExportButton />
            </SectionFilterGroup>
          </SectionFilter>

          <SectionContent>
            <Suspense fallback={<TableSkeleton />}>
              <DataTable searchParams={searchParams} user={user as AuthUser} />
            </Suspense>
          </SectionContent>
        </SectionCard>
      </Section>
    </div>
  );
}

const DataTable = async ({
  searchParams,
  user,
}: {
  searchParams: SearchParams;
  user: AuthUser;
}) => {
  const { page, size, search, status, start, end } = await searchParams;

  const { role, areaCode } = user;

  const res = await getDoctorRxs({
    page: Number(page || 1),
    size: Number(size || 20),
    search: search?.toString(),
    sap_region_code: role === "rm" ? areaCode : undefined,
    status: status?.toString() as "pending",
    start: start?.toString() as any,
    end: end?.toString() as any,
  });
  return (
    <ErrorBoundary message={res.success ? undefined : res.message}>
      <DoctorRxTable data={res.data ?? []} />
      <PagePagination count={res.count} />
    </ErrorBoundary>
  );
};
