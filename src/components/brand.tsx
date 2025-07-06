import { Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "~/lib/utils";

interface BrandProps {
  isText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Brand({
  isText: isTest = true,
  size = "sm",
  className,
}: BrandProps) {
  return (
    <Link href="/">
      <div className={cn("flex items-center space-x-2 md:mb-0", className)}>
        <div
          className={cn(
            "flex items-center justify-center rounded bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg",
            size === "sm"
              ? "h-6 w-6"
              : size === "md"
                ? "h-10 w-10"
                : "h-16 w-16",
          )}
        >
          <Zap
            className={cn(
              "text-white",
              size === "sm"
                ? "h-4 w-4"
                : size === "md"
                  ? "h-8 w-8"
                  : "h-12 w-12",
            )}
          />
        </div>
        {isTest && <span className="font-bold">zurl</span>}
      </div>
    </Link>
  );
}
