"use client";

import { cn } from "~/lib/utils";
import { useState } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";

import { ArrowRightIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { CardSpotlight } from "~/components/ui/card-spotlight";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://example.com";

export function Demo() {
  const [code, setCode] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string>("");

  const demoMutation = api.shortUrl.demo.useMutation({
    onSuccess: (data) => {
      toast.success("URL shortened successfully!");
      setCode(data.shortCode);
    },
    onError: () => {
      toast.error("Failed to shorten URL");
    },
  });

  return (
    <div
      id="demo"
      className="flex h-screen flex-col items-center justify-center"
    >
      <CardSpotlight className="flex w-full max-w-2xl flex-col items-start gap-2">
        <div className="z-10 mb-2 flex items-center gap-2">
          <span
            role="img"
            aria-label="sparkles"
            className="text-primary text-lg"
          >
            ✨
          </span>
          <span className="text-lg font-semibold">
            Try the URL Shortener Demo!
          </span>
        </div>
        <p className="text-muted-foreground z-10 mb-4 text-sm">
          Paste any link below and instantly get a short, shareable URL.{" "}
          <span className="text-primary font-bold">No sign-up required!</span>
        </p>
        <div className="z-10 flex w-full items-center gap-4">
          <div>
            <Input
              disabled={demoMutation.isPending}
              type="url"
              placeholder="https://example.com"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              value={url}
              onBlur={() => {
                if (url) {
                  demoMutation.mutate({
                    url,
                  });
                }
              }}
              onFocus={() => {
                setCode(undefined);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && url) {
                  demoMutation.mutate({ url });
                }
              }}
            />
            {demoMutation.error?.data?.zodError?.fieldErrors.title && (
              <span className="text-red-500">
                {demoMutation.error.data.zodError.fieldErrors.title}
              </span>
            )}
          </div>
          <ArrowRightIcon
            className={cn("h-4 w-4", demoMutation.isPending && "animate-pulse")}
          />
          {!demoMutation.isPending && code ? (
            <Link
              href={`${baseUrl}/${code}`}
              className="text-muted-foreground whitespace-nowrap hover:underline"
            >{`${baseUrl}/${code}`}</Link>
          ) : (
            <p className="text-muted-foreground animate-pulse whitespace-nowrap">{`${baseUrl}/123`}</p>
          )}
        </div>
      </CardSpotlight>
    </div>
  );
}
