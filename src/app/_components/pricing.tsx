import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Check,
  Heart,
  Users,
  Zap,
  Shield,
  BarChart3,
  Globe,
} from "lucide-react";
import Github from "~/components/svgs/github";

export function Pricing() {
  const features = [
    {
      icon: Zap,
      title: "Unlimited Links",
      description: "Create as many short links as you need",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed click tracking and insights",
    },
    {
      icon: Shield,
      title: "Security Features",
      description: "Password protection and expiration dates",
    },
    {
      icon: Globe,
      title: "Custom Domains",
      description: "Use your own domain for branded links",
    },
    {
      icon: Users,
      title: "API Access",
      description: "Full REST API for developers",
    },
    {
      icon: Github,
      title: "Open Source",
      description: "Transparent, community-driven development",
    },
  ];

  const communityStats = [
    { label: "GitHub Stars", value: "2.5k+" },
    { label: "Contributors", value: "50+" },
    { label: "Forks", value: "400+" },
    { label: "Issues Resolved", value: "95%" },
  ];

  return (
    <div
      id="pricing"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <section className="space-y-12">
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
            <Heart className="mr-2 h-4 w-4 text-red-500" />
            Open Source & Free Forever
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            zurl is completely free and open source. No hidden costs, no premium
            tiers, no limitations. Built by the community, for the community.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-2 border-blue-200 shadow-xl dark:border-blue-800">
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-500 to-green-500" />

            <CardHeader className="pt-8 pb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-green-500">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Free Forever
              </CardTitle>
              <CardDescription className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Everything you need, completely free
              </CardDescription>
              <div className="mt-6">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  $0
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-400">
                  No credit card required
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {feature.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-8">
                <h4 className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                  Join Our Growing Community
                </h4>
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {communityStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>

              <div className="mt-6 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
                <h4 className="mb-2 flex items-center font-semibold text-gray-900 dark:text-white">
                  <Github className="mr-2 h-5 w-5" />
                  Why Open Source?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    Complete transparency in how your data is handled
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    Community-driven feature development
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    Self-hosting options for complete control
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />
                    No vendor lock-in or surprise pricing changes
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Have questions or want to contribute?
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Join Discord Community
            </Button>
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Contribute on GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
