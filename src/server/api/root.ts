import { authRoute } from './routers/auth'
import { categoryRoute } from './routers/category'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
  auth: authRoute,
  category: categoryRoute,
})

export type AppRouter = typeof appRouter
