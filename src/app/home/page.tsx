'use client'

import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import { HomeLayout } from '../_component/Layout'
import { Bill, BillItem, BillType, DateItem } from './_component/Bill'
import { useDBSeeding } from './_hooks/useSeed'

type DailyBill = {
  date: string
  income: string
  expense: string
  list: Array<{
    category: string
    value: string
    account: string
    icon: string
    type: BillType
  }>
}

const category2IconMap = {
  工资: 'icon-park-outline:income',
  饮食: 'icon-park-outline:noodles',
  零食: 'icon-park-outline:french-fries',
  运动: 'icon-park-outline:sport',
  书籍: 'icon-park-outline:book',
  礼物: 'icon-park-outline:gift',
}

export default function Home() {
  useDBSeeding()

  const mockData: DailyBill[] = [
    {
      date: '2023-11-01',
      income: '5000',
      expense: '2000',
      list: [
        {
          category: '工资',
          value: '5000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1000',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '零食',
          value: '500',
          account: '零食',
          icon: 'snack',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-02',
      income: '6000',
      expense: '2500',
      list: [
        {
          category: '工资',
          value: '6000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1500',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '运动',
          value: '500',
          account: '运动',
          icon: 'sport',
          type: BillType.EXPENSE,
        },
        {
          category: '书籍',
          value: '500',
          account: '书籍',
          icon: 'book',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-03',
      income: '5000',
      expense: '2000',
      list: [
        {
          category: '工资',
          value: '5000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1000',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '礼物',
          value: '500',
          account: '礼物',
          icon: 'gift',
          type: BillType.EXPENSE,
        },
        {
          category: '运动',
          value: '500',
          account: '运动',
          icon: 'sport',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-04',
      income: '6000',
      expense: '2500',
      list: [
        {
          category: '工资',
          value: '6000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1500',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '零食',
          value: '500',
          account: '零食',
          icon: 'snack',
          type: BillType.EXPENSE,
        },
        {
          category: '书籍',
          value: '500',
          account: '书籍',
          icon: 'book',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-05',
      income: '5000',
      expense: '2000',
      list: [
        {
          category: '工资',
          value: '5000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1000',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '零食',
          value: '500',
          account: '零食',
          icon: 'snack',
          type: BillType.EXPENSE,
        },
        {
          category: '运动',
          value: '500',
          account: '运动',
          icon: 'sport',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-06',
      income: '6000',
      expense: '2500',
      list: [
        {
          category: '工资',
          value: '6000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1500',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '礼物',
          value: '500',
          account: '礼物',
          icon: 'gift',
          type: BillType.EXPENSE,
        },
        {
          category: '书籍',
          value: '500',
          account: '书籍',
          icon: 'book',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-07',
      income: '5000',
      expense: '2000',
      list: [
        {
          category: '工资',
          value: '5000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1000',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '零食',
          value: '500',
          account: '零食',
          icon: 'snack',
          type: BillType.EXPENSE,
        },
        {
          category: '运动',
          value: '500',
          account: '运动',
          icon: 'sport',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-08',
      income: '6000',
      expense: '2500',
      list: [
        {
          category: '工资',
          value: '6000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1500',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '礼物',
          value: '500',
          account: '礼物',
          icon: 'gift',
          type: BillType.EXPENSE,
        },
        {
          category: '书籍',
          value: '500',
          account: '书籍',
          icon: 'book',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-09',
      income: '5000',
      expense: '2000',
      list: [
        {
          category: '工资',
          value: '5000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1000',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '零食',
          value: '500',
          account: '零食',
          icon: 'snack',
          type: BillType.EXPENSE,
        },
        {
          category: '运动',
          value: '500',
          account: '运动',
          icon: 'sport',
          type: BillType.EXPENSE,
        },
      ],
    },
    {
      date: '2023-11-10',
      income: '6000',
      expense: '2500',
      list: [
        {
          category: '工资',
          value: '6000',
          account: '工资',
          icon: 'salary',
          type: BillType.INCOME,
        },
        {
          category: '饮食',
          value: '1500',
          account: '饮食',
          icon: 'food',
          type: BillType.EXPENSE,
        },
        {
          category: '礼物',
          value: '500',
          account: '礼物',
          icon: 'gift',
          type: BillType.EXPENSE,
        },
        {
          category: '书籍',
          value: '500',
          account: '书籍',
          icon: 'book',
          type: BillType.EXPENSE,
        },
      ],
    },
  ]

  return (
    <HomeLayout
      name="Dear Wallet"
      header={(
        <Flex w="full" alignItems="center" justifyContent="space-between">
          <Button colorScheme="gray" size="xs">
            Button
            {' '}
            <Icon icon="carbon:chevron-down" />
          </Button>
          <Center
            w={12}
            fontSize={20}
            justifyContent="space-around"
            color="primary.600"
          >
            <Icon icon="carbon:calendar" />
            <Icon icon="carbon:search" />
          </Center>
        </Flex>
      )}
    >
      <Box h={40} flexShrink={0} bg="primary.500" rounded={14}></Box>
      <Bill>
        {mockData.map((b, index) => (
          <DateItem
            key={`${b.date}${index}`}
            date={b.date}
            income={b.income}
            expense={b.expense}
          >
            {
              b.list.map((i, iIndex) => (
                <BillItem
                  key={iIndex}
                  icon={
                    category2IconMap[i.category as keyof typeof category2IconMap]
                  }
                  category={i.category}
                  value={i.value}
                  account={i.account}
                  type={i.type}
                >
                </BillItem>
              ))
              // <BillItem icon="icon-park-outline:income" category="工资" value="3,000.00" account="支付宝" type={BillType.INCOME}></BillItem>
            }
          </DateItem>
        ))}
      </Bill>
    </HomeLayout>
  )
}
