import { boolean, doublePrecision, integer, pgEnum, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export enum BillingType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}

export const billingTypeColumnEnum = pgEnum('type', [BillingType.INCOME, BillingType.EXPENSE, BillingType.TRANSFER])

export const billings = pgTable('billing', {
  id: serial('id').primaryKey(),
  categoryId: uuid('category_id').notNull(),
  categoryName: text('category_name').notNull(),
  ledgerId: integer('ledger_id').notNull(),
  accountId: integer('account_id'),
  accountName: text('account_name'),
  value: doublePrecision('value').notNull(),
  createAt: timestamp('create_at').notNull().defaultNow(),
  updateAt: timestamp('update_at').notNull().defaultNow(),
  transactionAt: timestamp('transaction_at').notNull(),
  userId: uuid('user_id').notNull(),
  type: billingTypeColumnEnum('type').notNull(),
  isDelete: boolean('is_delete').notNull().default(false),
})

export type Billing = typeof billings.$inferSelect

export const listBillingsSchema = z.object({
  size: z.number().optional().default(0),
  page: z.number().optional().default(20),
}).optional().default({
  page: 0,
  size: 20,
})

export const billingSchema = createInsertSchema(billings)

export const createBillingSchema = billingSchema.pick({
  categoryId: true,
  categoryName: true,
  value: true,
  transactionAt: true,
  accountId: true,
  accountName: true,
  type: true,
})

export type DailyBill = {
  date: string
  income: number
  expense: number
  list: Array<Billing>
}

function getYMDStrbyDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}${date.getDay()}`
}

export function normalizeBillingsByDate(billingsData: Billing[]) {
  let currDateStr = ''
  return billingsData.reduce((acc, billing) => {
    const transactionDateStr = getYMDStrbyDate(billing.transactionAt)
    const values = {
      income: 0,
      expense: 0,
    }

    if (billing.type === BillingType.EXPENSE)
      values.expense += billing.value

    if (billing.type === BillingType.INCOME)
      values.income += billing.value

    if (currDateStr === transactionDateStr) {
      acc[acc.length - 1]!.list.push(billing)
      acc[acc.length - 1]!.income += values.income
      acc[acc.length - 1]!.expense += values.expense
    }
    else {
      acc.push({
        date: transactionDateStr,
        ...values,
        list: [billing],
      })
      currDateStr = transactionDateStr
    }
    return acc
  }, [] as Array<DailyBill>)
}
