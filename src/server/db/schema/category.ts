import { type PgColumn, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const categories = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  budget: serial('budget'),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updateAt: timestamp('update_at').notNull().defaultNow(),
})

export type Category = typeof categories.$inferSelect

export type CategoryCreate = typeof categories.$inferInsert
export const createCategorySchema = createInsertSchema(categories)

// ---- budget related ----
export type CategoryBudget = Pick<Category, 'id' | 'name' | 'budget'>
export const listCategoriesBudgetSchema = createCategorySchema.pick({
  id: true,
  name: true,
  budget: true,
})
export function listCategoriesBudgetTransform(category: typeof categories): Record<keyof CategoryBudget, PgColumn> {
  return {
    id: category.id,
    name: category.name,
    budget: category.budget,
  }
}

export const updateBudgetSchema = createCategorySchema.pick({
  id: true,
  budget: true,
  updateAt: true,
}).required({
  id: true,
})
