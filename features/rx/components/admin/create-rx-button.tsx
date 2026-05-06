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
        <RxForm
          onSuccess={message => {
            toast.success(message);
            setOpen(false);
          }}
          onError={message => {
            toast.info(message);
          }}
          prevData={{ doctor_id: doctor?.id, user_id: user?.userId }}
        />
      </FormSheet>
    </>
  );
}
