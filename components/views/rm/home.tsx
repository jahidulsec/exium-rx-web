import { DatePickerWithRange } from "@/components/shared/date-picker/date-range-picker";
import { SelectStatus } from "@/components/shared/filter/status";
import { SearchForm } from "@/components/shared/inputs/search";
import PagePagination from "@/components/shared/pagination/pagination";
import {
  Section,
  SectionCard,
  SectionContent,
  SectionFilter,
  SectionHeader,
} from "@/components/shared/section/section";
import { TableSkeleton } from "@/components/shared/skeleton/table";
import {
  PageTitle,
  SectionHeading,
} from "@/components/shared/typography/heading";
import { getDoctors } from "@/features/doctor/libs/doctor";
import CreateRxButton from "@/features/rx/components/admin/create-rx-button";
import DoctorRxTable from "@/features/rx/components/table";
import { getDoctorRxs } from "@/features/rx/libs/rx";
import { AuthUser } from "@/types/auth-user";
import { SearchParams } from "@/types/search-params";
import { Suspense } from "react";

export default function RMAdminHomeView({
  user,
  searchParams,
}: {
  user: AuthUser;
  searchParams: SearchParams;
}) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <Section>
        <PageTitle>Hi, {user?.name}</PageTitle>
      </Section>

      <Section>
        <SectionCard>
          <SectionHeader>
            <SectionHeading>Rx List</SectionHeading>
            <CreateRxButton user={user as AuthUser} />
          </SectionHeader>

          <SectionFilter>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <DatePickerWithRange />
              <SelectStatus />
            </div>
            <SearchForm />
          </SectionFilter>

          <SectionContent>
            <Suspense fallback={<TableSkeleton />}>
              <DataTable user={user} searchParams={searchParams} />
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
    end: end?.toString() as any
  });
  return (
    <>
      <DoctorRxTable data={res.data ?? []} />
      <PagePagination count={res.count} />
    </>
  );
};
