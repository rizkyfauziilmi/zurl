import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { encodeBase64Id } from "~/lib/base64";
import { shortUrlSchema } from "../schemas/short-url.schema";
import { addDays } from "date-fns";

export const shortUrlRouter = createTRPCRouter({
  demo: publicProcedure
    .input(shortUrlSchema)
    .mutation(async ({ input, ctx }) => {
      const existing = await ctx.db.shortUrl.findFirst({
        where: {
          originalUrl: input.url,
          userId: undefined,
        },
      });

      if (existing) {
        // If shortCode exists, return it; otherwise, generate and update
        if (existing.shortCode) {
          return {
            shortCode: existing.shortCode,
          };
        }

        const shortCode = encodeBase64Id(existing.id);

        const updatedShortUrl = await ctx.db.shortUrl.update({
          where: {
            id: existing.id,
          },
          data: {
            shortCode,
          },
          select: {
            shortCode: true,
          },
        });

        return {
          shortCode: updatedShortUrl.shortCode,
        };
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

     
      if (shortUrl) {
        const isDemo = !shortUrl.userId;
        const isExpired = shortUrl.expiresAt && shortUrl.expiresAt < new Date();

        // if the shortUrl is a demo delete it
        // ! DO NOT delete if expired, because it can be reused by updating expiresAt
        if (isDemo) {
          await ctx.db.shortUrl.delete({
            where: { id: shortUrl.id },
          });
        }
        
        // when shortUrl is expired then return null
        if (isExpired) {
          return null;
        }
      }

      return shortUrl;
    }),
});
