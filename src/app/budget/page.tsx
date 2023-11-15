"use client";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { NumberInput } from "@/_component/NumberInput";

export default function Page() {
  const [drawerVisible, toggleDrawerVisible] = useState(true);

  const [number, setNumber] = useState(0);

  return (
    <>
      <button onClick={() => toggleDrawerVisible(true)}>
        click to add budget number: {number}
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
            <div className="mb-[20px]">
              <Input placeholder="输入预算额度" value={number} size="lg" />
            </div>
            <NumberInput
              value={number}
              onChange={setNumber}
              confirmButtonClass="text-primary-500"
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
