import type { IconifyIcon } from "@iconify/react";
import type { PropsWithChildren } from "react";
import { Stack, Heading, Center, Text, Flex, HStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export const PropertyList = ({ children }: PropsWithChildren) => {
  return (
    <Stack>
      <Heading as="h5" size={"sm"} padding={"10px 0"}>
        现金账户
      </Heading>
      <Stack spacing={2}>{children}</Stack>
    </Stack>
  );
};

const accountToIconMap = {
  银行卡: "icon-park-solid:bank-card",
  微信钱包: "ri:wechat-pay-fill",
  支付宝: "ion:logo-alipay",
};
const accountToColorMap = {
  银行卡: "blue.800",
  微信钱包: "green.500",
  支付宝: "blue.500",
};

export const PropertyItem = ({
  value,
  account,
  remark,
}: {
  value: string;
  account: string;
  remark: string;
  icon: string | IconifyIcon;
}) => {
  return (
    <HStack alignItems={"center"} spacing={4}>
      <Center
        rounded={6}
        fontSize={"32px"}
        padding={"8px"}
        background={"gray.200"}
        color={accountToColorMap[account as keyof typeof accountToColorMap]}
      >
        <Icon
          icon={accountToIconMap[account as keyof typeof accountToIconMap]}
        />
      </Center>
      <Stack flex={1} spacing={0.5}>
        <Text fontSize={"small"} fontWeight={"bold"}>
          {account}
        </Text>
        <Text color={"gray.500"} fontSize={"x-small"}>
          {remark}
        </Text>
      </Stack>
      <Center>¥ {value}</Center>
    </HStack>
  );
};
