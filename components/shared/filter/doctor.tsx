"use client";

import React from "react";
import Combobox from "../combobox/combobox";
import { getDoctors } from "@/features/doctor/libs/doctor";
import { doctor } from "@/lib/generated/prisma";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function DoctorSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sap_area_code = searchParams.get("sap_area_code")?.toString() ?? undefined;

  return (
    <div className="flex items-center">
      <Combobox
        key={JSON.stringify(searchParams.get("doctor_id"))}
        getKey={(item: doctor) => item.id.toString()}
        getLabel={(item: doctor) => item.full_name}
        fetcher={params =>
          getDoctors({ ...params, sapAreaCode: sap_area_code }) as any
        }
        placeholder="Select Doctor"
        onValueChange={value => {
          const params = new URLSearchParams(searchParams);
          if (value) {
            params.set("doctor_id", value);
            params.delete("page");
            params.delete("search");
            params.delete("mio_id");
          }

          router.push(`${pathname}?${params.toString()}`);
        }}
        searchparams={{
          size: 8,
        }}
        defaultValue={searchParams.get("doctor_id")?.toString()}
      />
      {searchParams.has("doctor_id") && (
        <Button
          variant={"outline"}
          size={"icon-sm"}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("doctor_id");
            params.delete("page");
            params.delete("search");

            router.push(`${pathname}?${params.toString()}`);
          }}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
