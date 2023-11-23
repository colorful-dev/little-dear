import { eq } from 'drizzle-orm'
import argon2 from 'argon2'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { insertUserSchema, ledgers, loginSchema, users } from '~/server/db/schema'

export const authRoute = createTRPCRouter({
  register: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.phone, input.phone))
      if (user.length > 0)
        throw new Error('当前手机号已被注册')

      const res = await ctx.db
        .insert(users)
        .values({
          phone: input.phone,
          password: await hashPassword(input.password),
        })
        .returning({ userId: users.id })

      // default ledger
      const ledgerRes = await ctx.db
        .insert(ledgers)
        .values({
          name: '默认账本',
          userId: res[0]!.userId,
        }).returning({
          ledgerId: ledgers.id,
        })

      ctx.setCookie('userId', res[0]!.userId)
      ctx.setCookie('ledgerId', ledgerRes[0]!.ledgerId.toString())

      return res
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db
      .select()
      .from(users)
      .where(eq(users.phone, input.phone))

    if (
      user.length > 0
      && (await verifyPassword(user[0]!.password, input.password))
    ) {
      const ledger = await ctx.db.select().from(ledgers).where(eq(ledgers.userId, user[0]!.id))
      ctx.setCookie('ledgerId', ledger[0]!.id.toString())
      ctx.setCookie('userId', user[0]!.id)
      return {
        userId: user[0]!.id,
      }
    }
    throw new Error('用户名或密码不对')
  }),
})

function hashPassword(password: string): Promise<string> {
  return argon2.hash(password)
}

function verifyPassword(hashWord: string, inputWord: string): Promise<boolean> {
  return argon2.verify(hashWord, inputWord)
}
