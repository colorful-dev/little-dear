import { initTRPC } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";
import cookie, { type CookieSerializeOptions } from 'cookie'

import { db } from "~/server/db";


interface CreateContextOptions {
    headers: Headers;
    userId?: string;
    resHeaders: Headers;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return {
        headers: opts.headers,
        db,
        userId: opts.userId,
        setCookie: (key: string, value: string, options?: CookieSerializeOptions) => {
            opts.resHeaders.append('Set-Cookie', cookie.serialize(key, value, options))
        }
    };
};

export const createTRPCContext = (opts: { req: NextRequest } & Omit<CreateContextOptions, 'headers'>) => {
    return createInnerTRPCContext({
        headers: opts.req.headers,
        userId: opts.userId,
        resHeaders: opts.resHeaders
    });
};

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
        };
    },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const authorizedProcedure = publicProcedure.use(async opts => {
    if (!opts.ctx.userId) {
        throw new Error('请先登录')
    }
    const user = await opts.ctx.db.user.findUnique({
        where: {
            id: opts.ctx.userId
        }
    })
    if (!user) {
        throw new Error("用户不存在");
    }
    return opts.next()
})
