import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const RoleEnum = z.enum(["PATIENT", "DOCTOR"]);
type RoleEnum = z.infer<typeof RoleEnum>;

const userIdValidationSchema = z.object({
  id: z.string(),
});
const userValidationSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string().optional(),
  phone: z.string().optional(),
  role: RoleEnum,
  googleId: z.string().optional(),
  facebookId: z.string().optional(),
});

export const usersRouter = createTRPCRouter({
  get: publicProcedure.input(userIdValidationSchema).query(({ ctx, input }) =>
    ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    })
  ),
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany()),
  add: privateProcedure
    .input(userValidationSchema)
    .mutation(({ ctx, input }) => ctx.prisma.user.create({ data: input })),
  update: privateProcedure
    .input(userValidationSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      })
    ),
  delete: privateProcedure
    .input(userIdValidationSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.user.delete({ where: { id: input.id } })
    ),
});
