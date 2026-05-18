import { ErrorBoundary } from "@/components/shared/boundary/error-boundary";
import { DownloadButton } from "@/components/shared/button/download";
import { ExcelUploadButton } from "@/components/shared/button/excel-upload";
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
import { createUsers } from "@/features/user/actions/user";
import UserTable from "@/features/user/components/table";
import { getUsers } from "@/features/user/libs/user";
import { getAuthUser } from "@/lib/dal";
import { AuthUser } from "@/types/auth-user";
import { SearchParams } from "@/types/search-params";
import React, { Suspense } from "react";

export default async function AdminUserPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getAuthUser();

  return (
    <div className="mt-8 flex flex-col gap-8">
      <Section>
        <PageHeading>Users</PageHeading>
      </Section>

      <Section>
        <SectionCard>
          <SectionFilter>
            <SearchForm />
            <SectionFilterGroup>
              <ExcelUploadButton action={createUsers} />
              <DownloadButton filePath="/templates/user_template.xlsx" />
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
  const { page, size, search } = await searchParams;

  const { role, areaCode } = user;

  const res = await getUsers({
    page: Number(page || 1),
    size: Number(size || 20),
    search: search?.toString(),
  });
  return (
    <ErrorBoundary message={res.success ? undefined : res.message}>
      <UserTable data={res.data ?? []} />
      <PagePagination count={res.count} />
    </ErrorBoundary>
  );
};
