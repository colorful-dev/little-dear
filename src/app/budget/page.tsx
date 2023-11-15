"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { NumberInput } from "@/_component/NumberInput";

export default function Page() {
  const [drawerVisible, toggleDrawerVisible] = useState(true);

  return (
    <>
      <button onClick={() => toggleDrawerVisible(true)}>
        click to add budget
      </button>
      <Drawer
        onClose={() => {
          toggleDrawerVisible(false);
        }}
        placement="bottom"
        isOpen={drawerVisible}
      >
        <DrawerOverlay />
        <DrawerContent className="overflow-hidden rounded-t-lg">
          <DrawerHeader alignSelf="center">设置月预算额度</DrawerHeader>
          <DrawerBody>
            <NumberInput />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
