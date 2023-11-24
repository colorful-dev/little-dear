'use client'

import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import { HomeLayout } from '../_component/Layout'
import { Bill, BillItem, DateItem } from './_component/Bill'
import { useDBSeeding } from './_hooks/useSeed'
import { api } from '~/trpc/react'
import { BillingType } from '~/server/db/schema'

const category2IconMap = {
  工资: 'icon-park-outline:income',
  餐饮: 'icon-park-outline:noodles',
  零食: 'icon-park-outline:french-fries',
  运动: 'icon-park-outline:sport',
  书籍: 'icon-park-outline:book',
  礼物: 'icon-park-outline:gift',
}

export default function Home() {
  const createBilling = api.billing.createBilling.useMutation()
  const listBillings = api.billing.listBillings.useQuery()

  useDBSeeding()

  const handleAddBilling = () => {
    createBilling.mutate({
      value: Number((Math.random() * 1000).toFixed(2)),
      categoryId: '88da6c00-92c8-4fa9-ada1-c1dbf95780c3',
      categoryName: '餐饮',
      transactionAt: new Date(),
      type: BillingType.EXPENSE,
    })
  }

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
      <Box h={40} flexShrink={0} bg="primary.500" rounded={14} onClick={handleAddBilling}></Box>
      <Bill>
        {listBillings.data?.map(b => (
          <DateItem
            key={b.date}
            date={b.date}
            income={b.income}
            expense={b.expense}
          >
            {
              b.list.map((i, iIndex) => (
                <BillItem
                  key={iIndex}
                  icon={
                    category2IconMap[i.categoryName as keyof typeof category2IconMap]
                  }
                  category={i.categoryName}
                  value={i.value}
                  account={i.accountName || ''}
                  type={i.type}
                />
              ))
              // <BillItem icon="icon-park-outline:income" category="工资" value="3,000.00" account="支付宝" type={BillType.INCOME}></BillItem>
            }
          </DateItem>
        ))}
      </Bill>
    </HomeLayout>
  )
}
