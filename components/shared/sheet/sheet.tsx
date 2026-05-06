import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DialogProps } from "@radix-ui/react-dialog";

const FormSheet = ({
    open,
    onOpenChange,
    className,
    children,
    formTitle,
    ...props
}: DialogProps & React.ComponentProps<"div"> & { formTitle: string }) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{formTitle}</SheetTitle>
                </SheetHeader>

                {/* form */}
                <div
                    className={cn(
                        "max-h-[calc(100vh - 100px)] h-full overflow-y-auto px-4",
                        className,
                    )}
                    {...props}
                >
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export { FormSheet };
