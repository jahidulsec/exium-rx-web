"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { useRouter } from "@bprogress/next";
import { usePathname, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";

function Search({
    placeholder = "Search...",
    type = "search",
    className,
}: {
    placeholder?: string;
    type?: string;
    className?: string;
}) {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const router = useRouter();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (search) {
            params.set("search", search);
            params.delete("page");
        } else {
            params.delete("search");
            params.delete("page");
        }
        router.push(pathname + "?" + params.toString());
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "relative w-full min-w-40 flex-1 shrink @sm:w-fit @sm:max-w-xl @sm:flex-none",
                className,
            )}
        >
            <Input
                type={type}
                name="search"
                id="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pr-12 pl-8 text-sm"
                placeholder={placeholder}
            />
            <Label
                htmlFor="search"
                className="text-muted-foreground/50 absolute top-[50%] left-3 -translate-y-[50%]"
            >
                <SearchIcon size={16} />
            </Label>
            <Button
                type="submit"
                size={"icon"}
                variant={"outline"}
                className="absolute top-0 right-0 rounded-l-none"
            >
                <SearchIcon className="text-primary" size={16} />
            </Button>
        </form>
    );
}

export { Search as SearchForm };
