"use client";

import {
    Stack
} from '@chakra-ui/react'
import AccountInput from './AccountInput'
import CategoryGrid from './CategoryGrid'
import { useState } from "react";
// import { NumberInput } from "@/_component/NumberInput";

export interface IconInfo {
    categoryId: string | number,
    label: string;
    icon: string;
    children?: IconInfo[];
}

export default function Page() {
  const mockData: IconInfo[] = [
    {
      categoryId: '001',
      label: '餐饮',
      icon: 'icon-park-outline:noodles',
      children: [
        {
          categoryId: '001-1',
          label: '面条',
          icon: 'icon-park:noodles',
        },
        {
          categoryId: '001-2',
          label: '米饭',
          icon: 'emojione:curry-rice',
        },
      ]
    },
    {
      categoryId: '002',
      label: '水果',
      icon: 'mdi:fruit-grapes-outline'
    },
    {
      categoryId: '003',
      label: '零食',
      icon: 'icon-park-outline:french-fries'
    },
    {
      categoryId: '004',
      label: '酒水饮料',
      icon: 'streamline:champagne-party-alcohol',
      children: [
        {
          categoryId: '004-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '004-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '005',
      label: '消费',
      icon: 'lucide:shopping-bag',
      children: [
        {
          categoryId: '005-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '005-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '006',
      label: '娱乐',
      icon: 'streamline:song-recommendation',
      children: [
        {
          categoryId: '006-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '006-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '007',
      label: '恋爱',
      icon: 'mingcute:flower-line'
    },
    {
      categoryId: '008',
      label: '住房',
      icon: 'solar:home-broken',
      children: [
        {
          categoryId: '008-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '008-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '009',
      label: '交通',
      icon: 'jam:car',
      children: [
        {
          categoryId: '009-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '009-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '010',
      label: '汽车',
      icon: 'ant-design:car-outlined',
      children: [
        {
          categoryId: '010-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
        },
        {
          categoryId: '010-2',
          label: '饮料',
          icon: 'noto:beverage-box',
        },
      ]
    },
    {
      categoryId: '011',
      label: '订阅服务',
      icon: 'gg:add'
    },
    {
      categoryId: '012',
      label: '学习',
      icon: 'iconoir:graduation-cap'
    },
    {
      categoryId: '013',
      label: '人情',
      icon: 'ph:gift-thin'
    },
    {
      categoryId: '014',
      label: '医疗',
      icon: 'solar:hospital-broken'
    },
    {
      categoryId: '015',
      label: '旅游',
      icon: 'tabler:mountain'
    },
    {
      categoryId: '016',
      label: '投资',
      icon: 'arcticons:business-suite'
    },
    {
      categoryId: '017',
      label: '管理',
      icon: 'ant-design:setting-outlined'
    },
  ]
  const [number, setNumber] = useState(0);

  return  (
    <Stack spacing={4} direction='column'>
      <AccountInput/>
      <CategoryGrid 
        icons={mockData}
        defaultValue='001'
      />
      {/* <NumberInput
        value={number}
        onChange={setNumber}
        confirmButtonClass="text-primary-500"
      /> */}
    </Stack>
  )
}