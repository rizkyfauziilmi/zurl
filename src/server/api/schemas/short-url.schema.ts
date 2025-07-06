import z from "zod";

export const shortUrlSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, "URL must use HTTP or HTTPS protocol")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return parsed.hostname.includes(".");
      } catch {
        return false;
      }
    }, "Please enter a valid domain name"),
});
