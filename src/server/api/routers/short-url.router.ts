import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { encodeBase64Id } from "~/lib/base64";
import { TRPCError } from "@trpc/server";

export const shortUrlRouter = createTRPCRouter({
  demo: publicProcedure
    .input(
      z.object({
        url: z.string().url({
          message: "Please enter a valid URL",
        }),
      }),
    )
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

      // when shortUrl is demo and first access then delete in db
      if (shortUrl?.userId === undefined) {
        await ctx.db.shortUrl.delete({
          where: {
            id: shortUrl?.id,
          },
        });
      }

      return shortUrl;
    }),
});
