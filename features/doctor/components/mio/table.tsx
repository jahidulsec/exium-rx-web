"use client";

import { DoctorMulti } from "../../libs/doctor";
import { useAuth } from "@/providers/auth-provider";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  useTableSerialColumn,
} from "@/components/shared/table/data-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import CreateRxButton from "@/features/rx/components/mio/create-rx-button";

export default function DoctorTable({ data }: { data: DoctorMulti[] }) {
  const { user } = useAuth();
  const serialColumn = useTableSerialColumn<DoctorMulti>();

  const columns: ColumnDef<DoctorMulti>[] = [
    serialColumn,
    {
      accessorKey: "full_name",
      header: "Doctor Name",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <div className="flex flex-col gap-1 text-wrap">
            <h3 className="text-base font-semibold">{value.full_name}</h3>
            <p className="text-primary-foreground text-xs">
              {value.degrees} / {value.speciality}
            </p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Date",
      cell: ({ row }) => {
        const value = row.original;
        const prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - 1);

        return (
          <div className="flex flex-col gap-1">
            <Badge variant={"outline"}>
              {format(value.created_at as Date, "dd LLL, yy")}
            </Badge>
            <CreateRxButton doctor={value} user={user} />
            <p className="text-muted-foreground mt-2 text-center text-xs">
              {value._count.doctor_rx} Entries
            </p>
          </div>
        );
      },
    },
  ];

  return (
    <div className="[&_td]:not-last:not-first:border [&_td]:not-last:not-first:border-b-0 [&_th]:not-last:border-r">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
