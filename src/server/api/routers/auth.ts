import { insertUserSchema, loginSchema, users } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import argon2 from "argon2";

export const authRoute = createTRPCRouter({
  register: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.phone, input.phone));
      if (user.length > 0) {
        throw new Error("当前手机号已被注册");
      }
      const res = await ctx.db
        .insert(users)
        .values({
          phone: input.phone,
          password: await hashPassword(input.password),
        })
        .returning({ userId: users.id });
      ctx.setCookie("userId", res);
      return res;
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.db
      .select()
      .from(users)
      .where(eq(users.phone, input.phone));

    if (
      user.length > 0 &&
      (await verifyPassword(user[0]!.password, input.password))
    ) {
      ctx.setCookie("userId", user[0]?.id);
      return {
        userId: user[0]!.id,
      };
    }
    throw new Error("用户名或密码不对");
  }),
});

function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

function verifyPassword(hashWord: string, inputWord: string): Promise<boolean> {
  return argon2.verify(hashWord, inputWord);
}
