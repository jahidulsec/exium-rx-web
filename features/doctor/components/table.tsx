"use client";

import React from "react";
import { DoctorMulti } from "../libs/doctor";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  useTableSerialColumn,
} from "@/components/shared/table/data-table";
import { TableActionButton } from "@/components/shared/button/button";
import { Edit, Trash } from "lucide-react";
import AlertModal from "@/components/shared/alert-dialog/alert-dialog";
import { deleteToastTemplate } from "@/lib/template";
import { deleteDoctor } from "../actions/doctor";

export default function DoctorTable({ data }: { data: DoctorMulti[] }) {
  const serialColumn = useTableSerialColumn<DoctorMulti>();
  const [edit, setEdit] = React.useState<string | boolean>(false);
  const [del, setDel] = React.useState<string | boolean>(false);
  const [pending, startTransition] = React.useTransition();

  const columns: ColumnDef<DoctorMulti>[] = [
    serialColumn,
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "speciality",
      header: "Specialty",
    },
    {
      accessorKey: "degrees",
      header: "Degrees",
    },
    {
      id: "area_name",
      header: "Area / SAP Area Code",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <p>
            {value.area_name} ({value.sap_area_code})
          </p>
        );
      },
    },
    {
      accessorKey: "dr_child_id",
      header: "Child ID",
    },
    {
      accessorKey: "dr_master_id",
      header: "Master ID",
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <div className="flex justify-end gap-1">
            {/* <TableActionButton
              tooltip="Edit"
              onClick={() => setEdit(String(value.id))}
            >
              <Edit />
            </TableActionButton> */}
            <TableActionButton
              disabled={pending}
              variant={"delete"}
              tooltip="Delete"
              onClick={() => setDel(String(value.id))}
            >
              <Trash />
            </TableActionButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable data={data} columns={columns} />

      <AlertModal
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          const id = typeof del !== "boolean" ? del : "";

          startTransition(() => {
            deleteToastTemplate(() => deleteDoctor(id));
          });
        }}
      />
    </>
  );
}
