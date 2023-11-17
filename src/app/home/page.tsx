"use client";

import { Box, Button, Center, Flex, Heading, Stack} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Bill, DateItem, BillItem, BillType } from './_component/Bill';

export default function Home() {
  return (
    <Stack spacing={4} align={'stretch'} w="100vw" p={'4'}>
      <Flex h={10} alignItems={'center'} justifyContent={'space-between'} >
        <Button colorScheme='gray' size='xs'>
          Button <Icon icon="carbon:chevron-down" />
        </Button>
        <Center w={12} fontSize={20} justifyContent={'space-around'} color={'primary.600'}>
          <Icon icon="carbon:calendar" />
          <Icon icon="carbon:search" />
        </Center>
      </Flex>
      <Heading as='h4' size='md'>
        Dear Wallet
        <Box rounded={14} w={6} h={1} backgroundColor={'pink.300'}></Box>
      </Heading>
      <Box h={40} bg="primary.500" rounded={14}></Box>
      <Bill>
        <DateItem date="昨天 11月15日" income="44.00" expense="77.00">
          <BillItem icon="ph:coffee-light" label="零食" value="2,333.00" category="微信钱包" type={BillType.EXPENSE}></BillItem>
          <BillItem icon="icon-park-outline:income" label="工资" value="3,000.00" category="支付宝" type={BillType.INCOME}></BillItem>
        </DateItem>
      </Bill>
    </Stack>
  );
}