import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctor } from "@/lib/generated/prisma";
import { PlusCircle } from "lucide-react";
import React from "react";
import { DoctorMulti } from "../../libs/doctor";

export default function DoctorCard({
  full_name,
  degrees,
  speciality,
  chamber,
  ...props
}: DoctorMulti) {
  return (
    <div className="rounded-xl bg-background overflow-hidden">
      <div className="p-4 flex justify-between items-start gap-6">
        <article>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold">{full_name}</h3>
            <p className="text-xs text-primary-foreground">
              {degrees} / {speciality}
            </p>
          </div>
        </article>

        {/* actions */}
        <div className="flex flex-col justify-between items-end gap-1">
          <p className="text-xs text-muted-foreground">Yesterday</p>
          <Button>
            <PlusCircle /> Entry
          </Button>
        </div>
      </div>
      <div className="p-3 bg-muted/50">
        <p>
          Total Entries:{" "}
          <strong className="text-secondary">{props._count.doctor_rx}</strong>
        </p>
      </div>
    </div>
  );
}
