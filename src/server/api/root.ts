import { createTRPCRouter } from "~/server/api/trpc";
import { appointmentsRouter } from "./routers/appointments";
import { workingHoursRouter } from "./routers/workingHours";
import { insuranceCompaniesRouter } from "./routers/insuranceCompanies";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  appointments: appointmentsRouter,
  workingHours: workingHoursRouter,
  insuranceCompanies: insuranceCompaniesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
