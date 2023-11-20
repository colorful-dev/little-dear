import { initTRPC } from '@trpc/server'
import type { NextRequest } from 'next/server'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { db } from '~/server/db'

interface CreateContextOptions {
  headers: Headers
  setCookie: (key: string, value: string) => void
}

export function createInnerTRPCContext(opts: CreateContextOptions) {
  return {
    headers: opts.headers,
    db,
    setCookie: opts.setCookie,
  }
}

export function createTRPCContext(opts: { req: NextRequest } & Pick<CreateContextOptions, 'setCookie'>) {
  return createInnerTRPCContext({
    headers: opts.req.headers,
    setCookie: opts.setCookie,
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
