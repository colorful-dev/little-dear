import { and, desc, eq, sql } from 'drizzle-orm'
import { authProcedure, createTRPCRouter } from '../trpc'
import { billings, createBillingSchema, normalizeBillingsByDate } from '~/server/db/schema'
import { basicPaginationSchema, withPagination } from '~/server/utils'

export const billingRoute = createTRPCRouter({
  listBillings: authProcedure.input(basicPaginationSchema).query(async ({ ctx, input }) => {
    const whereCondition = and(
      eq(billings.userId, ctx.userId!),
      eq(billings.ledgerId, ctx.ledgerId!),
    )

    const query = ctx.db.select({
      data: billings,
      count: sql<number>`count(*) over()`.mapWith(Number),
    })
      .from(billings)
      .orderBy(desc(billings.transactionAt))
      .where(whereCondition)

    const { page, size } = input
    const dynamicQuery = query.$dynamic()
    const res = await withPagination(dynamicQuery, page, size)
    const normalizeRes = normalizeBillingsByDate(res.data.map(i => i.data))
    return {
      ...res,
      data: normalizeRes,
    }
  }),
  createBilling: authProcedure.input(createBillingSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.insert(billings).values({
      ...input,
      userId: ctx.userId!,
      ledgerId: ctx.ledgerId!,
    }).returning()
  }),
})
