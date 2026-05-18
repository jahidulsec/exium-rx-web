"use client";

import React from "react";
import { DoctorRxsMultiProps } from "../../libs/rx";
import {
  DataTable,
  useTableSerialColumn,
} from "@/components/shared/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import RxForm from "./form";
import { toast } from "sonner";
import { FormSheet } from "@/components/shared/sheet/sheet";

export default function MioDoctorRxDataTable({
  data,
}: {
  data: DoctorRxsMultiProps[];
}) {
  const serialColumn = useTableSerialColumn<DoctorRxsMultiProps>();
  const [open, setOpen] = React.useState<DoctorRxsMultiProps | boolean>(false);

  const columns: ColumnDef<DoctorRxsMultiProps>[] = [
    serialColumn,
    {
      accessorKey: "quantity",
      header: "Quantity",
    },

    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <div className="flex justify-end">
            <Button variant={"secondary"} onClick={() => setOpen(value)}>
              <Edit /> Edit
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataTable data={data} columns={columns} />

      <FormSheet
        formTitle="Edit Doctor Rx Entry"
        open={!!open}
        onOpenChange={setOpen}
      >
        {typeof open !== "boolean" && (
          <RxForm
            onSuccess={message => {
              toast.success(message);
              setOpen(false);
            }}
            onError={message => {
              toast.info(message);
            }}
            prevData={{
              id: open.id,
              doctor_id: open.doctor_id,
              user_id: open.user_id,
              quantity: open.quantity,
            }}
          />
        )}
      </FormSheet>
    </>
  );
}
