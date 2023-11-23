'use client'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { HomeLayout } from '../_component/Layout'
import { NumberInput } from '@/_component/NumberInput'
import { api } from '~/trpc/react'
import type { CategoryBudget } from '~/server/db/schema'

function CategoryItem({ data, onEditClick }: { data: CategoryBudget, onEditClick: (d: CategoryBudget) => void }) {
  const { name } = data
  return (
    <VStack w="full" borderRadius="lg" bg="gray.400" h={20} p={3}>
      <HStack justifyContent="space-between" w="full">
        <Box>{ name }</Box>
        <Box>
          <button onClick={() => onEditClick(data)}>
            <Icon icon="akar-icons:edit" />
          </button>
        </Box>
      </HStack>
      <Box>
        ¥
        { data.budget }
      </Box>
    </VStack>
  )
}

export default function Page() {
  const [drawerVisible, toggleDrawerVisible] = useState(false)

  const [cateId, setCateId] = useState<CategoryBudget['id'] | null>(null)
  const [number, setNumber] = useState(0)

  const listCategoriesQuery = api.category.listCategoriesBudget.useQuery()
  const budgetUpdater = api.category.updateCategoryBudget.useMutation()

  function onEditBudget(data: CategoryBudget) {
    toggleDrawerVisible(true)
    setNumber(data.budget)
    setCateId(data.id)
  }

  function confirm(budget: number) {
    budgetUpdater.mutateAsync({
      id: cateId!,
      budget,
    }).then(() => {
      toggleDrawerVisible(false)
      listCategoriesQuery.refetch()
    })
  }

  return (
    <HomeLayout name="预算">
      <VStack spacing={4}>
        {
          listCategoriesQuery.data?.map(category => <CategoryItem data={category} onEditClick={onEditBudget} key={category.id} />)
        }
      </VStack>
      <Drawer
        onClose={() => {
          toggleDrawerVisible(false)
        }}
        placement="bottom"
        isOpen={drawerVisible}
      >
        <DrawerOverlay />
        <DrawerContent className="overflow-hidden rounded-t-lg">
          <DrawerHeader alignSelf="center">设置月预算额度</DrawerHeader>
          <DrawerBody>
            <div className="mb-[20px]">
              <InputGroup>
                <InputLeftElement
                  height="full"
                  justifyContent="right"
                  width={8}
                >
                  ¥
                </InputLeftElement>
                <Input
                  placeholder="输入预算额度"
                  value={number}
                  size="lg"
                  variant="filled"
                  prefix="¥"
                  focusBorderColor="primary.500"
                  paddingLeft={10}
                  readOnly
                />
              </InputGroup>
            </div>
            <NumberInput
              value={number}
              onChange={setNumber}
              confirmButtonClass="text-primary-500"
              onConfirm={() => confirm(number)}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HomeLayout>
  )
}
