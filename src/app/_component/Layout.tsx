import { Box, Heading, VStack } from '@chakra-ui/react'
import type { PropsWithChildren, ReactNode } from 'react'

export interface HomeLayoutProps extends PropsWithChildren {
  header?: ReactNode
  name: string
}

export function HomeLayout({ header, name, children }: HomeLayoutProps) {
  return (
    <VStack px={4} spacing={2} justifyContent="safe left" flexShrink={1} pb={4}>
      <Box h={10} w="full" display="flex" alignItems="center">
        {header}
      </Box>
      <VStack w="full">
        <Heading as="h1" size="xl" w="full" lineHeight={1}>
          {name}
          <Box
            rounded={14}
            w={6}
            h={1}
            backgroundColor="pink.300"
            marginTop={2}
          >
          </Box>
        </Heading>
        <Box marginTop={2} w="full">
          {children}
        </Box>
      </VStack>
    </VStack>
  )
}
