import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

const insuranceCompanyPlanValidationSchema = z.object({
  id: z.string().optional(), // optional because it might not be defined when creating a new plan
  name: z.string(),
  insuranceCompanyId: z.string().optional(), // optional because it will be auto-filled when the insurance company is created
});

const insuranceCompanyIdValidationSchema = z.object({
  id: z.string(),
});

const insuranceCompanyValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  plans: z.array(insuranceCompanyPlanValidationSchema).optional(), // optional because it might not always be provided
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
        data: {
          ...opts.input,
          plans: {
            create: opts.input.plans ?? [], // creating nested insurance plans if provided
          },
        },
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
          plans: input.plans
            ? {
                upsert: input.plans.map((plan) => ({
                  where: { id: plan.id },
                  update: plan,
                  create: plan,
                })),
              }
            : undefined,
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
