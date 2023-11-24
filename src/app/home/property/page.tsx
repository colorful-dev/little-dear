'use client'

import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import { PropertyItem, PropertyList } from './_component/PropertyManage'

type IProperty = {
  netAsset: string
  disposableAssets: string
  currentLiabilities: string
  debit: string
  loan: string
  list: Array<{
    account: string
    value: string
    icon: string
    remark: string
  }>
}

export default function Property() {
  const mockData: IProperty = {
    netAsset: '2000',
    disposableAssets: '5000',
    currentLiabilities: '2000',
    debit: '2000',
    loan: '5000',
    list: [
      {
        remark: '要存的钱',
        value: '5000',
        account: '银行卡',
        icon: 'icon-park-solid:bank-card',
      },
      {
        remark: '不要用这个钱',
        value: '1000',
        account: '微信钱包',
        icon: 'ri:wechat-pay-fill',
      },
      {
        remark: '可以用',
        value: '500',
        account: '支付宝',
        icon: 'ion:logo-alipay',
      },
    ],
  }

  return (
    <Stack
      spacing={4}
      align="stretch"
      w="100vw"
      h="100%"
      py="4"
      overflow="hidden"
    >
      <Flex
        h={10}
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Center color="primary.600" fontSize={20}>
          <Icon icon="ep:back" />
        </Center>
        <Center
          w={16}
          fontSize={20}
          justifyContent="space-around"
          color="primary.600"
        >
          <Icon icon="material-symbols-light:add-ad-rounded" />
          <Icon icon="ion:add-outline" />
        </Center>
      </Flex>
      <Stack px={4} flex={1} overflowY="auto">
        <Heading as="h4" size="md">
          资产管理
          <Box rounded={14} w={6} h={1} backgroundColor="pink.300"></Box>
        </Heading>
        <Box
          flexShrink={0}
          bg="#fff"
          rounded={14}
          padding="10px 0"
          boxShadow="0px 2px 24px 0px rgba(0, 0, 0, 0.10);"
        >
          <Stack padding="0 16px 10px" fontWeight={600}>
            <Text fontSize={12}>净资产</Text>
            <Text fontSize={20} fontWeight="bold">
              ¥
              {' '}
              {mockData.netAsset}
            </Text>
          </Stack>
          <Divider />
          <Flex
            alignItems="center"
            width="100%"
            justifyContent="space-around"
          >
            <Stack padding="10px 0">
              <Text fontSize={12}>可支配资产</Text>
              <Text fontSize={14} fontWeight="bold" color="green.500">
                ¥
                {' '}
                {mockData.disposableAssets}
              </Text>
            </Stack>
            <Stack padding="10px 0">
              <Text fontSize={12}>当前负债</Text>
              <Text fontSize={14} fontWeight="bold" color="red.500">
                ¥
                {' '}
                {mockData.currentLiabilities}
              </Text>
            </Stack>
          </Flex>
          <Divider />
          <Flex
            alignItems="center"
            width="100%"
            justifyContent="space-around"
          >
            <Stack padding="10px 0">
              <Text fontSize={12}>借入</Text>
              <Text fontSize={14} fontWeight="bold" color="primary.500">
                ¥
                {' '}
                {mockData.debit}
              </Text>
            </Stack>
            <Stack padding="10px 0">
              <Text fontSize={12}>借出</Text>
              <Text fontSize={14} fontWeight="bold" color="orange.500">
                ¥
                {' '}
                {mockData.loan}
              </Text>
            </Stack>
          </Flex>
        </Box>
        <PropertyList>
          {mockData?.list?.map((pItem, iIndex) => (
            <PropertyItem key={iIndex} {...pItem} />
          ))}
        </PropertyList>
      </Stack>
    </Stack>
  )
}
