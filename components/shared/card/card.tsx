import { cn } from "@/lib/utils";
import React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("bg-background rounded-xl p-6", className)}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("flex items-center justify-between gap-3", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h2">) {
    return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
}

function CardDecription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            className={cn("text-muted-foreground text-xs", className)}
            {...props}
        />
    );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("", className)} {...props} />;
}

export {
    Card,
    CardAction,
    CardContent,
    CardDecription,
    CardFooter,
    CardHeader,
    CardTitle,
};
