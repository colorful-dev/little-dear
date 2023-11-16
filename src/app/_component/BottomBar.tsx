"use client";

import { Center, Flex, ChakraProvider } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { theme } from "../../trpc/theme";
import { Icon } from "@iconify/react";

const activePaths = {
  home: "/",
  statistics: "/statistics",
  add: "/add",
  calc: "/calc",
  setting: "/setting",
};

const reversePaths = Object.fromEntries(
  Object.entries(activePaths).map(([key, value]) => [value, key]),
);

const noLayoutRoutes = ["/login", "/signup"];

export function BottomBar() {
  const router = useRouter();
  const pathName = usePathname();
  const activeKey = React.useMemo(() => {
    const key = Object.keys(reversePaths).filter((item) => item === pathName);
    if (key.length === 1) {
      return reversePaths[key[0] as keyof typeof reversePaths];
    }
    return null;
  }, [pathName]);

  console.log("pathName", pathName);
  console.log("activeKey", activeKey);
  const isActive = (key: keyof typeof activePaths) => key === activeKey;
  const goToPath = (key: keyof typeof activePaths) =>
    router.push(activePaths[key]);
  if (noLayoutRoutes.includes(pathName)) return null;

  return (
    <ChakraProvider theme={theme}>
      <Flex
        w="100vw"
        h="80px"
        color="gray"
        bg="white"
        px={"36px"}
        justify={"space-between"}
        boxShadow={"0px 0px 1px 0px gray"}
      >
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("home")}
          color={isActive("home") ? "primary.500" : undefined}
        >
          <Icon icon="ant-design:home-outlined" />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("statistics")}
          color={isActive("statistics") ? "primary.500" : undefined}
        >
          <Icon icon="tabler:chart-line" />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("add")}
          color={isActive("add") ? "primary.500" : undefined}
        >
          <Icon icon="fluent:add-12-filled" />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("calc")}
          color={isActive("calc") ? "primary.500" : undefined}
        >
          <Icon icon="iconamoon:calculator-light" />
        </Center>
        <Center
          fontSize={"3xl"}
          onClick={() => goToPath("setting")}
          color={isActive("setting") ? "primary.500" : undefined}
        >
          <Icon icon="uil:setting" />
        </Center>
      </Flex>
    </ChakraProvider>
  );
}
