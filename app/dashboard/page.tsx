import { ExcelUploadButton } from "@/components/shared/button/excel-upload";
import { Section } from "@/components/shared/section/section";
import { createDoctors } from "@/features/doctor/actions/doctor";
import { createUsers } from "@/features/user/actions/user";
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div>
      <Section>
        <ExcelUploadButton action={createUsers} />
      </Section>
    </div>
  );
}
