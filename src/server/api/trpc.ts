import { TRPCError, initTRPC } from '@trpc/server'
import type { NextRequest } from 'next/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { db } from '~/server/db'

interface CreateContextOptions {
  headers: Headers
  setCookie: (key: string, value: string) => void
  getCookie: (key: string) => string | undefined
  userId: string | undefined
}

export function createInnerTRPCContext(opts: CreateContextOptions) {
  return {
    headers: opts.headers,
    db,
    setCookie: opts.setCookie,
    getCookie: opts.getCookie,
    userId: opts.userId,
  }
}

export function createTRPCContext(opts: { req: NextRequest } & Omit<CreateContextOptions, 'headers'>) {
  return createInnerTRPCContext({
    headers: opts.req.headers,
    setCookie: opts.setCookie,
    getCookie: opts.getCookie,
    userId: opts.userId,
  })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

export const authProcedure = publicProcedure.use((opts) => {
  if (opts.ctx.userId)
    return opts.next()

  throw new TRPCError({
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
  })
})
