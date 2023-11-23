import { type PgColumn, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const categories = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  budget: integer('budget').default(0),
  // ledgerIds: json('ledger_ids').$type<number[]>().default([]),
  ledgerIds: integer('ledger_ids').array(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updateAt: timestamp('update_at').notNull().defaultNow(),
  icon: text('icon').notNull(),
  parentId: uuid('parent_id'),
})

export type Category = typeof categories.$inferSelect

export type CategoryCreate = typeof categories.$inferInsert

export const createCategorySchema = createInsertSchema(categories).omit({
  // ledgerIds: true,
})

// ---- budget related ----
export type CategoryBudget = Pick<Category, 'id' | 'name' | 'budget'>

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
