import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const appointmentIdInputSchema = z.object({ appointmentId: z.string() });
const appointmentInputSchema = z.object({
  appointmentId: z.string(),
  appointmentTime: z.date(),
  patientId: z.string(),
  doctorId: z.string(),
});

export const appointmentsRouter = createTRPCRouter({
  get: publicProcedure.input(appointmentIdInputSchema).query((opts) => {
    const { ctx, input } = opts;

    return ctx.prisma.appointments.findUnique({
      where: { id: input.appointmentId },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointments.findMany();
  }),
  add: privateProcedure.input(appointmentInputSchema).mutation((opts) => {
    const appointment: Prisma.AppointmentsCreateArgs = {
      data: { ...opts.input },
    };

    return opts.ctx.prisma.appointments.create(appointment);
  }),
  update: privateProcedure
    .input(appointmentInputSchema)
    .mutation(({ ctx, input }) => {
      const updatedAppointment: Prisma.AppointmentsUpdateArgs = {
        where: {
          id: input.appointmentId,
        },
        data: {
          ...input,
        },
      };

      return ctx.prisma.appointments.update(updatedAppointment);
    }),
  delete: privateProcedure
    .input(appointmentIdInputSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.appointments.delete({
        where: { id: input.appointmentId },
      });
    }),
});
