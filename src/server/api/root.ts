import { createTRPCRouter } from "~/server/api/trpc";
import { appointmentsRouter } from "./routers/appointments";
import { workingHoursRouter } from "./routers/workingHours";
import { insuranceCompaniesRouter } from "./routers/insuranceCompanies";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  workingHours: workingHoursRouter,
  insuranceCompanies: insuranceCompaniesRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
