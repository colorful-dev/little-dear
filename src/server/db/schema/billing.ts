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
  id: serial('id').primaryKey().notNull(),
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

export const queryBillingSchema = billingSchema.pick({
  id: true,
}).required()

export const updateBillingSchema = billingSchema.omit({
  createAt: true,
  updateAt: true,
  isDelete: true,
  type: true,
  userId: true,
}).partial().merge(z.object({
  id: z.number(),
  ledgerId: z.number(),
  value: z.number(),
}))

export type DailyBill = {
  date: string
  income: number
  expense: number
  list: Array<Billing>
}

function getYMDStrbyDate(date: Date) {
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  return `${year}-${month}-${day} 00:00:00`
}

const billingTypeStrategies = {
  [BillingType.EXPENSE]: (dailyBill: DailyBill, value: number) => ({
    ...dailyBill,
    expense: dailyBill.expense + value,
  }),
  [BillingType.INCOME]: (dailyBill: DailyBill, value: number) => ({
    ...dailyBill,
    income: dailyBill.income + value,
  }),
  [BillingType.TRANSFER]: (dailyBill: DailyBill) => dailyBill,
}

export function normalizeBillingsByDate(billingsData: Billing[]) {
  let currDateStr = ''
  return billingsData.reduce((acc, billing) => {
    const transactionDateStr = getYMDStrbyDate(billing.transactionAt)
    const tailIndex = acc.length - 1
    if (currDateStr === transactionDateStr) {
      acc[tailIndex] = billingTypeStrategies[billing.type](acc[tailIndex]!, billing.value)
      acc[tailIndex]!.list.push(billing)
    }
    else {
      const newDateRow: DailyBill = {
        date: transactionDateStr.slice(0, 10),
        income: 0,
        expense: 0,
        list: [billing],
      }
      acc.push({
        ...billingTypeStrategies[billing.type](newDateRow, billing.value),
      })
      currDateStr = transactionDateStr
    }
    return acc
  }, [] as Array<DailyBill>).map(row => ({
    ...row,
    income: Number(row.income.toFixed(2)),
    expense: Number(row.expense.toFixed(2)),
  }))
}
