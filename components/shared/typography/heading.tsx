import { cn } from "@/lib/utils";
import React from "react";
import { BackButton } from "../button/button";

const PageTitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return <p className={cn("text-3xl", className)} {...props} />;
};

const SectionHeading = ({
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn("flex items-center gap-2 text-xl font-semibold", className)}
      {...props}
    />
  );
};

const SectionHeadingIcon = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "[&>svg]:fill-secondary/15 bg-secondary-foreground text-secondary flex aspect-square h-8 items-center justify-center rounded-full [&>svg]:size-5",
        className,
      )}
      {...props}
    />
  );
};

const SectionSubTitle = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
};

const SectionHeadingWithBackButton = ({
  title,
  className,
  subtitle,
  ...props
}: React.ComponentProps<"div"> & { subtitle?: string }) => {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <BackButton />
      <div className="flex flex-col gap-0">
        <SectionHeading>{title}</SectionHeading>
        <SectionSubTitle>{subtitle}</SectionSubTitle>
      </div>
    </div>
  );
};

const SectionHeading2 = ({
  className,
  ...props
}: React.ComponentProps<"h2">) => {
  return (
    <h2
      className={cn("text-secondary w-full text-2xl font-medium", className)}
      {...props}
    />
  );
};

export {
  SectionHeading,
  SectionHeading2,
  SectionSubTitle,
  SectionHeadingIcon,
  SectionHeadingWithBackButton,
  PageTitle,
};
