import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const workingHoursRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workingHours.findMany();
  }),
});
