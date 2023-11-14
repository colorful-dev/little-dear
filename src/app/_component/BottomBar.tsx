"use client";

import { IoHome, IoAddOutline, IoSettingsOutline } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { MdOutlineCalculate } from "react-icons/md";
import { Center, Flex, IconButton } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const activePaths = {
  home: "/",
  statistics: "/statistics",
  add: "/add",
  calc: "/calc",
  setting: "/setting",
};

const noLayoutRoutes = ["/login", "/signup"];

export function BottomBar() {
  const router = useRouter();
  const pathName = usePathname();
  const activeKey = React.useMemo(() => {
    console.log("pathName", pathName);
    const values = Object.values(activePaths);
    const result = values.filter((path) => {
      if (pathName !== "/" && path !== "/") {
        return pathName.startsWith(path);
      }
      return path === pathName;
    });
    if (result.length > 0) {
      let index = 0;
      values.forEach((item, i) => {
        if (item === result[0]) {
          index = i;
        }
      });
      return Object.keys(activePaths)[index];
    }
    return null;
  }, [pathName]);
  console.log(activeKey);

  const isActive = (key: keyof typeof activePaths) => key === activeKey;
  const goToPath = (key: keyof typeof activePaths) =>
    router.push(activePaths[key]);
  if (noLayoutRoutes.includes(pathName)) return null;

  return (
    <Flex
      w="100vw"
      h="80px"
      color="gray"
      bg="white"
      px={"36px"}
      justify={"space-between"}
      boxShadow={"0px 0px 1px 0px gray"}
    >
      <Center>
        <IconButton
          aria-label="home"
          color={isActive("home") ? "blue" : undefined}
          icon={<IoHome style={{ fontSize: "26px" }} />}
          onClick={() => goToPath("home")}
        />
      </Center>
      <Center>
        <IconButton
          aria-label="statistics"
          color={isActive("statistics") ? "blue" : undefined}
          icon={<FaChartPie style={{ fontSize: "24px" }} />}
          onClick={() => goToPath("statistics")}
        />
      </Center>
      <Center>
        <IconButton
          aria-label="add"
          color={isActive("add") ? "blue" : undefined}
          icon={<IoAddOutline style={{ fontSize: "30px" }} />}
          onClick={() => goToPath("add")}
        />
      </Center>
      <Center>
        <IconButton
          aria-label="calc"
          color={isActive("calc") ? "blue" : undefined}
          icon={<MdOutlineCalculate style={{ fontSize: "26px" }} />}
          onClick={() => goToPath("calc")}
        />
      </Center>
      <Center>
        <IconButton
          aria-label="setting"
          color={isActive("setting") ? "blue" : undefined}
          icon={<IoSettingsOutline style={{ fontSize: "24px" }} />}
          onClick={() => goToPath("setting")}
        />
      </Center>
    </Flex>
  );
}
