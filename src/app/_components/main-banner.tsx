"use client";

import { LinkIcon } from "lucide-react";
import { BackgroundBeams } from "~/components/ui/background-beams";
import { Button } from "~/components/ui/button";
import { PointerHighlight } from "~/components/ui/pointer-highlight";

export function MainBanner() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 antialiased">
      <div className="z-10 max-w-3xl space-y-3 text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
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
          </PointerHighlight>
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
            <a href="#demo">Learn more</a>
          </Button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
