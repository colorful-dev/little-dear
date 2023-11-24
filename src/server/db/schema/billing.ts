import { boolean, decimal, integer, pgEnum, pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core'

export const billingTypeEnum = pgEnum('type', ['income', 'expense', 'transfer'])

export const billings = pgTable('billing', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id').notNull(),
  ledgerId: integer('ledger_id').notNull(),
  value: decimal('value').notNull(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updateAt: timestamp('update_at').notNull().defaultNow(),
  transactionAt: timestamp('transaction_at').notNull(),
  userId: uuid('user_id').notNull(),
  accountId: integer('account_id').notNull(),
  type: billingTypeEnum('type').notNull(),
  isDelete: boolean('is_delete').notNull().default(false),
})
