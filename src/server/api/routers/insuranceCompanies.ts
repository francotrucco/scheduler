import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const insuranceCompanyIdSchema = z.object({
  id: z.string(),
});

const insuranceCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const insuranceCompaniesRouter = createTRPCRouter({
  get: publicProcedure.input(insuranceCompanyIdSchema).query((opts) => {
    const { ctx, input } = opts;

    return ctx.prisma.insuranceCompany.findUnique({
      where: { id: input.id },
    });
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.insuranceCompany.findMany();
  }),
  add: privateProcedure.input(insuranceCompanySchema).mutation((opts) => {
    const insuranceCompany: Prisma.InsuranceCompanyCreateArgs = {
      data: { ...opts.input },
    };

    return opts.ctx.prisma.insuranceCompany.create(insuranceCompany);
  }),
  update: privateProcedure
    .input(insuranceCompanySchema)
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
    .input(insuranceCompanyIdSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.insuranceCompany.delete({
        where: { id: input.id },
      });
    }),
});
