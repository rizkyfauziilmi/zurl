"use client";

import { LinkIcon } from "lucide-react";
import { Brand } from "~/components/brand";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { PointerHighlight } from "~/components/ui/pointer-highlight";
import URLShortenerDemo from "./url-shortener-demo";

export function MainBanner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 antialiased md:pt-[25vh]">
      <Brand className="z-10" isText={false} size="lg" />
      <div className="z-10 -mt-4 max-w-3xl space-y-12">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Zurl
            </span>{" "}
            Shorten URLs Instantly. Share Smarter. Track Effortlessly.
          </h1>
          <div className="text-muted-foreground text-xl">
            Transform long links into{" "}
            <PointerHighlight
              rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
              pointerClassName="text-yellow-500 h-3 w-3 hidden"
              containerClassName="inline-block mr-1"
            >
              <span className="text-primary relative z-10 font-bold">
                sleek, shareable URLs.
              </span>
            </PointerHighlight>
            Enjoy{" "}
            <PointerHighlight
              rectangleClassName="bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 leading-loose"
              pointerClassName="text-green-500 h-3 w-3 hidden"
              containerClassName="inline-block ml-1"
            >
              <span className="text-primary relative z-10 font-bold">
                lightning-fast redirects, advanced analytics
              </span>
            </PointerHighlight>{" "}
            and
            <PointerHighlight
              rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
              pointerClassName="text-blue-500 h-3 w-3 hidden"
              containerClassName="inline-block mx-1"
            >
              <span className="text-primary relative z-10 font-bold">
                total privacy
              </span>
            </PointerHighlight>
            —no hassle, just results.
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Button>
              <LinkIcon className="size-4" />
              Try it now for free
            </Button>
            <Button variant="outline" asChild>
              <a href="#features">Learn more</a>
            </Button>
          </div>
        </div>
        <URLShortenerDemo />
      </div>
      <BackgroundBeams />
    </div>
  );
}
