import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const appointmentIdValidationSchema = z.object({ id: z.string() });
export const appointmentValidationSchema = z.object({
  id: z.string(),
  appointmentTime: z.date(),
  patientId: z.string(),
  doctorId: z.string(),
});

export const appointmentsRouter = createTRPCRouter({
  get: publicProcedure
    .input(appointmentIdValidationSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.appointment.findUnique({
        where: { id: input.id },
      })
    ),
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.appointment.findMany()),
  add: privateProcedure
    .input(appointmentValidationSchema)
    .mutation(({ ctx, input }) => {
      const appointment: Prisma.AppointmentCreateArgs = {
        data: { ...input },
      };

      return ctx.prisma.appointment.create(appointment);
    }),
  update: privateProcedure
    .input(appointmentValidationSchema)
    .mutation(({ ctx, input }) => {
      const updatedAppointment: Prisma.AppointmentUpdateArgs = {
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      };

      return ctx.prisma.appointment.update(updatedAppointment);
    }),
  delete: privateProcedure
    .input(appointmentIdValidationSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.appointment.delete({
        where: { id: input.id },
      })
    ),
});
