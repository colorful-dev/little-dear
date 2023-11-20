import { desc, eq } from 'drizzle-orm'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { categories, createCategorySchema, listCategoriesBudgetTransform, updateBudgetSchema } from '~/server/db/schema'

export const categoryRoute = createTRPCRouter({
  listCategories: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(categories).orderBy(desc(categories.updateAt))
  }),
  listCategoriesBudget: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select(listCategoriesBudgetTransform(categories)).from(categories).orderBy(desc(categories.updateAt))
  }),
  createCategory: publicProcedure.input(createCategorySchema).mutation(async ({ ctx, input }) => {
    input.name = input.name.trim()
    return ctx.db.insert(categories).values(input).returning()
  }),
  createCategories: publicProcedure.input(createCategorySchema.array()).mutation(async ({ ctx, input }) => {
    input = input.map((item) => {
      item.name = item.name.trim()
      return item
    })
    return ctx.db.insert(categories).values(input).returning()
  }),
  updateCategoryBudget: publicProcedure.input(updateBudgetSchema).mutation(async ({ ctx, input }) => {
    input.updateAt = new Date()
    return ctx.db.update(categories).set(input).where(eq(categories.id, input.id)).returning()
  }),
})
