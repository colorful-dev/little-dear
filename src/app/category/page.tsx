"use client";

import {
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  TabIndicator,
  useColorModeValue } from '@chakra-ui/react'
import { useState } from "react";
import ExpendPanel from "./expendPanel";

export default function Page() {
  const colors = useColorModeValue(
    ['#D66F67', '#6DD4A4', '#8D8BF5'],
    [],
  )
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  const tabs = [
    { label: '支出', color: '#D66F67' },
    { label: '收入', color: '#6DD4A4' },
    { label: '转账', color: '#8D8BF5' },
  ];
  return (
    <>
      <Tabs
        onChange={(index) => setTabIndex(index)}
        position="relative"
        align='center' 
        variant="unstyled">
        <TabList>
          {tabs.map((tab, index) => (
            <Tab key={index} _selected={{ color: tab.color }}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg={bg}
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <ExpendPanel/>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}