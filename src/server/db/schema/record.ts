import { decimal, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const records = pgTable('records', {
  id: serial('id').primaryKey(),
  remark: text('remark'),
  money: decimal('money').notNull(),
  userId: uuid('user_id').notNull(),
})

export type Record = typeof records.$inferSelect

export type NewRecord = typeof records.$inferInsert

export const insertRecordSchema = createInsertSchema(records)

export const selectRecordSchema = createSelectSchema(records)
