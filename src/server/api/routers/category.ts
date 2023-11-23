import { desc, eq } from 'drizzle-orm'
import { authProcedure, createTRPCRouter } from '../trpc'
import { categories, createCategorySchema, listCategoriesBudgetTransform, updateBudgetSchema } from '~/server/db/schema'

export const categoryRoute = createTRPCRouter({
  listCategories: authProcedure.query(async ({ ctx }) => {
    return ctx.db.select()
      .from(categories).orderBy(desc(categories.updateAt))
      .where(eq(categories.userId, ctx.userId!))
  }),
  listCategoriesBudget: authProcedure.query(async ({ ctx }) => {
    return ctx.db.select(listCategoriesBudgetTransform(categories))
      .from(categories).orderBy(desc(categories.updateAt))
      .where(eq(categories.userId, ctx.userId!))
  }),
  createCategory: authProcedure.input(createCategorySchema).mutation(async ({ ctx, input }) => {
    input.name = input.name.trim()
    input.userId = ctx.userId
    return ctx.db.insert(categories).values(input).returning()
  }),
  createCategories: authProcedure.input(createCategorySchema.array()).mutation(async ({ ctx, input }) => {
    input = input.map((item) => {
      item.name = item.name.trim()
      item.userId = ctx.userId
      return item
    })
    return ctx.db.insert(categories).values(input).returning()
  }),
  updateCategoryBudget: authProcedure.input(updateBudgetSchema).mutation(async ({ ctx, input }) => {
    input.updateAt = new Date()
    return ctx.db.update(categories).set(input).where(eq(categories.id, input.id)).returning()
  }),
})
