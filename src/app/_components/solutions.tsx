import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { BarChart3, Shield, Zap, Palette, Globe, Users } from "lucide-react";

export function Solutions() {
  const solutions = [
    {
      icon: Zap,
      title: "Increased Link Efficiency",
      description:
        "Transform lengthy URLs into concise, memorable links perfect for social media, emails, and marketing campaigns.",
      features: [
        "Cleaner sharing experience",
        "Better user engagement",
        "Professional appearance",
      ],
    },
    {
      icon: BarChart3,
      title: "Advanced Tracking & Analytics",
      description:
        "Monitor link performance with detailed click statistics and gain valuable insights about your audience.",
      features: [
        "Real-time click tracking",
        "Geographic insights",
        "Device and browser analytics",
        "Time-based reports",
      ],
    },
    {
      icon: Palette,
      title: "Brand Customization",
      description:
        "Create branded short links that reflect your identity and enhance your professional image.",
      features: [
        "Custom domains support",
        "Memorable custom aliases",
        "Automatic QR code generation",
        "Customizable link previews",
      ],
    },
    {
      icon: Shield,
      title: "Enhanced Security & Control",
      description:
        "Protect your links with advanced security features and maintain complete control over access.",
      features: [
        "Password protection",
        "Automatic expiration dates",
        "Access control monitoring",
        "Built-in spam protection",
      ],
    },
    {
      icon: Globe,
      title: "Global Performance",
      description:
        "Lightning-fast redirects worldwide with our optimized global infrastructure.",
      features: [
        "Sub-100ms redirect times",
        "Global CDN network",
        "99.9% uptime guarantee",
        "Cross-platform compatibility",
      ],
    },
    {
      icon: Users,
      title: "Open Source Community",
      description:
        "Join a thriving community of developers contributing to the future of URL shortening.",
      features: [
        "Transparent development",
        "Community-driven features",
        "Regular updates",
        "Developer-friendly API",
      ],
    },
  ];

  return (
    <div
      id="solutions"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <section className="space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Powerful Solutions for Modern Link Management
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Discover how zurl transforms the way you share, track, and manage
            your links with cutting-edge features designed for today&apos;s
            digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <Card
                key={index}
                className="h-full transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-gray-800/25"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <div className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500 dark:bg-blue-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
