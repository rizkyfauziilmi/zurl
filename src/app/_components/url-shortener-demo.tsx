"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { shortUrlSchema } from "~/server/api/schemas/short-url.schema";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  LinkIcon,
  Loader2Icon,
  CopyIcon,
  CheckIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useState } from "react";
import { addDays, formatDistanceToNow } from "date-fns";

export default function URLShortenerDemo() {
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const demoMutation = api.shortUrl.demo.useMutation({
    onSuccess: (data) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.shortCode}`;
      setShortenedUrl(url);
      toast.success("URL shortened successfully", {
        description: `url can only be used once and will automatically expire in 24 hours`,
        action: {
          label: "Copy",
          onClick: () => {
            void copyToClipboard(url);
          },
        },
      });
    },
    onError: (error) => {
      toast.error("Failed to shorten URL", {
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof shortUrlSchema>>({
    resolver: zodResolver(shortUrlSchema),
    defaultValues: {
      url: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  function onSubmit(values: z.infer<typeof shortUrlSchema>) {
    setShortenedUrl(null);
    setOriginalUrl(values.url);

    demoMutation.mutate(values);
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Main Form Card */}
        <Card className="animate-in fade-in slide-in-from-bottom shadow-2xl backdrop-blur-sm delay-300 duration-1000">
          <CardHeader className="space-y-2 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold">
              Try Demo Here{" "}
              <SparklesIcon className="-mt-6 inline-block size-6 animate-pulse text-blue-600" />
            </CardTitle>
            <CardDescription className="text-base">
              Enter any URL below to create a shortened, shareable link
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-medium">
                        Enter your URL
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <Input
                            placeholder="https://example.com/your-very-long-url-here"
                            className="h-14 border-2 border-slate-200 pr-4 pl-4 text-base transition-all duration-300 group-hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            {...field}
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </FormControl>
                      <FormDescription className="text-muted-foreground text-sm">
                        We support HTTP and HTTPS URLs from any domain
                      </FormDescription>
                      <FormMessage className="animate-in slide-in-from-top text-sm duration-200" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="h-14 w-full transform text-base font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    demoMutation.isPending
                  }
                >
                  {demoMutation.isPending ? (
                    <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <LinkIcon className="mr-2 h-5 w-5" />
                  )}
                  {demoMutation.isPending ? "Shortening..." : "Shorten URL"}
                </Button>
              </form>
            </Form>
            {/* Form Status Indicator */}
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  form.formState.isValid ? "text-green-600" : "text-slate-400"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    form.formState.isValid
                      ? "animate-pulse bg-green-500"
                      : "bg-slate-300"
                  }`}
                />
                <span>Valid URL</span>
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <div
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  form.watch("url") ? "text-blue-600" : "text-slate-400"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    form.watch("url")
                      ? "animate-pulse bg-blue-500"
                      : "bg-slate-300"
                  }`}
                />
                <span>Ready to shorten</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Result Section */}
        {shortenedUrl && (
          <Card className="animate-in fade-in slide-in-from-bottom border-0 border-green-200 shadow-2xl duration-700">
            <CardHeader className="pb-4 text-center">
              <div className="animate-in zoom-in mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg delay-200 duration-500">
                <CheckIcon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold text-green-800">
                URL Shortened Successfully!
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your shortened URL is ready to share
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Original URL */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                    Original URL
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openUrl(originalUrl)}
                    className="h-8 px-3 text-xs"
                  >
                    <ExternalLinkIcon className="mr-1 h-3 w-3" />
                    Open
                  </Button>
                </div>
                <div className="bg-secondary rounded-lg border p-4">
                  <p className="text-sm leading-relaxed break-all">
                    {originalUrl}
                  </p>
                </div>
              </div>

              {/* Shortened URL */}
              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-green-700 uppercase">
                  Shortened URL
                </label>
                <div className="group relative">
                  <div className="rounded-lg border-2 p-4 transition-colors">
                    <p className="pr-12 text-lg font-semibold break-all">
                      {shortenedUrl}
                    </p>
                  </div>
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 transform space-x-2 transition-all duration-300">
                    <Button
                      onClick={() => void copyToClipboard(shortenedUrl)}
                      variant={copied ? "default" : "outline"}
                    >
                      {copied ? (
                        <>
                          <CheckIcon className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <CopyIcon className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openUrl(shortenedUrl)}
                    >
                      <ExternalLinkIcon className="mr-1 h-3 w-3" />
                      Open
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-green-200 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">Once</div>
                  <div className="text-xs tracking-wide text-green-600 uppercase">
                    Attempts
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatDistanceToNow(addDays(new Date(), 1))}
                  </div>
                  <div className="text-xs tracking-wide text-green-600 uppercase">
                    Expires
                  </div>
                </div>
              </div>

              {/* Create Another Button */}
              <Button
                onClick={() => {
                  setShortenedUrl(null);
                  setOriginalUrl("");
                  form.reset();
                }}
                variant="outline"
                className="h-12 w-full border-green-300 transition-all duration-300 hover:bg-green-50"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Shorten Another URL
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
