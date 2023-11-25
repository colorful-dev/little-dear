import { authRoute } from './routers/auth'
import { categoryRoute } from './routers/category'
import { billingRoute } from './routers/billing'
import { createTRPCRouter } from '~/server/api/trpc'

export const appRouter = createTRPCRouter({
  auth: authRoute,
  category: categoryRoute,
  billing: billingRoute,
})

export type AppRouter = typeof appRouter
