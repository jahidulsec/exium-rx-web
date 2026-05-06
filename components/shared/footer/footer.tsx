import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
    return (
        <footer
            className={cn("text-foreground p-6 text-center text-sm", className)}
        >
            <p>
                Designed & Developed By{" "}
                <em className="font-bold not-italic">
                    <Link
                        href={"https://impalaintech.com"}
                        target="_blank"
                        className="hover:text-primary-foreground hover:underline"
                    >
                        Impala Intech LTD.
                    </Link>
                </em>
            </p>
        </footer>
    );
};

export { Footer };
