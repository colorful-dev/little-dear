"use client";

import {
  Flex,
  Center,
  Input,
  Box
} from '@chakra-ui/react'
import { Icon } from "@iconify/react";
export default function Page() {
  return (
    <Flex h={20} px={4} bg='gray.500' borderRadius='lg'  alignItems={'center'} justifyContent={'space-between'}>
      <Box 
        display="flex" 
        flexDirection="row"
        alignItems={'center'}
      >
        <Center w={16} fontSize={64} justifyContent={'space-around'} bg={'gray.600'} rounded={4}>
          <Icon icon="logos:google-pay" />
        </Center>
        <Flex
          w={16}
          h={16}
          mx={4}
          fontSize={14}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Flex alignItems={'center'}>支付宝 <Icon icon="carbon:chevron-down" /></Flex>
          <Flex>主账户</Flex>
        </Flex>
      </Box>
      <Input h={16} variant='unstyled' placeholder='Basic usage'/>
    </Flex>
  );
}