import { createTRPCRouter, publicProcedure } from "../trpc";
import { UserSchema } from "~/server/api/schema";
import { z } from "zod";
import argon2 from 'argon2';

const RegisterSchema = UserSchema.pick({ username: true, password: true }).merge(z.object({
  confirmPassWord: z.string().min(6),
  password: z.string().min(6)
})).refine(data => data.password === data.confirmPassWord, {
  message: '两次密码不一致',
  path: ['confirmPassWord']
})

const LoginSchema = UserSchema.pick({ username: true, password: true })
export const userRouter = createTRPCRouter({
  register: publicProcedure.input(RegisterSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        username: input.username
      }
    })
    if (user) {
      throw new Error('用户已存在')
    }
    const res = await ctx.db.user.create({
      data: {
        username: input.username,
        password: await hashPassword(input.password),
        nickName: '',
        isDelete: false
      }
    })
    return res.id
  }),
  login: publicProcedure.input(LoginSchema).mutation(async ({ input, ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        username: input.username
      }
    })
    if (!user) {
      throw new Error('用户不存在')
    }
    if (await verifyPassword(user.password, input.password)) {
      throw new Error('密码错误')
    }
    return user.id
  })
})


function hashPassword(password: string) {
  return argon2.hash(password)
}

async function verifyPassword(hashPassword: string, inputPassWord: string) {
  if (await argon2.verify(inputPassWord, hashPassword)) return true
  return false
}
