import { cn } from "@/lib/utils";
import React from "react";

const Section = ({ className, ...props }: React.ComponentProps<"section">) => {
  return (
    <section className={cn("container mx-auto px-4", className)} {...props} />
  );
};

const SectionCard = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("bg-background rounded-3xl border p-4 flex flex-col gap-3", className)}
      {...props}
    />
  );
};

const SectionHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex items-center justify-between gap-5", className)}
      {...props}
    />
  );
};

const SectionFilter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex items-center justify-between flex-col md:flex-row gap-5", className)}
      {...props}
    />
  );
};

const SectionContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
};

export { Section, SectionCard, SectionHeader, SectionContent, SectionFilter };
