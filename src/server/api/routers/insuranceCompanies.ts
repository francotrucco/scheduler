import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const insuranceCompanyIdValidationSchema = z.object({
  id: z.string(),
});

const insuranceCompanyValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const insuranceCompaniesRouter = createTRPCRouter({
  get: publicProcedure
    .input(insuranceCompanyIdValidationSchema)
    .query((opts) => {
      const { ctx, input } = opts;

      return ctx.prisma.insuranceCompany.findUnique({
        where: { id: input.id },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.insuranceCompany.findMany();
  }),
  add: privateProcedure
    .input(insuranceCompanyValidationSchema)
    .mutation((opts) => {
      const insuranceCompany: Prisma.InsuranceCompanyCreateArgs = {
        data: { ...opts.input },
      };

      return opts.ctx.prisma.insuranceCompany.create(insuranceCompany);
    }),
  update: privateProcedure
    .input(insuranceCompanyValidationSchema)
    .mutation(({ ctx, input }) => {
      const updatedInsuranceCompany: Prisma.InsuranceCompanyUpdateArgs = {
        where: {
          id: input.id,
        },

        data: {
          ...input,
        },
      };

      return ctx.prisma.insuranceCompany.update(updatedInsuranceCompany);
    }),

  delete: privateProcedure
    .input(insuranceCompanyIdValidationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.insuranceCompany.delete({
        where: { id: input.id },
      });
    }),
});
