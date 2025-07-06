import Link from "next/link";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="bg-background/80 border-t backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Brand />
          <div className="flex space-x-6 text-sm text-gray-600">
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} zurl. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
