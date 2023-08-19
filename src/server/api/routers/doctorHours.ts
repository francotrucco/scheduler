import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const doctorHoursRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.doctorHours.findMany();
  }),
});
