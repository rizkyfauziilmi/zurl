import { Zap } from "lucide-react";
import Link from "next/link";

export function Brand({ size = 24 }: { size?: number }) {
  return (
    <Link href="/">
      <div className="mb-4 flex items-center space-x-2 md:mb-0">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="font-bold">zurl</span>
      </div>
    </Link>
  );
}
