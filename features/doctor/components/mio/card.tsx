import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { doctor } from "@/lib/generated/prisma";
import { PlusCircle } from "lucide-react";
import React from "react";

export default function DoctorCard({
  full_name,
  degrees,
  speciality,
  chamber,
}: doctor) {
  return (
    <div className="p-4 rounded-xl bg-background flex justify-between items-start gap-6">
      <article>
        <h3 className="text-base font-semibold">{full_name}</h3>
        <p className="text-xs">
          {degrees} / {speciality}
        </p>
      </article>

      {/* actions */}
      <div className="flex flex-col items-end gap-1">
        <Badge variant={"outline"}>Yesterday</Badge>
        <Button>
          <PlusCircle /> Entry
        </Button>
      </div>
    </div>
  );
}
