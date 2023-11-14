import { createTRPCRouter } from "~/server/api/trpc";
import { authRoute } from "./routers/auth";

export const appRouter = createTRPCRouter({
  auth: authRoute,
});

export type AppRouter = typeof appRouter;
