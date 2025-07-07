import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { encodeBase64Id } from "~/lib/base64";
import { shortUrlSchema } from "../schemas/short-url.schema";
import { dayjsInstance } from "~/lib/date";

export const shortUrlRouter = createTRPCRouter({
  demo: publicProcedure
    .input(shortUrlSchema)
    .mutation(async ({ input, ctx }) => {
      const oneDayAfter = dayjsInstance().add(1, "day");

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
            expiresAt: existing.expiresAt,
          };
        }

        const shortCode = encodeBase64Id(existing.id);

        const updatedShortUrl = await ctx.db.shortUrl.update({
          where: {
            id: existing.id,
          },
          data: {
            shortCode,
            expiresAt: oneDayAfter.toDate(),
          },
          select: {
            shortCode: true,
            expiresAt: true,
          },
        });

        return {
          shortCode: updatedShortUrl.shortCode,
          expiresAt: updatedShortUrl.expiresAt,
        };
      }

      const newShortUrl = await ctx.db.shortUrl.create({
        data: {
          originalUrl: input.url,
          userId: undefined,
          expiresAt: oneDayAfter.toDate(),
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

      return { shortCode, expiresAt: newShortUrl.expiresAt };
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

      // when shortUrl is demo and first access then delete in db
      if (shortUrl && !shortUrl.userId) {
        await ctx.db.shortUrl.delete({
          where: {
            id: shortUrl.id,
          },
        });
      }

      // when shortUrl is expired then return null
      // ! DO NOT delete if expired, because it can be reused by updating expiresAt
      if (shortUrl?.expiresAt && shortUrl.expiresAt < new Date()) {
        return null;
      }

      return shortUrl;
    }),
});
