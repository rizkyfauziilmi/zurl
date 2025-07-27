import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";
import {
  LinkIcon,
  BarChart3Icon,
  CalendarClockIcon,
  BadgePlusIcon,
  LockIcon,
  QrCodeIcon,
  ShieldAlertIcon,
} from "lucide-react";

export function Features() {
  return (
    <div
      id="features"
      className="flex min-h-screen flex-col items-center justify-center"
    >
      <section className="space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Powerful, Secure, and Insightful URL Shortening
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Shorten links, track analytics, protect access, and share
            smarter—all in one robust platform designed for privacy and
            performance.
          </p>
        </div>
        <BentoGrid className="mx-auto max-w-4xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);
const items = [
  {
    title: "URL Shortening",
    description: "Convert long URLs into short, easy-to-share links instantly.",
    header: <Skeleton />,
    icon: <LinkIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Click Statistics",
    description:
      "Track the number of clicks, IP address, user agent, and click time for every short URL.",
    header: <Skeleton />,
    icon: <BarChart3Icon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "URL Expiry",
    description:
      "Set an expiry date for your short URLs. Expired links return a 410 Gone error.",
    header: <Skeleton />,
    icon: <CalendarClockIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Custom Short Codes",
    description:
      "Choose your own custom alias for short URLs, making them more memorable and brandable.",
    header: <Skeleton />,
    icon: <BadgePlusIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Password Protection",
    description:
      "Protect your short URLs with a password. Only users with the password can access the destination.",
    header: <Skeleton />,
    icon: <LockIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automatic QR Code",
    description:
      "Generate and display a QR code for every short URL for easy sharing and scanning.",
    header: <Skeleton />,
    icon: <QrCodeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Rate Limiting",
    description:
      "Prevent spam by limiting the number of URL shortening requests per user or IP.",
    header: <Skeleton />,
    icon: <ShieldAlertIcon className="h-4 w-4 text-neutral-500" />,
  },
];
