"use client";

import {
  DataTable,
  useTableSerialColumn,
} from "@/components/shared/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { getDisableStatusOnExpiredDate } from "@/utils/helper";
import { DoctorRxMulti } from "@/types/rx";

export default function DoctorRxTable({ data }: { data: DoctorRxMulti[] }) {
  const serialColumns = useTableSerialColumn<DoctorRxMulti>();

  const columns: ColumnDef<DoctorRxMulti>[] = [
    serialColumns,
    {
      id: "doctor",
      header: "Doctor",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.doctor.full_name}</p>;
      },
    },
    {
      id: "mio",
      header: "MIO",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user.user_information?.full_name}</p>;
      },
    },
    {
      id: "area_code",
      header: "Area Code",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user.user_information?.sap_area_code}</p>;
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <Badge
            variant={
              value.status === "disapproved"
                ? "destructive"
                : value.status === "approved"
                  ? "secondary"
                  : "default"
            }
          >
            {value.status}
          </Badge>
        );
      },
    },
    {
      id: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <p>
            {value.created_at &&
              format(value.created_at, "dd LLL yyyy - h:mm aaa")}
          </p>
        );
      },
    },

    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <p className="flex justify-end">
            {value.created_at &&
            getDisableStatusOnExpiredDate(
              value.created_at as Date,
              7,
            ) ? null : (
              <Button variant={"secondary"} size={"sm"}>
                <Edit />
                Edit
              </Button>
            )}
          </p>
        );
      },
    },
  ];

  return <DataTable data={data} columns={columns} />;
}
