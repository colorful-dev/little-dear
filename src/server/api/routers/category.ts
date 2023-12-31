import { arrayContains, desc, eq } from 'drizzle-orm'
import { authProcedure, createTRPCRouter } from '../trpc'
import { categories, createCategorySchema, listCategoriesBudgetTransform, updateBudgetSchema } from '~/server/db/schema'

export const categoryRoute = createTRPCRouter({
  listCategories: authProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.select()
      .from(categories).orderBy(desc(categories.updateAt))
      .where(arrayContains(categories.ledgerIds, [ctx.ledgerId!]))
    return res
  }),
  listCategoriesBudget: authProcedure.query(async ({ ctx }) => {
    return ctx.db.select(listCategoriesBudgetTransform(categories))
      .from(categories).orderBy(desc(categories.updateAt))
      .where(arrayContains(categories.ledgerIds, [ctx.ledgerId!]))
  }),
  createCategory: authProcedure.input(createCategorySchema).mutation(async ({ ctx, input }) => {
    input.name = input.name.trim()
    return ctx.db.insert(categories).values({ ...input, ledgerIds: [ctx.ledgerId!] }).returning()
  }),
  createCategories: authProcedure.input(createCategorySchema.array()).mutation(async ({ ctx, input }) => {
    const normalizeInput = input.map((item) => {
      return {
        ...item,
        name: item.name.trim(),
        ledgerIds: [ctx.ledgerId!],
      }
    })
    return ctx.db.insert(categories).values(normalizeInput).returning()
  }),
  updateCategoryBudget: authProcedure.input(updateBudgetSchema).mutation(async ({ ctx, input }) => {
    input.updateAt = new Date()
    return ctx.db.update(categories).set(input).where(eq(categories.id, input.id)).returning()
  }),
})
