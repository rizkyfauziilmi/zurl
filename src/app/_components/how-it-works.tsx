import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  ArrowRight,
  Link,
  Cog,
  Zap,
  MousePointer,
  BarChart,
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Link,
      title: "URL Input",
      description:
        "Simply paste your long URL into our intuitive interface. zurl accepts any valid web address, from simple websites to complex URLs with parameters.",
      details: [
        "Automatic URL validation",
        "Support for all URL formats",
        "Bulk URL processing",
        "Import from files",
      ],
    },
    {
      icon: Cog,
      title: "Smart Processing",
      description:
        "Our system processes your URL through validation, code generation, secure storage, and applies your custom settings.",
      details: [
        "Advanced validation checks",
        "Optimized code generation",
        "Secure database storage",
        "Custom settings application",
      ],
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "Within milliseconds, receive your shortened URL, QR code, analytics access, and customization options.",
      details: [
        "Lightning-fast processing",
        "Automatic QR code creation",
        "Instant analytics setup",
        "Branding customization",
      ],
    },
    {
      icon: MousePointer,
      title: "Seamless Redirection",
      description:
        "When clicked, your short link provides instant redirection with security checks and cross-platform compatibility.",
      details: [
        "Sub-100ms redirect speed",
        "Security verification",
        "Universal compatibility",
        "Privacy-respecting tracking",
      ],
    },
    {
      icon: BarChart,
      title: "Comprehensive Tracking",
      description:
        "Every click generates valuable insights with real-time updates, detailed reports, and historical data access.",
      details: [
        "Real-time click monitoring",
        "Exportable analytics",
        "Performance metrics",
        "Complete click history",
      ],
    },
  ];

  return (
    <div
      id="how-it-works"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <section className="space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            How zurl Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            From URL input to comprehensive analytics, discover the seamless
            process that makes zurl the most efficient URL shortener available.
          </p>
        </div>

        <div className="relative w-full">
          {/* Desktop Carousel */}
          <div className="hidden lg:block">
            <Carousel className="mx-auto w-full max-w-5xl">
              <CarouselContent className="-ml-2 md:-ml-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                    >
                      <Card className="h-full transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-gray-800/25">
                        <CardHeader className="pb-4 text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-lg">
                            {step.title}
                          </CardTitle>
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            Step {index + 1}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="mb-4 text-center text-sm">
                            {step.description}
                          </CardDescription>
                          <ul className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-center text-xs text-gray-600 dark:text-gray-300"
                              >
                                <div className="mr-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Mobile Flow */}
          <div className="space-y-6 px-4 lg:hidden">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-gray-800/25">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {step.title}
                          </CardTitle>
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            Step {index + 1}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 dark:text-gray-300">
                        {step.description}
                      </CardDescription>
                      <ul className="grid grid-cols-2 gap-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                          >
                            <div className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-4">
                      <ArrowRight className="h-6 w-6 rotate-90 text-blue-500 dark:text-blue-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
