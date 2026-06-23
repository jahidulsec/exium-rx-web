"use client";

import { useTableSerialColumn } from "@/components/shared/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Edit } from "lucide-react";
import { getDisableStatusOnExpiredDate } from "@/utils/helper";
import React from "react";
import { FormSheet } from "@/components/shared/sheet/sheet";
import RxForm from "./admin/form";
import { useAuth } from "@/providers/auth-provider";
import { AuthUser } from "@/types/auth-user";
import { toast } from "sonner";
import { formatDateTime } from "@/utils/formatter";
import { DoctorRxGroupsMultiProps } from "../libs/rx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableActionButton } from "@/components/shared/button/button";
import { cn } from "@/lib/utils";
import { DoctorRxType } from "../actions/schema";
import { useSearchParams } from "next/navigation";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/settings";

export default function DoctorRxTable({
  data,
}: {
  data: DoctorRxGroupsMultiProps[];
}) {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const page = searchParams.has("page")
    ? Number(searchParams.get("page"))
    : DEFAULT_PAGE;
  const size = searchParams.has("size")
    ? Number(searchParams.get("size"))
    : DEFAULT_PAGE_SIZE;

  return (
    <>
      {/* <DataTable data={data} columns={columns} /> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Total Qty.</TableHead>
              <TableHead>RX Date</TableHead>
              <TableHead align="right" className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  <p className="flex min-h-40 items-center justify-center">
                    No data.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <RxCell
                  key={item.dr_master_id + item.dr_child_id}
                  user={user as AuthUser}
                  index={(page - 1) * size + index}
                  item={item}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

const RxCell = ({
  item,
  index,
  user,
}: {
  item: DoctorRxGroupsMultiProps;
  index: number;
  user: AuthUser;
}) => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState<
    (DoctorRxType & { id: string }) | boolean
  >(false);

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>
          <div>
            <p className="font-semibold">{item.full_name}</p>
            <div className="flex items-center gap-3 text-xs">
              <p>Child ID: {item.dr_child_id}</p> /
              <p>Master ID: {item.dr_master_id}</p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          {item.doctor_rx.reduce((acc, sum) => (acc = acc + sum.quantity), 0)}
        </TableCell>
        <TableCell>
          {item.doctor_rx.length > 0
            ? `${format(item.doctor_rx[0].rx_date, "dd LLL, yyyy")} - ${format(item.doctor_rx[item.doctor_rx.length - 1].rx_date, "dd LLL, yyyy")}`
            : "-"}
        </TableCell>
        <TableCell>
          <div className="flex justify-end">
            <TableActionButton
              variant={"default"}
              tooltip="Show"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </TableActionButton>
          </div>
        </TableCell>
      </TableRow>

      {/*  */}
      <TableRow className={cn(open ? "" : "hidden")}>
        <TableCell colSpan={4}>
          <div className="border-primary overflow-hidden rounded-md border">
            <Table className="">
              <TableHeader className="bg-muted/50 sticky top-0 border-b">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Qty.</TableHead>
                  <TableHead>Rx Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.doctor_rx.length === 0 ? (
                  <TableRow>
                    <TableCell>No Data.</TableCell>
                  </TableRow>
                ) : (
                  item.doctor_rx.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">
                            {item.user.user_information?.full_name}
                          </p>
                          <div className="flex items-center gap-3 text-xs">
                            <p>MIO Code: {item.user_id}</p> /
                            <p>
                              SAP Area Code:{" "}
                              {item.user.user_information?.sap_area_code}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {item.created_at && formatDateTime(item.created_at)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "disapproved"
                              ? "destructive"
                              : item.status === "approved"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user?.role === "superadmin" ? (
                          <Button
                            variant={"secondary"}
                            size={"sm"}
                            onClick={() =>
                              setEdit({
                                id: item.id.toString(),
                                doctor_id: String(item.doctor_id),
                                user_id: item.user_id,
                                rx_date: item.rx_date,
                                quantity: item.quantity,
                                status: item.status as "approved",
                                updated_by: "",
                                brand_id: item.brand_id ?? undefined,
                              })
                            }
                          >
                            <Edit />
                            Edit
                          </Button>
                        ) : (
                          <p className="flex justify-end">
                            {item.created_at &&
                            getDisableStatusOnExpiredDate(
                              item.created_at as Date,
                              7,
                            ) ? null : (
                              <Button
                                variant={"secondary"}
                                size={"sm"}
                                onClick={() =>
                                  setEdit({
                                    id: item.id.toString(),
                                    doctor_id: String(item.doctor_id),
                                    user_id: item.user_id,
                                    rx_date: item.rx_date,
                                    quantity: item.quantity,
                                    status: item.status as "approved",
                                    updated_by: "",
                                    brand_id: item.brand_id ?? undefined,
                                  })
                                }
                              >
                                <Edit />
                                Edit
                              </Button>
                            )}
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TableCell>
      </TableRow>

      <FormSheet
        open={!!edit}
        onOpenChange={setEdit}
        formTitle="Edit Doctor Rx Entry"
      >
        <RxForm
          authUser={user as AuthUser}
          prevData={typeof edit !== "boolean" ? edit : undefined}
          onSuccess={message => {
            toast.success(message);
            setEdit(false);
          }}
          onError={message => {
            toast.info(message);
          }}
        />
      </FormSheet>
    </>
  );
};
