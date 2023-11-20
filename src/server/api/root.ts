import { authRoute } from './routers/auth'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
  auth: authRoute,
})

export type AppRouter = typeof appRouter
