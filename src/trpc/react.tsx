'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TRPCClientError, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { useMemo, useState } from 'react'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { theme } from '../config'
import { getUrl, transformer } from './shared'
import type { AppRouter } from '~/server/api/root'

export const api = createTRPCReact<AppRouter>()

export interface ErrorBody {
  code: number
  message: string
}

const { toast } = createStandaloneToast()

export function TRPCReactProvider(props: {
  children: React.ReactNode
  cookies: string
}) {
  const router = useRouter()
  function redirectToLogin() {
    router.push('/login')
  }

  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, err) {
          if (err instanceof TRPCClientError) {
            // TODO: more robust error handling
            if (err) {
              toast({
                title: err.message,
                description: err.message,
                status: 'error',
                duration: 3000,
              })
              if (err.data.httpStatus === 401) {
                redirectToLogin()
                return false
              }
            }
          }
          return failureCount < 3
        },
      },
    },
  }), [])

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
