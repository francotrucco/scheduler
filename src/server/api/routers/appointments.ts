import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const appointmentIdValidationSchema = z.object({ id: z.string() });
const appointmentValidationSchema = z.object({
  id: z.string(),
  appointmentTime: z.date(),
  patientId: z.string(),
  doctorId: z.string(),
});

export const appointmentsRouter = createTRPCRouter({
  get: publicProcedure.input(appointmentIdValidationSchema).query((opts) => {
    const { ctx, input } = opts;

    return ctx.prisma.appointments.findUnique({
      where: { id: input.id },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.appointments.findMany();
  }),
  add: privateProcedure.input(appointmentValidationSchema).mutation((opts) => {
    const appointment: Prisma.AppointmentsCreateArgs = {
      data: { ...opts.input },
    };

    return opts.ctx.prisma.appointments.create(appointment);
  }),
  update: privateProcedure
    .input(appointmentValidationSchema)
    .mutation(({ ctx, input }) => {
      const updatedAppointment: Prisma.AppointmentsUpdateArgs = {
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      };

      return ctx.prisma.appointments.update(updatedAppointment);
    }),
  delete: privateProcedure
    .input(appointmentIdValidationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.appointments.delete({
        where: { id: input.id },
      });
    }),
});
