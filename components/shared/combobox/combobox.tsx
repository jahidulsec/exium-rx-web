"use client";

import React from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";

type FetchParams = {
  page: number;
  size: number;
  search?: string;
};

type FetchResult<T> = {
  success: boolean;
  data?: T[];
};

interface AsyncComboboxProps<T> {
  fetcher: (params: FetchParams) => Promise<FetchResult<T>>;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  getLabel: (item: T) => string;
  getKey: (item: T) => React.Key;
  disabledKeys?: string[];
  searchparams?: any;
}

export default function Combobox<T>({
  fetcher,
  onValueChange,
  getKey,
  getLabel,
  placeholder = "Select an option",
  defaultValue,
  disabledKeys,
  searchparams = {},
}: AsyncComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? "");
  const [select, setSelect] = React.useState<T>();
  const [data, setData] = React.useState<T[]>([]);
  const [input, setInput] = React.useState(defaultValue ?? "");
  const search = useDebounce(input);

  React.useEffect(() => {
    let isActive = true; // prevent race condition

    const run = async () => {
      const { page, size, search: paramSearch, ...params } = searchparams;

      const res = await fetcher({
        page: page || 1,
        size: size || 10,
        search: search ?? paramSearch,
        ...params,
      });

      if (!isActive) return;

      if (res.success) {
        setData(res.data ?? []);

        if (
          defaultValue &&
          (search ?? paramSearch) === defaultValue &&
          res.data?.length
        ) {
          setSelect(res.data[0]);
        }
      }
    };

    run();

    return () => {
      isActive = false;
    };
  }, [search, searchparams, fetcher, defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between overflow-hidden")}
        >
          <span className="overflow-hidden text-left">
            {select ? getLabel(select) : "Select"}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command
          shouldFilter={false}
          onInput={(e: any) => setInput(e.target.value)}
        >
          <CommandInput />
          <CommandList>
            <CommandEmpty>No data found</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {data.map(item => (
                <CommandItem
                  disabled={disabledKeys?.some(key => getKey(item) === key)}
                  onSelect={value => {
                    setValue(value);
                    setSelect(item);
                    onValueChange?.(value);
                    setOpen(false);
                  }}
                  key={getKey(item)}
                  value={getKey(item) as string}
                >
                  {getLabel(item)}
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === getKey(item) ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
