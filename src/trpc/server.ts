import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from '@trpc/client'
import { cookies } from 'next/headers'

import { getUrl, transformer } from './shared'
import type { AppRouter } from '~/server/api/root'

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: op =>
        process.env.NODE_ENV === 'development'
        || (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        return {
          'cookie': cookies().toString(),
          'x-trpc-source': 'rsc',
        }
      },
    }),
  ],
})
