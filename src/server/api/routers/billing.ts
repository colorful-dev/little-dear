import { and, desc, eq, sql } from 'drizzle-orm'
import { authProcedure, createTRPCRouter } from '../trpc'
import { billings, createBillingSchema, normalizeBillingsByDate, queryBillingSchema, updateBillingSchema } from '~/server/db/schema'
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
  createBilling: authProcedure.input(createBillingSchema).mutation(({ ctx, input }) => {
    return ctx.db.insert(billings).values({
      ...input,
      userId: ctx.userId!,
      ledgerId: ctx.ledgerId!,
    }).returning()
  }),
  billing: authProcedure.input(queryBillingSchema).query(({ ctx, input }) => {
    return ctx.db.select().from(billings).where(eq(billings.id, input.id))
  }),
  updateBilling: authProcedure.input(updateBillingSchema).query(({ ctx, input }) => {
    const { id, ...newData } = input
    return ctx.db.update(billings)
      .set({ ...newData, updateAt: new Date() }).where(eq(billings.id, id))
  }),
  deleteBilling: authProcedure.input(queryBillingSchema).query(({ ctx, input }) => {
    return ctx.db.update(billings).set({ isDelete: true, updateAt: new Date() }).where(eq(billings.id, input.id))
  }),
})
