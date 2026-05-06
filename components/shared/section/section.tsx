import { cn } from "@/lib/utils";
import React from "react";

const Section = ({ className, ...props }: React.ComponentProps<"section">) => {
    return (
        <section
            className={cn("container mx-auto px-4", className)}
            {...props}
        />
    );
};

export { Section };
