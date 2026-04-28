"use client";

import { FormSheet } from "@/components/shared/sheet/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import RxForm from "../form";
import { DoctorMulti } from "@/features/doctor/libs/doctor";
import { AuthUser } from "@/types/auth-user";
import { toast } from "sonner";

export default function CreateRxButton({
  doctor,
  user,
}: {
  doctor?: DoctorMulti;
  user?: AuthUser;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusCircle /> Entry
      </Button>

      <FormSheet
        formTitle="Create Doctor Rx Entry"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="p-4 border rounded-2xl mb-6">
          <h3 className="text-lg font-semibold">Doctor&apos;s Information</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3">
            <p className="w-full">
              Name: <strong>{doctor?.full_name} </strong>{" "}
            </p>
            <p>
              Degrees: <strong>{doctor?.degrees} </strong>{" "}
            </p>
            <p>
              Speciality: <strong>{doctor?.speciality} </strong>{" "}
            </p>
            <p className="w-full">
              Chamber: <strong>{doctor?.chamber} </strong>{" "}
            </p>
          </div>
        </div>
        <RxForm
          onSuccess={(message) => {
            toast.success(message);
            setOpen(false)
          }}
          onError={(message) => {
            toast.info(message);
          }}
          prevData={{ doctor_id: doctor?.id, user_id: user?.userId }}
        />
      </FormSheet>
    </>
  );
}
