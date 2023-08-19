import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const appointmentsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointments.findMany();
  }),
});
