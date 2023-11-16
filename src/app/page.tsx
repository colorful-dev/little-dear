"use client";

import { Box, Button, Center, Flex, Heading, Icon, Stack, Text, HStack } from "@chakra-ui/react";
import { FiCalendar, FiSearch, FiChevronDown, FiCoffee } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import type { IconType } from 'react-icons';

export enum BillType {
  INCOME,
  EXPENSES
}

const billTypeColorMap: Record<BillType, string> = {
  [BillType.EXPENSES]: 'red',
  [BillType.INCOME]: 'green'
}

const Bill = ({children}: {
  children?: React.ReactNode;
}) => {
  return (
    <Stack>
      <Heading as='h5' size={'sm'}>近期账单</Heading>
      <Stack spacing={2}>
        {children} 
      </Stack>
    </Stack>
  )
}

const DateItem = ({children}: {
  children?: React.ReactNode;
}) => {
  return (
    <Stack spacing={2}>
      <Center justifyContent={'space-between'} color={'gray.300'} fontSize={'x-small'}>
        <Text>昨天 11月15日</Text>
        <Flex>
          <Text marginRight={2}>收 ¥ 44.00</Text>
          <Text>支 ¥ 77.00</Text>
        </Flex>
      </Center>
      {children}
    </Stack>
  )
}


const BillItem = ({icon, label, value, category, type}: {
  label: string,
  value: string,
  category: string,
  icon: IconType,
  type: BillType
}) => {
  return (
    <HStack alignItems={'center'} spacing={4}>
      <Center rounded={6} bgColor={`${billTypeColorMap[type]}.50`} w={8} h={8} color={`${billTypeColorMap[type]}.400`}>
        <Icon as={icon} />
      </Center>
      <Stack flex={1} spacing={.5}>
        <Text fontSize={'small'} fontWeight={'bold'}>{label}</Text>
        <Text color={'gray.300'} fontSize={'x-small'}>{category}</Text>
      </Stack>    
      <Center color={`${billTypeColorMap[type]}.400`}>¥ {value}</Center>
    </HStack>
  ) 
}

export default function Home() {
  return (
    <Stack spacing={4} align={'stretch'} w="100vw" p={'4'}>
      <Flex h={10} alignItems={'center'} justifyContent={'space-between'} >
        <Button colorScheme='gray' size='xs'>
          Button <Icon as={FiChevronDown as never} />
        </Button>
        <Center w={12} justifyContent={'space-around'} color={'primary.600'}>
          <Icon as={FiCalendar as never} />
          <Icon as={FiSearch as never} />
        </Center>
      </Flex>
      <Heading as='h4' size='md'>
        Dear Wallet
        <Box rounded={14} w={6} h={1} backgroundColor={'pink.300'}></Box>
      </Heading>
      <Box h={40} bg="primary.500" rounded={14}></Box>
      <Bill>
        <DateItem>
          <BillItem icon={FiCoffee as never} label="零食" value="2,333.00" category="微信钱包" type={BillType.EXPENSES}></BillItem>
          <BillItem icon={GiMoneyStack as never} label="工资" value="3,000.00" category="支付宝" type={BillType.INCOME}></BillItem>
        </DateItem>
      </Bill>
    </Stack>
  );
}