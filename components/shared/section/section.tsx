import { cn } from "@/lib/utils";
import React from "react";

const Section = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section className={cn("container px-6 mx-auto", className)} {...props} />
  );
};

export { Section };
