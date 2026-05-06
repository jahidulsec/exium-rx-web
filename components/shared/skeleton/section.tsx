import { Loader } from "lucide-react";

const SectionLoader = () => {
    return (
        <div className="flex min-h-40 w-full items-center justify-center">
            <Loader className="text-primary size-8 animate-spin" />
        </div>
    );
};

export { SectionLoader };
