import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { encodeBase64Id } from "~/lib/base64";
import { shortUrlSchema } from "../schemas/short-url.schema";
import { addDays } from "date-fns";

export const shortUrlRouter = createTRPCRouter({
  demo: publicProcedure
    .input(shortUrlSchema)
    .mutation(async ({ input, ctx }) => {
      const isAlreadyShortenedInDemo = await ctx.db.shortUrl.findFirst({
        where: {
          AND: [
            {
              originalUrl: input.url,
            },
            {
              userId: undefined,
            },
          ],
        },
      });

      if (isAlreadyShortenedInDemo) {
        if (isAlreadyShortenedInDemo.shortCode) {
          return { shortCode: isAlreadyShortenedInDemo.shortCode };
        } else {
          const shortCode = encodeBase64Id(isAlreadyShortenedInDemo.id);

          await ctx.db.shortUrl.update({
            where: {
              id: isAlreadyShortenedInDemo.id,
            },
            data: {
              shortCode,
            },
          });

          return { shortCode };
        }
      }

      const newShortUrl = await ctx.db.shortUrl.create({
        data: {
          originalUrl: input.url,
          userId: undefined,
          expiresAt: addDays(new Date(), 1), // Set expiration to 1 day for demo URLs
        },
      });

      const shortCode = encodeBase64Id(newShortUrl.id);

      await ctx.db.shortUrl.update({
        where: {
          id: newShortUrl.id,
        },
        data: {
          shortCode,
        },
      });

      return { shortCode };
    }),
  getRedirect: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const shortUrl = await ctx.db.shortUrl.findUnique({
        where: {
          shortCode: input.slug,
        },
      });

      // if the shortUrl is a demo or has expired, delete it
      if (shortUrl) {
        const isDemo = !shortUrl.userId;
        const isExpired = shortUrl.expiresAt && shortUrl.expiresAt < new Date();

        if (isDemo || isExpired) {
          await ctx.db.shortUrl.delete({
            where: { id: shortUrl.id },
          });
        }

        // If the short URL is expired, return null
        if (isExpired) {
          return null;
        }
      }

      return shortUrl;
    }),
});
