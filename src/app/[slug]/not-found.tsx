"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Search,
  Home,
  TrendingUp,
  LinkIcon,
  ArrowRight,
  UnlinkIcon,
} from "lucide-react";
import { Footer } from "~/components/footer";

export default function NotFoundRedirect() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for popular URLs - in a real app, this would come from your API
  const popularUrls = [
    {
      shortCode: "github",
      originalUrl: "https://github.com",
      clicks: 1234,
    },
    {
      shortCode: "docs",
      originalUrl: "https://docs.example.com",
      clicks: 987,
    },
    {
      shortCode: "blog",
      originalUrl: "https://blog.example.com",
      clicks: 756,
    },
    {
      shortCode: "api",
      originalUrl: "https://api.example.com",
      clicks: 543,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* 404 Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-8">
              <h1 className="mb-4 text-8xl font-bold text-blue-600">404</h1>
              <h2 className="mb-4 text-3xl font-bold">Oops! Link Not Found</h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                The shortened URL you&apos;re looking for doesn&apos;t exist or
                may have expired. Don&apos;t worry, we&apos;ll help you find
                what you need!
              </p>
            </div>

            {/* Illustration */}
            <div className="mb-8">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-[1px] bg-white">
                <UnlinkIcon className="h-16 w-16 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search for a URL
              </CardTitle>
              <CardDescription>
                Try searching for the content you&apos;re looking for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter keywords or original URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mb-12 grid gap-8 md:grid-cols-2">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Get back on track with these helpful options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go to Homepage
                  </Button>
                </Link>
                <Link href="/create">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Create New Short URL
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Your URLs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Popular URLs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Popular URLs
                </CardTitle>
                <CardDescription>
                  Check out these trending shortened URLs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularUrls.map((url, index) => (
                    <div
                      key={index}
                      className="bg-secondary flex items-center justify-between rounded-lg p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortCode}`}
                          className="truncate font-medium text-blue-600 hover:underline"
                        >
                          {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortCode}`}
                        </Link>
                        <p className="text-muted-foreground truncate text-sm">
                          {url.originalUrl}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm font-medium">
                          {url.clicks.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">clicks</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-2xl font-bold">
                Ready to Create Your Own Short URLs?
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-blue-100">
                Join thousands of users who trust zurl to shorten, customize,
                and track their links. Get started for free and see the
                difference!
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white bg-transparent text-white hover:bg-white/10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
