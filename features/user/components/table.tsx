"use client";

import {
  DataTable,
  useTableSerialColumn,
} from "@/components/shared/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { UserMultiProps } from "../libs/user";
import { Badge } from "@/components/ui/badge";
import { TableActionButton } from "@/components/shared/button/button";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { FormSheet } from "@/components/shared/sheet/sheet";
import ProfileForm from "./profile-form";
import AlertModal from "@/components/shared/alert-dialog/alert-dialog";
import { deleteToastTemplate } from "@/lib/template";
import { deleteUser } from "../actions/user";

export default function UserTable({ data }: { data: UserMultiProps[] }) {
  const serialColumn = useTableSerialColumn<UserMultiProps>();
  const [edit, setEdit] = React.useState<string | boolean>(false);
  const [del, setDel] = React.useState<string | boolean>(false);
  const [pending, startTransition] = React.useTransition();

  const columns: ColumnDef<UserMultiProps>[] = [
    serialColumn,
    {
      accessorKey: "user_id",
      header: "User ID",
    },
    {
      id: "full_name",
      header: "Name",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user_information?.full_name}</p>;
      },
    },
    {
      id: "designation",
      header: "Designation",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user_information?.designation ?? "-"}</p>;
      },
    },
    {
      id: "email",
      header: "Email",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user_information?.email ?? "-"}</p>;
      },
    },
    {
      id: "mobile",
      header: "Mobile",
      cell: ({ row }) => {
        const value = row.original;

        return <p>{value.user_information?.mobile ?? "-"}</p>;
      },
    },
    {
      id: "role",
      header: "Role",
      cell: ({ row }) => {
        const value = row.original;

        return <Badge variant={"outline"}>{value.role ?? "-"}</Badge>;
      },
    },
    {
      id: "action",
      header: "",
      cell: ({ row }) => {
        const value = row.original;

        return (
          <div className="flex justify-end gap-1">
            <TableActionButton
              tooltip="Edit"
              onClick={() => setEdit(value.user_id)}
            >
              <Edit />
            </TableActionButton>
            <TableActionButton
              disabled={pending}
              variant={"delete"}
              tooltip="Delete"
              onClick={() => setDel(value.user_id)}
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

      <FormSheet open={!!edit} onOpenChange={setEdit} formTitle="Update User">
        <ProfileForm userId={typeof edit === "string" ? edit : ""} />
      </FormSheet>

      <AlertModal
        open={!!del}
        onOpenChange={setDel}
        onAction={() => {
          const id = typeof del !== "boolean" ? del : "";

          startTransition(() => {
            deleteToastTemplate(() => deleteUser(id));
          });
        }}
      />
    </>
  );
}
