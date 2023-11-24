import { and, desc, eq } from 'drizzle-orm'
import { authProcedure, createTRPCRouter } from '../trpc'
import { billings, createBillingSchema, listBillingsSchema, normalizeBillingsByDate } from '~/server/db/schema'

export const billingRoute = createTRPCRouter({
  listBillings: authProcedure.input(listBillingsSchema).query(async ({ ctx, input }) => {
    const res = await ctx.db.select()
      .from(billings)
      .orderBy(desc(billings.transactionAt))
      .where(
        and(
          eq(billings.userId, ctx.userId!),
          eq(billings.ledgerId, ctx.ledgerId!),
        ),
      )
      .limit(input.size)
      .offset(input.page * input.size)
    const normalizeRes = normalizeBillingsByDate(res)
    return normalizeRes
  }),
  createBilling: authProcedure.input(createBillingSchema).mutation(async ({ ctx, input }) => {
    return ctx.db.insert(billings).values({
      ...input,
      userId: ctx.userId!,
      ledgerId: ctx.ledgerId!,
    }).returning()
  }),
})
