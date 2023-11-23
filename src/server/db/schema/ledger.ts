import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const ledgers = pgTable('ledger', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updateAt: timestamp('update_at').notNull().defaultNow(),
  cover: text('cover'),
  userId: uuid('user_id').notNull(),
})
