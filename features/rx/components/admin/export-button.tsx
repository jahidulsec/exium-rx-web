"use client";

import { Download } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { convertToCSV } from "@/utils/csv";
import { ActionButton } from "@/components/shared/button/button";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { getDoctorRxExportList } from "../../libs/rx";
import { useAuth } from "@/providers/auth-provider";

export default function ExportButton() {
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const downloadCSV = async (name: string) => {
    const res = await getDoctorRxExportList({
      start: searchParams.get("start")
        ? new Date(searchParams.get("start") as string)
        : undefined,
      end: searchParams.get("end")
        ? new Date(searchParams.get("end") as string)
        : undefined,
      status: (searchParams.get("status") as "approved") ?? undefined,
      sap_region_code: user?.role === "rm" ? user.areaCode : undefined,
    });

    if (res.success === false) {
      toast.error(res?.message);
      return;
    }

    if (res?.data?.length == 0) {
      toast.warning("No data found");
      return;
    }

    const header = [
      {
        header: "id",
        name: "Rx ID",
      },
      {
        header: "full_name",
        name: "Doctor Name",
      },
      {
        header: "degrees",
        name: "Degrees",
      },
      {
        header: "dr_master_id",
        name: "Dr Master ID",
      },
      {
        header: "dr_child_id",
        name: "Dr Child ID",
      },
      {
        header: "mobile",
        name: "Mobile",
      },
      {
        header: "region_name",
        name: "Region Name",
      },
      {
        header: "sap_region_code",
        name: "SAP Region Code",
      },
      {
        header: "area_name",
        name: "Area Name",
      },
      {
        header: "sap_area_code",
        name: "SAP Area Code",
      },
      {
        header: "rx_date",
        name: "Rx Date",
      },

      {
        header: "quantity",
        name: "Qty.",
      },
      {
        header: "status",
        name: "Status",
      },
      {
        header: "created_at",
        name: "Created At",
      },
    ];

    const csvData = new Blob(
      [
        convertToCSV(
          res.data ?? [],
          header,
          [],
          [
            {
              headerName: "mobile",
              format: value => {
                return `"${value}"`;
              },
            },
            {
              headerName: "created_at",
              format: value => {
                return value
                  ? format(new Date(value as any), "dd/MM/yy - h:mm aaa")
                  : "-";
              },
            },
            {
              headerName: "rx_date",
              format: value => {
                return value ? format(new Date(value as any), "dd/MM/yy") : "-";
              },
            },
          ],
        ),
      ],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;",
      },
    );
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ActionButton
        isPending={isPending}
        onClick={() =>
          startTransition(
            async () =>
              await downloadCSV(
                "doctors_rx_till_" + format(new Date(), "dd-MM-yyyy"),
              ),
          )
        }
      >
        <Download /> Export
      </ActionButton>
    </>
  );
}
