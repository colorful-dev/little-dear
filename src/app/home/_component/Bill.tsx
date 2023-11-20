import type { IconifyIcon } from "@iconify/react";
import type { PropsWithChildren } from "react";
import { Stack, Heading, Center, Text, Flex, HStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

export enum BillType {
  INCOME,
  EXPENSE,
}

const billTypeColorMap: Record<BillType, string> = {
  [BillType.EXPENSE]: "red",
  [BillType.INCOME]: "green",
};

export const Bill = ({ children }: PropsWithChildren) => {
  return (
    <Stack marginTop={3}>
      <Heading as="h5" size={"sm"}>
        近期账单
      </Heading>
      <Stack spacing={2}>{children}</Stack>
    </Stack>
  );
};

export const DateItem = ({
  children,
  income,
  expense,
  date,
}: PropsWithChildren<{
  date: string;
  income: string;
  expense: string;
}>) => {
  return (
    <Stack spacing={2}>
      <Center
        justifyContent={"space-between"}
        color={"gray.300"}
        fontSize={"x-small"}
      >
        <Text>{date}</Text>
        <Flex>
          <Text marginRight={2}>收 ¥ {income}</Text>
          <Text>支 ¥ {expense}</Text>
        </Flex>
      </Center>
      {children}
    </Stack>
  );
};

export const BillItem = ({
  icon,
  category,
  value,
  account,
  type,
}: {
  category: string;
  value: string;
  account: string;
  icon: string | IconifyIcon;
  type: BillType;
}) => {
  return (
    <HStack alignItems={"center"} spacing={4}>
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
        <Text fontSize={"small"} fontWeight={"bold"}>
          {category}
        </Text>
        <Text color={"gray.300"} fontSize={"x-small"}>
          {account}
        </Text>
      </Stack>
      <Center color={`${billTypeColorMap[type]}.400`}>¥ {value}</Center>
    </HStack>
  );
};
