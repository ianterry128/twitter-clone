import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteFeed: publicProcedure.input(
    z.object({ 
      limit: z.number().optional(), 
      cursor: z.object({ id: z.string(), createdAt: z.date()}).optional()
    })
  ).query(async ({ input: { limit = 10, cursor }, ctx }) => {}),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx}) => {
      const tweet = await ctx.db.tweet.create({ 
        data: { content, userId: ctx.session.user.id},
      });

      return tweet;
    }),
});
