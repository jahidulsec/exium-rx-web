"use client";

import { ActionButton } from "@/components/shared/button/button";
import { useRxProvider } from "@/providers/rx-provider";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function ApproveAllButton() {
  const [pending, startTransition] = React.useTransition();
  const { rxIds } = useRxProvider();

  const searchParams = useSearchParams();
  const [start, end] = [searchParams.get("start"), searchParams.get("end")];

  if (start?.toString() === end?.toString()) {
    return (
      <>
        <ActionButton
          variant={"outline"}
          className="text-secondary border-secondary/20 bg-secondary/5"
          // isPending={pending}
          // onClick={() => {
          //   startTransition(() => handleApproveData(item.doctor_rx));
          disabled={rxIds.length === 0}
          // }}
        >
          Approve ({rxIds.length})
        </ActionButton>
      </>
    );
  }

  return null;
}
