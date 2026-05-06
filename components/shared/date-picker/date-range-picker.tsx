"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@bprogress/next";
import { cn } from "@/lib/utils";

export function DatePickerWithRange({ className }: { className?: string }) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) return;

    const fromDate = new Date(start);
    const toDate = new Date(end);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) return;

    setDate(prev => {
      // avoid unnecessary state updates
      if (
        prev?.from?.getTime() === fromDate.getTime() &&
        prev?.to?.getTime() === toDate.getTime()
      ) {
        return prev;
      }

      return {
        from: fromDate,
        to: toDate,
      };
    });
  }, [searchParams]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-picker-range"
          className={cn("justify-start px-2.5 font-normal", className)}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={selected => {
            setDate(selected);

            const params = new URLSearchParams(searchParams);
            if (selected?.from) {
              params.set("start", format(selected.from, "yyyy-MM-dd"));

              if (selected.to) {
                params.set("end", format(selected.to, "yyyy-MM-dd"));
              }
              params.delete("page");
              router.push(`${pathname}?${params.toString()}`);
            } else {
              params.delete("start");
              params.delete("end");
              router.push(`${pathname}?${params.toString()}`);
            }
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
