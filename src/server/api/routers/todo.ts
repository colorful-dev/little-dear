import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";



export const todoRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({ name: z.string() })).mutation(async ({ input, ctx }) => {
    console.log(input)
    return ctx.db.todo.create({
      data: {
        name: input.name
      }
    })
  }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.todo.findMany({
      orderBy: { createdAt: "desc" }
    })
  })
})
