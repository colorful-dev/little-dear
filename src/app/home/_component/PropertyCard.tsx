import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export function PropertyCard() {
  const [eyeClosed, setEyeClosed] = useState(false)
  return (
    <Stack color="white" h={48} flexShrink={0} bg="primary.500" rounded={14} position="relative" overflow="hidden" p={4}>
      <Flex alignItems="center" justifyContent="space-between" fontWeight="normal">
        <Text fontSize="md">本月支出</Text>
        <Text fontSize="xl"onClick={() => setEyeClosed(!eyeClosed)}>
          {eyeClosed ? <Icon icon="ph:eye-closed-light" /> : <Icon icon="ph:eye-light" />}
        </Text>
      </Flex>
      <Text flex={1} fontWeight="extrabold" fontSize={36}>
        ¥ 0.00
      </Text>
      <Stack fontSize="xs" spacing={0} fontWeight="medium">
        <Text>本月收入 ¥0.00</Text>
        <Text>本月结余 ¥0.00</Text>
      </Stack>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ height: 0, width: 0 }}>
        <symbol id="test" viewBox="-50 -50 100 100">
          <path
            fill="currentColor"
            d="M19.3,-35.6C24.1,-30.7,26.5,-23.7,29.1,-17.4C31.7,-11.1,34.5,-5.5,34.3,-0.1C34,5.3,30.7,10.5,28.3,17.1C25.9,23.7,24.4,31.7,19.8,35.8C15.3,40,7.6,40.3,0.5,39.4C-6.6,38.5,-13.1,36.3,-20,33.5C-26.8,30.6,-33.9,27.2,-38,21.5C-42.1,15.8,-43.1,7.9,-43,0.1C-42.8,-7.7,-41.5,-15.5,-36.9,-20.2C-32.2,-24.9,-24.3,-26.7,-17.6,-30.5C-10.9,-34.4,-5.5,-40.3,0.9,-41.9C7.2,-43.4,14.5,-40.5,19.3,-35.6Z"
            stroke-width="0"
          >
          </path>
        </symbol>
      </svg>
      <Box h="full" position="absolute" right="-80px" top="46px" color="red.200" opacity=".9">
        <svg height="100%" width="100%" overflow="visible">
          <use xlinkHref="#test" width="350" height="350" style={{ transform: 'rotate(-9deg)' }}></use>
        </svg>
      </Box>
      <Box h="full" position="absolute" left="-115px" top="277px" color="black" opacity=".3">
        <svg height="100%" width="100%" overflow="visible">
          <use xlinkHref="#test" width="350" height="350" style={{ transform: 'rotate(-60deg)' }}></use>
        </svg>
      </Box>
    </Stack>
  )
}
