import type { PgSelect } from 'drizzle-orm/pg-core'
import { type ZodObject, type ZodRawShape, z } from 'zod'

export const basicPaginationSchema = z.object({
  size: z.number().optional().default(20),
  page: z.number().optional().default(0),
})

export function schemaWithPagination<T extends ZodRawShape>(schema: ZodObject<T>) {
  return schema.merge(basicPaginationSchema)
}

interface PageMeta {
  currentPage: number
  isLastPage: boolean
  isFirstPage: boolean
  nextPage: number | null
  previousPage: number | null
  pageCount: number
  total: number
}

export async function withPagination<T extends PgSelect>(
  query: T,
  page: number,
  size: number,
  count: number,
) {
  const res = await query.limit(size).offset((page - 1) * size)
  const currentTailIndex = page * size
  const meta: PageMeta = {
    currentPage: page,
    isFirstPage: page === 1,
    isLastPage: currentTailIndex >= count,
    previousPage: page - 1 === 0 ? null : page - 1,
    nextPage: currentTailIndex >= count ? null : page + 1,
    pageCount: Math.ceil(count / size),
    total: count,
  }
  return {
    ...meta,
    data: res,
  }
}
