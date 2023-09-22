import type { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

const workingHoursSchema = z.object({
  doctorId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export const workingHoursRouter = createTRPCRouter({
  get: publicProcedure.input(workingHoursSchema).query(({ ctx, input }) => {
    return ctx.prisma.workingHours.findFirst({
      where: {
        startTime: input.startDate,
        endTime: input.endDate,
        doctorId: input.doctorId,
      },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.workingHours.findMany();
  }),
  add: privateProcedure.input(workingHoursSchema).mutation(({ ctx, input }) => {
    const workingHours: Prisma.WorkingHoursCreateArgs = {
      data: {
        doctorId: input.doctorId,
        startTime: input.startDate,
        endTime: input.endDate,
      },
    };

    return ctx.prisma.workingHours.create(workingHours);
  }),
  update: privateProcedure
    .input(workingHoursSchema)
    .mutation(({ ctx, input }) => {
      const updatedWorkingHours: Prisma.WorkingHoursUpdateArgs = {
        where: {
          doctorId: input.doctorId,
        },
        data: {
          ...input,
        },
      };

      return ctx.prisma.workingHours.update(updatedWorkingHours);
    }),
  delete: privateProcedure
    .input(workingHoursSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.workingHours.delete({
        where: {
          doctorId: input.doctorId,
          startTime: input.startDate,
          endTime: input.endDate,
        },
      });
    }),
});
