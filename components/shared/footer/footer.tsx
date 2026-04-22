import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn("p-6 text-foreground", className)}>
      <p>
        Designed & Developed By{" "}
        <em className="not-italic font-bold ">
          <Link
            href={"https://impalaintech.com"}
            target="_blank"
            className="hover:underline hover:text-primary-foreground"
          >
            Impala Intech LTD.
          </Link>
        </em>
      </p>
    </footer>
  );
};

export { Footer };
