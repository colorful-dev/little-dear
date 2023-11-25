'use client'

import {
  Stack,
} from '@chakra-ui/react'
import AccountInput from './AccountInput'
import CategoryGrid, { type IconInfo } from './CategoryGrid'

export default function Page() {
  const mockData: IconInfo[] = [
    {
      categoryId: '001',
      label: '餐饮',
      icon: 'icon-park-outline:noodles',
      parentId: '',
      children: [
        {
          categoryId: '001-1',
          label: '面条',
          icon: 'icon-park:noodles',
          parentId: '001',
        },
        {
          categoryId: '001-2',
          label: '米饭',
          icon: 'emojione:curry-rice',
          parentId: '001',
        },
      ],
    },
    {
      categoryId: '002',
      label: '水果',
      icon: 'mdi:fruit-grapes-outline',
      parentId: '',
    },
    {
      categoryId: '003',
      label: '零食',
      icon: 'icon-park-outline:french-fries',
      parentId: '',
    },
    {
      categoryId: '004',
      label: '酒水饮料',
      icon: 'streamline:champagne-party-alcohol',
      parentId: '',
      children: [
        {
          categoryId: '004-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '004',
        },
        {
          categoryId: '004-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '004',
        },
      ],
    },
    {
      categoryId: '005',
      label: '消费',
      icon: 'lucide:shopping-bag',
      parentId: '',
      children: [
        {
          categoryId: '005-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '005',
        },
        {
          categoryId: '005-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '005',
        },
      ],
    },
    {
      categoryId: '006',
      label: '娱乐',
      icon: 'streamline:song-recommendation',
      parentId: '',
      children: [
        {
          categoryId: '006-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '006',
        },
        {
          categoryId: '006-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '006',
        },
      ],
    },
    {
      categoryId: '007',
      label: '恋爱',
      icon: 'mingcute:flower-line',
      parentId: '',
    },
    {
      categoryId: '008',
      label: '住房',
      icon: 'solar:home-broken',
      parentId: '',
      children: [
        {
          categoryId: '008-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '008',
        },
        {
          categoryId: '008-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '008',
        },
      ],
    },
    {
      categoryId: '009',
      label: '交通',
      icon: 'jam:car',
      parentId: '',
      children: [
        {
          categoryId: '009-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '009',
        },
        {
          categoryId: '009-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '009',
        },
      ],
    },
    {
      categoryId: '010',
      label: '汽车',
      icon: 'ant-design:car-outlined',
      parentId: '',
      children: [
        {
          categoryId: '010-1',
          label: '酒水',
          icon: 'maki:alcohol-shop',
          parentId: '010',
        },
        {
          categoryId: '010-2',
          label: '饮料',
          icon: 'noto:beverage-box',
          parentId: '010',
        },
      ],
    },
    {
      categoryId: '011',
      label: '订阅服务',
      icon: 'gg:add',
      parentId: '',
    },
    {
      categoryId: '012',
      label: '学习',
      icon: 'iconoir:graduation-cap',
      parentId: '',
    },
    {
      categoryId: '013',
      label: '人情',
      icon: 'ph:gift-thin',
      parentId: '',
    },
    {
      categoryId: '014',
      label: '医疗',
      icon: 'solar:hospital-broken',
      parentId: '',
    },
    {
      categoryId: '015',
      label: '旅游',
      icon: 'tabler:mountain',
      parentId: '',
    },
    {
      categoryId: '016',
      label: '投资',
      icon: 'arcticons:business-suite',
      parentId: '',
    },
    {
      categoryId: '017',
      label: '管理',
      icon: 'ant-design:setting-outlined',
      parentId: '',
    },
  ]

  return (
    <Stack spacing={4} direction="column">
      <AccountInput />
      <CategoryGrid
        icons={mockData}
        defaultValue="001"
      />
      {/* <NumberInput
        value={number}
        onChange={setNumber}
        confirmButtonClass="text-primary-500"
      /> */}
    </Stack>
  )
}
