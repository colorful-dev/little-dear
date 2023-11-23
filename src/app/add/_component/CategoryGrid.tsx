'use client'

import React, { type RefObject, useRef, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Icon } from '@iconify/react'
import IconItem from '../../_component/IconItem'
import SubCategoryList, { type SubCategoryListRefProps } from './SubCategoryList'

export interface IconInfo {
  parentId: string | number
  categoryId: string | number
  label: string
  icon: string
  children?: IconInfo[]
}

export interface CategoryGridProps {
  icons: IconInfo[]
  defaultValue?: string | number
  normalVariant?: string
  activeVariant?: string
  onChange?: (value: string | number, item?: IconInfo) => void
}

function findParentIndexById(arr: IconInfo[], id: string | number, parentIndex: number | null = null): number | null {
  for (let i = 0; i < arr.length; i++) {
    const currentItem = arr[i]

    if (currentItem?.categoryId === id)
      return parentIndex
    if (currentItem?.children) {
      const foundIndex = findParentIndexById(currentItem.children, id, i)
      if (foundIndex !== null)
        return foundIndex
    }
  }
  return null
}

function findItemById(arr: IconInfo[], id: string | number): IconInfo | null {
  for (const item of arr) {
    if (item.categoryId === id)
      return item

    if (item.children) {
      const foundItem = findItemById(item.children, id)
      if (foundItem)
        return foundItem
    }
  }

  return null
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ icons, defaultValue = '', onChange, normalVariant = 'normal', activeVariant = 'danger' }) => {
  const [parentIndex, setParentIndex] = useState<number | null>(() => findParentIndexById(icons, defaultValue))
  const [value, setValue] = useState<IconInfo | null>(() => findItemById(icons, defaultValue))
  const categoryRefs = useRef<Array<RefObject<SubCategoryListRefProps>>>([])

  if (categoryRefs.current.length !== icons.length) {
    // If the length of the ref array does not match the length of the icons array, reset the ref array
    categoryRefs.current = Array.from({ length: icons.length }, () => React.createRef<SubCategoryListRefProps>())
  }

  const currentItemList = (item: IconInfo) => [item, ...(item?.children ?? [])]

  const handleItemClick = (item: IconInfo, index: number, shouldUpdate: boolean) => {
    setParentIndex(index)
    if (index !== parentIndex || shouldUpdate)
      setValue(item)
    item?.children?.length ? categoryRefs.current[index]?.current?.open() : (onChange && onChange(item.categoryId, item))
  }

  const handleSubItemClick = (item: IconInfo, index: number) => {
    handleItemClick(item, index, true)
    categoryRefs.current[index]?.current?.close()
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" rowGap={4}>
      {
        icons.map((item, index) => {
          const isActive = parentIndex === index
          const currentItem = isActive && value ? value : item
          const variant = isActive ? activeVariant : normalVariant
          const hasDetail = !!item?.children?.length
          const label = hasDetail && currentItem?.parentId ? `${item.label}-${currentItem.label}` : currentItem.label

          return (
            <React.Fragment key={index}>
              <GridItem display="flex" flexDirection="column" onClick={() => handleItemClick(item, index, !hasDetail)}>
                <IconItem hasLabel={true} aria-label={label} variant={variant} icon={<Icon className="text-xl" icon={currentItem.icon} />} hasDetail={hasDetail} />
              </GridItem>
              <SubCategoryList ref={categoryRefs.current[index]} defaultValue={value} list={currentItemList(item)} onChange={item => handleSubItemClick(item, index)} />
            </React.Fragment>
          )
        })
      }
    </Grid>
  )
}

export default CategoryGrid
