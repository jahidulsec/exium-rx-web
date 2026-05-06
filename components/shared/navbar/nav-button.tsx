"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavButton({
  name,
  href,
  className,
}: {
  name: string;
  href: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Button
      className={cn("", className)}
      asChild
      variant={href === pathname ? "default" : "ghost"}
    >
      <Link href={href}>{name}</Link>
    </Button>
  );
}
