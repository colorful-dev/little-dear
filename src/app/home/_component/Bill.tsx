import type { IconifyIcon } from '@iconify/react'
import type { PropsWithChildren } from 'react'
import { Center, Flex, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { BillingType } from '~/server/db/schema'
import { weekdays } from '~/app/_util'

const billTypeColorMap: Record<BillingType, string> = {
  [BillingType.EXPENSE]: 'red',
  [BillingType.INCOME]: 'green',
  [BillingType.TRANSFER]: 'purple',
}

export function Bill({ children }: PropsWithChildren) {
  return (
    <Stack marginTop={3}>
      <Heading as="h5" size="sm">
        近期账单
      </Heading>
      <Stack spacing={2}>{children}</Stack>
    </Stack>
  )
};

export function DateItem({
  children,
  income,
  expense,
  date,
}: PropsWithChildren<{
  date: string
  income: number
  expense: number
}>) {
  const dayList = (Array(7).fill(0)).reduce<Record<string, string>>((acc, curr, index) => {
    const thisDay = dayjs().add(-index, 'day')
    const dayStr = thisDay.format('YYYY-MM-DD')
    const weekday = thisDay.day()
    acc[dayStr] = `${index ? weekdays[weekday] : '今天'} ${dayStr.slice(5)}`
    return acc
  }, {})

  return (
    <Stack spacing={2}>
      <Center
        justifyContent="space-between"
        color="gray.600"
        fontSize="x-small"
      >
        <Text>{dayList[date] || date}</Text>
        <Flex>
          <Text marginRight={2}>
            收 ¥
            {income}
          </Text>
          <Text>
            支 ¥
            {expense}
          </Text>
        </Flex>
      </Center>
      {children}
    </Stack>
  )
};

export function BillItem({
  icon,
  category,
  value,
  account,
  type,
}: {
  category: string
  value: number
  account: string
  icon: string | IconifyIcon
  type: BillingType
}) {
  return (
    <HStack alignItems="center" spacing={4}>
      <Center
        rounded={6}
        bgColor={`${billTypeColorMap[type]}.50`}
        w={8}
        h={8}
        color={`${billTypeColorMap[type]}.400`}
      >
        <Icon icon={icon} />
      </Center>
      <Stack flex={1} spacing={0.5}>
        <Text fontSize="small" fontWeight="bold">
          {category}
        </Text>
        <Text color="gray.600" fontSize="x-small">
          {account}
        </Text>
      </Stack>
      <Center color={`${billTypeColorMap[type]}.400`}>
        ¥
        {value}
      </Center>
    </HStack>
  )
}
