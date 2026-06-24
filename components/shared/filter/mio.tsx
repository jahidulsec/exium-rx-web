"use client";

import Combobox from "../combobox/combobox";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getUsers, UserMultiProps } from "@/features/user/libs/user";

export default function MioSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center">
      <Combobox
        key={JSON.stringify(searchParams.get("sap_area_code"))}
        getKey={(item: UserMultiProps) =>
          item.user_information?.sap_area_code ?? item.user_id
        }
        getLabel={(item: UserMultiProps) =>
          `${item.user_information?.full_name} - ${item.user_id}`
        }
        fetcher={getUsers as any}
        placeholder="Select MIO"
        onValueChange={value => {
          const params = new URLSearchParams(searchParams);
          if (value) {
            params.set("sap_area_code", value);
            params.delete("page");
            params.delete("search");
            params.delete("doctor_id");
          }

          router.push(`${pathname}?${params.toString()}`);
        }}
        searchparams={{
          size: 8,
          role: "mio",
        }}
        defaultValue={searchParams.get("sap_area_code")?.toString()}
      />
      {searchParams.has("sap_area_code") && (
        <Button
          variant={"outline"}
          size={"icon-sm"}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.delete("sap_area_code");
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
