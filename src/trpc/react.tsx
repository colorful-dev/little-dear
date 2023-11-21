'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useState } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../config'
import { getUrl, transformer } from './shared'
import type { AppRouter } from '~/server/api/root'

export const api = createTRPCReact<AppRouter>()

export interface ErrorBody {
  code: number
  message: string
}

export function TRPCReactProvider(props: {
  children: React.ReactNode
  cookies: string
}) {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: op =>
            process.env.NODE_ENV === 'development'
            || (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <ChakraProvider theme={theme}>{props.children}</ChakraProvider>
      </api.Provider>
    </QueryClientProvider>
  )
}
