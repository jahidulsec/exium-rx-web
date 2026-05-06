import { cn } from "@/lib/utils";
import React from "react";

const Form = ({ className, ...props }: React.ComponentProps<"form">) => {
    return (
        <form
            className={cn("flex w-full max-w-md flex-col gap-6", className)}
            {...props}
        />
    );
};

export { Form };
