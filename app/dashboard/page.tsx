import { ExcelUploadButton } from "@/components/shared/button/excel-upload";
import { Section } from "@/components/shared/section/section";
import { PageTitle } from "@/components/shared/typography/heading";
import RMAdminHomeView from "@/components/views/rm/home";
import { getAuthUser } from "@/lib/dal";
import { createDoctors } from "@/features/doctor/actions/doctor";
import { SearchParams } from "@/types/search-params";

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
      <Section>
        <PageTitle>Hi, {user?.name}</PageTitle>
        <ExcelUploadButton action={createDoctors} />
      </Section>
    </div>
  );
}
